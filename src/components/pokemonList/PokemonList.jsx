import React, { useDebugValue, useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../pokemon/Pokemon'

function PokemonList() {

    // NORMAL USE STATE
    // const [pokemonList,setPokemonList] = useState([])
    // const [isLoading,setisLoading] = useState(true)
    // const [nextUrl,setNextUrl] = useState('')
    // const [prevUrl,setPrevUrl] = useState('')
    // const [pokedexUrl,setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')


    // ADVANCE USE STATE
    const [pokemonListState,setPokemonListState] = useState({
        pokemonList : [] ,
        isLoading: true,
        nextUrl : '' ,
        prevUrl: '' ,
        pokedexUrl : 'https://pokeapi.co/api/v2/pokemon'
    })

    async function downloadPokemons(){
        // setisLoading(true)
        setPokemonListState((prevState)=>( {...prevState,isLoading : true}))
        

        // const response = await axios.get(pokedexUrl)
        const response = await axios.get(pokemonListState.pokedexUrl)
       
        const pokemonResultArray = response.data.results

        // setNextUrl(response.data.next)
        // setPrevUrl(response.data.previous)

        setPokemonListState((prevState) => ({
                ...prevState,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
        }))

       
        const pokemonResultPromise = pokemonResultArray.map((item)=> axios.get(item.url))
        
        const pokemonData = await axios.all(pokemonResultPromise)

        

        const eachPokemonArray = pokemonData.map((item)=>{
            const pokemon = item.data 
      
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        })

        // console.log(eachPokemonArray);

        // setPokemonList(eachPokemonArray)
        // setisLoading(false)
        setPokemonListState((prevState) => ({
            ...prevState,
            pokemonList : eachPokemonArray ,
            isLoading : false
        }))

    }

    useEffect(()=>{
        downloadPokemons()
    },[pokemonListState.pokedexUrl])

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-row flex-wrap justify-evenly'>
            {
                pokemonListState.isLoading ? 
                    'loading data': 
                    pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} key={p.id} image={p.image} id={p.id} />)

            }
        </div> 
        <div className='mt-11 mb-8 flex gap-5'>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // onClick={()=> setpokedexUrl(prevUrl)}
                onClick={()=> setPokemonListState((prevState)=>({...prevState,pokedexUrl: pokemonListState.prevUrl}))}

                disabled={pokemonListState.prevUrl == null }
            >
                Previous
            </button>

            <button 
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // onClick={() => setpokedexUrl(nextUrl)}
                onClick={()=> setPokemonListState((prevState) =>  ({...prevState,pokedexUrl: pokemonListState.nextUrl})) }

                disabled={pokemonListState.nextUrl == null }
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default PokemonList
