// Components
import Home from './routes/Home.svelte'
import Name from './routes/Name.svelte'
import Wild from './routes/Wild.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default [
    {
      name: '/',
      component: Home,
    },
    {
      name: '/hello/:first/:last?',
      component: Name,
    },
    {
      name: '/wild',
      component: Wild,
    },
    {
      name: '/wild/:card',
      component: Wild,
    },
    {
      name: '404',
      component: NotFound,
    },
]

