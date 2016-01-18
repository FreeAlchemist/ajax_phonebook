<?php
function showpath($path,$depth=0,$foldernum=0){
	$arr = scandir($path);
	$result=array();
	foreach ($arr as $key => $value) {
		if(substr($value, 0,1) != "."){
			$result[]=$value;
		}
	}
	return $result;
}
?>
