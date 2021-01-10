import { normalize, schema } from "normalizr";
import { OrmState } from "redux-orm";

import orm, { Schema } from "./orm";
import Sleipnir from "../api/Sleipnir";



interface NormalizerResult {
    result: any;
    entities: schema.Entity;
} 

interface Response {
    data: object;
}


/**
 * Load ORM state from normalized data.
 * Iterate normalized data in entities to create 
 * model instances in ORM state. 
 * 
 * @param data: Normalized data.
 */
export function loadORMState(data: NormalizerResult): OrmState<Schema> {
    // Begin a mutating session with that state.
    // `state` will be mutated.
    const state = orm.getEmptyState();
    const session = orm.mutableSession(state);

    // Model classes are available as properties of the Session instance.
    const { 
        Project, 
        GeoData,
        Comment,
        Completion,
        User,
        Organisation
    } = session;

    // Declare entity instatiation order
    // Order of entity names will determine order 
    // of instatiation. Models with no dependencies 
    // i.e. lower in the model dependency hierarchy 
    // should be instantiated first. 
    const entities: string[] = ["organisations", "users", "comments", "completions", "geoData", "projects"];
    const entityModelMap = {
        "organisations": Organisation,
        "users": User,
        "comments": Comment, 
        "completions": Completion,
        "geoData": GeoData,
        "projects": Project
    };

    // Instantiate models instances
    entities.forEach((entityKey: string) => {
        for (const [_, props] of Object.entries(data.entities[entityKey])) {
            entityModelMap[entityKey].create(props);
        }
    })
    return state
}


/**
 * Requests JSON formatted data from Sleipnir.
 * Data is normalized and then used for ORM model instantiation.
 * Returns a setup ORM session state.
 * Session state is dispatched as BOOTSTRAP_ACTION_KEY action 
 * which triggers hydration of ORM state using bootstrapHydrator reducer.
 * 
 * @returns: ReduxORM State loaded from Sleipnir.
 */

async function fetchState(): Promise<OrmState<Schema>> {
    const res: Response = await getData()
    const normalizedData: NormalizerResult = normalizeData(res.data["projects"]);
    const state: OrmState<Schema> = loadORMState(normalizedData);
    return state
}

export default fetchState;