<?php
$xmlstr = '<?xml version="1.0" encoding="UTF-8"?>'.$_POST['xmlstr'];

if(file_put_contents("../data/ajax_phonebook.xml", $xmlstr)){
	$answer = 1;
}

else{
	$answer = 0;
}
echo $answer;
?>
