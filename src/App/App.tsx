import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import Recipe from '../components/Recipe/Recipe'
import styles from './App.module.scss'

type EdamamLinkParamsTypes = {
  from: number
  to: number
  q: string
}

const App = () => {
  const APP_ID = process.env.REACT_APP_EDAMAM_APPLICATION_ID
  const APP_KEY = process.env.REACT_APP_EDAMAM_APPLICATION_KEY
  const [edamamLinkParams, setEdamamLinkParams] =
    useState<EdamamLinkParamsTypes>({
      from: 0,
      to: 10,
      q: 'chicken',
    })

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes(edamamLinkParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edamamLinkParams])

  const getRecipes = async (edamamLinkParams: EdamamLinkParamsTypes) => {
    try {
      const { from, to, q } = edamamLinkParams
      const edamamLink = `https://api.edamam.com/search?q=${q}&from=${from}&to=${to}&app_id=${APP_ID}&app_key=${APP_KEY}`
      const response: Response = await fetch(edamamLink)
      const data = await response.json()
      setRecipes(data.hits)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <h1 className={styles.title}>Recipe Application</h1>

        <form className={styles.form}>
          <input className={styles.input} type='text' />
          <button
            onClick={(e: React.FormEvent) => {
              e.preventDefault()
              getRecipes(edamamLinkParams)
            }}
            className={styles.button}></button>
        </form>
      </Container>
      <Container>
        Filter: {edamamLinkParams.from}
        <button
          onClick={() => {
            setEdamamLinkParams({ q: 'beetroot', from: 10, to: 20 })
          }}></button>
      </Container>
      <Container>
        {recipes.map((recipe, idx) => (
          <Recipe {...recipe} key={idx} />
        ))}
      </Container>
    </div>
  )
}

export default App
