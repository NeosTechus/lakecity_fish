const routes = {
  Home: "/",
  Menu: "/menu",
  Contact: "/contact",
  UserNotRegisteredError: "/not-registered",
};

export function createPageUrl(pageName) {
  return routes[pageName] || "/";
}

export { routes };
