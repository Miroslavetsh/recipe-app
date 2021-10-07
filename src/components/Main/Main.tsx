import { useEffect, useRef } from 'react'

import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import { useErrorContext } from '../../context'
import RecipeSchema from '../../schema/Recipe'

import { EdamamLinkParamsTypes } from '../../App/App'
import Card from '../Card/Card'
import Container from '../Container/Container'
import InputValidator from '../InputValidator/InputValidator'

import styles from './Main.module.scss'

type MainPropsTypes = {
  searchRef: any
  edamamLinkParams: EdamamLinkParamsTypes
  debouncedEdamamParams: EdamamLinkParamsTypes
  setEdamamLinkParams: (params: EdamamLinkParamsTypes) => void
  recipes: Array<RecipeSchema>
  getRecipes: (url: EdamamLinkParamsTypes) => void
}

const Main: React.FC<MainPropsTypes> = (props) => {
  const {
    searchRef,
    setEdamamLinkParams,
    debouncedEdamamParams,
    edamamLinkParams,
    getRecipes,
    recipes,
  } = props

  const recipesRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(recipesRef, {})
  const isVisible = !!entry?.isIntersecting
  const { errorMessage } = useErrorContext()

  useEffect(() => {
    if (isVisible === true) {
      setEdamamLinkParams({
        ...edamamLinkParams,
        to: edamamLinkParams.to + 12,
      })
      getRecipes(edamamLinkParams)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  const titleClassNames = ['title', styles.title]
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Container>
          <h1 className={titleClassNames.join(' ')}>Welcome To Application</h1>

          <input
            ref={searchRef}
            className={styles.input}
            type='text'
            onChange={() => {
              const input = searchRef.current as unknown as HTMLInputElement
              setEdamamLinkParams({ ...edamamLinkParams, q: input.value })
            }}
            onKeyUp={(event) => {
              const input = searchRef.current as unknown as HTMLInputElement

              if (event.key === 'Enter' && edamamLinkParams.q !== input.value) {
                getRecipes(debouncedEdamamParams)
              }
            }}
            placeholder='Enter whatever product, with which You want the recipe 😋'
          />
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <h2 className={titleClassNames.join(' ')}>Results</h2>

          <div className={styles.recipes}>
            {recipes.length !== 0 &&
              recipes.map((recipe, idx) => {
                const recipeID = recipe.recipe.uri.split('#')[1]

                return (
                  <Card
                    route={`/recipes/${recipeID}`}
                    title={recipe.recipe.label}
                    textForNumber={'Calories: '}
                    num={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    key={idx}
                    className={styles.card}
                  />
                )
              })}
            <InputValidator
              className={styles.validator}
              len={recipes.length}
              searchRef={searchRef}
              message={errorMessage}
            />
          </div>
          <div
            style={{ height: 20 }}
            ref={recipesRef}
            className='observe'></div>
        </Container>
      </section>
    </main>
  )
}

export default Main
