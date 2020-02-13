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
import PageAddCat from '../components/post/addCat/PageAddCat'
import Comment from '../components/comment/Comment'
import PageDetailPost from '@/components/post/detailPost/PageDetailPost'
// import PageNearMap from '@/components/catMap/PageNearMap'
import ModalParent from '../components/post/addPost/ModalParent'
import PageNearMap from '@/components/map/PageNearMap'
import PageMyProfile from '@/components/userProfile/PageMyProfile'
import PageUserProfile from '@/components/userProfile/PageUserProfile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/',
    name: 'NewsFeed',
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
    component: PageDetailPost
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/nearMap',
    name: 'PageNearMap',
    component: PageNearMap
  },
  {
    path: '/catList',
    name: 'PageCatList',
    component: PageCatList
  },
  {
    path: '/catProfile/:cat_no',
    name: 'PageCatProfile',
    component: PageCatProfile
  },
  {
    path: '/addPost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/catDetail/:cat_no',
    name: 'PageCatDetail',
    component: PageCatDetail
  },
  {
    path: '/addCat',
    name: 'PageAddCat',
    component: PageAddCat
  },
  {
    path: '/modalParent',
    name: 'ModalParent',
    component: ModalParent
  },
  {
    path: '/myProfile',
    name: 'PageMyProfile',
    component: PageMyProfile
  },
  {
    path: '/userProfile/:user_no',
    name: 'PageUserProfile',
    component: PageUserProfile
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
  routes
})

export default router
