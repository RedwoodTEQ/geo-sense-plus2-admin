import { MutationTree } from 'vuex'
import { AreaStateInterface } from './state'
import { OperationTypes } from '../index'

const mutation: MutationTree<AreaStateInterface> = {
  addArea (state: AreaStateInterface, rowData) {
    state.rows.push(rowData)
  }
}

/**
 * All mutation local types in this module
 */
export const mutationTypes: OperationTypes = {
  ADD_AREA: 'addArea'
}

export default mutation
