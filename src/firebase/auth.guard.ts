import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente ou malformado');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = await this.authService.verifyToken(token);
      req.user = decodedToken;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
