var xmlHttp = createXmlHttpRequestObject();
function createXmlHttpRequestObject(){
	var xmlHttp;
	try{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e){
		try{
			xmlHttp=new ActiveObject("Msxml12.XMLHTTP");
		}
		catch(e){
			try{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				alert("Your browser can't use AJAX!");
				return false;
			}
		}
	}
	return xmlHttp;
}

function http_zapros(method, url, callback){
	if(xmlHttp){
		try{
			// xmlHttp.open("GET","request.txt",true);
			xmlHttp.open(method,url,true);
			xmlHttp.onreadystatechange = callback;
			xmlHttp.send(null);
		}
		catch(e){
			alert("Server connection failed");
		}
	}
}

function obrabotka(){
	if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			try{
				response = xmlHttp.responseText;
				var countfield = window.document.getElementById("otvet");
				countfield.value = response;
			}
			catch(e){
				alert("Request reading error");
			}
		}
		else{
			alert("Server request error:\n"+xmlHttp.statusText);
		}
	}
}

