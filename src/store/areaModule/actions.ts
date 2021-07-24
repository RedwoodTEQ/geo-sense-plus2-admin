import { ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { State, AreaData } from './state'
import {
  ActionLocalTypes,
  ActionImplementations,
  OperationReturn
} from '../type'
import { localTypes as mutationLocalTypes, IMutations } from './mutations'

/**
 * Define parameters type of `commit` in action context.
 * Parameters type of `commit` are restricted by {@link IMutations}
 */
type AugmentedActionContext = {
  commit<K extends keyof IMutations> (
    key: K,
    payload: Parameters<IMutations[K]>[1]
  ): ReturnType<IMutations[K]>
} & Omit<ActionContext<State, StateInterface>, 'commit'>

/**
 * Define essential mutations
 * Todo: Implementation of promising return data type.
 */
export interface IActions {
  ADD_AREA ({ commit }: AugmentedActionContext, payload: AreaData): Promise<OperationReturn>
}

/**
 * Local types.
 * Key and value have to be the same as corresponding key of {@link IActions}. Otherwise get transpile error.
 */
export const localTypes: ActionLocalTypes<IActions> = {
  ADD_AREA: 'ADD_AREA'
}

/**
 * Implementation of actions.
 * All actions inside {@link IActions} have to be implemented.
 * There could be actions which are not listed in {@link IActions}.
 * Todo: A promise for RESTFull API
 * Todo: How to do type guard for the return promising?
 */
const actions: ActionImplementations<IActions, State> = {
  ADD_AREA ({ commit, state }: AugmentedActionContext, rowData: AreaData) {
    return new Promise((resolve) => {
      if (isExist(state, rowData.edgeID)) {
        resolve({ result: false, message: 'Row is exist.' })
      } else {
        commit(mutationLocalTypes.ADD_AREA, rowData)
        resolve({ result: true })
      }
    })
  }
}

function isExist (state: State, id: string): boolean {
  return !!(state.rows.find(row => { return row.edgeID === id }))
}

export default actions
