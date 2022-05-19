<?php
namespace DB\Query;

class Select
{
	private $tableName;
	private $fields;
	private $conditions;

	public function __construct($tableName) 
	{
		$this->tableName = $tableName;
		$this->fields = [];
		$this->conditions = [];
	}

	public function addField($field)
	{
		$this->fields[] = $field;

		return $this;
	}

	public function where($field, $val, $shield = false)
	{
		$this->conditions[] = [
			'field' => $field,
			'val' => $val,
			'shield' => $shield,
		];
	}

	public function build()
	{
		$str = 'select ';
		$str .= $this->fields();
		$str .= ' from ' . $this->tableName;
		$str .= $this->whereBuild();
		return $str;
	}

	private function fields()
	{
		$str = '';
		foreach ($this->fields as $field) {
			$str .= ',' . $field;
		}
		$str = trim($str, ',');

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
