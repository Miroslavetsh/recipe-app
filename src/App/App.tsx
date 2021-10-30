import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ErrorContext } from '../context'

import Home from '../pages/Home'
import Ingredient from '../pages/Ingredient'
import Recipe from '../pages/Recipe'

import RecipeSchema from '../schema/Recipe'

export type EdamamLinkParamsTypes = {
  from: number
  to: number
  q: string
}

const App: React.FC = () => {
  const APP_ID = process.env.REACT_APP_EDAMAM_APPLICATION_ID
  const APP_KEY = process.env.REACT_APP_EDAMAM_APPLICATION_KEY
  const [edamamLinkParams, setEdamamLinkParams] =
    useState<EdamamLinkParamsTypes>({
      from: 0,
      to: 12,
      q: 'pizza',
    })

  const [recipes, setRecipes] = useState<RecipeSchema[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getRecipes = async (edamamLinkParams: EdamamLinkParamsTypes) => {
    const { from, to, q } = edamamLinkParams
    const edamamLink = `https://api.edamam.com/search?q=${q}&from=${from}&to=${to}&app_id=${APP_ID}&app_key=${APP_KEY}`

    const data = await fetch(edamamLink)
      .then((response: Response) => {
        return response.json()
      })
      .catch((err: Error) => {
        switch (err.message) {
          case 'Failed to fetch':
            setErrorMessage('You have no internet connection at the moment')
            break
          default:
            setErrorMessage('Something gone wrong...')
            break
        }
      })

    try {
      setRecipes(data.hits)
    } catch (e) {
      const err = e as Error
      if (err.name === 'TypeError') {
        setErrorMessage(
          'It seems like too many requests to the server. Please, wait a few seconds and try again'
        )
      }
    }
  }

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/recipes' />
          </Route>
          <Route exact path='/ingredients'>
            <Redirect to='/recipes' />
          </Route>
          <Route exact path='/recipes'>
            <Home
              edamamLinkParams={edamamLinkParams}
              setEdamamLinkParams={setEdamamLinkParams}
              recipes={recipes}
              getRecipes={getRecipes}
              setRecipes={setRecipes}
              errorMessage={errorMessage}
            />
          </Route>
          <Route
            path='/recipes/:recipeId'
            component={() => {
              return (
                <Recipe
                  recipes={recipes}
                  edamamLinkParams={edamamLinkParams}
                  getRecipes={getRecipes}
                />
              )
            }}
          />
          <Route
            path='/ingredients/:foodIdURI/:foodURI/:foodCategoryURI/:imageURI/:measureURI/:quantityURI/:textURI/:weightURI'
            component={Ingredient}
          />
        </Switch>
      </Router>
    </ErrorContext.Provider>
  )
}

export default App
