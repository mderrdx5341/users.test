<?php
namespace DB;

class DB
{
	private string $host;
	private string $db;
	private string $user;
	private string $password;

	private $connect;

	public function __construct(string $host, string $db, string $user, string $password)
	{
		$this->host = $host;
		$this->db = $db;
		$this->user = $user;
		$this->password = $password;

		$this->connect = new \PDO(
			'mysql:host=' . $this->host .';dbname=' . $this->db,
			$this->user,
		   	$this->password
		);
	}

	public function query(string $query)
	{
		$response = $this->connect->query($query);
		if (!is_null($this->connect->errorInfo()[2])) {
			print_r($this->connect->errorInfo()[2]);
		}
		return $response;
	}

	public function lastInsertId() : int
	{
		return $this->connect->lastInsertId();
	}
}
