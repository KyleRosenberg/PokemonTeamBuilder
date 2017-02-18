var pokemonjsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/pokemon.j";
var typejsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/types.j";
var movesjsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/moves.j";

var pokemonjson;
var typejson;
var movejson;

$.ajax({ 
	url: pokemonjsonurl, success: function(data) {
		pokemonjson = JSON.parse(data);
		printArray(pokemonjson);
	} 
});

$.ajax({ 
	url: typejsonurl, success: function(data) {
		typejson = JSON.parse(data);
		printArray(typejson);
	} 
});

$.ajax({ 
	url: movesjsonurl, success: function(data) {
		movejson = JSON.parse(data);
		printArray(movejson);
	} 
});

function printArray(arr){
	for (var i = 0; i<arr.length; i++){
		document.write("<p>" + arr[i].name + ": " + (i+1) + "</p>");
	}
}