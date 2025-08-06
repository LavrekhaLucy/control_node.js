export const permissionsData = [
    { code: 'view_dashboard', description: 'Доступ до дашборду' },
    { code: 'ban_user', description: 'Бан користувачів' },
    { code: 'delete_post', description: 'Видалення постів' },
    { code: 'manage_roles', description: 'Керування ролями' },
];

export const rolesData = [
    {
        name: 'buyer',
        scope: 'platform',
        permissions: [],
    },
    {
        name: 'seller',
        scope: 'platform',
        permissions: ['delete_post'],
    },
    {
        name: 'manager',
        scope: 'platform',
        permissions: ['view_dashboard', 'ban_user'],
    },
    {
        name: 'admin',
        scope: 'platform',
        permissions: ['view_dashboard', 'ban_user', 'delete_post', 'manage_roles'],
    },
];
