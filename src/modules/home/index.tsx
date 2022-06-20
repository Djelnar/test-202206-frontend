import {UserApi} from 'api'
import {Button} from 'components'
import {Medications} from 'modules/medication-list'
import {useCallback} from 'react'
import {useRecoilState} from 'recoil'
import {userLoading, userState} from 'store'
import styles from './index.module.css'

export const Home = () => {
  const [user, setUser] = useRecoilState(userState)
  const [, setLoading] = useRecoilState(userLoading)

  const handleLogout = useCallback(() => {
    setLoading(true)
    return UserApi.logout()
      .catch(() => {})
      .finally(() => {
        setUser(null)
        setLoading(false)
      })
  }, [setLoading, setUser])

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.email}>
            Hello, <i>{user!.email}</i>
          </p>
          <Button onClick={handleLogout} className={styles.logout}>
            Log out
          </Button>
        </div>
        <Medications />
      </div>
    </div>
  )
}
