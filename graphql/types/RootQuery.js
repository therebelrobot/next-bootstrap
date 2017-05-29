import { generateResource } from '../../resource'

export default {
  checkJWT: {
    type: 'Boolean',
    params: {
      jwt: 'String'
    },
    resolver:async (_, { jwt }, ctx) => {
      console.log('token', jwt)
      return true
    }
  },
  user: {
    type: 'User',
    params: {
      jwt: 'String',
      id: 'String',
      email: 'String'
    },
    resolver: async (_, { id, email, jwt }, ctx) => generateResource('user', 'read', {id, email}, { jwt })
  },
  projects: {
    type: '[Project]',
    params: {
      jwt: 'String'
    },
    resolver: async (_, { jwt }, ctx) => generateResource('project', 'list', {}, { jwt })
  },
  project: {
    type: 'Project',
    params: {
      jwt: 'String',
      id: 'String'
    },
    resolver: async (_, { id, jwt }, ctx) => generateResource('project', 'read', { id }, { jwt })
  },
  posts: {
    type: '[Post]',
    params: {
      jwt: 'String',
      userId: 'String'
    },
    resolver: async (_, { userId, jwt }, ctx) => generateResource('post', 'list', { userId }, { jwt })
  }
}
