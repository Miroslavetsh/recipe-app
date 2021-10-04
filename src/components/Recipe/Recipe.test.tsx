import { render } from '@testing-library/react'
import Recipe, {RecipePropsTypes} from './Recipe'

const recipe:RecipePropsTypes = {
  recipe: {
    calories: 1200,
    image: '',
    mealType: ['MealType1', 'MealType2'],
    totalTime: 60,
    healthLabels: ['Health Label'],
  }
}

test('should be on page with truthy params', () => {
  render(<Recipe {...recipe} />)
})
