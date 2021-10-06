import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from '../pages/HomePage'
import { RecipePropsTypes } from '../components/Recipe/Recipe'

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
          console.warn(e.message)
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Homepage
              edamamLinkParams={edamamLinkParams}
              setEdamamLinkParams={setEdamamLinkParams}
              recipes={recipes}
              getRecipes={getRecipes}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
