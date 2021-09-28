import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import styles from './App.module.scss'

const App = () => {
  const APP_ID = process.env.REACT_APP_EDAMAM_APPLICATION_ID
  const APP_KEY = process.env.REACT_APP_EDAMAM_APPLICATION_KEY
  const edamamLink = `https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?app_id=${APP_ID}&app_key=${APP_KEY}&type=public`

  const [counter, setCounter] = useState<number>(0)
  
  useEffect(() => {
    console.log(edamamLink)
  })

  return (
    <div className={styles.container}>
      <Container>
        <h1 className={styles.title}>Recipe Application</h1>

        <form className={styles.form}>
          <input className={styles.input} type='text' />
          <button
            onClick={(e: React.FormEvent) => {
              e.preventDefault()
              setCounter(counter + 1)
            }}
            className={styles.button}>
            {counter}
          </button>
        </form>
      </Container>
    </div>
  )
}

export default App
