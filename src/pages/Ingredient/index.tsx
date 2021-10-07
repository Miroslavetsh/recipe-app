import IngredientSchema from '../../schema/Ingredient'
import styles from './Styles.module.scss'

const Ingredient: React.FC<IngredientSchema> = (props) => {
  const { food, foodCategory, image, measure, quantity, text, weight, foodId } =
    props

  return (
    <div className={styles.page}>
      <p>Ingredient Page</p>
      <p>{foodId}</p>
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
