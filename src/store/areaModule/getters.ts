import { GetterTree } from 'vuex'
import { StateInterface, OperationTypes } from '../index'
import { AreaStateInterface } from './state'

const getters: GetterTree<AreaStateInterface, StateInterface> = {
  areasCount (state) {
    return state.rows.length
  }
}

/**
 * All getter types in this module
 * Be noted that they will be convert to global types in `./src/store/areaModule/index.ts#getterGlobalTypes` when exporting to global scope.
 * @see {@link getterGlobalTypes}
 */
export const getterTypes: OperationTypes = {
  AREAS_COUNT: 'areasCount'
}

export default getters
