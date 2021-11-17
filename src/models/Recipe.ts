import IngredientSchema from './Ingredient'

interface RecipeSchema {
  recipe: {
    label: string
    calories: number
    image: string
    mealType: Array<string>
    totalTime: number
    healthLabels: Array<string>
    uri: string
    ingredients: Array<IngredientSchema>
  }
}

export default RecipeSchema
