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
				$otvet.html(data);
			});
		}
	}()
}

http_zapros = http_zapros_self("#content");

function posttxt(){
	$.post( "downloads/ajax_phonebook.txt", function( data ) {
	  $( "#fio1" ).html( data );
	});
}


function postxml(){
	$.post( "script/xml_json.php", function( xml ) {
		window.xmlobj = eval("("+xml+")")
	  // console.log(xmlobj)
	  var arr = xmlobj.contactlist.contact
	  for (var i = arr.length - 1; i >= 0; i--) {
	  	createcard(arr[i])
	  };

	})
	.fail(function() {
	    console.log("error while loading file")
	  })
}

function savexml(){
	
	$("#dataform").hide(500)
	var newxmlobj = jQuery.extend(true, {}, xmlobj);
	$xmlstring = Classes.JSON.toXML(newxmlobj);
	$("#loading").show(500,
		function(){
			$.post( "script/json_xml.php", {xmlstr:$xmlstring}, function(answer){
				if(answer==1){
					alert("Successfully wrote")
					$("#loading").hide(500)
					$("#dataform").show(500)
					$("#birthdate").attr("value", "")
					closePopUp()
					$("#cards").empty()
					var arr = xmlobj.contactlist.contact
					for (var i = arr.length - 1; i >= 0; i--) {
						createcard(arr[i])
					};

				}
				else{
					alert("Failed to write")
					$("#loading").hide(500)
					$("#dataform").show(500)
				}
				
			})
			.fail(function() {
			    alert("Error while saving file")
			  })
			
		}
	)
}



function openPopUp(contact){
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$("#lastname").attr("value", !contact ? "" : contact.fio.lastname);
	$("#firstname").attr("value", !contact ? "" : contact.fio.firstname);
	$("#surname").attr("value", !contact ? "" : contact.fio.surname);
	$("#phone").attr("value", !contact ? "" : contact.phone);
	$("#birthdate").attr("value", !contact ? "" : contact.birthdate.year+"-"+contact.birthdate.month+"-"+contact.birthdate.day);
	$("#country").attr("value", !contact ? "" : contact.adress.country);
	$("#city").attr("value", !contact ? "" : contact.adress.city);
	var contact = contact || {}
	savedata.change(contact)
}


var savedata = function(contact){
	var cont = contact || null
	var result = function (){
		// console.log(cont)
		if(cont.hasOwnProperty("fio") == false){
			cont.fio = {}
		}
			if(cont.fio.hasOwnProperty("lastname") == false){
				cont.fio.lastname = {}
			}
			if(cont.fio.hasOwnProperty("firstname") == false){
				cont.fio.firstname = {}
			}
			if(cont.fio.hasOwnProperty("surname") == false){
				cont.fio.surname = {}
			}
		if(cont.hasOwnProperty("phone") == false){
			cont.phone = {}
		}

		if(cont.hasOwnProperty("birthdate") == false){
			cont.birthdate = {}
			console/log("created cont.birthdate")
		}

		if(cont.birthdate.hasOwnProperty("day") == false){
			cont.birthdate.day = {}
			console/log("created cont.birthdate.day")
		}
		if(cont.birthdate.hasOwnProperty("month") == false){
			cont.birthdate.month = {}
			console/log("created cont.birthdate.month")
		}
		if(cont.birthdate.hasOwnProperty("year") == false){
			cont.birthdate.year = {}
			console/log("created cont.birthdate.year")
		}

		if(cont.hasOwnProperty("adress") == false){
			cont.adress = {}
		}

		if(cont.adress.hasOwnProperty("country") == false){
			cont.adress.country = {}
		}

		if(cont.adress.hasOwnProperty("city") == false){
			cont.adress.city = {}
		}

		// console.log($("#firstname").val())
		// console.log($("#surname").val())
		// console.log($("#phone").val())
		// console.log($("#birthdate").val())
		// console.log($("#country").val())
		// console.log($("#city").val())

		cont.fio.lastname = $("#lastname").val();
		cont.fio.firstname = $("#firstname").val();
		cont.fio.surname = $("#surname").val();

		cont.phone = $("#phone").val();

		// 0986-03-02
		// 0123456789
		var datestr=$("#birthdate").val()
		var birthyear = datestr.charAt(0)+datestr.charAt(1)+datestr.charAt(2)+datestr.charAt(3)
		var birthmonth = datestr.charAt(5)+datestr.charAt(6)
		var birthday = datestr.charAt(8)+datestr.charAt(9)
		
		// console.log("birthyear")
		// console.log(birthyear)
		// console.log("birthmonth")
		// console.log(birthmonth)
		// console.log("birthday")
		// console.log(birthday)

		// cont.birthdate.year = birthyear//1985
		// cont.birthdate.month = birthmonth//03
		// cont.birthdate.day = birthday//13

		cont.birthdate.year = birthyear//1985
		cont.birthdate.month = birthmonth//03
		cont.birthdate.day = birthday//13

		cont.adress.country = $("#country").val();
		cont.adress.city = $("#city").val();

		if(cont.hasOwnProperty("@attributes") == false){
			var maxid = 0
			var arr = xmlobj.contactlist.contact

			for (var i = arr.length - 1; i >= 0; i--) {
				var currentid = arr[i]["@attributes"].id
				if(currentid > maxid){
					maxid = currentid
				}
			}
			resultid = Number(maxid)+Number(1)
			cont["@attributes"] = {id:resultid}
			arr.push(cont)
			savexml()
		}
		else{
			var arr = xmlobj.contactlist.contact
			for (var i = arr.length - 1; i >= 0; i--) {

				console.log(arr[i]["@attributes"].id)
				if(arr[i]["@attributes"].id == cont["@attributes"].id){
					arr[i] = cont
					savexml()
				}
			}
		}
		console.log(xmlobj)
	}
	result.change = function(contact){
		cont = contact
	}
	result.delete = function(contact){
		var arr = xmlobj.contactlist.contact
		for (var i = arr.length - 1; i >= 0; i--) {

			console.log(arr[i]["@attributes"].id)

			if(arr[i]["@attributes"].id == cont["@attributes"].id){
				arr.splice(i,1)
				savexml()
			}
		};
	}
	return result
}()



console.log(savedata)
console.log(savedata.change)


function closePopUp(){
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "none";
}

function createopenpopup(contact){
	return
}

function createcard(contact){
	// console.log(contact)
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
				// console.log(cont)
				openPopUp(cont)
			}
		};



	var td12 = $("<td />",{
		click:func(contact), 
		text:"Редактировать"})

	card.append(tr1)
	tr1.append(td11).append(td12)

	var tr2 = $("<tr />")
	var td21 = $("<td />",{
		text : contact.phone
	})
	var td22 = $("<td />",{
		text : contact["@attributes"].id
	})
	card.append(tr2)
	tr2.append(td21)
	tr2.append(td22)

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

