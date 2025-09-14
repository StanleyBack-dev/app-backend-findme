import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePassword } from 'src/utils/hash.util';
import { SetAuthCookies } from 'src/utils/cookies.util';
import { LoginResquestDto } from 'src/dto/auth_dto/auth_dto_login/auth.dto.login.request';
import { GetUsersDto } from 'src/dto/users_dto/users_dto_get/users.dto.get.response';
import { UsersFindService } from '../users_services/users.find.service';
import { AuthCreateSessionService } from './auth.create.session.service';
import { UsersUpdateService } from '../users_services/users.update.service';
import { Response } from 'express';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersFindService: UsersFindService,
    private readonly authCreateSessionService: AuthCreateSessionService,
    private readonly usersUpdateService: UsersUpdateService,
  ) {}

  async login(
    loginInput: LoginResquestDto,
    ipAddress: string,
    userAgent: string,
    deviceName: string,
    res: Response,
  ) {
    const { username, password } = loginInput;

    const user = await this.usersFindService.getByUsernameAndCustomers(username);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await ComparePassword(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    this.usersUpdateService.updateLastLogin(user.idtb_users);

    const payload = {
      sub: user.idtb_users,
      email: user.email,
      tenantId: user.idtb_customers,
      publicId: user.public_id_users,
      role: user.idtb_roles,
      username: user.username,
      status: user.status
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    await this.authCreateSessionService.createSession({
      user,
      accessToken,
      refreshToken,
      ipAddress,
      userAgent,
      deviceName,
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    SetAuthCookies(res, refreshToken, accessToken);

    return {
      accessToken,
      user: {
        idtb_users: user.idtb_users,
        tenantId: user.idtb_customers,
        username: user.username,
        role: user.role,
      } as GetUsersDto,
    };
  }
}