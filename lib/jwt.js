import getProp from '@f/get-prop'
import setProp from '@f/set-prop'
import jwtDecode from 'jwt-decode'
import storage from 'simple-storage'

import Router from 'next/router'

export const setJWTserver = (state, query) => {
  let { token } = query
  if (token) {
    try {
      const parsedJWT = jwtDecode(token)
      state = setProp('appState.jwt', state, parsedJWT)
      state = setProp('appState.jwt.raw', state, token)
      state = setProp('appState.jwt.readyToUse', state, true)
      // if (urlJWT) return Router.replace({ pathname: Router.pathname })
    } catch (err) {
      // console.log('Error in parsing jwt', err)
    }
  }
  return state
}

export const setJWTclient = (jwt, setToken, setTokenReady, refetch) => {
  console.log('[JWT] setting jwt')
  const urlToken = !!jwt
  jwt = jwt || storage.get('jwt')
  console.log('[JWT] seeing if no jwt exists in url or storage')
  if (!jwt) return window.location.href = '/login'
  console.log('[JWT] setting jwt in storage')
  storage.set('jwt', jwt)
  console.log('[JWT] setting jwt in Redux')
  // parse jwt
  const parsed = jwtDecode(jwt)
  // save jwt
  setToken({ jwt, parsed })
  console.log('[JWT] checking if jwt was in url')
  if (urlToken) return refetch().then(() => Router.replace({ pathname: Router.pathname }))
}

export const clearJWTclient = () => {
  storage.remove('jwt')
  return window.location.href = '/logout-oauth'
}

export const clearJWTclientAndLogin = () => {
  storage.remove('jwt')
  return window.location.href = '/login'
}
