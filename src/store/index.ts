import { store } from 'quasar/wrappers'
// eslint-disable-next-line no-unused-vars
import { InjectionKey } from 'vue'
import {
  createStore, useStore as vuexUseStore, Store as VuexStore
} from 'vuex'

/** Area module */
import areaModule from './areaModule'
import { State as AreaStateInterface } from './areaModule/state'

export { AreaData, AreaStateInterface } from './areaModule/state'
export {
  GetterLocalTypes as areaGetterLocalTypes,
  ActionLocalTypes as areaActionLocalTypes,
  MutationLocalTypes as areaMutationLocalTypes
} from './areaModule'

export * from './type'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

/**
 * Name mapping of all modules in root store
 * TODO: A collection of operations, meta data of modules?
 */
export const moduleNames = {
  area: areaModule.name
}

const areaSymbol = Symbol(moduleNames.area)

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.

  // example: unknown

  // FIXME: Don't find a transpile success solution so far.
  // 1. Define `[key:string]: any`, then use computed string as property.
  // Get error: TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type
  // 2. Use computed symbol as property. Call `state[moduleNames.area]` in vue page.
  // Get error in browser: [webpack-dev-server] TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'StateInterface'.
  // 3. Define `[key:string]: any`. Use computed symbol as property. Call `state[moduleNames.area]` in vue page.
  // Works well, but seems tricky?

  // TODO: We know that to get module state from global store the code is `this.$store.state.moduleA`
  // `moduleA` is defined by
  // ```
  //   const Store = createStore<StateInterface>({
  //     modules: {
  //       moduleA: moduleA
  //     },
  //   })
  // ```
  // ?? What the meanning of keys in this interface? By testing, those properties don't have to match properties in createStore()#modules.

  [key: string]: any

  readonly [areaSymbol]: AreaStateInterface
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
      [moduleNames.area]: areaModule
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
 * Assemble global type.
 * TODO: Type guard?
 * @param localType
 * @param moduleNames
 */
export function getGlobalType (localType: string, moduleNames: string): string {
  return `${moduleNames}/${localType}`
}
