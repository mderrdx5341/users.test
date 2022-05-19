<?php
use DB\DB;

class App
{
	private $config;
	private $db;
	private $router;

	public function __construct()
	{
		session_start();
		$this->init();
	}

	public function init()
	{
		$this->config = new Config();
		$this->db = new DB(
			$this->config->param('host'),
			$this->config->param('db'),
			$this->config->param('user'),
			$this->config->param('password')
		);
		$this->router = new Router($_SERVER['REQUEST_URI'], $this->db);
	}

	public function run()
	{
		echo $this->router->run();
	}
}
