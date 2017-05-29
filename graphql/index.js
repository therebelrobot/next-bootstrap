// import { graphqlKoa, graphiqlKoa } from 'apollo-server'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { GraphQLError } from 'graphql/error'
import moment from 'moment'
import { truncate } from 'lodash'
import schema, { typeDefs } from './schema'

// import { randomString } from '../lib/utils'
import { nodeEnv } from '../settings'

function formatGraphQLLog (requestId, params) {
  const query = params.query
    .replace(/#.*\n/g, '\n') // remove comments
    .replace(/\s+/g, ' ') // get rid of meaningless whitespace
  const queryInfo = params.operationName
    ? `operation=${params.operationName}`
    : `query=${truncate(query, 30)}`
  const vars = params.variables ? ` variables=${truncate(JSON.stringify(params.variables), 30)}` : ''
  return `rid=${requestId} ${queryInfo}${vars}`
}

export default () => {
  console.log('bootstrapping')
  return async (ctx, next) => {
    const context = {
      ...ctx.segment,
      request: ctx.request
    }
    context.viewer = ctx.viewer
    const start = new Date()
    const requestId = 'randomString(8)'
    // const requestId = randomString(8)
    console.log('requestId', requestId)
    return graphqlKoa({
      schema,
      context,
      debug: nodeEnv !== 'production',
      formatError: (err) => {
        const prefix = `${moment().format()} [Error] rid=${requestId}`
        if (err instanceof GraphQLError) {
          // Using presence of `originalError` is a bit of a hack right now
          // But I can't find a better option to distinguish client vs server error ...
          if (!err.originalError) {
            console.warn(`${prefix} Client Error`)
          } else {
            console.error(`${prefix} Server Error`, err)
          }
        } else {
          console.warn(`${prefix} Unexpected Error`, err)
        }
        return err
      },
      formatParams (params) {
        console.log(`${moment().format()} [Request] ${formatGraphQLLog(requestId, params)}`)
        return params
      },
      formatResponse (data, options) {
        const errors = (data.errors || []).length
        const durationMs = moment().diff(start)
        console.log(`${moment().format()} [Response] ${formatGraphQLLog(requestId, options)}` +
          ` dur=${durationMs}ms errors=${errors}`)
        return data
      }
    })(ctx)
  }
}

export const rawSchemaController = () => (ctx) => {
  ctx.body = [
    '## Raw schema for documentation. You should POST to /graphql to query it.\n\n',
    ...typeDefs
  ].join('\n')
}

// TODO: Remove this stupid string replacement magic hack. Instead of using
// graphiqlKoa just render a freaking HTML page ourselves...
export const graphiqlController = () => (ctx) => graphiqlKoa({
  endpointURL: '/graphql'
})(ctx)
