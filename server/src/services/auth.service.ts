import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { AuthDto } from '../dto/auth.dto';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { AccessTokenPayload } from '../interfaces/accessTokenPayload.interface';
import { RefreshTokenPayload } from '../interfaces/refreshTokenPayload.interface';


import bcrypt from 'bcryptjs';


export class AuthService {
  private userService: UserService = new UserService();
  private jwtService: JwtService = new JwtService();

  async register(userDto: UserDto): Promise<AuthResponse> {
    try {
      const { email } = userDto;

      const existingUser: User = await this.userService.findByEmail(email);

      if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
      }

      const newUser: User = await this.userService.create(userDto);

      const accessTokenPayload: AccessTokenPayload = {
        userId: newUser.id,
        email: newUser.email,
      };

      const refreshTokenPayload: RefreshTokenPayload = {
        userId: newUser.id,
      };

      const accessToken: string = this.jwtService.createAccessToken(accessTokenPayload);
      const refreshToken: string = this.jwtService.createRefreshToken(refreshTokenPayload);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  };

  async login(authDto: AuthDto): Promise<AuthResponse> {
    try {
      const {
        email,
        password,
      } = authDto;

      const existingUser: User = await this.userService.findByEmail(email);

      if (!existingUser) {
        throw new Error(`User with email ${email} not found.`);
      }

      const isCorrectPassword: boolean = await bcrypt.compare(password, existingUser.password);

      if (!isCorrectPassword) {
        throw new Error('Incorrect password.');
      };

      const accessTokenPayload: AccessTokenPayload = {
        userId: existingUser.id,
        email: existingUser.email,
      };

      const refreshTokenPayload: RefreshTokenPayload = {
        userId: existingUser.id,
      };

      const accessToken: string = this.jwtService.createAccessToken(accessTokenPayload);
      const refreshToken: string = this.jwtService.createRefreshToken(refreshTokenPayload);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error);
    }
  };

};
