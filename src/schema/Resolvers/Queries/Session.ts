import { queryField } from 'nexus'
import { Context } from '../../../context'
import { getSessionInfo } from '../../../utils'

export const sessionsQuery = queryField((t) => {
  t.nonNull.list.nonNull.field('sessions', {
    type: 'Session',
    resolve: async (parent, args, context: Context) => {
      const { userId }: any = getSessionInfo(context)
      return await context.prisma.session.findMany({
        where: {
          userId: Number(userId)
        },
        include: {
          user: true
        }
      })
    }
  })
})

export const sessionQuery = queryField((t) => {
  t.nonNull.field('session', {
    type: 'Session',
    resolve: async (parent, args, context: Context) => {
      const { userId, sessionId, token }: any = getSessionInfo(context)
      const session = await context.prisma.session.findUnique({
        where: {
          id: Number(sessionId)
        },
        include: {
          user: true
        }
      })

      if (!session || session.userId !== userId || session.token !== token)
        throw new Error(`Session has ended`)

      const updateSession = await context.prisma.session.update({
        where: { id: Number(sessionId) },
        data: { data: '{"ip": "1.1.1.1", "device": "iPhoneXr"}' }
      })

      return session
    }
  })
})
