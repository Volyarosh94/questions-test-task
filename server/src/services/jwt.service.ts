import jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { AccessTokenPayload } from '../interfaces/accessTokenPayload.interface';
import { RefreshTokenPayload } from '../interfaces/refreshTokenPayload.interface';

const {
  JWT_SECRET_KEY,
  AUTH_ACCESS_TOKEN_EXPIRY,
  AUTH_REFRESH_TOKEN_EXPIRY,
} = process.env;

export class JwtService {
  private userService: UserService = new UserService();

  createAccessToken(accessTokenPayload: AccessTokenPayload): string {
    try {
      const accessToken: string = jwt.sign(accessTokenPayload, JWT_SECRET_KEY, { expiresIn: AUTH_ACCESS_TOKEN_EXPIRY });

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  };

  createRefreshToken(refreshTokenPayload: RefreshTokenPayload): string {
    try {
      const refreshToken: string = jwt.sign(refreshTokenPayload, JWT_SECRET_KEY, { expiresIn: AUTH_REFRESH_TOKEN_EXPIRY });

      return refreshToken;
    } catch (error) {
      throw new Error(error);
    }
  };

  async refreshAccessToken(userId: string): Promise<string> {
    try {
      const user: User = await this.userService.findById(userId);

      if (!user) {
        throw new Error(`User not found.`);
      }

      const accessTokenPayload: AccessTokenPayload = {
        userId: user.id,
        email: user.email,
      };

      return jwt.sign(accessTokenPayload, JWT_SECRET_KEY, { expiresIn: AUTH_ACCESS_TOKEN_EXPIRY });
    } catch (error) {
      throw new Error(error);
    }
  };

};
