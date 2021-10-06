import styles from './Sorting.module.scss'
/* TODO Sorting Features */

type SortingParameter = {
  title: string
  callback: Function
}

const sortingParameters: Array<SortingParameter> = [
  {
    title: 'A - Z',
    callback: () => {},
  },
  {
    title: 'Z - A',
    callback: () => {},
  },
  {
    title: 'Less categories',
    callback: () => {},
  },
  {
    title: 'Fastest',
    callback: () => {},
  },
  {
    title: 'Chipper(less ingredients)',
    callback: () => {},
  },
  {
    title: 'Laziest (less ingredients and less time)',
    callback: () => {},
  },
]

const Sorting: React.FC = () => {
  const titleClassNames = ['title', styles.title]

  return (
    <aside className={styles.sorting}>
      <h2 className={titleClassNames.join(' ')}>Sorting</h2>
      <div className={styles.table}>
        {sortingParameters.map((parameter) => (
          <p
            className={styles.parameter}
            onClick={() => {
              parameter.callback()
            }}>
            {parameter.title}
          </p>
        ))}
      </div>
    </aside>
  )
}

export default Sorting
