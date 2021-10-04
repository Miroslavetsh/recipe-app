import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container/Container'
import Card from '../components/Card/Card'
import useDebounce from '../hooks/useDebounce'

import styles from './App.module.scss'
import { RecipePropsTypes } from '../components/Recipe/Recipe'

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
      q: 'pizza',
    })
  const dobouncedEdamamParams = useDebounce<EdamamLinkParamsTypes>(
    edamamLinkParams,
    500
  )
  const [recipes, setRecipes] = useState<RecipePropsTypes[]>([])
  const searchRef = useRef(null)

  useEffect(() => {
    getRecipes(dobouncedEdamamParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dobouncedEdamamParams])

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

        <input
          ref={searchRef}
          className={styles.input}
          type='text'
          onChange={() => {
            const input = searchRef.current as unknown as HTMLInputElement
            setEdamamLinkParams({ ...edamamLinkParams, q: input.value })
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              getRecipes(dobouncedEdamamParams)
            }
          }}
        />
      </Container>

      {/* TODO Sorting Features */}
      <Container>
        <h2 className={styles.title}>Sorting</h2>
        <div className={styles.sorting}>
          <p>A - Z</p>
          <p>Z - A</p>
          <p>More/Less caloriable</p>
          <p>Fastest</p>
          <p>Chip(less ingredients)</p>
          <p>Laziest (less ingredients and less time)</p>
        </div>
      </Container>

      {/* Result */}
      <Container>
        <h2 className={styles.title}>Results</h2>

        {recipes.map((recipe, idx) => (
          <Card
            title={recipe.recipe.label}
            num={recipe.recipe.calories}
            image={recipe.recipe.image}
            key={idx}
          />
        ))}
      </Container>

      <Container>
        <h2 className={styles.title}>Pagination</h2>
        {() => {
          const { from, to } = edamamLinkParams
          const buttons = ['Prev', 'Next']

          return buttons.map((btnText) => (
            <button
              onClick={() => {
                setEdamamLinkParams({
                  ...edamamLinkParams,
                  from,
                  to,
                })
              }}>
              {btnText}
            </button>
          ))
        }}
      </Container>
    </div>
  )
}

export default App
