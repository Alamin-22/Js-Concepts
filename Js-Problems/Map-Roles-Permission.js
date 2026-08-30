/* 
Given an array of requested actions and a user's permissions object, 
write a function that returns an array of "Granted" or "Denied" strings for each action in the order they were requested.
*/

const userPermissions = {
  canRead: true,
  canWrite: false,
  canDelete: false,
};

const requestedActions = ["canRead", "canWrite", "canDelete", "canExecute"];

const checkPermission = (permissions, action) => {
  if (permissions[action] !== true) {
    return "Denied";
  }

  return "Granted";
};

// let ArryOfResult = [];

// using forEach Appraoch where I need to define an Array First
// requestedActions.forEach((action) => {
//   const result = checkPermission(userPermissions, action);

//   //   const obj = { action : result };

//   //   console.log(obj);
//   ArryOfResult.push({ [action]: result });
// });

// we can get the same result using map like this

const ArryOfResult = requestedActions.map((action) => {
  return checkPermission(userPermissions, action);
});

console.log(ArryOfResult);
