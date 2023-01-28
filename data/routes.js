export const AuthRoutes = {
  default: {
    name: '/auth',
  },
  AuthFlow: {
    name: '/authFlow',
    title: "Let's Start",
  },
  AuthVerify: {
    name: '/authVerify',
    title: "Confirm Your Profile",
  },
}

export const AppRoutes = {
  default: '/',
}

export function getRoutes(){
  const allRoutes = [AuthRoutes] // Keep adding routes in this array

  const returnable = []

  allRoutes.map(route => Object.keys(route).map(nestedRoute => {
    returnable.push({...route[nestedRoute]})
  }))

  return returnable
} 