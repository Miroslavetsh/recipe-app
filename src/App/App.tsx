import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorContext } from '../context'
// import { useErrorContext } from '../context'

import Homepage from '../pages/HomePage'
import { RecipePropsTypes } from '../pages/Recipe'

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

  const [recipes, setRecipes] = useState<RecipePropsTypes[]>([])
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
              <Homepage
                edamamLinkParams={edamamLinkParams}
                setEdamamLinkParams={setEdamamLinkParams}
                recipes={recipes}
                getRecipes={getRecipes}
                errorMessage={errorMessage}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    </ErrorContext.Provider>
  )
}

export default App
