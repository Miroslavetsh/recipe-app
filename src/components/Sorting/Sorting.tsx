import { useState } from 'react'
import RecipeSchema from '../../schema/Recipe'
import styles from './Sorting.module.scss'

type SortingParameter = {
  id: number
  title: string
  callback: Function
}

type SortingPropsTypes = {
  recipes: Array<RecipeSchema>
  setRecipes: (recipes: RecipeSchema[]) => void
}

const Sorting: React.FC<SortingPropsTypes> = (props) => {
  const { recipes, setRecipes } = props
  const [sorting, setSorting] = useState<number | null>()
  const sortingParameters: Array<SortingParameter> = [
    {
      id: 0,
      title: 'A - Z',
      callback: () => {
        const newRecipes = [...recipes].sort((a, b) => {
          return a.recipe.label < b.recipe.label ? -1 : 1
        })

        setRecipes(newRecipes)
      },
    },
    {
      id: 1,
      title: 'Z - A',
      callback: () => {
        const newRecipes = [...recipes].sort((a, b) => {
          return a.recipe.label < b.recipe.label ? -1 : 1
        })

        setRecipes(newRecipes.reverse())
      },
    },
    {
      id: 2,
      title: 'Less calories',
      callback: () => {
        const newRecipes = [...recipes].sort((a, b) => {
          return a.recipe.calories - b.recipe.calories
        })

        setRecipes(newRecipes)
      },
    },
    {
      id: 3,
      title: 'Fastest',
      callback: () => {
        const newRecipes = [...recipes].sort((a, b) => {
          return a.recipe.totalTime - b.recipe.totalTime
        })

        setRecipes(newRecipes)
      },
    },
    {
      id: 4,
      title: 'Chipper(less ingredients)',
      callback: () => {
        const newRecipes = [...recipes].sort((a, b) => {
          return a.recipe.ingredients.length - b.recipe.ingredients.length
        })

        setRecipes(newRecipes)
      },
    },
  ]

  const titleClassNames = ['title', styles.title]

  return (
    <aside className={styles.sorting}>
      <h2 className={titleClassNames.join(' ')}>Sorting</h2>
      <div className={styles.table}>
        {sortingParameters.map((parameter, idx) => (
          <p
            className={[
              styles.parameter,
              sorting === idx ? styles._active : '',
            ].join(' ')}
            key={idx}
            onClick={() => {
              setSorting(idx)
              parameter.callback()
            }}>
            {parameter.title}
          </p>
        ))}
      </div>
    </aside>
  )
}

export default Sorting
