import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [pokemon, setPokemon] = useState( {} )
  const [busqueda, setbusqueda] = useState(null)
  
  // function HandleBlur (e) {
  //     setbusqueda(e.target.value)
  //     busqueda && mostrarPokemons(busqueda)
  //   }

  function HandleClick (e) {
      // setbusqueda(e.target.value)
      setbusqueda(document.getElementById('search').value)
      busqueda && mostrarPokemons(busqueda)
    }
    

  const mostrarPokemons = (nombre='charmander')=>{
    let pokemon = nombre.toLowerCase().trim()
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(res => res.json())
    .then(json => {
      let poke = { 
        id: json.id,
        name: json.name, 
        avatar_front: json.sprites.front_default,
        avatar_back: json.sprites.back_default,
        stats:json.stats,
      }

      setPokemon(poke)
  })} 
  

  useEffect(() => {
      mostrarPokemons()
  }, [busqueda] )
  
  // console.log(busqueda)
  console.log(pokemon)
  // console.log(Object.entries(pokemon).length)

  // if(Object.entries(pokemon) >1 ) console.log(pokemon)


  let array = [1,2,3,4]
  // console.log(array)

  return (
    <div className="App">
        <h1>Pokédex</h1>

        <div className='pokedex-container'>

          <div className='pokedex-front'>
            <div className='img-container'>
              <img src={ pokemon.avatar_front} alt={pokemon.name} />
              <input type="text"  placeholder='...Busca un pokemon' autoComplete='off' name='search'  id='search' />
              <input type="button" value='buscar' onClick={HandleClick} />
            </div>
          </div>


          <div className='pokedex-back'> 
              <table>
                <tbody>
                {
                  Object.entries(pokemon).length > 1 && pokemon.stats.map((el, index)=>(
                    <tr key={index}>
                      <th>{el.stat.name}</th>
                      <td>{el.base_stat}</td>
                  </tr>
                  ))
                }
              </tbody>

              </table>

          </div>

        </div>

    </div>
  );
}

export default App;
