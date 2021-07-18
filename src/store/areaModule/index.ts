import { AugmentedModule } from '../index'

import state, { State } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export { localTypes as GetterLocalTypes } from './getters'
export { localTypes as ActionLocalTypes } from './actions'
export { localTypes as MutationLocalTypes } from './mutations'

const areaModule: AugmentedModule<State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  // Vuex registers modules by their name
  // Module name is also used as the namespace in global type.
  // TODO: How to avoid duplicate naming?
  name: 'area'
}

export default areaModule
