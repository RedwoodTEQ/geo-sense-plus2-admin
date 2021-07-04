import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ExampleStateInterface } from './state'

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  },
  areasCount (state) {
    return state.areas.rows.length
  }
}

/**
 * All getter types in this module
 */
export const getterTypes = {
  AREAS_COUNT: 'example/areasCount'
}

export default getters
