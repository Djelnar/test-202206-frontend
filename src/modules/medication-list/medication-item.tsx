import {MedicationApi} from 'api'
import cx from 'classnames'
import {useCallback, useState} from 'react'
import {Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {ROUTES} from 'routes'
import {medicationsState} from 'store'
import DeleteIcon from './assets/delete.png'
import MinusIcon from './assets/minus.png'
import PlusIcon from './assets/plus.png'
import ViewIcon from './assets/view.png'
import styles from './index.module.css'

type Props = {
  medication: MedicationApi.MedicationResponse
}

export const MedicationItem = ({medication}: Props) => {
  const [loading, setLoading] = useState(false)
  const [, setMedications] = useRecoilState(medicationsState)

  const handleIncrement = useCallback(() => {
    if (loading) return

    MedicationApi.upsertOne({
      name: medication.name,
      description: medication.description,
      count: medication.count + 1,
      destinationCount: medication.destinationCount,
      id: medication.id,
    })
      .then((res) => {
        setMedications((ms) => ({...ms, [res.id]: res}))
      })
      .finally(() => setLoading(false))
  }, [
    medication.count,
    medication.description,
    medication.destinationCount,
    medication.id,
    medication.name,
    setMedications,
    loading,
  ])

  const handleDecrement = useCallback(() => {
    if (loading) return

    MedicationApi.upsertOne({
      name: medication.name,
      description: medication.description,
      count: medication.count - 1,
      destinationCount: medication.destinationCount,
      id: medication.id,
    })
      .then((res) => {
        setMedications((ms) => ({...ms, [res.id]: res}))
      })
      .finally(() => setLoading(false))
  }, [
    medication.count,
    medication.description,
    medication.destinationCount,
    medication.id,
    medication.name,
    setMedications,
    loading,
  ])

  const handleDelete = useCallback(() => {
    if (loading) return

    MedicationApi.deleteOne({
      id: medication.id,
    })
      .then(() => {
        setMedications((ms) => {
          const {[medication.id]: lol, ...rest} = ms
          return rest
        })
      })
      .finally(() => setLoading(false))
  }, [medication.id, setMedications, loading])

  return (
    <div className={styles.row} id={medication.id}>
      <p className={styles.column}>{medication.name}</p>

      <button disabled={medication.count <= 0 || loading} className={styles.action} onClick={handleDecrement}>
        <img src={MinusIcon} alt="" />
      </button>
      <p className={cx(styles.column, styles.center)}>{medication.count}</p>
      <button
        className={styles.action}
        disabled={medication.count >= medication.destinationCount || loading}
        onClick={handleIncrement}
      >
        <img src={PlusIcon} alt="" />
      </button>

      <p className={cx(styles.column, styles.center)}>{medication.destinationCount}</p>

      <Link to={ROUTES.EDIT.replace(':id', medication.id)} className={styles.action}>
        <img src={ViewIcon} alt="" />
      </Link>
      <button className={styles.action} disabled={loading} onClick={handleDelete}>
        <img src={DeleteIcon} alt="" />
      </button>
    </div>
  )
}
