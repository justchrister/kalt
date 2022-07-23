import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _781faf93 = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _66d6c025 = () => interopDefault(import('../pages/authenticate/index.vue' /* webpackChunkName: "pages/authenticate/index" */))
const _a61ae5f6 = () => interopDefault(import('../pages/invest/index.vue' /* webpackChunkName: "pages/invest/index" */))
const _79546fc8 = () => interopDefault(import('../pages/about/brand.vue' /* webpackChunkName: "pages/about/brand" */))
const _4677f29e = () => interopDefault(import('../pages/about/values.vue' /* webpackChunkName: "pages/about/values" */))
const _46fac148 = () => interopDefault(import('../pages/authenticate/kyc.vue' /* webpackChunkName: "pages/authenticate/kyc" */))
const _40770a72 = () => interopDefault(import('../pages/invest/transactions.vue' /* webpackChunkName: "pages/invest/transactions" */))
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
    path: "/about",
    component: _781faf93,
    name: "about"
  }, {
    path: "/authenticate",
    component: _66d6c025,
    name: "authenticate"
  }, {
    path: "/invest",
    component: _a61ae5f6,
    name: "invest"
  }, {
    path: "/about/brand",
    component: _79546fc8,
    name: "about-brand"
  }, {
    path: "/about/values",
    component: _4677f29e,
    name: "about-values"
  }, {
    path: "/authenticate/kyc",
    component: _46fac148,
    name: "authenticate-kyc"
  }, {
    path: "/invest/transactions",
    component: _40770a72,
    name: "invest-transactions"
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
