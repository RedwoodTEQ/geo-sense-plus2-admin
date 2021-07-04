import { MutationTree } from 'vuex'
import { ExampleStateInterface } from './state'

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },

  addArea (state: ExampleStateInterface, rowData) {
    state.areas.rows.push(rowData)
  }
}

/**
 * All mutation types in this module
 */
export const mutationTypes = {
  ADD_AREA: 'example/addArea'
}

export default mutation
