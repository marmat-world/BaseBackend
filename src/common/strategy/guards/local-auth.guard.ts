import { AuthGuard } from '@nestjs/passport';
import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}