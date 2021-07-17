import {
  ActionImplementations, MutationImplementations, GetterImplementations,
  AugmentedModule, OperationTypes
} from '../index'

import state, { State } from './state'
import actions, { IActions } from './actions'
import getters, { IGetters } from './getters'
import mutations, { IMutations } from './mutations'

const areaModule: AugmentedModule<State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  name: 'area'
}

type Implementations =
  ActionImplementations<IActions, State> |
  MutationImplementations<IMutations, State> |
  GetterImplementations<IGetters, State>

/**
 * Generate global types by given implementations.
 * @param implementations
 */
function generateGlobalTypes (implementations: Implementations) {
  const globalTypes: OperationTypes = {}
  Object.keys(implementations).forEach(key => {
    globalTypes[key] = `${areaModule.name}/${key}`
  })

  return globalTypes
}

/**
 * Global mutation types
 */
export const mutationGlobalTypes = generateGlobalTypes(mutations)

/**
 * Global action types
 */
export const actionGlobalTypes = generateGlobalTypes(actions)

/**
 * Global getter types
 */
export const getterGlobalTypes = generateGlobalTypes(getters)

export default areaModule
