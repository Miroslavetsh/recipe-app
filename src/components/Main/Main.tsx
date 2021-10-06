import { EdamamLinkParamsTypes } from '../../App/App'
import Card from '../Card/Card'
import Container from '../Container/Container'
import InputValidator from '../InputValidator/InputValidator'
import { RecipePropsTypes } from '../Recipe/Recipe'

import styles from './Main.module.scss'

type MainPropsTypes = {
  searchRef: any
  edamamLinkParams: EdamamLinkParamsTypes
  debouncedEdamamParams: EdamamLinkParamsTypes
  setEdamamLinkParams: (params: EdamamLinkParamsTypes) => void
  recipes: Array<RecipePropsTypes>
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

  const titleClassNames = ['title', styles.title]

  return (
    <main className={styles.main}>
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

      {/* Result */}
      <Container>
        <h2 className={titleClassNames.join(' ')}>Results</h2>

        <div className={styles.recipes}>
          {recipes.length !== 0 &&
            recipes.map((recipe, idx) => (
              <Card
                title={recipe.recipe.label}
                num={recipe.recipe.calories}
                image={recipe.recipe.image}
                key={idx}
                className={styles.card}
                textForNumber={'Calories: '}
              />
            ))}
          <InputValidator
            className={styles.validator}
            len={recipes.length}
            searchRef={searchRef}
          />
        </div>
      </Container>
      <Container>
        <h2 className={titleClassNames.join(' ')}>Pagination</h2>
        <div className={styles.pagination}>
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
        </div>
      </Container>
    </main>
  )
}

export default Main
