//obj initialized to cache needed api data
var pokemon = {
}

//adds keys and values of a type of pokemon to the pokemon object
function populatePokemonObj(res) {
    pokemon[res['id']] = {
        'id': res['id'],
        'name': res['name'],
        'image': res['sprites']['front_default'],
        'height': res['height'],
        'weight': res['weight'],
        'types': []
    };
    for (var j = 0; j < res['types'].length; j++) {
        pokemon[res['id']]['types'][j] = res['types'][j]['type']['name'];
    }
}

//returns a string literal template of the uri of the pokemons image
function populatePokemonImages(poke) {
    console.log(poke);
    return `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke['id']}.png" alt="${poke['name']}" id="${poke['id']}">`;
}

//returns a string literal template of the html that creates the description in the right panel
function populatePokemonDescription(poke) {
    var str = `<div class="top"><h3>${poke['name']}</h3><img src="${poke['image']}" alt="${poke['name']}" id="${poke['id']}"></div><h1>Types</h1><ul>`
    for (var i = 0; i < poke['types'].length; i++) {
        str += `<li>${poke['types'][i]}</li>`
    }
    str += `</ul>
    <h1>Height</h1>
    <p>${poke['height']}</p>
    <h1>Weight</h1>
    <p>${poke['weight']}</p>`
    return str;
}

//attaches the .click handler to the last img tag created and provides the action of populating the description once clicked
function pokemonHandler() {
    $('img:last-child').click(function () {
        var poke = pokemon[$(this).attr('id')];
        $('#description').html(populatePokemonDescription(poke));
    });
}


$(document).ready(function () {

    //gets the data through ajax from the api
    for (var i = 1; i < 152; i++) {
        console.log('pending...');
        $.get(`https://pokeapi.co/api/v2/pokemon/3/`, function (res) {
            populatePokemonObj(res);
            console.log(pokemon[Object.keys(pokemon)[1]]);
            $('#selector').append(populatePokemonImages(pokemon[Object.keys(pokemon)[1]]));
            pokemonHandler();
        }, 'json').fail(function(){
            console.log('failed to recieve json at: ' + i);
        }).then(function(){
            
        });
    }
});
