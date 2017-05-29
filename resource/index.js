import { initResource } from '@therebel/resource'

import * as user from './user'
import * as project from './project'
import * as post from './post'

import DbConnector from './connectors/db'

import { dbUrl } from '../settings'

const connectors = {
  db: new DbConnector(dbUrl),
}

const resources = {
  user,
  project,
  post
}

const constructedResource = initResource({connectors, resources})

export const generateResource = constructedResource.generateResource
export const Resource = constructedResource.Resource
