// Look at this simple function that checks if a user has a specific permission based on an object configuration.
// Fill in the logic for checkAccess using standard object lookup (permissions[action]). How would you write that short condition?

const userPermissions = {
  canRead: true,
  canWrite: false,
  canDelete: false,
};

const checkPermission = (permissions, action) => {
  if (permissions[action] !== true) {
    return "Denied";
  }

  return "Granted";
};

const result = checkPermission(userPermissions, "canRead");
console.log(result);
