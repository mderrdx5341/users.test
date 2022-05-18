<?php

function autoLoadClasses($name) {
	$tmp = explode('\\', $name);
	$className = array_pop($tmp);
	$pathDir = '/';
	foreach ($tmp as $dir) {
		$pathDir .=  $dir . '/';
	}
	$path = $pathDir . $className . '.php';

	include_once(__DIR__ . '/backend' . $path);
}

spl_autoload_register('autoLoadClasses');
