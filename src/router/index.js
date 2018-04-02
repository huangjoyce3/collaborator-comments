import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import FormList from '@/components/FormList'

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
