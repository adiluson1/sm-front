declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// typings/custom.d.ts
declare module "worker-loader*" {
  class WebpackWorker extends Worker {
    constructor()
  }

  export = WebpackWorker
}

declare module 'vue-virtual-scroll-list'
