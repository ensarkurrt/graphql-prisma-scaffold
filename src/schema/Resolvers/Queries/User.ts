import { queryField } from 'nexus'
import { Context } from '../../../context'
import { getSessionInfo } from '../../../utils'

export const allUsersQuery = queryField((t) => {
  t.nonNull.list.nonNull.field('allUsers', {
    type: 'User',
    resolve: async (parent, args, context: Context) => {
      return await context.prisma.user.findMany()
    }
  })
})

export const meQuery = queryField((t) => {
  t.nonNull.field('me', {
    type: 'User',
    resolve: async (parent, args, context: Context) => {
      const { userId }: any = getSessionInfo(context)
      return await context.prisma.user.findUnique({
        where: {
          id: Number(userId)
        }
      })
    }
  })
})
