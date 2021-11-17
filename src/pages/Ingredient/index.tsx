import { useParams } from 'react-router'
import BackButton from '../../components/BackButton/BackButton'
import Container from '../../components/Container/Container'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import { IngredientSerializedSchema } from '../../models/Ingredient'

import styles from './Styles.module.scss'

const Ingredient: React.FC = () => {
  const params = useParams<IngredientSerializedSchema>()

  const {
    foodIdURI,
    foodURI,
    foodCategoryURI,
    imageURI,
    measureURI,
    quantityURI,
    textURI,
    weightURI,
  } = params

  const food = decodeURIComponent(foodURI || '')
  const foodCategory = decodeURIComponent(foodCategoryURI || '')
  const image = decodeURIComponent(imageURI || '')
  const measure = decodeURIComponent(measureURI || '')
  const quantity = decodeURIComponent(quantityURI || '')
  const text = decodeURIComponent(textURI || '')
  const weight = decodeURIComponent(weightURI || '')
  const foodId = decodeURIComponent(foodIdURI || '')

  if (typeof foodId !== 'string') {
    return (
      <ErrorLabel message='Ingredients is unavailiable. <br /> Go Home and Load at least one recipe...' />
    )
  }

  return (
    <div className={styles.page}>
      <BackButton />

      <Container>
        <p>Ingredient Page</p>
        <p>{food}</p>
        <p>{foodCategory}</p>
        <img src={image} alt={image} />
        <p>{measure.replace('null', 'no measure')}</p>
        <p>{quantity}</p>
        <p>{text}</p>
        <p>{weight}</p>
      </Container>
    </div>
  )
}

export default Ingredient
