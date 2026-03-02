/**
 * Types pour le système de gestion des permissions
 */

/**
 * Rôles utilisateurs disponibles dans l'application
 */
export type UserRole = 'Administrator' | 'Scientist' | 'User';

/**
 * Noms des routes protégées
 */
export type ProtectedRoute =
  | 'UserDashboard'
  | 'UserData'
  | 'UserPreferences'
  | 'UserSettings'
  | 'AdminPanel'
  | 'Research'
  | 'DataManagement'
  | 'Statistics'
  | 'ScientistManagement';

/**
 * Configuration des permissions pour un rôle
 */
export interface RolePermissions {
  routes: ProtectedRoute[];
  canManageUsers?: boolean;
  canExportData?: boolean;
  canViewAnalytics?: boolean;
}

/**
 * Configuration complète des permissions par rôle
 */
export type PermissionsConfig = Record<UserRole, RolePermissions>;
