import { useEffect } from 'react'
import { useParams } from 'react-router'
import { EdamamLinkParamsTypes } from '../../App/App'
import BackButton from '../../components/BackButton/BackButton'
import Card from '../../components/Card/Card'
import Container from '../../components/Container/Container'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import IngredientSchema from '../../schema/Ingredient'
import RecipeSchema from '../../schema/Recipe'

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
  const { recipeId }: Params = useParams()
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

      <Container>
        <p>{calories?.toFixed(2)}</p>
        <p>{totalTime}</p>
        <p>{mealType}</p>
        <p>{healthLabels} lbls</p>

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
