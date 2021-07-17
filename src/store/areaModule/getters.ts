import { GetterLocalTypes, GetterImplementations } from '../type'
import { State } from './state'

/**
 * Define essential getters
 */
export interface IGetters <S = State> {
  /**
   * Get count of areas
   * @param state {State}
   * @typeParam R - Return type
   * @typeParam S - Type of module state
   * @constructor
   */
  AREAS_COUNT<R> (state: S): R,
}

/**
 * Local types.
 * Key and value have to be the same as corresponding key of {@link IGetter}. Otherwise get transpile error.
 */
export const localTypes: GetterLocalTypes<IGetters> = {
  AREAS_COUNT: 'AREAS_COUNT'
}

const getters: GetterImplementations<IGetters, State> = {
  AREAS_COUNT (state): number {
    return state?.rows?.length || 0
  }
}

export default getters
