import BackButton from '../BackButton/BackButton'
import Container from '../Container/Container'

import styles from './ErrorLabel.module.scss'

type ErrorLabelPropsTypes = {
  message: string
}

const ErrorLabel: React.FC<ErrorLabelPropsTypes> = (props) => {
  const { message } = props
  const paragraphs = message.split('<br />')
  return (
    <div className={styles.page}>
      <BackButton className={styles.back} />
      <Container className={styles.content}>
        {paragraphs.map((paragraph: string) => (
          <p className={styles.message}>
            {paragraph} <br />
          </p>
        ))}
      </Container>
    </div>
  )
}

export default ErrorLabel
