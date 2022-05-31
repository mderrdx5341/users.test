<?php
use DB\DB;

class App
{
	private $diContainer;
	private $config;
	private $router;

	public function __construct()
	{
		session_start();
		$this->init();
	}

	public function init()
	{
		$this->diContainer = new DIContainer();
		$this->config = new Config();
		$this->diContainer->addSingleton(
			'DB\DB',
			'DB\DB',
			[
				$this->config->param('host'),
				$this->config->param('db'),
				$this->config->param('user'),
				$this->config->param('password')
			]
		);
		$this->router = new Router($_SERVER['REQUEST_URI'], $this->diContainer);
	}

	public function run()
	{
		print $this->router->run();
	}

	public static function isAuth() : bool
	{
		if(isset($_SESSION['auth']) && $_SESSION['auth'] === true) {
			return true;
		}
		return false;
	}
}
