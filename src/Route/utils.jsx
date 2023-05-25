import { authUser, authUserToken } from "../utils/Auth";

export const user = {
    name: "Arfin Foysal",
    role: authUser ? authUser : "all",
    token: authUserToken ? authUserToken : "",
}

const routes = [
      {
        path: '/dashboard/superadmin',
        role: 'superadmin'
    },
    {
        path: '/dashboard/admin',
        role: 'admin'
    },
    
    {
        path: '/dashboard/systemadmin',
        role: 'systemadmin'
    },
    {
        path: '/dashboard/developer',
        role: 'developer'
    },
  
    {
        path: '/dashboard/user',
        role: 'user'
    },
  
 // this is default route
    {
        path: '/login',
        role: 'all'
    }
    // this is default route
]

export const getPath = () => {
    const route = routes.find(r => r.role === user.role);
    return route.path
}