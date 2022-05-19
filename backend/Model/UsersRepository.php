<?php
namespace Model;
use DB\Query;

class UsersRepository
{
	const TABLE_NAME = 'users';
	private $db;

	public function __construct($db)
	{
		$this->db = $db;
	}

	public function getById(int $id)
	{
	}

	public function getUsers() : Array
	{
		$users = [];
		$query = (new Query\Select(self::TABLE_NAME))
			->addField("*");
		$usersFromDB = $this->db->query($query->build());
		foreach($usersFromDB as $userData) {
			$users[] = new User(
				$userData['id'],
				$userData['name'],
				$userData['email'],
				$userData['address'],
			);
		}

		return $users;
	}

	public function add(User $user) : int
	{
		$query = (new Query\Insert(self::TABLE_NAME))
			->addField('name', "\"{$user->name()}\"")
			->addField('email', "\"{$user->email()}\"")
			->addField('address', "\"{$user->address()}\"");
		$this->db->query($query->build());

		$id = $this->db->lastInsertId();

		return $id;
	}

	public function update(User $user)
	{
	}

	public function deleteById(int $id)
	{
	}
}
