<?php
class Router
{
	private $routeMap;
	private $diContainer;

	public function __construct(string $page, DIContainer $diContainer)
	{
		$this->routeMap = include __DIR__ . '/../.route_map.php';
		$this->diContainer = $diContainer;
		$this->page = $page;
	}

	public function run()
	{
		$args = [];
		foreach ($this->routeMap as $route => $ex) {
			if(preg_match($route, $this->page, $args)) {
				$controllerName = $ex['controller'];
				$action = $ex['action'];
				$controllerClass = 'Controllers\\' . $controllerName;
				$controller = $this->diContainer->get($controllerClass);
				
				unset($args[0]);
				return call_user_func_array(array($controller, $action), $args);
			}
		}

		header("HTTP/1.1 404 Not Found");
		return 'not found';
	}
}
