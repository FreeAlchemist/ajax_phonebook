<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel=Stylesheet href="css/ajax_phonebook.css">
<script type="text/javascript" src="script/jquery/jquery-1.12.0.js"></script>
<script type="text/javascript" src="script/classes.JSON.js"></script>

</head>
<body onload="postxml()">
<div id="overlay">
     <div id="dataform">
          <form>
          	<input type="reset">
          	<table class="editcard">
          		<tr>
          			<td>Фамилия</td>
          			<td>Имя</td>
          			<td>Отчество</td>
          			<td>Телефон</td>
          		</tr>
          		<tr>
	          		<td><input type="text" id="lastname" placeholder="Иванов"></td>
	          		<td><input type="text" id="firstname" placeholder="Иван"></td>
	          		<td><input type="text" id="surname" placeholder="Иванович"></td>
	          		<td><input type="text" id="phone" placeholder="+70001112233"></td>
          		</tr>
          		<tr>
					<td>Дата рождения</td>
					<td>Страна</td>
					<td>Город</td>
				</tr>
				<tr>	
	          		<td><input id="birthdate" type="date"></td>
	          		<td><input type="text" id="country" placeholder="Россия"></td>
	          		<td><input type="text" id="city" placeholder="Ленинград"></td>
          		</tr>
				</table>						
          	<input type="button" id="save" value="Сохранить контакт" onclick="savedata()">
          	<input type="button" id="cancel" value="Отмена" onclick="closePopUp()">
               <input type="button" id="delete" value="Удалить" onclick="savedata.delete()">
          </form>
          </div>
     <div id="loading">
          <img src="img/loading.jpg">
     </div>
</div>

<div id="menu">
<input type="submit" value="Скачать">
<input type="submit" value="Добавить контакт" onclick="openPopUp()">
</div>
<div id="cards"></div>


<script type="text/javascript" src="script/ajax_phonebook_request.js"></script>

</body>
