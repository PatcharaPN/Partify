import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  // ฉีด JwtService เข้ามาใช้ใน Guard
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ดึง HTTP Request object ออกมาจาก context (เพื่อเข้าถึง headers, body ฯลฯ)
    const request = context.switchToHttp().getRequest<Request>();
    // ดึง token ออกจาก Authorization header
    const token = this.extractToken(request);
    // ถ้าไม่มี token == 401

    if (!token) {
      (request as any)['user'] = null;
      return true;
    }
    try {
      // verify token + decode payload
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, //ใช้ SECRET เดียวกันกับตอน sign token
      });
      // ใส่ user payload เข้าไปใน request
      request['user'] = payload;
      //เพื่อให้ Controller เรียกใช้ผ่าน @Request , req.user ได้
    } catch (error) {
      //token ผิด หรือหมดอายุ หรือมีการแก้ไข จะตีกลับ 401 ไป client
      request['user'] = null;
    }
    //ถ้าผ่านหมด Return True
    return true;
  }

  private extractToken(request: Request): string | null {
    // Authorization header มีรูปแบบ "Bearer <token>"
    //แยก Bearer มาเป็น Key และ Value เป็น Token
    //ถ้า Request ที่ส่งมาไม่มี Header เลย -> [] กัน Undefined
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //เช็คว่าเป็น Bearer schema เท่านั้น
    //ถ้าใช่ return token / ถเาไม่ใช้ return null
    return type === 'Bearer' ? token : null;
  }
}
