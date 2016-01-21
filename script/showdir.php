<?php
/*
include("script/showdir.php");

print_r(showpath("downloads"));

$arr=showpath("downloads");
foreach ($arr as $key => $value) {
	echo "<li>
	<span onclick=\"http_zapros('GET','downloads/".$value."')\">"
	.$value.
	"</span>"
	."<a href=\"downloads/".$value."\"> скачать</a></li>";
}

*/

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
