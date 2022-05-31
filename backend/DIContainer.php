<?php

class DIContainer
{
	private $instances = [];
	private $config;

	public function constructor()
	{
		$this->config = include( __DIR__ . '/../.di_config.php');
	}

	public function addTransient(string $abstract, string $instance = null, array $parameters = [])
	{
		$this->instances[$abstract] = [
			'type' => 'transient',
			'object' => 'null',
			'class' => $instance,
			'parameters' => $parameters
		];
	}

	public function addSingleton(string $abstract, string $instance, array $parameters = [])
	{
		$this->instances[$abstract] = [
			'type' => 'singleton',
			'object' => null,
			'class' => $instance,
			'parameters' => $parameters
		];
	}

	public function get(string $abstract, array $parameters = [])
	{
		if (!isset($this->instances[$abstract])) {
			$this->addTransient($abstract, $abstract, $parameters);
		}

		if ($this->instances[$abstract]['type'] === 'singleton' && $this->instances[$abstract]['object'] !== null) {
			return $this->instances[$abstract]['object'];
		}

		return $this->resolve($this->instances[$abstract]['class'], $this->instances[$abstract]['parameters']);
	}

	private function resolve($concrete, $parameters)
	{
		if ($concrete instanceof Closure) {
			return $concrete($this, $parameters);
		}

		$reflector = new ReflectionClass($concrete);

		if (!$reflector->isInstantiable()) {
			throw new Exception("Class {$concrete} is not instantiable");
		}

		$constructor = $reflector->getConstructor();

		if (is_null($constructor)) {
			return $reflector->newInstance();
		}

		$dependencies = [];
		if (count($parameters) > 0) {
			$dependencies = $parameters;
		} else {
			$parameters = $constructor->getParameters();
			$dependencies = $this->getDependencies($parameters);
		}

		return $reflector->newInstanceArgs($dependencies);
	}

	private function getDependencies($parameters)
	{
		$dependencies = [];
		foreach($parameters as $parameter) {
			$dependency = $parameter->getType() && !$parameter->getType()->isBuiltin() 
				? new ReflectionClass($parameter->getType()->getName())
				: null;
			if ($dependency === null) {
				if ($parameter->isDefaultValueAvailable()) {
					$dependencies[] = $parameter->getDefaultValue();
				} else {
					throw new Exception("Can not resolve class dependency {$parameter->name}");
				}
			} else {
				$dependencies[] = $this->get($dependency->name);
			}
		}

		return $dependencies;
	}
}
