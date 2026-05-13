export type UserRole = 'Administrator' | 'Scientist' | 'User';

export type BackendRole = 'admin' | 'scientist' | 'user';

export function mapBackendRole(backendRole: BackendRole): UserRole {
  const mapping: Record<BackendRole, UserRole> = {
    admin: 'Administrator',
    scientist: 'Scientist',
    user: 'User',
  };
  return mapping[backendRole] ?? 'User';
}

export type ProtectedRoute =
  | 'UserDashboard'
  | 'UserData'
  | 'UserPreferences'
  | 'UserSettings'
  | 'AdminPanel'
  | 'Research'
  | 'DataManagement'
  | 'Statistics'
  | 'ScientistManagement'
  | 'VpnInstallation';

export interface RolePermissions {
  routes: ProtectedRoute[];
  canManageUsers?: boolean;
  canExportData?: boolean;
  canViewAnalytics?: boolean;
}

export type PermissionsConfig = Record<UserRole, RolePermissions>;
