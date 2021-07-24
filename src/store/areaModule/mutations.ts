import { State, AreaData } from './state'
import { MutationLocalTypes, MutationImplementations } from '../type'

/**
 * Define mutations
 */
export interface IMutations<S = State> {
  ADD_AREA (state: S, payload: AreaData): void
}

/**
 * Local types.
 * Key and value have to be the same as corresponding key of {@link IMutations}. Otherwise get transpile error.
 */
export const localTypes: MutationLocalTypes<IMutations> = {
  ADD_AREA: 'ADD_AREA'
}

/**
 * Implementation of {@link IMutations}.
 * All defined mutations have to be implemented.
 */
const mutations: MutationImplementations<IMutations, State> = {
  ADD_AREA (state: State, rowData: AreaData) {
    if (!isExist(state, rowData.edgeID)) {
      state.rows.push(rowData)
    }
  }
}

function isExist (state: State, id: string): boolean {
  return !!(state.rows.find(row => { return row.edgeID === id }))
}

export default mutations
