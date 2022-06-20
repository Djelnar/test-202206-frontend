import {UserApi} from 'api'
import {uniqueId} from 'lodash/fp'
import {atom} from 'recoil'

export const userState = atom<UserApi.MeResponse | null>({
  key: uniqueId('userState'),
  default: null,
})

export const userLoading = atom({
  key: uniqueId('userLoading'),
  default: true,
})
