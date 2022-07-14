import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d87e7ece = () => interopDefault(import('../pages/@username.vue' /* webpackChunkName: "pages/@username" */))
const _47eb3510 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _66d6c025 = () => interopDefault(import('../pages/authenticate/index.vue' /* webpackChunkName: "pages/authenticate/index" */))
const _68d7d00a = () => interopDefault(import('../pages/brand.vue' /* webpackChunkName: "pages/brand" */))
const _2771c57f = () => interopDefault(import('../pages/roadmap.vue' /* webpackChunkName: "pages/roadmap" */))
const _44a6a2a2 = () => interopDefault(import('../pages/values.vue' /* webpackChunkName: "pages/values" */))
const _46fac148 = () => interopDefault(import('../pages/authenticate/kyc.vue' /* webpackChunkName: "pages/authenticate/kyc" */))
const _67a30fd5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/@username",
    component: _d87e7ece,
    name: "@username"
  }, {
    path: "/about",
    component: _47eb3510,
    name: "about"
  }, {
    path: "/authenticate",
    component: _66d6c025,
    name: "authenticate"
  }, {
    path: "/brand",
    component: _68d7d00a,
    name: "brand"
  }, {
    path: "/roadmap",
    component: _2771c57f,
    name: "roadmap"
  }, {
    path: "/values",
    component: _44a6a2a2,
    name: "values"
  }, {
    path: "/authenticate/kyc",
    component: _46fac148,
    name: "authenticate-kyc"
  }, {
    path: "/",
    component: _67a30fd5,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
