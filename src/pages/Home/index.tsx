import { useEffect, useRef } from 'react'
import { EdamamLinkParamsTypes } from '../../App/App'

import useDebounce from '../../hooks/useDebounce'
import RecipeSchema from '../../models/Recipe'
import Sorting from '../../components/Sorting/Sorting'
import Main from '../../components/Main/Main'

import styles from './Styles.module.scss'

type HomePropsTypes = {
  edamamLinkParams: EdamamLinkParamsTypes
  setEdamamLinkParams: (params: EdamamLinkParamsTypes) => void
  recipes: Array<RecipeSchema>
  getRecipes: (url: EdamamLinkParamsTypes) => void
  setRecipes: (recipes: Array<RecipeSchema>) => void
  errorMessage?: string
}

const Home: React.FC<HomePropsTypes> = (props) => {
  const {
    edamamLinkParams,
    setEdamamLinkParams,
    recipes,
    getRecipes,
    setRecipes,
  } = props
  const searchRef = useRef(null)

  const debouncedEdamamParams = useDebounce<EdamamLinkParamsTypes>(
    edamamLinkParams,
    500
  )

  useEffect(() => {
    getRecipes(debouncedEdamamParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEdamamParams])

  return (
    <div className={styles.page}>
      <Sorting recipes={recipes} setRecipes={setRecipes} />
      <Main
        setEdamamLinkParams={setEdamamLinkParams}
        recipes={recipes}
        searchRef={searchRef}
        edamamLinkParams={edamamLinkParams}
        debouncedEdamamParams={debouncedEdamamParams}
        getRecipes={getRecipes}
      />
    </div>
  )
}

Home.defaultProps = {
  errorMessage: '',
}

export default Home
