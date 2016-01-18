<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel=Stylesheet href="css/ajax_phonebook.css">
<script type="text/javascript" src="script/jquery/jquery-1.12.0.js"></script>
</head>
<body>
	
<?php
include("script/showdir.php");

print_r(showpath("downloads"));

$arr=showpath("downloads");
foreach ($arr as $key => $value) {
	echo "<li><a href=\"downloads/".$value."\"> скачать</a></li>";
}

$filename="data/ajax_phonebook.xml";

if (file_exists($filename)) {
    $xml = simplexml_load_file($filename);
}
else {
    exit('Failed to open '.$filename);
}
echo '<form method="post" action="script/ajax_phonebook_download.php">';
echo '<input type="submit" value="Скачать">';
echo '<input type="hidden" name="filename" value="'.$filename.'">';
echo '</form>';

echo '<form method="get" action="script/ajax_phonebook_form.php">';
echo '<input type="submit" value="Добавить контакт">';
echo '<input type="hidden" name="filename" value="'.$filename.'">';
echo '<input type="hidden" name="add" value="1">';
echo '</form>';

foreach ($xml as $key => $value) {
	echo "<table class=\"card\">";
	echo "<tr>";
	echo "<td id=\"fio\">";
	echo $value->fio->lastname." "
	    .$value->fio->firstname." "
	    .$value->fio->surname;
	echo "</td>";
	echo "<td>";
	echo "<a href=\"script/ajax_phonebook_form.php?id=".$value['id']."&filename=".$filename."\">"
		."Редактировать"."</a>";
	echo "</td>";
	echo "</tr>";
	echo "<tr>";
	echo "<td>";
	echo $value->phone;
	echo "</td>";
	echo "</tr>";
	echo "<tr>";
	echo "<td>";
	echo $value->birthdate->day."."
		.$value->birthdate->month."."
		.$value->birthdate->year;
	echo "</td>";
	echo "<td>";
	echo $value->adress->country.", "
		.$value->adress->city;	
	echo "</td>";
	echo "</tr>";
}
echo "</table>";
?>
</body>
