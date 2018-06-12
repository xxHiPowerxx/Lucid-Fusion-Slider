<?php
	require "scss.inc.php";
	$scss = new scssc();
	$scss->setFormatter("scss_formatter_compressed");
	$server = new scss_server("stylesheets", null, $scss);
	$server->serve();
?>
