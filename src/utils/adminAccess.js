export const hasAdminPermission = (user, permission) => {
  if (user?.role !== 'admin') {
    return false;
  }

  if (user?.isSuperAdmin) {
    return true;
  }

  return Array.isArray(user?.permissions) && user.permissions.includes(permission);
};

export const hasAnyAdminPermission = (user, permissions = []) =>
  permissions.some((permission) => hasAdminPermission(user, permission));

const adminRouteRules = [
  { test: (path) => path === '/' || path === '/dashboard', permission: 'dashboard.view' },
  { test: (path) => path.startsWith('/buyer-management'), permission: 'users.read' },
  { test: (path) => path.startsWith('/supplier-management'), permission: 'suppliers.read' },
  { test: (path) => path.startsWith('/listings'), permission: 'listings.manage' },
  { test: (path) => path.startsWith('/categories'), permission: 'categories.manage' },
  { test: (path) => path.startsWith('/subscriptions'), permission: 'subscriptions.read' },
  { test: (path) => path.startsWith('/rfq-management'), permission: 'rfqs.read' },
  { test: (path) => path.startsWith('/content'), permission: 'content.manage' },
  { test: (path) => path.startsWith('/seo'), permission: 'seo.manage' },
  { test: (path) => path.startsWith('/revenue'), permission: 'revenue.view' },
  { test: (path) => path === '/settings/roles', permission: 'roles.manage' },
  { test: (path) => path === '/settings/notifications', permission: 'notifications.manage' },
  { test: (path) => path.startsWith('/settings'), permission: 'settings.manage' },
];

export const canAccessAdminPath = (user, path) => {
  if (user?.role !== 'admin') {
    return true;
  }

  const matchedRule = adminRouteRules.find((rule) => rule.test(path));
  if (!matchedRule) {
    return true;
  }

  return hasAdminPermission(user, matchedRule.permission);
};

export const getFirstAccessibleAdminRoute = (user) => {
  const candidateRoutes = [
    '/dashboard',
    '/buyer-management',
    '/supplier-management',
    '/listings',
    '/categories',
    '/subscriptions',
    '/rfq-management',
    '/content',
    '/seo',
    '/revenue',
    '/settings',
  ];

  return candidateRoutes.find((path) => canAccessAdminPath(user, path)) || '/sign-in';
};
