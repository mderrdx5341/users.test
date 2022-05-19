<?php
return [
	'~^/$~' => ['controller' => 'Main', 'action' => 'index'],
	'~^/users/$~' => ['controller' => 'Users', 'action' => 'index'],
	'~^/users/create/$~' => ['controller' => 'Users', 'action' => 'create'],
];
