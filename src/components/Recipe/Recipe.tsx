import styles from './Recipe.module.scss'

// type Ingredient = {}

export type RecipePropsTypes = {
  recipe: {
    calories: number
    image: string
    mealType: Array<string>
    totalTime: number
    healthLabels: Array<string>
    // ingredients: Array<Ingredient>
  }
}

const Recipe: React.FC<RecipePropsTypes> = (props) => {
  const { calories, image, mealType, totalTime, healthLabels } = props.recipe

  return (
    <div className={styles.recipe}>
      {Object.keys(props).map((key) => key)}
      {}
      calories: {calories}
      <img src={image} alt={image} />
      time: {totalTime}
      meal type: {mealType}
      meal type: {healthLabels}
      {/* ingredients: {ingredients.map((ingredient: any) => ingredient)} */}
    </div>
  )
}

export default Recipe
