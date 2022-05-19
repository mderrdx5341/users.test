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

	public function getById(int $id) : User
	{
		$user;
		$query = (new Query\Select(self::TABLE_NAME))
			->addField("*")
			->where("id", $id);
		$usersFromDB = $this->db->query($query->build());
		foreach($usersFromDB as $userData) {
			$user = new User(
				$userData['id'],
				$userData['name'],
				$userData['email'],
				$userData['address'],
			);
		}

		return $user;
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
			->addField('name', $user->name(), true)
			->addField('email', $user->email(), true)
			->addField('address', $user->address(), true);
		$this->db->query($query->build());

		$id = $this->db->lastInsertId();

		return $id;
	}

	public function update(User $user) : void
	{
		$query = (new Query\Update(self::TABLE_NAME))
			->addField('name', $user->name(), true)
			->addField('email', $user->email(), true)
			->addField('address', $user->address(), true)
			->where('id', $user->id());
		$this->db->query($query->build());
	}

	public function deleteById(int $id)
	{
	}
}
