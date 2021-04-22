import { inputObjectType, objectType } from 'nexus'
import { Context } from '../../context'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined }
          })
          .posts()
      }
    })
  }
})

export const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  }
})

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('name')
    t.string('password')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  }
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  }
})
