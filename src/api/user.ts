import ky from 'ky'

const request = ky.create({
  prefixUrl: `/user`,
  credentials: 'include',
  redirect: 'follow',
})

export type ErrorsResponse = Record<string, string[]>

/**
 * Get user data and check session
 */
export type MeResponse = {
  id: string
  email: string
}
export const me = (): Promise<MeResponse> => {
  return request('me')
    .json<MeResponse>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}

/**
 * Register a user
 */
export type RegisterRequest = {
  email: string
  password: string
  passwordAgain: string
}
export const register = (input: RegisterRequest): Promise<MeResponse> => {
  return request
    .post('register', {
      json: input,
    })
    .json<MeResponse>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}

/**
 * Login user
 */
export type LoginRequest = {
  email: string
  password: string
}
export const login = (input: LoginRequest): Promise<MeResponse> => {
  return request
    .post('login', {
      json: input,
    })
    .json<MeResponse>()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}

/**
 * Logout user
 */
export const logout = (): Promise<string> => {
  return request
    .get('logout')
    .text()
    .catch((error) => error.response?.json().then((data: ErrorsResponse) => Promise.reject(data)))
}
