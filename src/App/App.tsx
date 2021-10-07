import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ErrorContext } from '../context'

import Home from '../pages/Home'
// import Ingredient from '../pages/Ingredient'
import Recipe from '../pages/Recipe'
import RecipeSchema from '../schema/Recipe'

import styles from './App.module.scss'

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
    try {
      const { from, to, q } = edamamLinkParams
      const edamamLink = `https://api.edamam.com/search?q=${q}&from=${from}&to=${to}&app_id=${APP_ID}&app_key=${APP_KEY}`

      const response: Response = await fetch(edamamLink)
      const data = await response.json()
      setRecipes(data.hits)
    } catch (err) {
      const e = err as Error
      switch (e.name) {
        case 'TypeError':
          setErrorMessage(
            'It seems like too many requests to the server. Please, wait a few seconds and try again'
          )
          console.warn(e.message)
      }
    }
  }

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      <div className={styles.wrapper}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/recipes' />
            </Route>
            <Route exact path='/recipes'>
              <Home
                edamamLinkParams={edamamLinkParams}
                setEdamamLinkParams={setEdamamLinkParams}
                recipes={recipes}
                getRecipes={getRecipes}
                errorMessage={errorMessage}
              />
            </Route>
            <Route
              path='/recipes/:recipeId'
              component={() => {
                return <Recipe recipes={recipes} />
              }}
            />
            {/* <Route
              path='/ingredients/:foodId'
              component={() => {
                return <Ingredient ingredient={ingredient} />
              }}
            /> */}
          </Switch>
        </Router>
      </div>
    </ErrorContext.Provider>
  )
}

export default App
