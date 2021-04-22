import { verify } from 'jsonwebtoken'

import { Context } from './context'
import { SessionInfo, Token } from './typeDefs'

export const APP_SECRET = process.env.JWT_SECRET as string

export function getSessionInfo(context: Context): SessionInfo | undefined {
  const authHeader = context.req.get('Authorization')
  if (authHeader) {
    const tokenString = authHeader.replace('Bearer ', '')
    const [sessionId, token] = tokenString.split('|', 2)
    if (!sessionId || !token) throw new Error('Incorrect session detail')
    const verifiedToken = verify(token, APP_SECRET) as Token
    const data = {
      userId: Number(verifiedToken.userId),
      sessionId: Number(sessionId),
      token
    }
    return verifiedToken && data
  }
}

export function getToken(context: Context) {
  const authHeader = context.req.get('Authorization')
  if (authHeader) {
    return authHeader.replace('Bearer ', '')
  }
}

export async function getSessionUser(context: Context) {
  const { userId, sessionId }: any = getSessionInfo(context)

  if (userId) {
    const user = await context.prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new Error(`User not found`)
    }
    return user
  }
}
