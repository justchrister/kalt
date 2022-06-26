import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0f169b22 = () => interopDefault(import('../pages/authenticate.vue' /* webpackChunkName: "pages/authenticate" */))
const _68d7d00a = () => interopDefault(import('../pages/brand.vue' /* webpackChunkName: "pages/brand" */))
const _24b9e05a = () => interopDefault(import('../pages/questions/index.vue' /* webpackChunkName: "pages/questions/index" */))
const _2771c57f = () => interopDefault(import('../pages/roadmap.vue' /* webpackChunkName: "pages/roadmap" */))
const _44a6a2a2 = () => interopDefault(import('../pages/values.vue' /* webpackChunkName: "pages/values" */))
const _ed41059c = () => interopDefault(import('../pages/questions/style.vue' /* webpackChunkName: "pages/questions/style" */))
const _8c0bed84 = () => interopDefault(import('../pages/questions/_id/index.vue' /* webpackChunkName: "pages/questions/_id/index" */))
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
    path: "/authenticate",
    component: _0f169b22,
    name: "authenticate"
  }, {
    path: "/brand",
    component: _68d7d00a,
    name: "brand"
  }, {
    path: "/questions",
    component: _24b9e05a,
    name: "questions"
  }, {
    path: "/roadmap",
    component: _2771c57f,
    name: "roadmap"
  }, {
    path: "/values",
    component: _44a6a2a2,
    name: "values"
  }, {
    path: "/questions/style",
    component: _ed41059c,
    name: "questions-style"
  }, {
    path: "/questions/:id",
    component: _8c0bed84,
    name: "questions-id"
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
