import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.prev)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()

  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

    function goToPrevPage() {
      setCurrentPageUrl(prevPageUrl)
    }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      /> 
    </>
  );
}

export default App;
