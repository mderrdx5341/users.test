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
		if(!\App::IsAuth()) {
			return $this->jsonResponse([
				'message' => 'not_auth'
			]);
		}

		$users = $this->usersRepository->getUsers();
		$response = [];
		foreach ($users as $user) {
			$response[] =  [
				'message' => 'ok',
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
		if(!\App::IsAuth()) {
			return $this->jsonResponse([
				'message' => 'not_auth'
			]);
		}

		$data = $this->jsonRequest();
		$user = new User(
			0,
			$data['name'],
			$data['email'],
			$data['address'],
		);
		$id = $this->usersRepository->add($user);

		$response = [
			'message' => 'ok',
			'id' => $id
		];
		return $this->jsonResponse($response);
	}

	public function getById() : string
	{
		if(!\App::IsAuth()) {
			return $this->jsonResponse([
				'message' => 'not_auth'
			]);
		}

		$data = $this->jsonRequest();
		$user = $this->usersRepository->getById($data['id']);
		$response =  [
			'message' => 'ok',
			'id' => $user->id(),
			'name' => $user->name(),
			'email' => $user->email(),
			'address' => $user->address(),
		];

		return $this->jsonResponse($response);
	}

	public function update() : string
	{
		if(!\App::IsAuth()) {
			return $this->jsonResponse([
				'message' => 'not_auth'
			]);
		}

		$data = $this->jsonRequest();
		$user = new User(
			$data['id'],
			$data['name'],
			$data['email'],
			$data['address'],
		);

		$id = $this->usersRepository->update($user);

		$response = [
			'message' => 'ok',
			'id' => $data['id']
		];
		return $this->jsonResponse($response);
	}

	public function delete() : string
	{
		if(!\App::IsAuth()) {
			return $this->jsonResponse([
				'message' => 'not_auth'
			]);
		}

		$data = $this->jsonRequest();

		foreach ($data as $id) {
			$id = $this->usersRepository->deleteById($id); //TODO needs optimization
		}

		$data['message'] = 'ok';
		return $this->jsonResponse($data);
	}
}
