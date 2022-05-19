<?php
namespace Model;

class User
{
	private int $id;
	private string $name;
	private string $email;
	private string $address;

	public function __construct(int $id, string $name, string $email, string $address)
	{
		$this->id = $id;
		$this->name = $name;
		$this->email = $email;
		$this->address = $address;
	}

	public function id(): int
	{
		return $this->id;
	}

	public function name(): string
	{
		return $this->name;
	}

	public function email(): string
	{
		return $this->email;
	}

	public function address(): string
	{
		return $this->address;
	}
}
