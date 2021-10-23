interface IngredientSchema {
  food: string
  foodCategory: string
  image: string
  measure: string
  quantity: number
  text: string
  weight: number
  foodId: string
}

type IngredientSerializedSchema = {
  foodURI: string | undefined
  foodCategoryURI: string | undefined
  imageURI: string | undefined
  measureURI: string | undefined
  quantityURI: string | undefined
  textURI: string | undefined
  weightURI: string | undefined
  foodIdURI: string | undefined
}

export type { IngredientSerializedSchema }
export default IngredientSchema
