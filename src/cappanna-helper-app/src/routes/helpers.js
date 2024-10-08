const isRouteActive = (routeName, match) => match.name === routeName;

const getActiveRoute = (routes, location) => routes.find((r) => location.pathname.indexOf(r.path) > -1);

const getDefaultRoute = (role) => {
    switch (role) {
        case "admin":
            return "/dashboard";

        case "dome":
        case "cashier":
            return "/order";

        default:
            return "/order/new";
    }
};

const isNewOrder = (location) => location.pathname === "/order/new";

export { isRouteActive, getActiveRoute, getDefaultRoute, isNewOrder };
