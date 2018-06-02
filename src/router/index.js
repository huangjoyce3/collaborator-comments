import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import FormList from '@/components/FormList'
import TableComponent from 'vue-table-component'
import '../index.css'

Vue.use(TableComponent, {
    tableClass: 'tableClass',
    theadClass: '',
    tbodyClass: '',
    filterPlaceholder: 'Filter table…',
    filterNoResults: 'There are no matching rows',
});

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth',
      component: SignIn
    },
    {
      path: '/home',
      name: 'home',
      component: FormList
    }
  ]
})
