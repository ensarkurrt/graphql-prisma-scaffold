/* 
export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        try {
          const user = await context.prisma.user.create({
            data: {
              name: args.name,
              email: args.email,
              password: hashedPassword
            }
          })
          const token = sign({ userId: user.id }, APP_SECRET)
          const session = await context.prisma.session.create({
            data: {
              userId: user.id,
              token,
              data: '{"ip": "1.1.1.1", "device": "iPhoneXr"}'
            }
          })
          const generatedToken = session.id + '|' + token
          return {
            token: generatedToken,
            user
          }
        } catch (error) {
          throw new Error('Something went wrong')
        }
      }
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email
          }
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }

        const token = sign({ userId: user.id }, APP_SECRET)
        const session = await context.prisma.session.create({
          data: {
            userId: user.id,
            token,
            data: '{"ip": "1.1.1.1", "device": "iPhoneXr"}'
          }
        })
        const generatedToken = session.id + '|' + token

        return {
          token: generatedToken,
          user
        }
      }
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        data: nonNull(
          arg({
            type: 'PostCreateInput'
          })
        )
      },
      resolve: (_, args, context: Context) => {
        const { userId }: any = getSessionInfo(context)
        return context.prisma.post.create({
          data: {
            title: args.data.title,
            content: args.data.content,
            authorId: userId
          }
        })
      }
    })
  }
})
 */
