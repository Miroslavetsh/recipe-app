import { useEffect, useRef } from 'react'
import { EdamamLinkParamsTypes } from '../../App/App'

import useDebounce from '../../hooks/useDebounce'
import Container from '../Container/Container'
import Card from '../Card/Card'
import { RecipePropsTypes } from '../Recipe/Recipe'

import styles from './HomePage.module.scss'

type HomePagePropsTypes = {
  edamamLinkParams: EdamamLinkParamsTypes
  setEdamamLinkParams: (params: EdamamLinkParamsTypes) => void
  recipes: Array<RecipePropsTypes>
  getRecipes: (url: EdamamLinkParamsTypes) => void
}

const HomePage: React.FC<HomePagePropsTypes> = (props) => {
  const { edamamLinkParams, setEdamamLinkParams, recipes, getRecipes } = props
  const searchRef = useRef(null)

  const debouncedEdamamParams = useDebounce<EdamamLinkParamsTypes>(
    edamamLinkParams,
    500
  )

  useEffect(() => {
    getRecipes(debouncedEdamamParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEdamamParams])

  type InputValidatorPropsTypes = {
    len: number
    className?: string
  }

  const InputValidator: React.FC<InputValidatorPropsTypes> = (props) => {
    const { len, className } = props
    let message = ''
    try {
      const searchInput = searchRef.current as unknown as HTMLInputElement

      if (len === 0 && searchInput.value.length === 0)
        message = 'There are no words entered to the input :('
      else if (len === 0 && searchInput.value.length !== 0)
        message =
          'It seems like your entered word is not an ingredient. Try again :)'
    } catch {}
    return <p className={className}>{message}</p>
  }

  InputValidator.defaultProps = {
    className: '',
  }

  type SortingParameter = {
    title: string
    callback: Function
  }

  const sortingParameters: Array<SortingParameter> = [
    {
      title: 'A - Z',
      callback: () => {},
    },
    {
      title: 'Z - A',
      callback: () => {},
    },
    {
      title: 'Less categories',
      callback: () => {},
    },
    {
      title: 'Fastest',
      callback: () => {},
    },
    {
      title: 'Chipper(less ingredients)',
      callback: () => {},
    },
    {
      title: 'Laziest (less ingredients and less time)',
      callback: () => {},
    },
  ]

  return (
    <div className={styles.page}>
      {/* TODO Sorting Features */}
      <aside className={styles.sorting}>
        <h2 className={styles.title}>Sorting</h2>
        <div className={styles.table}>
          {sortingParameters.map((parameter) => (
            <p
              className={styles.parameter}
              onClick={() => {
                parameter.callback()
              }}>
              {parameter.title}
            </p>
          ))}
        </div>
      </aside>

      <main className={styles.main}>
        <Container>
          <h1 className={styles.title}>Welcome To Application</h1>

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
          <h2 className={styles.title}>Results</h2>

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
            <InputValidator className={styles.validator} len={recipes.length} />
          </div>
        </Container>
        <Container>
          <h2 className={styles.title}>Pagination</h2>
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
    </div>
  )
}

export default HomePage
