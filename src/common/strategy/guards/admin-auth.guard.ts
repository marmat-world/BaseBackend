import { AuthGuard } from '@nestjs/passport';
import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AdminAuthGuard extends AuthGuard('local') {}