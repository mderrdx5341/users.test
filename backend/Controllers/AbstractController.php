<?php
namespace Controllers;

abstract class AbstractController
{
	public function __construct() {
		$this->afterInit();
	}

	public function afterInit() {}

	public function jsonResponse($data)
	{
		header('Content-Type: application/json; charset=utf-8');
		return json_encode($data);
	}

	public function jsonRequest()
	{
		$postData = file_get_contents('php://input');
		return json_decode($postData, true);
	}
}
