import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import Login from "../pages/Login/Login.vue";
import Home from "../pages/Home/Home.vue";
import Profile from "../pages/Profile/Profile.vue";
import Layout from "../pages/Layout/Layout.vue";
import Admins from "../pages/Admins/Admins.vue";
import Admin from "../pages/Admins/Admin/Admin.vue";
import NewAdmin from "../pages/Admins/NewAdmin/NewAdmin.vue";
import Roles from "../pages/Roles/Roles.vue";
import NewRole from "../pages/Roles/NewRole/NewRole.vue";
import Role from "../pages/Roles/Role/Role.vue";
import EditRole from "../pages/Roles/EditRole/EditRole.vue";
import EditAdminRole from "../pages/Admins/EditAdminRole/EditAdminRole.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },
    // {
    //   path: "/admin",
    //   component: Home
    // },
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "admin",
          component: Home
        },
        {
          path: "admin/profile",
          component: Profile
      },
      {
          path: "admin/admin",
          component: Admins
      },
      {
          path: "admin/admin/new",
          component: NewAdmin
      },
      {
          path: "admin/admin/:id",
          component: Admin
      },
      {
          path: "admin/admin/:id/edit",
          component: EditAdminRole
      },
      {
          path: "admin/role",
          component: Roles
      },
      {
          path: "admin/role/new",
          component: NewRole
      },
      {
          path: "admin/role/:id",
          component: Role
      },
      {
          path: "admin/role/:id/edit",
          component: EditRole
      },
      



      ]
    },
  ]
})

export default router
