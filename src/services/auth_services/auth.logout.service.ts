import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSessionUser } from 'src/entities/auth_entities/auth.session.entity';
import { Response } from 'express';
import { ClearAuthCookies } from 'src/utils/cookies.util';

@Injectable()
export class AuthLogoutService {
  constructor(
    @InjectRepository(AuthSessionUser)
    private readonly sessionRepository: Repository<AuthSessionUser>,
  ) {}

  async logout(userId: number, res: Response): Promise<{ message: string }> {
    const session = await this.sessionRepository.findOne({
      where: {
        idtb_users: userId,
        is_revoked: false,
      },
    });

    if (!session) {
      throw new UnauthorizedException('Session invalid or already closed');
    }

    session.is_revoked = true;
    session.session_active = false;
    session.revoked_at = new Date();
    session.access_token = null;
    session.refresh_token = null;

    await this.sessionRepository.save(session);

    ClearAuthCookies(res);

    return { message: 'Logout successful' };
  }
}
