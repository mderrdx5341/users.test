<?php
namespace DB\Query;

class Insert
{
	private $tableName;
	private $records;
	private $recordsIndex = 1;
	private $fields;

	public function __construct($tableName) 
	{
		$this->tableName = $tableName;
		$this->fields = [];
	}

	public function addField($field, $val = '', $shield = false)
	{
		if (!in_array($field, $this->fields)) {
			$this->fields[] = $field;
		}

		$this->records[$this->recordsIndex][] = [
			'val' => $val,
			'shield' => $shield,
		];

		return $this;
	}

	public function newRecord()
	{
		$this->recordsIndex++;
		return $this;
	}

	public function build()
	{
		$query = 'insert into ' . $this->tableName . '(';

		$fields = '';
		foreach ($this->fields as $field) {
			$fields .= ','.$field;
		}
		$fields = trim($fields, ',');
		$query .= $fields;

		$query .= ')';

		$query .= $this->values();

		return $query;
	}

	private function values()
	{
		$str = ' values ';

		$fieldsData = '';
		foreach ($this->records as $fields) {
			$fieldsData .= ',' . $this->fields($fields);
		}
		$fieldsData = trim($fieldsData, ',');
		$str .=$fieldsData;

		return $str;
	}

	private function fields($fields) {
		$str = '(';

		$fieldsValues = '';
		foreach ($fields as $field) {
			if ($field['shield']) {
				$fieldsValues .= ",'". $field['val'] . "'";
			} else {
				$fieldsValues .= ','.$field['val'];
			}
		}
		$fieldsValues = trim($fieldsValues, ',');

		$str .= $fieldsValues . ')';

		return $str;
	}
}
