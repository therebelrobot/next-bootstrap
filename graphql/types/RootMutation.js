import { generateResource } from '../../resource'

export default {
  createProject: {
    type: 'MutationResult',
    params: {
      name: 'String!'
    },
    resolver:async (_, { name }, ctx) => {
      console.log('create name', name)
      return true
    }
  },
  updateProject: {
    type: 'Project',
    params: {
      id: 'String!',
      data: 'Json!',
      jwt: 'String!'
    },
    // resolver:async (_, { id, data, jwt }, ctx) => ({successful: true})
    resolver:async (_, { id, data, jwt }, ctx) => {
      console.log('updating');
      await generateResource('project', 'update', { id, data }, { jwt })
      return generateResource('project', 'read', { id }, { jwt })
    }
  },
  deleteProject: {
    type: 'MutationResult',
    params: {
      id: 'String!'
    },
    resolver:async (_, { id }, ctx) => {
      console.log('delete id', id)
      return true
    }
  },
}
