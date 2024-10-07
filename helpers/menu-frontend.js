 const getMenuFrontEnd = ( role ) => {
  const menu = [
        {
          title: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/'},
            { title: 'ProgressBar', url: 'progress'},
            { title: 'Graphics', url: 'grafica1'},
            { title: 'Settings', url: 'account-settings'},
/*             { title: 'Promises', url: 'promises'},
            { title: 'Rxjs', url: 'rxjs'}, */
            { title: 'Profile', url: 'profile'}
          ]
        },
        {
          title: 'Maintenance',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { title: 'Hospitals', url: 'hospitals'},
            { title: 'Doctors', url: 'doctors'},
          ]
        }
        ]

        if ( role === 'ADMIN_ROLE' ) {
          menu[1].submenu.unshift({ title: 'Users', url: 'users' })
        }

        return menu;
}

module.exports = { getMenuFrontEnd }