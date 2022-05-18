<?php
class Router
{
	private $routeMap;
	private $request;

	public function __construct($page)
	{
		$this->routeMap = include __DIR__ . '/../.route_map.php';
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
				$controller = new $controllerClass();
				
				unset($args[0]);
				return call_user_func_array(array($controller, $action), $args);
			}
		}

		return 'not found';
	}
}
