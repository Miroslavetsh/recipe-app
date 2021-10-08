import Container from '../../components/Container/Container'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import IngredientSchema from '../../schema/Ingredient'

import styles from './Styles.module.scss'

const Ingredient: React.FC<IngredientSchema> = (props) => {
  if (typeof props === 'undefined') {
    return (
      <ErrorLabel message='This page  is developing. <br /> No ingredients, sorry...' />
    )
  }

  const { food, foodCategory, image, measure, quantity, text, weight, foodId } =
    props

  return (
    <div className={styles.page}>
      <Container>
        <p>Ingredient Page</p>
        <p>{foodId}</p>
        <p>{food}</p>
        <p>{foodCategory}</p>
        <img src={image} alt={image} />
        <p>{measure}</p>
        <p>{quantity}</p>
        <p>{text}</p>
        <p>{weight}</p>
      </Container>
    </div>
  )
}

export default Ingredient
