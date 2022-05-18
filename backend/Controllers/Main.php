<?php
namespace Controllers;

class Main extends AbstractController
{
	public function index()
	{

		return (new \Template(
				'main', 
			)
		)->render();
	}
}
