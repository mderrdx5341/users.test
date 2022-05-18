<?php
return [
	'~^/$~' => ['controller' => 'Main', 'action' => 'index'],
	'~^/users/$~' => ['controller' => 'Users', 'action' => 'index'],
];
