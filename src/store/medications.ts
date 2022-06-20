import {MedicationApi} from 'api'
import {uniqueId} from 'lodash/fp'
import {atom} from 'recoil'

export const medicationsState = atom<Record<string, MedicationApi.MedicationResponse>>({
  key: uniqueId('medicationsState'),
  default: {},
})
