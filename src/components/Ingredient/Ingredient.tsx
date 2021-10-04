import styles from './Ingredient.module.scss'

export type IngredientPropsTypes = {
  food: string
  foodCategory: string
  image: string
  measure: string
  quantity: number
  text: string
  weight: number
}

const Ingredient: React.FC<IngredientPropsTypes> = (props) => {
  const { food, foodCategory, image, measure, quantity, text, weight } = props

  return (
    <div className={styles.ingredient}>
      <p>{food}</p>
      <p>{foodCategory}</p>
      <img src={image} alt={image} />
      <p>{measure}</p>
      <p>{quantity}</p>
      <p>{text}</p>
      <p>{weight}</p>
    </div>
  )
}

export default Ingredient
