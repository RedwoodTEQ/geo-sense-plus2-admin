import { store } from 'quasar/wrappers'
// eslint-disable-next-line no-unused-vars
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore
} from 'vuex'

import example, {
  mutationTypes as exampleMutationTypes,
  getterTypes as exampleGetterTypes,
  actionTypes as exampleActionTypes
} from './module-example'
import { ExampleStateInterface } from './module-example/state'

export interface AreaData {
  id: number;
  name: string;
  edgeID: string;
  floorID: string;
  assetsCount: number;
  lastUpdated: string;
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.

  // example: unknown
  example: ExampleStateInterface
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}

/**
 * Export all mutations types in all modules
 * todo: Do we need to export all mutations to app?
 */
export const mutationTypes = {
  exampleModule: exampleMutationTypes
}

/**
 * Export all getter types in all modules
 * todo: Do we need to export all getter to app?
 */
export const getterTypes = {
  exampleModule: exampleGetterTypes
}

/**
 * Export all getter types in all modules
 * todo: Do we need to export all getter to app? Maybe.
 */
export const actionTypes = {
  exampleModule: exampleActionTypes
}
