import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const RoleAuth = (...role: string[]) => SetMetadata(ROLE_KEY, role);
