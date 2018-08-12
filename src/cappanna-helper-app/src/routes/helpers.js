const isRouteActive = (routeName, match) => match.name === routeName;

const getActiveRoute = (routes, location) => routes.find(r => location.pathname.indexOf(r.path) > -1);

const getDefaultRoute = role => (role === "admin" ? "dashboard" : "order/new");

export { isRouteActive, getActiveRoute, getDefaultRoute };
