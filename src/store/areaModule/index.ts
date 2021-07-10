import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { AreaStateInterface } from './state'
import actions, { actionTypes } from './actions'
import getters, { getterTypes } from './getters'
import mutations from './mutations'

const areaModule: Module<AreaStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

/**
 * Global types of actions in this module
 */
export const actionGlobalTypes = Object.assign({}, actionTypes)
Object.entries(actionGlobalTypes).forEach(entry => {
  const key = entry[0]
  const value = entry[1]
  actionGlobalTypes[key] = `area/${value}`
})

/**
 * Getter types of getter in this module
 */
export const getterGlobalTypes = Object.assign({}, getterTypes)
Object.entries(getterGlobalTypes).forEach(entry => {
  const key = entry[0]
  const value = entry[1]
  getterGlobalTypes[key] = `area/${value}`
})

export { mutationTypes } from './mutations'

export default areaModule
