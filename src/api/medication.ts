import ky from 'ky'

const request = ky.create({
  prefixUrl: `/medication`,
  credentials: 'include',
  redirect: 'follow',
})

export type ErrorsResponse = Record<string, string[]>

export type MedicationForm = {
  id?: string
  name: string
  description: string
  count: string
  destinationCount: string
}
export type MedicationInput = {
  id?: string
  name: string
  description: string
  count: number
  destinationCount: number
}

export type MedicationResponse = {
  id: string
  name: string
  description: string
  count: number
  destinationCount: number
  updated_at: string
}

/**
 * Create or update one medication
 */
export const upsertOne = (medication: Partial<MedicationInput>): Promise<MedicationResponse> => {
  return request
    .post('', {
      json: medication,
    })
    .json<MedicationResponse>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}

/**
 * Delete one medication
 */
export const deleteOne = (medication: Pick<MedicationInput, 'id'>): Promise<boolean> => {
  return request
    .delete(medication!.id!, {
      json: medication,
    })
    .json<MedicationResponse>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}

/**
 * Get medications List
 */
export const list = (): Promise<MedicationResponse[]> => {
  return request('')
    .json<MedicationResponse[]>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}

/**
 * Get one medication
 */
export const getOne = ({id}: {id: string}): Promise<MedicationResponse> => {
  return request(id)
    .json<MedicationResponse>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}
