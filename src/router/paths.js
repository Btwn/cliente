/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  },
  {
    path: '/listaArchivos',
    name: 'Lista Archivos',
    view: 'ListaArchivos'
  },
  {
    path: '/acceso',
    name: 'Acceso',
    view: 'Acceso'
  },
  {
    path: '/relacion',
    name: 'Relacion de objetos',
    view: 'Relacion'
  },
  {
    path: '/codificar',
    name: 'Una sola codificacion',
    view: 'Codificar'
  },
  {
    path: '/especialesFix',
    name: 'Arreglar especiales',
    view: 'EspecialesFix'
  },
  {
    path: '/ventanaTipoMarco',
    name: 'Arreglar los marcos',
    view: 'VentanaTipoMarco'
  },
  {
    path: '/fondoNegro',
    name: 'Arreglar fondo negro',
    view: 'FondoNegro'
  },
  {
    path: '/menuPrincipal',
    name: 'Re-acomodar Menu',
    view: 'MenuPrincipal'
  }
]
