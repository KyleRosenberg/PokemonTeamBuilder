var pokemonjsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/pokemon.j";
var typejsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/types.j";
var movesjsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/moves.j";

var pokemonjson;
var typejson;
var movejson;

$.ajax({ 
	url: pokemonjsonurl, success: function(data) {
		pokemonjson = JSON.parse(data);
		var $pokemon = $(".ui.search");

		$pokemon
			.search({
				searchFields : ['name'],
				source : pokemonjson,
				onResults: function(response){
					var html = '';
     				if(response!== undefined) {
        				$.each(response, function(index, result) {	
        					for (var i = 0; i<result.length; i++){
	        					r = result[i];
	        					var imagelink = r.sprites.front_default;
            					html  += '<a class="result"><div class="content">';
            					html += '<div class="ui fluid circular image" ><img src=' + imagelink + '></div>';
            					html += '<div class="title">' + r.name.charAt(0).toUpperCase() + r.name.slice(1) + '</div>';
            					html  += '' + '</div></a>';
            				}
        				});
        				$('.ui.search div.results').html(html);
        				$('.ui.search div.results').addClass('visible').addClass('transition').removeClass('hidden');
        				return true;
     				}
      				return false;
    			},
    			onResultsAdd: function(html){
        			if($('div.results a').length==0){
            			return "default";
       				}
        			else return false;
   				},
   				onSelect: function(result, response){
   					console.log(result);
   					return false;
   				}
		});
	} 
});

$.ajax({ 
	url: typejsonurl, success: function(data) {
		typejson = JSON.parse(data);
	} 
});

$.ajax({ 
	url: movesjsonurl, success: function(data) {
		movejson = JSON.parse(data);
	} 
});

