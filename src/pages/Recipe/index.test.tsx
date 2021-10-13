import { render, screen } from '@testing-library/react'
import RecipePage from './'
import RecipeSchema from '../../schema/Recipe'
import App from '../../App/App'

const recipe: RecipeSchema = {
  recipe: {
    label: 'Something Tasty',
    calories: 1200,
    image: '',
    mealType: ['MealType1', 'MealType2'],
    totalTime: 60,
    healthLabels: ['Health Label'],
    uri: 'https::/some.url.org/recipe#recipe_id_with_custom_hash',
    ingredients: [
      {
        food: 'Some ingredient',
        foodCategory: 'My category',
        image: '',
        measure: 'bowl',
        quantity: 12,
        text: '12 bowls of some ingredient',
        weight: 240,
        foodId: 'food_2re3e2t3fyt23653ru23tf2i3jy',
      },
    ],
  },
}

const edamamLinkParams = {
  edamamLinkParams: {
    from: 0,
    to: 0,
    q: '',
  },
}

const recipes = [recipe]

describe('Recipe page', () => {
  test('should correctly works instead of parameters existing', () => {
    // render(<App />)
    render(
      <RecipePage
        recipes={recipes}
        {...edamamLinkParams}
        getRecipes={() => {}}
      />
    )
  })

  // test('should be on page without recipes list', () => {
  //   render(
  //     <RecipePage recipes={[]} getRecipes={() => {}} {...edamamLinkParams} />
  //   )
  // })

  // test('recipe contains ingredients with truthy parameters', () => {
  //   render(
  //     <RecipePage
  //       recipes={recipes}
  //       getRecipes={() => {}}
  //       {...edamamLinkParams}
  //     />
  //   )

  //   expect(screen.getByTestId('Something Tasty')).toBeInTheDocument()
  // })
})
