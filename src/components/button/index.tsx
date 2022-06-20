import cx from 'classnames'
import {ButtonHTMLAttributes} from 'react'
import {Link, LinkProps} from 'react-router-dom'
import styles from './index.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className, ...buttonProps}: ButtonProps) => {
  return <button className={cx(styles.button, className)} {...buttonProps} />
}

export const ButtonLink = ({className, ...props}: LinkProps) => {
  return <Link className={cx(styles.button, styles.buttonLink, className)} {...props} />
}
