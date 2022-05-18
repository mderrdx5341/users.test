<?php
namespace Controllers;

class Users extends AbstractController
{
	public function index() : string
	{
		$users = [
			[
				'id' => 1,
				'name' => 'Ivan',
				'email' => 't@t.ru',
				'address' => '10',
			],
			[
				'id' => 2,
				'name' => 'Roman',
				'email' => 'm@m.ru',
				'address' => '80',
			],
		];

		return $this->jsonResponse($users);
	}
}
