import { 
    schema as NormalizerSchema, 
    normalize as normalizr
} from "normalizr";

export type Entity = NormalizerSchema.Entity;
export interface NormalizerResult {
    result: any;
    entities: object;
}
export interface NestorSchema {
    models: object, 
    type: string
}


/**
 * 
 * @param schema 
 */

export function getEntity(raw: NestorSchema): Entity {
    
    const models: {[key: string]: NormalizerSchema.Entity} = {};
    for (const [modelName, depModels] of Object.entries(raw.models)) {
        const deps: {[key: string]: Entity | Entity[]} = {};
        if (Object.keys(depModels).length !== 0) {
            for (const [prop, depModel] of Object.entries(depModels)) {
                const isArray: boolean = Array.isArray(depModel);
                const modelsIndex: string | string[] = depModel as string | string[]
                const m: Entity = models[isArray ? modelsIndex[0] : modelsIndex as string];
                deps[prop] = !isArray ?  m : [m];
            }
        }
        models[modelName] = new NormalizerSchema.Entity(modelName, deps)
    }

    return models[raw.type];
}



/**
 * Normalize data from Sleipnir with Normalizr.
 * 
 * Many APIs, public or not, return JSON data that has deeply nested objects. 
 * Using data in this kind of structure is often very difficult for JavaScript applications, 
 * especially those using Flux or Redux.
 * 
 * Normalizr is a small, but powerful utility for taking JSON with a schema definition 
 * and returning nested entities with their IDs, gathered in dictionaries.
 * 
 * @param data: JSON object data from Sleipnir.
 * @param schema: 
 * @returns: Normalized JSON data.
 */

export function normalize(data: object, entity: Entity | Entity[]): NormalizerResult {
    return normalizr(data, entity)
}

export function normalizeRaw(data: object, schema: NestorSchema, array: boolean): NormalizerResult {  
    const entity: NormalizerSchema.Entity = getEntity(schema);
    return normalizr(data, array ? [entity] : entity); 
}

