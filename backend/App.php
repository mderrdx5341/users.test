<?php
class App
{
	private $config;
	private $router;

	public function __construct()
	{
		session_start();
		$this->init();
	}

	public function init()
	{
		$this->router = new Router($_SERVER['REQUEST_URI']);
	}

	public function run()
	{
		echo $this->router->run();
	}
}
