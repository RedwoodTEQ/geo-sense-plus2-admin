import { ActionTree } from 'vuex'
import { StateInterface, OperationTypes } from '../index'
import { AreaStateInterface } from './state'
import { mutationTypes } from './mutations'

const actions: ActionTree<AreaStateInterface, StateInterface> = {
  addArea ({ commit }, rowData) {
    commit(mutationTypes.ADD_AREA, rowData)
  }
}

/**
 * All action local types in this module
 * Be noted that they will be convert to global types in `./src/store/areaModule/index.ts#actionGlobalTypes` when exporting to global scope.
 * @see {@link actionGlobalTypes}
 */
export const actionTypes: OperationTypes = {
  ADD_AREA: 'addArea'
}

export default actions
