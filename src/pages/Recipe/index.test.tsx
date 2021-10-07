import { render } from '@testing-library/react'
import RecipePage from './'
import RecipeSchema from '../../schema/Recipe'

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
        foodId: 'food_2re3e2t3fyt23653ru23tf2i3jy'
      },
    ],
  },
}

const recipes = [recipe]

test('should be on page without params and correctly works', () => {
  render(<RecipePage recipes={[]} />)
})

test('should be on page with truthy params', () => {
  render(<RecipePage recipes={recipes} />)
})

// TODO
// test('recipe contains ingredients with truthy parameters', () => {
// })
