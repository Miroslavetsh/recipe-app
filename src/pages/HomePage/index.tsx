import { useEffect, useRef } from 'react'
import { EdamamLinkParamsTypes } from '../../App/App'

import useDebounce from '../../hooks/useDebounce'
import { RecipePropsTypes } from '../../components/Recipe/Recipe'
import Sorting from '../../components/Sorting/Sorting'
import Main from '../../components/Main/Main'

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

  return (
    <div className={styles.page}>
      <Sorting />
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

export default HomePage
