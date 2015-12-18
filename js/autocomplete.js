var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		var roads = $.parseJSON(xhttp.responseText);
		$('#autocomplete').autocomplete({
    		lookup: roads,
    		onSelect: function (suggestion) {
      			var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
				    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				        var id = xmlhttp.responseText;
				   		window.open('//'+window.location.hostname+'/tttn/index.php?id='+id,"_self")
			    	}
				};
				xmlhttp.open("POST", "php/id.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send("name="+suggestion.value);
    		}
  		});
	}
};
xhttp.open("GET", "php/road.php", true);
xhttp.send();