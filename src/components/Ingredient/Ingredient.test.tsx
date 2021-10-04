import { render } from '@testing-library/react'
import Ingredient, { IngredientPropsTypes } from './Ingredient'

const ingredient: IngredientPropsTypes = {
  food: 'Some ingredient',
  foodCategory: 'My category',
  image: '',
  measure: 'bowl',
  quantity: 12,
  text: '12 bowls of some ingredient',
  weight: 240,
}

test('should be on page with truthy params', () => {
  render(<Ingredient {...ingredient} />)
})
