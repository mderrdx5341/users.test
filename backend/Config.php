<?php
class Config
{
	private $config;

	public function __construct()
	{
		$this->config = include( __DIR__ . '/../.config.php');
	}

	public function param($name)
	{
		return $this->config[$name];
	}
}
