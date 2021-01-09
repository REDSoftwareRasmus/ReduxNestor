import {createStore, applyMiddleware, Store, combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createReducer } from "redux-orm";

import { initialState, bootstrapHydrator, BOOTSTRAP_ACTION_KEY } from "./bootstrap";
import orm from "./orm";


/** 
 * createReducer(orm: ORM): 
 * returns a reducer function that can be plugged into Redux. 
 * The reducer will return the next state of the database given the provided action. 
 * You need to register your models before calling this.
 * 
 * Pass bootstrapped ORM session to begin with prefetched data.
*/
const ormReducer = createReducer(orm);

// Combine reducers to hook into Redux store.
const reducers = combineReducers({
    orm: ormReducer
})

/** 
 * Setup rootReducer: 
 * Returns a reducer function that will be called at every store dispatch.
 * 
 * Hydration refers to the process of filling an object with data. An object which has 
 * not yet been hydrated has been instantiated and represents an entity that does have data, 
 * but the data has not yet been loaded into the object. 
 * This is something that is done for performance reasons.
 * 
 * 
 * State hydration 
 * Hydrating the state after the store was created, can be achieved by 
 * creating a main reducer that can bypass the top level reducers, and replace the whole state.
 * 
 * Reducers are functions that get the current state, combine it with the payload of an action, and return a new state. 
 * Usually the main reducer is a combination of all top reducers using combineReducers, 
 * and the state is the combination of state pieces returned by the top level reducers.
 * 
 * However, the main reducer can react to actions directly. 
 * If the main reducer receives a certain action (hydrate), instead of calling the combined reducers, 
 * it returns the action's payload (the saved state). Other actions are passed to the combined reducers.
 * 
 * This pattern allows for overriding the registered reducer on given action types.
 * 
 * BOOSTRAP_ACTION_KEY is dispatched in bootstrap() when data has been retrieved and 
 * formatted from the server. 
 */
const rootReducer = (state, action) => (action.type == BOOTSTRAP_ACTION_KEY ? bootstrapHydrator : reducers)(state, action)

// Create middle ware composition function
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore);

// Create store (with middleware) and set inital state from bootstrap. 
const store: Store = createStoreWithMiddleware(rootReducer, initialState(orm))

export default store;





