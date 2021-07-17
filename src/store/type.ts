import { Module, Mutation, Action, Getter } from 'vuex'
import { StateInterface } from './index'

/**
 * Type collection of action, mutation, getter and others.
 */
export interface OperationTypes {[key: string]: string}

/**
 * Mutation local types.
 * Key and value have to be the same as corresponding key of `IMutations`. Otherwise get transpile error.
 * @typeParam IMutations - Interface of mutations implementation.
 */
export type MutationLocalTypes<IMutations> = { [P in (keyof IMutations)]: P }

/**
 * Mutation Implementation.
 * Keys have to match keys of interface `IMutations`. Otherwise get transpile error.
 * @typeParam IMutations - Interface of mutations implementation.
 * @typeParam State - Type of module state.
 */
export type MutationImplementations<IMutations, State> = { [P in (keyof IMutations)]: Mutation<State> }

/**
 * Action local types.
 * Key and value have to be the same as corresponding key of `IActions`. Otherwise get transpile error.
 * @typeParam IActions - Interface of actions implementation.
 */
export type ActionLocalTypes<IActions> = { [P in (keyof IActions)]: P }

/**
 * Action Implementation.
 * Keys have to match keys of interface `IMutations`. Otherwise get transpile error.
 * @typeParam IActions - Interface of actions implementation.
 * @typeParam State - Type of module state.
 */
export type ActionImplementations<IActions, State> = { [P in (keyof IActions)]: Action<State, StateInterface> }

/**
 * Getter local types.
 * Key and value have to be the same as corresponding key of `IGetter`. Otherwise get transpile error.
 * @typeParam IActions - Interface of actions implementation.
 */
export type GetterLocalTypes<IGetter> = { [P in (keyof IGetter)]: P }

/**
 * Action Implementation.
 * Keys have to match keys of interface `IMutations`. Otherwise get transpile error.
 * @typeParam IActions - Interface of actions implementation.
 * @typeParam State - Type of module state.
 */
export type GetterImplementations<IGetter, State> = { [P in (keyof IGetter)]: Getter<State, StateInterface> }

/**
 * Augmented module type. All modules should be defined by this type.
 * @typeParam ModuleState - Type of module state, which implements module state interface.
 * @see {@link AreaStateInterface}
 */
export type AugmentedModule<ModuleState> = Module<ModuleState, StateInterface> & { name: string }
