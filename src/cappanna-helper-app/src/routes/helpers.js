const isRouteActive = (routeName, location) =>
  location.pathname.indexOf(routeName) > -1 ? true : false;

const getActiveRoute = (routes, location) => {
  var matching = routes.filter(r => location.pathname.indexOf(r.path) > -1);
  return matching && matching.length > 0 ? matching[0] : undefined;
};

export { isRouteActive, getActiveRoute };
