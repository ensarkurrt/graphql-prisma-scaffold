import { objectType } from 'nexus'
import { Context } from '../../context'

export const Session = objectType({
  name: 'Session',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('token')
    t.string('data')
    t.nonNull.int('userId')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('lastLoggedAt', { type: 'DateTime' })
    t.nonNull.field('user', {
      type: 'User',
      resolve: async (parent, args, context: Context) => {
        return await context.prisma.session
          .findUnique({
            where: { id: parent.id }
          })
          .user()
      }
    })
  }
})
