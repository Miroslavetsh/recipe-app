import { Link } from 'react-router-dom'

import styles from './Card.module.scss'

type CardPropsTypes = {
  title: string
  num: number
  image: string
  textForNumber: string
  route: string
  className?: string
  horizontal?: boolean
}

const Card: React.FC<CardPropsTypes> = (props) => {
  const { title, num, image, textForNumber, route, className, horizontal } =
    props

  const classNames = [styles.card, className]
  if (horizontal === true) {
    classNames.push(styles._horizontal)

    return (
      <Link to={route} className={classNames.join(' ')}>
        <div className={styles.image}>
          <img src={image} alt={image} />
        </div>
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.number}>
            {textForNumber} <strong>{num.toFixed(2)}</strong>
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link to={route} className={classNames.join(' ')}>
      <div className={styles.image}>
        <img src={image} alt={image} />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.number}>
        {textForNumber} <strong>{num.toFixed(2)}</strong>
      </p>
    </Link>
  )
}

Card.defaultProps = {
  className: '',
  horizontal: false,
}

export default Card
