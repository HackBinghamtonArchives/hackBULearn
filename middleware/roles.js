/**
 * Permission Levels
 * ╔════╦═══════════════╦════════════════╗
 * ║ ID ║     Role      ║  Permissions   ║
 * ╠════╬═══════════════╬════════════════╣
 * ║  0 ║ Superuser     ║ Read/Write/Own ║
 * ║  1 ║ Administrator ║ Read/Write     ║
 * ║  2 ║ Facilitator   ║ Read           ║
 * ║  3 ║ Member        ║ Read           ║
 * ╚════╩═══════════════╩════════════════╝
 */

const roles = [
  'superuser',
  'administrator',
  'facilitator',
  'member'
];

module.exports = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || !req.user)
      return next(new Error('Access Denied'));

    const currentRole = roles.indexOf(req.user['permission']);
    if(currentRole === -1) return next(new Error('Access Denied'));

    const requiredRole = roles.indexOf(role);
    if(requiredRole === -1) throw new Error('Role does not exist');

    if(currentRole > requiredRole) {
      res.status(401);
      return next(new Error('Access Denied'));
    }

    return next();
  }
}
