import styles from './Card.module.scss'

type CardPropsTypes = {
  title: string
  num: number
  image: string
  textForNumber: string
  className?: string
}

const Card: React.FC<CardPropsTypes> = (props) => {
  const { title, num, image, textForNumber, className } = props
  const classNames = [styles.card, className]

  return (
    <div className={classNames.join(' ')}>
      <div className={styles.image}>
        <img src={image} alt={image} />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.number}>
        {textForNumber} <strong>{num.toFixed(2)}</strong>
      </p>
    </div>
  )
}

Card.defaultProps = {
  className: '',
}

export default Card
