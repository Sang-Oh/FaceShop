<?php
$callback = $_REQUEST['callback'];
$icon = $_REQUEST['file'];

$encoded_data = base64_encode(file_get_contents($icon));

if($callback) {    
	header('Content-Type: text/javascript, charset=UTF-8');    
	echo $callback . '(';
} else {    
	header('Content-Type: application/x-json, charset=UTF-8');    
} 

echo  $encoded_data;

if($callback) {        
	echo  ');';
}
?>
