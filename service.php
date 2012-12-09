<?php
$callback = $_REQUEST['callback'];
$service = $_REQUEST['service'];

$file = fopen($service, "r") or exit("Unable to open file!");


if($callback) {    
	header('Content-Type: text/javascript, charset=UTF-8');    
	echo $callback . '(';
} else {    
	header('Content-Type: application/x-json, charset=UTF-8');    
} 

while(!feof($file)) {
  echo fgets($file);
}

fclose($file);
  

if($callback) {        
	echo  ');';
}
?>
