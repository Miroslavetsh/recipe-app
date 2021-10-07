import BackButton from '../BackButton/BackButton'
import Container from '../Container/Container'

import styles from './ErrorLabel.module.scss'

type ErrorLabelPropsTypes = {
  message: string | React.ReactNode
}

const ErrorLabel: React.FC<ErrorLabelPropsTypes> = (props) => {
  const { message } = props

  return (
    <div className={styles.page}>
      <BackButton className={styles.back} />
      <Container className={styles.content}>{message}</Container>
    </div>
  )
}

export default ErrorLabel
