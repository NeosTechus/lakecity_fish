const routes = {
  Home: "/",
  Menu: "/menu",
  Contact: "/contact",
  Checkout: "/checkout",
  Login: "/login",
  AdminDashboard: "/admin",
  KitchenDashboard: "/kitchen",
  UserNotRegisteredError: "/not-registered",
};

export function createPageUrl(pageName) {
  return routes[pageName] || "/";
}

export { routes };
