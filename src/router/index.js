import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import FormList from '@/components/FormList'
import Assign from '@/components/Assign'
import Wordbank from '@/components/Wordbank'
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
      path: "/",
      redirect: {
          name: "home"
      }
    },
    {
      path: '/home',
      name: 'home',
      component: FormList
    },
    {
      path: '/assign',
      name: 'assign',
      component: Assign
    },
    {
      path: '/wordbank',
      name: 'wordbank',
      component: Wordbank
    }
    
  ]
})
