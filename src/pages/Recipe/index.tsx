import { useParams } from 'react-router'
import BackButton from '../../components/BackButton/BackButton'
// import { Route } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Container from '../../components/Container/Container'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import IngredientSchema from '../../schema/Ingredient'
import RecipeSchema from '../../schema/Recipe'
// import Ingredient from '../../pages/Ingredient'

import styles from './Styles.module.scss'

export type RecipePagePropsTypes = {
  recipes: Array<RecipeSchema>
}

type Params = {
  recipeId: string
}

const Recipe: React.FC<RecipePagePropsTypes> = (props) => {
  const { recipeId }: Params = useParams()
  const { recipes } = props
  const recipe = recipes.find(
    (recipe) => recipe.recipe.uri.indexOf(recipeId) !== -1
  )

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
          {ingredients?.map((ingredient: IngredientSchema, idx: number) => (
            <Card
              className={styles.card}
              horizontal={true}
              route={`/ingredients/${ingredient.foodId}`}
              title={ingredient.food}
              num={ingredient.weight}
              image={ingredient.image}
              textForNumber={'Weight: '}
              key={idx}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Recipe
