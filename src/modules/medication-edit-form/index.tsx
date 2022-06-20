import {MedicationApi} from 'api'
import {Button, Input} from 'components'
import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {ROUTES} from 'routes'
import {medicationsState} from 'store'
import styles from './index.module.css'

type TProps = {}

export const MedicationEditForm = (props: TProps) => {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [formData, setFormData] = useState<MedicationApi.MedicationForm>({
    name: '',
    description: '',
    count: '',
    destinationCount: '',
  })
  const [, setMedications] = useRecoilState(medicationsState)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    if (id) {
      MedicationApi.getOne({id})
        .then((res) => {
          setMedications((ms) => ({...ms, [res.id]: res}))
          setFormData({
            count: String(res.count),
            destinationCount: String(res.destinationCount),
            description: res.description,
            name: res.name,
            id,
          })
        })
        .catch((error) => {
          navigate(ROUTES.NEW)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [id, setMedications, navigate])

  const handleChangeFormValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((fd) => ({...fd, [e.target.name]: e.target.value}))
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (loading) {
      return
    }
    setLoading(true)
    e.preventDefault()
    MedicationApi.upsertOne({
      ...formData,
      count: Number(formData.count),
      destinationCount: Number(formData.destinationCount),
    })
      .then((res) => {
        setMedications((ms) => ({...ms, [res.id]: res}))
        navigate(ROUTES.HOME)
      })
      .catch((error) => setErrors(error))
      .finally(() => setLoading(false))
  }

  const handleCancelClick = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <>
      <div className={styles.overlay} />
      <form className={styles.root} onSubmit={handleFormSubmit}>
        <h2>{id ? 'Edit' : 'Create'} medication</h2>
        <Input
          inputClassName={styles.input}
          value={formData.name}
          onChange={handleChangeFormValue}
          name="name"
          errors={errors?.name}
          disabled={loading}
          type="text"
          placeholder="Name"
        />
        <Input
          inputClassName={styles.input}
          value={formData.description}
          onChange={handleChangeFormValue}
          name="description"
          errors={errors?.description}
          disabled={loading}
          type="text"
          placeholder="Description"
        />
        <Input
          inputClassName={styles.input}
          value={formData.count}
          onChange={handleChangeFormValue}
          name="count"
          errors={errors?.count}
          disabled={loading}
          type="number"
          placeholder="Count"
        />
        <Input
          inputClassName={styles.input}
          value={formData.destinationCount}
          onChange={handleChangeFormValue}
          name="destinationCount"
          errors={errors?.destinationCount}
          disabled={loading}
          type="number"
          placeholder="Destination Count"
        />
        <p className={styles.error}>{errors?.default}</p>
        <div className={styles.actions}>
          <Button disabled={loading} type="submit">
            Save
          </Button>
          <Button disabled={loading} type="button" className={styles.cancel} onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}
