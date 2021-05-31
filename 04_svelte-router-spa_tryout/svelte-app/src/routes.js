import PublicLayout from './layouts/PublicLayout.svelte'
import AdminLayout from './layouts/AdminLayout.svelte'

import Login from './views/Login.svelte'
import Register from './views/Register.svelte'
import Home from './views/Home.svelte'

function userIsAdmin() {
  //check if user is admin and returns true or false
  return false;
}

const routes = [
  {
    name: '/',
    component: Home,
    layout: PublicLayout,
  },
  {
    name: '/login',
    component: Login,
    layout: AdminLayout
  },
  {
    name: '/admin',
    component: AdminLayout,
    onlyIf: { guard: userIsAdmin, redirect: '/login' },
  },
  {
    name: '/register',
    component: Register,
    layout: PublicLayout
  },
]

export { routes }