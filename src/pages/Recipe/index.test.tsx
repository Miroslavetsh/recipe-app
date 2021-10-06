import { render } from '@testing-library/react'
import Recipe, { RecipePropsTypes } from '.'

const recipe: RecipePropsTypes = {
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
      },
    ],
  },
}

test('should be on page with truthy params', () => {
  render(<Recipe {...recipe} />)
})

// TODO
// test('recipe contains ingredients with truthy parameters', () => {
// })
