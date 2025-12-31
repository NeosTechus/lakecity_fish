const routes = {
  Home: '/',
  Menu: '/menu',
  Contact: '/contact',
  Checkout: '/checkout',
  OrderConfirmation: '/order-confirmation',
  UserNotRegisteredError: '/not-registered'
};

export function createPageUrl(pageName) {
  return routes[pageName] || '/';
}

export { routes };
