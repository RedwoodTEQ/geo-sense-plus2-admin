import { store } from 'quasar/wrappers'
// eslint-disable-next-line no-unused-vars
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore
} from 'vuex'

/** Area module */
import areaModule, {
  getterGlobalTypes as areaGetterGlobalTypes,
  actionGlobalTypes as areaActionGlobalTypes
} from './areaModule'
import { AreaStateInterface } from './areaModule/state'
export { AreaData } from './areaModule/state'

/**
 * Name mapping of modules in store
 */
export const ModuleMapping = {
  area: 'area'
}

/**
 * For type collection of action, mutation, getter and setter.
 */
export interface OperationTypes {[key: string]: string}

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
  area: AreaStateInterface
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
      [ModuleMapping.area]: areaModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  console.log('DEBUG >> store index createStore >> ', Store)
  console.trace()

  return Store
})

// Todo: Can not get store reference in computed methods of a Vue page/component. Look into AreasPage.vue.
export function useStore () {
  console.log('storeKey:', storeKey)
  return vuexUseStore(storeKey)
}

/**
 * Export all mutations types in all modules
 * Todo: Do we need to export all mutations to app? Maybe only export global mutations. Others mutations should be local, being called by global actions.
 */
export const mutationTypes : {[key: string]: OperationTypes} = {
}

/**
 * Export all getter types in all modules
 * todo: Do we need to export all getter to app?
 */
export const getterTypes: {[key: string]: OperationTypes} = {
  area: areaGetterGlobalTypes
}

/**
 * Export all getter types in all modules
 * todo: Do we need to export all getter to app? Maybe.
 */
export const actionTypes: {[key: string]: OperationTypes} = {
  area: areaActionGlobalTypes
}
