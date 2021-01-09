import { ORM, OrmState } from "redux-orm";

import { Schema } from "./orm";
import fetchState from "./stateLoader";



export const BOOTSTRAP_ACTION_KEY = "BOOTSTRAP";



/**
 * Setup initial state for ORM here.
 * This initial state will be applied in case of 
 * network connection errors as bootstrap state hydration 
 * is ideally applied soon after Redux store and ORM instantiation.
 * 
 * @param orm: ORM instance.
 * @returns: initialState as object with `orm` key.
 */

export function initialState(orm: ORM<Schema>): { orm: OrmState<Schema>} {
    const state = orm.getEmptyState();
    return { orm: state }
}


/**
 * Bootstrap action. 
 * Dispatched BOOSTRAP_ACTION_KEY to identify bootstrap 
 * hydration action event. Retrieves loaded session state from fetchData.
 */

export const bootstrap = () => async dispatch => {
    try {
        const state = await fetchState();
        dispatch({
            type: BOOTSTRAP_ACTION_KEY,
            payload: state
        })
    } catch (error) {
        dispatch({
            type: BOOTSTRAP_ACTION_KEY + "_ERROR",
            payload: error
        })
    }
}


/**
 * BootstrapHydrator simply returns the action payload
 * which is this case comes from the state dispatched above in bootstrap()
 * Essentially a hydrating reducer. 
 * 
 * @param state: ORM state 
 * @param action: Dispatch action type.
 * 
 * @returns: Untouched payload for hydration. 
 */
export const bootstrapHydrator = (state, action): {orm: OrmState<Schema>} => ({orm: action.payload})