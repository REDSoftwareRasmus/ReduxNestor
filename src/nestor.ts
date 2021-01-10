import { Model, ORM, OrmState, ORMReducer } from "redux-orm";
import { IndexedModelClasses } from "redux-orm/ORM";
import { Store } from "redux";

import { 
    NormalizerResult, 
    Entity,
    NestorSchema,
    getEntity,
    normalize,
    normalizeRaw
} from "./normalizer";


export interface ResponseEntity {
    key: string;
    schema: object;
}
export interface EntityModelMap {
    [key: string]: Model;
}


interface INestor {
    entities: ResponseEntity[];
    models: Model[];
}


export default class Nestor implements INestor { 

    entities: ResponseEntity[];
    models: Model[];

    constructor(ormOptions: object, entities: ResponseEntity[], models: Model[]) {
        this.entities = entities;
        this.models = models;

    }

    // static 
    static createSchema(s: NestorSchema): Entity {
        return getEntity(s);
    }

    static normalize(data: object, schema: Entity | Entity[]): NormalizerResult {
        return normalize(data, schema);
    }

    static nestorNormalize(data: object, schema: NestorSchema, array: boolean): NormalizerResult {
        return normalizeRaw(data, schema, array);
    }

    static getEmptyState<I extends IndexedModelClasses>(orm: ORM<I>): OrmState<I> { 
        return orm.getEmptyState()
    }

    static getORM<I extends IndexedModelClasses>(models: Model[], reducerKey?: string): ORM<I> {}

    static fill<I extends IndexedModelClasses>(data: NormalizerResult, orm: ORM<I>, map: EntityModelMap, order?: string[]): OrmState<I> {}
    
    static getReducer<I extends IndexedModelClasses>(orm: ORM<I>): ORMReducer<I> {}

    static getStore<I extends IndexedModelClasses>(reducer: ORMReducer<I>, initialState: OrmState<I>): Store {}
}