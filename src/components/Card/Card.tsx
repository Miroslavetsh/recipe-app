import styles from './Card.module.scss'

type CardPropsTypes = {
  title: string
  num: number
  image: string
}

const Card: React.FC<CardPropsTypes> = (props) => {
  const { title, num, image } = props
  return (
    <div className={styles.card}>
      <p>{title}</p>
      <p>{num}</p>
      <img src={image} alt={image} />
    </div>
  )
}

export default Card
