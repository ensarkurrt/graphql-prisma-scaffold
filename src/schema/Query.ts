/* export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      }
    })

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context: Context) => {
        const { userId }: any = getSessionInfo(context)
        return context.prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        })
      }
    })

    t.nonNull.list.nonNull.field('sessions', {
      type: 'Session',
      resolve: (_parent, _args, context: Context) => {
        const { userId }: any = getSessionInfo(context)
        return context.prisma.session.findMany({
          where: {
            userId: Number(userId)
          },
          include: {
            user: true
          }
        })
      }
    })

    t.nullable.field('session', {
      type: 'AuthPayload',
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

        return {
          token,
          user: session.user
        }
      }
    })

    t.nullable.field('postById', {
      type: 'Post',
      args: {
        id: intArg()
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.post.findUnique({
          where: { id: args.id || undefined }
        })
      }
    })

    t.nonNull.list.nonNull.field('feed', {
      type: 'Post',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({
          type: 'PostOrderByUpdatedAtInput'
        })
      },
      resolve: (_parent, args, context: Context) => {
        const or = args.searchString
          ? {
              OR: [
                { title: { contains: args.searchString } },
                { content: { contains: args.searchString } }
              ]
            }
          : {}

        return context.prisma.post.findMany({
          where: {
            published: true,
            ...or
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy || undefined
        })
      }
    })

    t.list.field('draftsByUser', {
      type: 'Post',
      args: {
        userUniqueInput: nonNull(
          arg({
            type: 'UserUniqueInput'
          })
        )
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: {
              id: args.userUniqueInput.id || undefined,
              email: args.userUniqueInput.email || undefined
            }
          })
          .posts({
            where: {
              published: false
            }
          })
      }
    })
  }
}) */
