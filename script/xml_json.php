<?php
$xmlstring = file_get_contents("../data/ajax_phonebook.xml");
$xml = simplexml_load_string($xmlstring);
$json = json_encode($xml);
echo $json;
?>
