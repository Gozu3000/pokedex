import { useState, useEffect } from 'react';
import './normalize.css';
import './App.css';


function App() {

  const [pokemon, setPokemon] = useState( {} )
  const [busqueda, setbusqueda] = useState(null)
  
  let variable 

  function HandleChange () {
    setbusqueda(document.getElementById('search').value)
  }


  function HandleClick () {
      setbusqueda(document.getElementById('search').value)
      busqueda && mostrarPokemons(busqueda)
      console.log(busqueda)
    }

  const mostrarPokemons = (nombre='arcanine')=>{
    let pokemon = nombre.toLowerCase().trim()
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(res => res.json())
    .then(json => {
      let poke = { 
        id: json.id,
        name: json.name, 
        avatar_front: json.sprites.other.dream_world.front_default,
        avatar_back: json.sprites.back_default,
        stats:json.stats,
      }

      setPokemon(poke)
  })} 
  

  useEffect(() => {
      mostrarPokemons()
  }, [] )

  return (
    <div className="App">
        <h1>Pokédex</h1>

        <div className='pokedex-container'>

          <div className='pokedex-front'>
            <div className='img-container'>
              <img src={ pokemon.avatar_front || 'https://i.pinimg.com/736x/9d/dd/1f/9ddd1f367e36919648741d77c86e75d0.jpg'} alt={pokemon.name} />
              <input type="text"  placeholder='...Busca un pokemon' autoComplete='off' name='search'  id='search' onChange={HandleChange} />
              <input type="button" value='Buscar' onClick={HandleClick}/>
            </div>
          </div>

          <div className='pokedex-back'> 
              <table>
                <tr>
                  <th colSpan={2} style={{height:'20px',textAlign:'center',textTransform:'capitalize'}}>{pokemon.name}</th>
                </tr>
                <tbody>
                {
                  Object.entries(pokemon).length > 1 && pokemon.stats.map((el, index)=>(
                    <tr key={index}>
                      <th>{el.stat.name}</th>
                      <td>{el.base_stat || '????'}</td>
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
