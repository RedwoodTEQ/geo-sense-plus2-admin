import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ExampleStateInterface } from './state'
import { mutationTypes } from './index'

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  },

  addArea ({ commit }, rowData) {
    commit(mutationTypes.ADD_AREA, rowData)
  }
}

/**
 * All mutation types in this module
 */
export const actionTypes = {
  ADD_AREA: 'example/addArea'
}

export default actions
