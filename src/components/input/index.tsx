import cx from 'classnames'
import {InputHTMLAttributes} from 'react'
import styles from './index.module.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  errors?: string[]
  inputClassName?: string
}

export const Input = ({inputClassName, errors, className, ...inputProps}: Props) => {
  return (
    <div className={cx(styles.root, className)}>
      <input className={cx(styles.input, inputClassName)} {...inputProps} />
      {Array.isArray(errors) &&
        errors.map((e) => (
          <p key={e} className={styles.error}>
            {e}
          </p>
        ))}
    </div>
  )
}
