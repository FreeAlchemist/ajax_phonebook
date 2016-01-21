<?php
include("xml2json.php");
$xmlstring = file_get_contents("../data/ajax_phonebook.xml");
$json = xml2json::transformXmlStringToJson($xmlstring);

// $xml = simplexml_load_string($xmlstring);
// $json = json_encode($xml);
echo $json;
?>
