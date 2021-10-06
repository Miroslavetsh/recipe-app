import Card from '../Card/Card'
import { IngredientPropsTypes } from '../Ingredient/Ingredient'
import styles from './Recipe.module.scss'

export type RecipePropsTypes = {
  recipe: {
    label: string
    calories: number
    image: string
    mealType: Array<string>
    totalTime: number
    healthLabels: Array<string>
    ingredients: Array<IngredientPropsTypes>
  }
}

const Recipe: React.FC<RecipePropsTypes> = (props) => {
  const {
    label,
    calories,
    image,
    mealType,
    totalTime,
    healthLabels,
    ingredients,
  } = props.recipe

  return (
    <div className={styles.recipe}>
      <p>{label}</p>
      <p>{calories.toFixed(2)}</p>
      <img src={image} alt={image} />
      <p>{totalTime}</p>
      <p>{mealType}</p>
      <p>{healthLabels} lbls</p>
      <div className={styles.ingerdients}>
        {ingredients.map((ingredient: IngredientPropsTypes, idx) => (
          <Card
            title={ingredient.food}
            num={ingredient.weight}
            image={ingredient.image}
            key={idx}
            textForNumber={'Weight: '}
          />
        ))}
      </div>
    </div>
  )
}

export default Recipe
