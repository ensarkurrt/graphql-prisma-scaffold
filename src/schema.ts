import { permissions } from './permissions'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema, asNexusMethod, enumType } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import * as allTypes from './schema/index'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc']
})

const schemaWithoutPermissions = makeSchema({
  types: [allTypes, SortOrder, DateTime],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
