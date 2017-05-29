import { randomBytes } from 'crypto'

import { jwt2user } from '../lib/jwt'

export const validate = async (method, {id, email}, {viewer = {}, connectors}) => {
  if (viewer.jwt) viewer = await jwt2user(viewer, connectors)
  console.log(viewer)
  if (!viewer.valid) throw new Error('USER: You are not authorized to access this resource')
  if (!viewer.admin) {
    let queryMatchesUser
    if (id) queryMatchesUser = id === viewer.id
    if (email) queryMatchesUser = queryMatchesUser || email === viewer.email
    if (!queryMatchesUser) throw new Error(`USER: You are not authorized to access this resource.${viewer.error ? ' ' + viewer.error : ''}`)
  }
  return true
}

export const read = async ({id, email}, {viewer, connectors}) => connectors.db.projectGetOne({id, email})
export const list = async ({id, email}, {viewer, connectors}) => []
// export const list = async ({id, email}, {viewer, connectors}) => connectors.db.getProjects({id, email})

export const sanitize = async (method, results, {viewer, connectors}) => results
