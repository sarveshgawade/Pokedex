import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PokemonDetails() {
    const {id} = useParams()
    const [pokemon,setPokemon] = useState({})
    const [isLoading,setIsLoading] = useState(true)

    async function downloadPokemons() {
        
        setIsLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data);
        setPokemon({
            name : response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            type: response.data.types.map((t)=> t.type.name)
        })
        setIsLoading(false)
    }

    useEffect(()=>{
        downloadPokemons()
    },[])

  return (
    <div className='flex justify-center'>
        {
            isLoading ?
            
                <div className='text-center mt-72'>LOADING DATA ... </div>
            : 

                <div className='mt-24 flex flex-col justify-center items-center'> 
                        
                        <img 
                            src={pokemon.image} alt="pokemon-image" 
                            className='mb-10 h-64'
                        />
                        <div>
                            <div className='text-2xl mb-3'>Name: {pokemon.name}</div>
                            <div className='text-2xl mb-3'>Height: {pokemon.height}</div>
                            <div  className='text-2xl mb-6'>Weight: {pokemon.weight}</div>
                            <div  className='text-2xl mb-24 flex gap-10'>
                                Type : 
                                {   
                                    pokemon.type && pokemon.type.map((p )=>  <span  className='inline-block bg-blue-500  text-white font-bold py-2 px-4 rounded-full ' key={p}>{p}</span>  )
                                }
                            </div>
                        </div>
                </div>

            
        }
    </div>
  )
}

export default PokemonDetails
