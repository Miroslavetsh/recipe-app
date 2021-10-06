import Recipe, { RecipePropsTypes } from '../Recipe/Recipe'
import Container from '../Container/Container'

import styles from './RecipePage.module.scss'

const RecipePage: React.FC<RecipePropsTypes> = (props) => {
  return (
    <>
      <Container>
        <h1 className={styles.title}>{props.recipe.label}</h1>
        <Recipe {...props} />
      </Container>
    </>
  )
}

export default RecipePage
