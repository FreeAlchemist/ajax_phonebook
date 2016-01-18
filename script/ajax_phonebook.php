<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel=Stylesheet href="css/ajax_phonebook.css">
</head>
<body>
	
<?php

/*
ajax_phonebook/
data/ajax_phonebook.xml
downloads/ajax_phonebook.txt
jquery/jquery-1.12.0.js
ajax_phonebook.css
ajax_phonebook.php
ajax_phonebook_download.php
ajax_phonebook_postxml.php
*/

$filename="data/ajax_phonebook.xml";

if (file_exists($filename)) {
    $xml = simplexml_load_file($filename);
}
else {
    exit('Failed to open '.$filename);
}
echo '<form method="post" action="ajax_phonebook_download.php">';
echo '<input type="submit" value="Скачать">';
echo '<input type="hidden" name="filename" value="'.$filename.'">';
echo '</form>';

echo '<form method="get" action="ajax_phonebook_form.php">';
echo '<input type="submit" value="Добавить контакт">';
echo '<input type="hidden" name="filename" value="'.$filename.'">';
echo '<input type="hidden" name="add" value="1">';
echo '</form>';

echo "<table rules=\"all\">";
	echo "<tr>
		<td>ФИО</td>
		<td>Телефон</td>
		<td>Дата рождения</td>
		<td>Адрес</td>
		</tr>";
foreach ($xml as $key => $value) {
	echo "<tr>";
	echo "<td>";
	echo "<a href=\"ajax_phonebook_form.php?id=".$value['id']."&filename=".$filename."\">"
	    // .iconv("UTF-8","cp1251",$value->fio->lastname)." "
		.$value->fio->lastname." "
	    // .iconv("UTF-8","cp1251",$value->fio->firstname)." "
	    .$value->fio->firstname." "
	    // .iconv("UTF-8","cp1251",$value->fio->surname)."</a>";
	    .$value->fio->surname."</a>";
	echo "</td>";
	echo "<td>";
	echo $value->phone;
	echo "</td>";
	echo "<td>";
	// echo iconv("UTF-8","cp1251",$value->birthdate->day)."."
	// 	.iconv("UTF-8","cp1251",$value->birthdate->month)."."
	// 	.iconv("UTF-8","cp1251",$value->birthdate->year);
	echo $value->birthdate->day."."
		.$value->birthdate->month."."
		.$value->birthdate->year;
	echo "</td>";
	echo "<td>";
	// echo iconv("UTF-8","cp1251",$value->adress->country).", "
	// 	.iconv("UTF-8","cp1251",$value->adress->city);
	echo $value->adress->country.", "
		.$value->adress->city;	
	echo "</td>";
	echo "</tr>";
}
echo "</table>";
?>
</body>
