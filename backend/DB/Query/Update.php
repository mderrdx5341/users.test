<?php
namespace DB\Query;

class Update
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

	public function addField($field, $val, $shield = false)
	{
		if ($shield) {
			$val = "'" . $val . "'";
		}
		$this->fields[] = $field .' = '. $val;

		return $this;
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
		$str = 'update ';
		$str .= $this->tableName . ' set ';
		$str .= $this->fields();
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
