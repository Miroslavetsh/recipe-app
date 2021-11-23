import { useEffect } from 'react'
import { useParams } from 'react-router'

import { EdamamLinkParamsTypes } from '../../App/App'
import BackButton from '../../components/BackButton/BackButton'
import Card from '../../components/Card/Card'
import Container from '../../components/Container/Container'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import IngredientSchema from '../../models/Ingredient'
import RecipeSchema from '../../models/Recipe'

import styles from './Styles.module.scss'

export type RecipePagePropsTypes = {
  recipes: Array<RecipeSchema>
  edamamLinkParams: EdamamLinkParamsTypes
  getRecipes: (url: EdamamLinkParamsTypes) => void
}

type Params = {
  recipeId: string
}

const Recipe: React.FC<RecipePagePropsTypes> = (props) => {
  const { recipeId }: Params = useParams<Params>()
  const { recipes, getRecipes, edamamLinkParams } = props
  const recipe = recipes.find(
    (recipe) => recipe.recipe.uri.indexOf(recipeId) !== -1
  )

  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes(edamamLinkParams)
    }
  })

  if (typeof recipe === 'undefined') {
    return (
      <ErrorLabel message='There are no recipes :( <br /> So, you can back home and load at least one' />
    )
  }

  const {
    label,
    calories,
    image,
    mealType,
    totalTime,
    healthLabels,
    ingredients,
  } = recipe.recipe

  let caloriesInterval = setTimeout(() => {
    clearTimeout(caloriesInterval)
  }, 34)

  return (
    <div className={styles.page}>
      <BackButton className={styles.back} />

      <div
        className={styles.cover}
        style={{ backgroundImage: 'url(' + image + ')' }}>
        <Container>
          <h1 className={styles.title}>{label}</h1>
        </Container>
      </div>

      <Container className={styles.inner}>
        <p className={styles.subtitle}>Calories: {calories?.toFixed(2)}</p>
        <p className={styles.time}>Cooking time: {totalTime}</p>
        <p className={styles.mealType}>Type of meal: {mealType}</p>
        <p className={styles.subtitle}>
          Health Labels:
          <ul className={styles.list}>
            {healthLabels.map((label) => (
              <li key={label.toLowerCase()} className={styles.listItem}>
                <svg
                  id='Layer_1'
                  data-name='Layer 1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 122.88 122.88'>
                  <title>meal-food</title>
                  <path d='M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0ZM52.55,58.42c2.92-2,4.39-4.61,4.14-10.58V32.49c0-2.14-3.92-2.4-4.11,0l-.15,12.45a1.75,1.75,0,1,1-3.5,0l.15-12.88c0-2.3-3.77-2.53-3.81,0,0,3.58-.15,9.31-.15,12.88a1.52,1.52,0,1,1-3,0l.15-12.79A2.09,2.09,0,0,0,39,30.61c-1.38.88-1.1,2.65-1.16,4.15l-.48,14.69c.07,4.27,1.19,7.74,4.54,9.22a8.37,8.37,0,0,0,2,.52L42.77,89.25a3.76,3.76,0,0,0,3.71,3.86h.46a4.24,4.24,0,0,0,4.17-4.34l-1-29.59a6.61,6.61,0,0,0,2.45-.76Zm18,29.75-.05-26.41c-11.29-6.52-7.69-31.64,3.6-31.5,13.72.16,15.35,28.31,3.55,31.4l.87,26.64c.17,6.13-8,6.7-8-.13ZM99.29,23.59A53.52,53.52,0,1,0,115,61.44,53.36,53.36,0,0,0,99.29,23.59Z' />
                </svg>

                <span>{label}</span>
              </li>
            ))}
          </ul>
        </p>

        <h2 className={styles.subtitle}>Ingredients</h2>
        <div className={styles.ingredients}>
          {ingredients?.map((ingredient: IngredientSchema, idx: number) => {
            const {
              food,
              foodCategory,
              image,
              measure,
              quantity,
              text,
              weight,
              foodId,
            } = ingredient

            const foodURI = encodeURIComponent(food)
            const foodCategoryURI = encodeURIComponent(foodCategory)
            const imageURI = encodeURIComponent(image)
            const measureURI = encodeURIComponent(measure)
            const quantityURI = encodeURIComponent(quantity)
            const textURI = encodeURIComponent(text)
            const weightURI = encodeURIComponent(weight)
            const foodIdURI = encodeURIComponent(foodId)

            return (
              <Card
                className={styles.card}
                horizontal={true}
                route={`/ingredients/${foodIdURI}/${foodURI}/${foodCategoryURI}/${imageURI}/${measureURI}/${quantityURI}/${textURI}/${weightURI}`}
                title={food}
                num={weight}
                image={image}
                textForNumber={'Weight: '}
                key={idx}
              />
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default Recipe
