function http_zapros_self(sel,flag){
	if (flag) return function(){
		var $otvet = $(sel);
		return function(method, url){
			$.get(url,function(data){
				$otvet.attr("value",data);
			});
		}
	}()
	else return function(){
		var $otvet = $(sel);
		
		return function(method, url){
			$.get(url,function(data){
				console.log($otvet);
				$otvet.html(data);
			});
		}
	}()
}
// http_zapros2 = http_zapros_self("#show",1);
// console.log(http_zapros2+"")

http_zapros = http_zapros_self("#content");
// console.log(http_zapros+"")

function posttxt(){
	$.post( "downloads/ajax_phonebook.txt", function( data ) {
		console.log(data);
	  $( "#fio1" ).html( data );
	});
}


function postxml(){
	$.post( "script/xml_json.php", function( xml ) {
		// console.log(xml)
		var xmlobj = eval("("+xml+")")

	  // console.log(xmlobj.contact[0])
	  // $( "#fio1" ).html(  );
	  var arr = xmlobj.contact
	  for (var i = arr.length - 1; i >= 0; i--) {
	  	createcard(arr[i])
	  };

	})
	.fail(function() {
	    console.log("error while loading file")
	  })
}

function openPopUp(contact){
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$("#lastname").attr("value",contact.fio.lastname);
	$("#firstname").attr("value",contact.fio.firstname);
	$("#surname").attr("value",contact.fio.surname);
	$("#phone").attr("value",contact.phone);
	$("#birthdate").attr("value",contact.birthdate.year+"-"+contact.birthdate.month+"-"+contact.birthdate.day);
	//value="'.$bd->year.'-'.$bd->month.'-'.$bd->day.'"
	$("#country").attr("value",contact.adress.country);
	$("#city").attr("value",contact.adress.city);
}

function createopenpopup(contact){
	return
}

function createcard(contact){
	console.log(contact)
	var card = $("<table />",{"class":"card"})

	var tr1 = $("<tr />")
	var td11 = $("<td />",{
		text : contact.fio.lastname+" "+contact.fio.firstname+" "+contact.fio.surname
	}).css("font-weight","bold")



	// var td12 = $("<td />",{
	// 	click:function(contact){
	// 		var cont = contact
	// 		return function(){
	// 			console.log(cont)
	// 			openPopUp(cont)
	// 		}
	// 	}(contact), 
	// 	text:"Редактировать"})


		//function a (){return function b}()

var func = function(contact){
			var cont = contact
			return function(){
				console.log(cont)
				openPopUp(cont)
			}
		};
	var td12 = $("<td />",{
		click:func(contact), 
		text:"Редактировать"})

	// td12.html("<a href=\"#\" onclick=\"openPopUp(contact)\">Редактировать</a>")

	card.append(tr1)
	tr1.append(td11).append(td12)

	var tr2 = $("<tr />")
	var td21 = $("<td />",{
		text : contact.phone
	})
	card.append(tr2)
	tr2.append(td21)

	var tr3 = $("<tr />")
	var td31 = $("<td />",{
		text : contact.birthdate.day+"."+contact.birthdate.month+"."+contact.birthdate.year
	})
	var td32 = $("<td />",{
		text : contact.adress.country+", "+contact.adress.city
	})

	card.append(tr3)
	tr3.append(td31).append(td32)

	$("#cards").append(card)

}
