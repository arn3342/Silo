export const AuthRoutes = {
  default: {
    name: '/auth',
  },
  init: {
    name: '/init',
  },
  AuthFlow: {
    name: '/authFlow',
    title: "Let's Start",
  },
  AuthVerify: {
    name: '/authVerify',
    title: 'Confirm Your Profile',
  },
}

export const AppRoutes = {
  default: {
    name: '/',
  },
  Main: {
    name: '/main',
    title: 'Home'
  },
}

export function getRoutes () {
  const allRoutes = [AuthRoutes, AppRoutes] // Keep adding routes in this array

  const returnable = []

  allRoutes.map(route =>
    Object.keys(route).map(nestedRoute => {
      returnable.push({...route[nestedRoute]})
    }),
  )

  return returnable
}
