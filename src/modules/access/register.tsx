import {UserApi} from 'api'
import {Button, Input} from 'components'
import {ChangeEventHandler, FormEventHandler, useState} from 'react'
import {Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {userState} from 'store'
import styles from './index.module.css'

export const Register = () => {
  const [, setUser] = useRecoilState(userState)

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [formData, setFormData] = useState<UserApi.RegisterRequest>({
    email: '',
    password: '',
    passwordAgain: '',
  })
  const handleChangeFormValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((fd) => ({...fd, [e.target.name]: e.target.value}))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (loading) {
      return
    }
    setLoading(true)
    e.preventDefault()

    UserApi.register(formData)
      .then((res) => setUser(res))
      .catch((error) => setErrors(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h1 className={styles.title}>Register</h1>
        <Input
          value={formData.email}
          onChange={handleChangeFormValue}
          name="email"
          errors={errors?.email}
          disabled={loading}
          placeholder="Email"
          autoComplete="email"
        />
        <Input
          value={formData.password}
          onChange={handleChangeFormValue}
          name="password"
          errors={errors?.password}
          type="password"
          disabled={loading}
          placeholder="Password"
          autoComplete="new-password"
        />
        <Input
          value={formData.passwordAgain}
          onChange={handleChangeFormValue}
          name="passwordAgain"
          errors={errors?.passwordAgain}
          type="password"
          disabled={loading}
          placeholder="Repeat password"
          autoComplete="new-password"
        />
        <p className={styles.error}>{errors?.default}</p>
        <Button disabled={loading} type="submit">
          Submit
        </Button>
        <Link to="/login" className={styles.link}>
          Already have an account? Login
        </Link>
      </form>
    </div>
  )
}
