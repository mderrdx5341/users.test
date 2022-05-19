<?php
return [
	'~^/$~' => ['controller' => 'Main', 'action' => 'index'],
	'~^/users/$~' => ['controller' => 'Users', 'action' => 'index'],
	'~^/users/create/$~' => ['controller' => 'Users', 'action' => 'create'],
	'~^/users/get-by-id/$~' => ['controller' => 'Users', 'action' => 'getById'],
	'~^/users/update/$~' => ['controller' => 'Users', 'action' => 'update'],
	'~^/users/delete/$~' => ['controller' => 'Users', 'action' => 'delete'],

	'~^/admin/reg/$~' => ['controller' => 'Admin', 'action' => 'registration'],
	'~^/admin/auth/$~' => ['controller' => 'Admin', 'action' => 'auth'],
];
