<?php
namespace Controllers;
use Model\AdminRepository;

class Admin extends AbstractController
{
	private $adminRepository;

	public function afterInit()
	{
		$this->adminRepository = new AdminRepository($this->db);
	}

	public function auth() : string
	{
		$data = $this->jsonRequest();
		if ($this->adminRepository->getAdmin($data['login'], $data['password'])) {
			$_SESSION['auth'] = true;
			return $this->jsonResponse(['status' => true]);
		} else {
			return $this->jsonResponse(['status' => false]);
		}
	}

	public function registration() : string
	{
		$data = $this->jsonRequest();
		$id = $this->adminRepository->addAdmin($data['login'], $data['password']);
		return $this->jsonResponse([$id]);
	}
}
