import {UserApi} from 'api'
import {Loading} from 'components'
import {sleep} from 'lib'
import {Login, Register} from 'modules/access'
import {Home} from 'modules/home'
import {MedicationEditForm} from 'modules/medication-edit-form'
import {useEffect} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {ROUTES} from 'routes'
import {userLoading, userState} from 'store'

function App() {
  const [loading, setLoading] = useRecoilState(userLoading)
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      UserApi.me()
        .then((res) => setUser(res))
        .catch(() => UserApi.logout())
        .catch(() => {}),
      sleep(500),
    ]).finally(() => setLoading(false))
  }, [setUser, setLoading])

  if (loading) {
    return <Loading />
  }

  return user ? (
    <Routes>
      <Route
        path={ROUTES.NEW}
        element={
          <>
            <MedicationEditForm />
            <Home />
          </>
        }
      />
      <Route
        path={ROUTES.EDIT}
        element={
          <>
            <MedicationEditForm />
            <Home />
          </>
        }
      />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
    </Routes>
  )
}

export default App
