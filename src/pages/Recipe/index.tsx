import { useParams } from 'react-router'
import Card from '../../components/Card/Card'
import { IngredientPropsTypes } from '../../components/Ingredient/Ingredient'

import styles from './Styles.module.scss'

export interface RecipeSchema {
  recipe: {
    label: string
    calories: number
    image: string
    mealType: Array<string>
    totalTime: number
    healthLabels: Array<string>
    ingredients: Array<IngredientPropsTypes>
    uri: string
  }
}

export type RecipePagePropsTypes = {
  recipes: Array<RecipeSchema>
}

type Params = {
  recipeID: string
}

const Recipe: React.FC<RecipePagePropsTypes> = (props) => {
  const { recipeID }: Params = useParams()
  const { recipes } = props
  const recipe = recipes.find(
    (recipe) => recipe.recipe.uri.indexOf(recipeID) !== -1
  )

  const {
    label,
    calories,
    image,
    mealType,
    totalTime,
    healthLabels,
    ingredients,
    uri,
  } = recipe?.recipe || {}

  // TODO ingredient page

  return (
    <div className={styles.recipe}>
      <h1>Recipe Page</h1>
      <p>{uri}</p>
      <p>{label}</p>
      <p>{calories?.toFixed(2)}</p>
      <img src={image} alt={image} />
      <p>{totalTime}</p>
      <p>{mealType}</p>
      <p>{healthLabels} lbls</p>
      <div className={styles.ingerdients}>
        {ingredients?.map((ingredient: IngredientPropsTypes, idx: number) => (
          <Card
            route={'/'}
            title={ingredient.food}
            num={ingredient.weight}
            image={ingredient.image}
            textForNumber={'Weight: '}
            key={idx}
          />
        ))}
      </div>
    </div>
  )
}

export default Recipe
