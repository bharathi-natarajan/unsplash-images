import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const apiKey = import.meta.env.VITE_API_KEY

const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}`

const Gallery = () => {
  const { search } = useGlobalContext()

  const response = useQuery({
    queryKey: ['images', search],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${search}`)
      return result.data
    },
  })

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There is an error fetching images...</h4>
      </section>
    )
  }

  const results = response.data.results

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>Match not found...</h4>
      </section>
    )
  }

  return (
    <section className="image-container">
      {results.map((image) => {
        const { id, alt_description } = image
        const img = image?.urls?.regular
        return <img src={img} alt={alt_description} key={id} className="img" />
      })}
    </section>
  )
}
export default Gallery
