import { 
    ORM, 
    OrmState,
    Model
} from "redux-orm";
import { 
    IndexedModelClasses
} from "redux-orm/ORM";



/**
 * 
 * @param models
 * @param reducerKey
 * @returns
 */

export function getORM<I extends IndexedModelClasses<any>, ModelNames extends keyof I = keyof I>(
    models: ReadonlyArray<I[ModelNames]>,
    reducerKey?: string): ORM<I> {
    
    // Determine ORM options with 
    // stateSelector. Key used as for registering 
    // reducers in Redux setup. 
    let orm: ORM<I>;
    let ormOptions: object;
    if (reducerKey !== undefined) {
        interface RootState { [reducerKey: string]: OrmState<I>;}
        ormOptions = (state: RootState) => state[reducerKey];
    } else {
        ormOptions = (state: OrmState<I>) => state
    }
    
    // Instantiate ORM instance with Reducer key
    orm = new ORM<I>(ormOptions);
    
    // Register used DB Models on ORM 
    orm.register(...models);   

    return orm;
}