import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { EDashboardCapability } from '../../Domain/Enum/DashboardCapability.Enum.js';

export const DASHBOARD_CAPABILITY_KEY = 'dashboard_capability';

export function DashboardCapabilityGuard(
  tokenKey: string = 'AccessToken',
  capability: EDashboardCapability,
) {
  return applyDecorators(
    SetMetadata(DASHBOARD_CAPABILITY_KEY, { tokenKey, capability }),
    UseGuards(DashboardCapabilityGuard),
  );
}
