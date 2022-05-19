<?php
namespace DB\Query;

class Delete
{
	private $tableName;
	private $fields;
	private $conditions;

	public function __construct($tableName) 
	{
		$this->tableName = $tableName;
		$this->conditions = [];
	}

	public function where($field, $val, $shield = false)
	{
		$this->conditions[] = [
			'field' => $field,
			'val' => $val,
			'shield' => $shield,
		];

		return $this;
	}

	public function build()
	{
		$str = 'delete';
		$str .= ' from ' . $this->tableName;
		$str .= $this->whereBuild();
		return $str;
	}

	private function whereBuild()
	{
		if(count($this->conditions) === 0) {
			return;
		}
		$str = ' where ';
		$conditionStr = '';
		foreach ($this->conditions as $condition) {
			if ($condition['shield']) {
				$conditionStr = ', '.$condition['field'] . '=' . "'" . $condition['val'] . "'";
			} else {
				$conditionStr = ', '.$condition['field'] . '=' . $condition['val'];
			}
		}
		$conditionStr = trim($conditionStr, ',');
		$str .= $conditionStr;

		return $str;
	}
}
