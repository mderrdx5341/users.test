<?php
namespace Controllers;
use Model\UsersRepository;
use Model\User;

class Users extends AbstractController
{
	private UsersRepository $usersRepository;

	protected function afterInit()
	{
		$this->usersRepository = new UsersRepository($this->db);
	}

	public function index() : string
	{
		$users = $this->usersRepository->getUsers();
		$response = [];
		foreach ($users as $user) {
			$response[] =  [
				'id' => $user->id(),
				'name' => $user->name(),
				'email' => $user->email(),
				'address' => $user->address(),
			];
		}

		return $this->jsonResponse($response);
	}

	public function create() : string
	{
		$data = $this->jsonRequest();
		$user = new User(
			0,
			$data['name'],
			$data['email'],
			$data['address'],
		);
		$id = $this->usersRepository->add($user);

		$response = ['id' => $id];
		return $this->jsonResponse($response);
	}

	public function getById() : string
	{
		$data = $this->jsonRequest();
		$user = $this->usersRepository->getById($data['id']);
		$response =  [
			'id' => $user->id(),
			'name' => $user->name(),
			'email' => $user->email(),
			'address' => $user->address(),
		];

		return $this->jsonResponse($response);
	}

	public function update() : string
	{
		$data = $this->jsonRequest();
		$user = new User(
			$data['id'],
			$data['name'],
			$data['email'],
			$data['address'],
		);

		$id = $this->usersRepository->update($user);

		$response = ['id' => $data['id']];
		return $this->jsonResponse($response);
	}

	public function delete() : string
	{
		$data = $this->jsonRequest();

		foreach ($data as $id) {
			$id = $this->usersRepository->deleteById($id); //TODO needs optimization
		}

		return $this->jsonResponse($data);
	}
}
