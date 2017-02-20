var pokemonjsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/pokemon.j";
var typejsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/types.j";
var movesjsonurl = "https://raw.githubusercontent.com/KyleRosenberg/PokemonTeamBuilder/master/moves.j";
var TypeIndex = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"];

var pokemonjson;
var typejson;
var movejson;

var team = [];

function removeFromTeam(name){
	var index = -1;
	for (var i = 0; i<team.length; i++){
		if (team[i].name.toLowerCase() == name.toLowerCase()){
			index = i;
			break;
		}
	}
	if (index > -1){
		team.splice(index, 1);
   		for (var i = 0; i<6; i++){
   			$element = $('.team tr:eq(' + (i+1) + ') td:eq(0)');
   			if (i<team.length){
   				$element.html('<div class="content"><div class="ui mini image"><img style="max-width:100%" src=' + team[i].sprites.front_default + '></div><div class="title" style="text-align:center"><button class="ui button">' + team[i].species.name.charAt(0).toUpperCase() + team[i].species.name.slice(1) + '<i class="remove icon centered"></i></button></div></div>');
   				resist = getResistances(team[team.length-1]);
   				for (var j = 0; j<18; j++){
   					var t = TypeIndex[j].toLowerCase();
   					$number = $('.team tr:eq(' + (i+1) + ') td:eq(' + (j+1) + ')');
   					if (resist[t] == undefined){
   						$number.html(1);
   						$number.css('background-color', '#ffffff');
   					} else {
   						$number.html(resist[t]);
   						if (resist[t] == 4){
   							$number.css('background-color', '#ff0000'); 
   						} else if (resist[t] == 2){
   							$number.css('background-color', '#ff5959'); 
   						} else if (resist[t] == .5){
   							$number.css('background-color', '#009900'); 
   						} else if (resist[t] == .25){
   							$number.css('background-color', '#00cc00'); 
   						} else if (resist[t] == 0){
   							$number.css('background-color', '#00ff00'); 
   						}
   					}
   				}
   				$remove = $element.find('.ui.button');
   				$remove.on('click', function(event){
   					var data = event.target.innerHTML;
   					var name = data.substring(0, data.indexOf("<i class"));
		   			removeFromTeam(name);								
   				});
   			}else{
   				$element.html('Empty');
   				for (var j = 0; j<18; j++){
   					var t = TypeIndex[j].toLowerCase();
   					$number = $('.team tr:eq(' + (i+1) + ') td:eq(' + (j+1) + ')');
   					$number.html(0);
   					$number.css('background-color', '#ffffff');
   				}
   			}
   		}
   	}
}

function getType(name){
	for (var i = 0; i<typejson.length; i++){
		if (typejson[i].name.toLowerCase() == name.toLowerCase()){
			return typejson[i];
		}
	}
}

function getResistances(pokemon){
	types = [];
	for (var i = 0; i<pokemon.types.length; i++){
		types.push(getType(pokemon.types[i].type.name));
	}
	retdict={};
	types.forEach(function(t){
		add=[];
		relates = t.damage_relations;
		relates.no_damage_from.forEach(function(el){
			add.push(el.name);
		});
		add.forEach(function(ot){
			retdict[ot]=0;
		});
		add = [];
		relates.half_damage_from.forEach(function(el){
			add.push(el.name);
		});
		add.forEach(function(ot){
			if (retdict[ot]==undefined){
				retdict[ot] = .5;
			} else {
				retdict[ot] *= .5;
			}
		});
		add = [];
		relates.double_damage_from.forEach(function(el){
			add.push(el.name);
		});
		add.forEach(function(ot){
			if (retdict[ot]==undefined){
				retdict[ot] = 2;
			} else {
				retdict[ot] *= 2;
			}
		});
	});
	return retdict;
}

$.ajax({ 
	url: pokemonjsonurl, success: function(data) {
		pokemonjson = JSON.parse(data);
		$('.ui.dimmer').removeClass("active");
		var $pokemon = $(".pokemon .ui.search");

		$pokemon
			.search({
				searchFields : ['name'],
				source : pokemonjson,
				onResults: function(response){
        			$('.pokemon .ui.search div.results').removeClass('hidden').addClass('visible').addClass('transition');
					var html = '';
     				if(response!== undefined) {
        				$.each(response, function(index, result) {	
        					for (var i = 0; i<result.length; i++){
	        					r = result[i];
	        					var imagelink = r.sprites.front_default;
            					html  += '<a class="result"><div class="content">';
            					html += '<div class="ui fluid circular image" ><img src=' + imagelink + '></div>';
            					html += '<div class="title">' + r.species.name.charAt(0).toUpperCase() + r.species.name.slice(1) + '</div>';
            					html  += '' + '</div></a>';
            				}
        				});
        				$('.pokemon .ui.search div.results').html(html);
        				$('.pokemon .ui.search div.results').removeClass('hidden').addClass('visible').addClass('transition');
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
   					if (team.length < 6){
   					   	team.push(result);
   					   	$element = $('.team tr:eq(' + team.length + ') td:eq(0)');
   						$element.html('<div class="content"><div class="ui mini image" style="text-align:center"><img style="max-width:100%;display:block;margin:auto auto;" src=' + result.sprites.front_default + '></div><div class="title" style="text-align:center"><button class="ui button">' + result.species.name.charAt(0).toUpperCase() + result.species.name.slice(1) + '<i class="remove icon centered"></i></button></div></div>');
   						resist = getResistances(team[team.length-1]);
   						for (var i = 0; i<18; i++){
   							var t = TypeIndex[i].toLowerCase();
   							$number = $('.team tr:eq(' + team.length + ') td:eq(' + (i+1) + ')');
   							if (resist[t] == undefined){
   								$number.html(1);
   							} else {
   								$number.html(resist[t]);
   								if (resist[t] == 4){
   									$number.css('background-color', '#ff0000'); 
   								} else if (resist[t] == 2){
   									$number.css('background-color', '#ff5959'); 
   								} else if (resist[t] == .5){
   									$number.css('background-color', '#009900'); 
   								} else if (resist[t] == .25){
   									$number.css('background-color', '#00cc00'); 
   								} else if (resist[t] == 0){
   									$number.css('background-color', '#00ff00'); 
   								}
   							}
   						}
   						$remove = $element.find('.ui.button');
   						$remove.on('click', function(event){
   							var data = event.target.innerHTML;
   							var name = data.substring(0, data.indexOf("<i class"));
		   					removeFromTeam(name);								
   						});
   					}
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

