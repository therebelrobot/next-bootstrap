import Aeros from 'aeros'

import RootQuery from './types/RootQuery'
import RootMutation from './types/RootMutation'
import MutationResult from './types/MutationResult'
import User from './types/User'
import Project from './types/Project'
import Post from './types/Post'

export const aeros = Aeros({
  query: RootQuery,
  mutation: RootMutation,
  types: {
    User,
    Project,
    Post,
    MutationResult
  }
})

export default aeros.schema
export const typeDefs = aeros.typeDefs
export const resolvers = aeros.resolvers
