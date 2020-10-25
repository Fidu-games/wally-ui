import config from '../config.json'

export let token
let tokenExpirationInterval

/**
 * @param {object} param0
 * @param {string} param0.endpoint - where will be called the API.
 * @param {string} param0.method - the http method.
 * @param {boolean} [param0.requireAuth=true] - need to be logged in?
 * @param {object} param0.data - the data to be included in the request.
 */
export async function callApi ({ url = '', endpoint, method = 'GET', requireAuth = true, data = null }) {
  url = url || config.api.url
  const headers = new window.Headers()
  headers.append('Content-Type', 'application/json')

  if (requireAuth) {
    if (!token) {
      return {
        success: false,
        errors: 'User is not authenticated'
      }
    }
    headers.append('Authorization', `Bearer: ${token}`)
  }

  const credentials = {
    method: method,
    headers: headers,
    mode: 'cors',
    cache: 'default'
  }

  if (data && method !== 'GET') credentials.body = JSON.stringify(data)

  try {
    const request = await window.fetch(url + endpoint, credentials)
    if (!request.ok) throw request
    return await request.json()
  } catch (error) {
    console.log(error)
    return {
      success: false,
      errors: error.statusText,
      redirect: error.redirected
    }
  }
}

function startTokenExpiration () {
  tokenExpirationInterval = setTimeout(() => Auth.refreshToken(), 1000 * 60 * 15)
}

export class Auth {
  static async logIn (email, password) {
    const result = await callApi({
      endpoint: '/auth/login',
      method: 'POST',
      data: { email, password },
      requireAuth: false
    })

    Auth.setTokens(result)
    return result
  }

  static logOut () {
    clearInterval(tokenExpirationInterval)
    token = null
    window.localStorage.removeItem('refreshToken')
  }

  static async signUp (data) {
    const result = await callApi({
      endpoint: '/auth/signup',
      method: 'POST',
      data: data,
      requireAuth: false
    })

    Auth.setTokens(result)
    return result
  }

  static async refreshToken () {
    let rt
    if (!(rt = window.localStorage.getItem('refreshToken'))) {
      return {
        success: false
      }
    }
    const result = await callApi({
      endpoint: `/auth/token/${rt}`,
      requireAuth: false
    })
    if (!result.success) return result
    token = result.data.token
    startTokenExpiration()
    return result
  }

  static setTokens (result) {
    if (result.success) {
      token = result.data.token
      window.localStorage.setItem('refreshToken', result.data.refreshToken)
      startTokenExpiration()
    }
  }
}

export class Player {
  static async getPlayer (playerID = '') {
    return await callApi({
      endpoint: `/player/${playerID}`
    })
  }

  static async updatePlayer (name, nickname) {
    return await callApi({
      endpoint: '/player',
      method: 'PATCH',
      data: { name, nickname }
    })
  }
}
