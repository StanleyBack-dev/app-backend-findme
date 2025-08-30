import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSessionUser } from 'src/entities/auth_entities/auth.session.entity';
import { User } from '../../entities/users_entities/users.entity';

@Injectable()
export class AuthCreateSessionService {
  constructor(
    @InjectRepository(AuthSessionUser)
    private readonly authSessionRepo: Repository<AuthSessionUser>,
  ) {}

  async createSession(data: {
    user: User;
    accessToken: string;
    refreshToken: string;
    ipAddress: string;
    userAgent: string;
    deviceName: string;
    refreshTokenExpiresAt: Date;
  }) {
    const session = this.authSessionRepo.create({
      idtb_users: data.user.idtb_users,
      access_token: data.accessToken,
      refresh_token: data.refreshToken,
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      device_name: data.deviceName,
      refresh_token_expires_at: data.refreshTokenExpiresAt,
      session_active: true,
      is_revoked: false,
    });

    return this.authSessionRepo.save(session);
  }
}
