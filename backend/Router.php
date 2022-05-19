<?php
class Router
{
	private $routeMap;
	private $request;
	private $db;

	public function __construct($page, $db)
	{
		$this->routeMap = include __DIR__ . '/../.route_map.php';
		$this->page = $page;
		$this->db = $db;
	}

	public function run()
	{
		$args = [];
		foreach ($this->routeMap as $route => $ex) {
			if(preg_match($route, $this->page, $args)) {
				$controllerName = $ex['controller'];
				$action = $ex['action'];
				$controllerClass = 'Controllers\\' . $controllerName;
				$controller = new $controllerClass($this->db);
				
				unset($args[0]);
				return call_user_func_array(array($controller, $action), $args);
			}
		}

		return 'not found';
	}
}
