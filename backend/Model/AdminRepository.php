<?php
namespace Model;
use DB\Query;

class AdminRepository
{
	const TABLE_NAME = 'admin';

	public function __construct($db)
	{
		$this->db = $db;
	}

	public function getAdmin(string $login, string $password) : bool 
	{
		$admin;
		$password = md5(md5(trim($password)));
		$query = (new Query\Select(self::TABLE_NAME))
			->addField("*")
			->where('login', $login, true)
			->where('password', $password, true);
		$admins = $this->db->query($query->build());
		foreach ($admins as $admin) {
			return true;
		}
		return false;
	}

	public function addAdmin(string $login, string $password) : int
	{
		$password = md5(md5(trim($password)));
		$query = (new Query\Insert(self::TABLE_NAME))
			->addField('login', $login, true )
			->addField('password', $password, true);

		$this->db->query($query->build());

		$id = $this->db->lastInsertId();
		return $id;
	}
}
