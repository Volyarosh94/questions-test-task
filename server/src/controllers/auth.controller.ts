import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { ExtendedRequest } from '../interfaces/extendedRequest.interface';
import { handleErrorResponse } from '../utils/errorHandling/errorResponse.handler';

export class AuthController {
  private authService: AuthService = new AuthService();
  private jwtService: JwtService = new JwtService();

  async register(req: Request, res: Response): Promise<void> {
    try {
      const authResponse: AuthResponse = await this.authService.register(req.body);

      res.status(201).json(authResponse);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async login(req: Request, res: Response): Promise<void> {
    try {
      const authResponse: AuthResponse = await this.authService.login(req.body);

      res.status(200).json(authResponse);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async refreshToken(req: ExtendedRequest, res: Response): Promise<void> {
    try {
      const accessToken: string = await this.jwtService.refreshAccessToken(req.userId);

      res.status(200).json(accessToken);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

};
