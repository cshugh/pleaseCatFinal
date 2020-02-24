import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../components/Test.vue'
import Login from '../components/member/login/PageLogin'
import SignUp from '../components/member/signup/PageSignUp'
import NewsFeed from '../components/newsfeed/NewsFeed.vue'
import PageCatList from '../components/catList/PageCatList.vue'
import PageCatProfile from '../components/catProfile/PageCatProfile.vue'
import AddPost from '../components/post/addPost/PageAddPost'
import PageCatDetail from '@/components/catProfile/PageCatDetail.vue'
import AddCat from '../components/post/addCat/PageAddCat'
import Comment from '../components/comment/Comment'
import PageDetailPost from '@/components/post/detailPost/PageDetailPost'
// import PageNearMap from '@/components/catMap/PageNearMap'
// import ModalParent from '../components/post/addPost/ModalParent'
import PageMyProfile from '@/components/userProfile/PageMyProfile'
import PageUserProfile from '@/components/userProfile/PageUserProfile'
import PageDashboard from '@/components/dashboard/PageDashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'Test',
    props: 6,
    component: Test
  },
  {
    path: '/',
    name: 'Login',
    props: 100,
    component: Login
  },
  {
    path: '/signUp',
    name: 'SignUp',
    props: 101,
    component: SignUp
  },
  {
    path: '/newsfeed',
    name: 'NewsFeed',
    props: 1,
    component: NewsFeed
  },
  {
    path: '/comment/:post_no',
    name: 'Comment',
    component: Comment
  },
  {
    path: '/detailPost/:post_no',
    name: 'DetailPost',
    props: 10,
    component: PageDetailPost
  },
  {
    path: '/catList',
    name: 'PageCatList',
    props: 2,
    component: PageCatList
  },
  {
    path: '/catProfile/:cat_no',
    name: 'PageCatProfile',
    props: 7,
    component: PageCatProfile
  },
  {
    path: '/addPost',
    name: 'AddPost',
    props: 3,
    component: AddPost
  },
  {
    path: '/catDetail/:cat_no',
    name: 'PageCatDetail',
    props: 9,
    component: PageCatDetail
  },
  {
    path: '/addcat',
    name: 'AddCat',
    component: AddCat
  },
  {
    path: '/myProfile',
    name: 'PageMyProfile',
    props: 5,
    component: PageMyProfile
  },
  {
    path: '/userProfile/:user_no',
    name: 'PageUserProfile',
    props: 8,
    component: PageUserProfile
  },
  {
    path: '/dashboard',
    name: 'PageDashboard',
    props: 4,
    component: PageDashboard
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/about/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
