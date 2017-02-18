var reader = new FileReader();
var file = new File([""], "pokemon.j");
reader.onload = function(e) { 
	var contents = e.target.result;
};
console.log("opening file " + file.name + ": " + file.size);
reader.readAsText(file);