export { default as About } from '../../components/home/About.vue'
export { default as Notes } from '../../components/home/Notes.vue'
export { default as Tools } from '../../components/home/Tools.vue'
export { default as Comments } from '../../components/blog/Comments.vue'
export { default as NavBar } from '../../components/partials/NavBar.vue'
export { default as PageFooter } from '../../components/partials/PageFooter.vue'
export { default as Support } from '../../components/partials/Support.vue'

export const LazyAbout = import('../../components/home/About.vue' /* webpackChunkName: "components/about" */).then(c => c.default || c)
export const LazyNotes = import('../../components/home/Notes.vue' /* webpackChunkName: "components/notes" */).then(c => c.default || c)
export const LazyTools = import('../../components/home/Tools.vue' /* webpackChunkName: "components/tools" */).then(c => c.default || c)
export const LazyComments = import('../../components/blog/Comments.vue' /* webpackChunkName: "components/comments" */).then(c => c.default || c)
export const LazyNavBar = import('../../components/partials/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => c.default || c)
export const LazyPageFooter = import('../../components/partials/PageFooter.vue' /* webpackChunkName: "components/page-footer" */).then(c => c.default || c)
export const LazySupport = import('../../components/partials/Support.vue' /* webpackChunkName: "components/support" */).then(c => c.default || c)
