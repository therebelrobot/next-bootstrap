import Koa from 'koa'
import next from 'next'
import Router from 'koa-router'
import bodyParser from 'koa-body-parser'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

import graphqlController, { graphiqlController, rawSchemaController } from './graphql'

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/healthcheck', (ctx) => { ctx.body = '👻' })
  router.get('/graphql', rawSchemaController())
  router.get('/graphiql', graphiqlController())
  router.post('/graphql', graphqlController())

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(bodyParser())
  server.use(router.routes())
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
