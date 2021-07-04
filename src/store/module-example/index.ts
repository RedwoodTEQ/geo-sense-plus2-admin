import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { ExampleStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const exampleModule: Module<ExampleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export { mutationTypes } from './mutations'
export { getterTypes } from './getters'
export { actionTypes } from './actions'

export default exampleModule
