<?php
class Template
{
	private $template;
	private $args;

	public function __construct($template, $args = [])
	{
		$this->template = $template;
		$this->args = $args;
	}

	public function render()
	{
		foreach ($this->args as $k => $v) {
			$$k = $v;
		}
		ob_start();
		include(__DIR__ . '/templates/' . $this->template . '.php');
		$content = ob_get_clean();
		return $content;
	}
}
