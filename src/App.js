import { useState, useEffect } from 'react';
import './App.css';
import Silueta from './components/images/pokemon-silueta.png'


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
      console.log(json)
      let poke = { 
        id: json.id,
        name: json.name, 
        avatar_front: json.sprites.front_default,
        avatar_back: json.sprites.back_default,
        stats:json.stats,
      }

      setPokemon(poke)
      console.log(poke)
  })} 
  
  // let stats = typeof pokemon !== null && pokemon.stats.map((el)=>console.log(el.stat.name, el.base_stat))
  // console.log(stats)


  useEffect(() => {
      mostrarPokemons()
  }, [busqueda] )
  
  console.log(busqueda)

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
            
              {/* <table class="default">

                  <tr>
                    <td>Celda 1</td>
                    <td>Celda 2</td>
                  </tr>
                  
                  <tr>
                    <td>Celda 5</td>
                    <td>Celda 6</td>
                  </tr>

                  <tr>
                    <td>Celda 5</td>
                    <td>Celda 6</td>
                  </tr>

                  <tr>
                    <td>Celda 5</td>
                    <td>Celda 6</td>
                  </tr>

              </table> */}

          </div>

        </div>

    </div>
  );
}

export default App;
