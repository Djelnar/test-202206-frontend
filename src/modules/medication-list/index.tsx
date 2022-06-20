import {MedicationApi} from 'api'
import cx from 'classnames'
import {ButtonLink} from 'components'
import {keyBy, orderBy} from 'lodash/fp'
import {useEffect, useMemo, useState} from 'react'
import {useRecoilState} from 'recoil'
import {ROUTES} from 'routes'
import {medicationsState} from 'store'
import styles from './index.module.css'
import {MedicationItem} from './medication-item'

export const Medications = () => {
  const [loading, setLoading] = useState(true)
  const [medications, setMedications] = useRecoilState(medicationsState)

  useEffect(() => {
    setLoading(true)
    MedicationApi.list()
      .then((res) => setMedications(keyBy('id', res)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [setMedications])

  const items = useMemo(() => orderBy('updated_at', 'desc', Object.values(medications)), [medications])

  if (loading) {
    return <div className={styles.root}></div>
  }

  return (
    <div className={styles.root}>
      <ButtonLink to={ROUTES.NEW} className={styles.createButton}>
        Create Medication
      </ButtonLink>
      <div className={styles.tableHeader}>
        <p className={styles.column}>Name</p>
        <div></div>
        <p className={cx(styles.column, styles.center)}>Count</p>
        <div></div>
        <p className={cx(styles.column, styles.center)}>Dest. Count</p>
        <div></div>
      </div>
      {items.map((medication) => (
        <MedicationItem medication={medication} key={medication.id} />
      ))}
    </div>
  )
}
