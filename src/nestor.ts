import { Model, ORM, OrmState, ORMReducer } from "redux-orm";
import { IndexedModelClasses } from "redux-orm/ORM";
import { schema as NormalizrSchema } from "normalizr";
import { Store } from "redux";

// nestor.schema

// nestor .normalize

// nestor .getORM

// nestor .fill

// nestor .getReducer

// nestor .getStore

export interface ResponseEntity {
    key: string;
    schema: object;
}

export interface NormalizedResult {
    result: any;
    entities: NormalizrSchema.Entity;
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

    // instance
    
    // static 
    static getEmptyState<I extends IndexedModelClasses>(orm: ORM<I>): OrmState<I> { 
        return orm.getEmptyState()
    }

    static createSchema(s: object): NormalizrSchema.Entity {}

    static normalize(schema: NormalizrSchema.Entity | NormalizrSchema.Entity[]): NormalizedResult {}

    static getORM<I extends IndexedModelClasses>(models: Model[], reducerKey?: string): ORM<I> {}

    static fill<I extends IndexedModelClasses>(data: NormalizedResult, orm: ORM<I>, map: EntityModelMap, order?: string[]): OrmState<I> {}
    
    static getReducer<I extends IndexedModelClasses>(orm: ORM<I>): ORMReducer<I> {}

    static getStore<I extends IndexedModelClasses>(reducer: ORMReducer<I>, initialState: OrmState<I>): Store {}
}