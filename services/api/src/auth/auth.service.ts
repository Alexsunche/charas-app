import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { DbService } from '../db.service'
import { LoginDto, RegisterDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
  ) {}

  private async findUidByEmail(email: string): Promise<string | null> {
    const m = await this.db.get(`EMAIL#${email}`)
    return m?.uid || null
  }

  private async sign(uid: string, email: string) {
    const accessToken = await this.jwt.signAsync({ sub: uid, email }, { expiresIn: '1d' })
    return { accessToken }
  }

  async register(dto: RegisterDto) {
    const exist = await this.findUidByEmail(dto.email)
    if (exist) throw new BadRequestException('Email уже зарегистрирован')

    const uid = `u_${Date.now().toString(36)}`
    const passwordHash = await bcrypt.hash(dto.password, 10)

    // профиль пользователя в USER#uid
    await this.db.put({
      pk: `USER#${uid}`,
      userId: uid,
      email: dto.email,
      displayName: dto.displayName,
      passwordHash,
      createdAt: new Date().toISOString(),
    })
    // маппинг email → uid
    await this.db.put({ pk: `EMAIL#${dto.email}`, uid })

    const tokens = await this.sign(uid, dto.email)
    return { user: { userId: uid, email: dto.email, displayName: dto.displayName }, ...tokens }
  }

  async login(dto: LoginDto) {
    const uid = await this.findUidByEmail(dto.email)
    if (!uid) throw new UnauthorizedException('Неверный email или пароль')
    const user = await this.db.get(`USER#${uid}`)
    if (!user?.passwordHash) throw new UnauthorizedException('Неверный email или пароль')
    const ok = await bcrypt.compare(dto.password, user.passwordHash)
    if (!ok) throw new UnauthorizedException('Неверный email или пароль')
    const tokens = await this.sign(uid, dto.email)
    return { user: { userId: uid, email: dto.email, displayName: user.displayName }, ...tokens }
  }

  async me(uid: string) {
    const user = await this.db.get(`USER#${uid}`)
    if (!user) return null
    return { userId: user.userId, email: user.email, displayName: user.displayName }
  }
}
