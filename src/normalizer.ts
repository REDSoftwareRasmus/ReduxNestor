import { 
    schema as NSchema, 
    normalize
} from "normalizr";



export type NormalizeEntity = NSchema.Entity;

export interface NormalizedResult {
    result: any;
    entities: object;
} 






/**
 * 
 * @param schema 
 */
export function getNormalizerSchema(s: object): NormalizeEntity {
    
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

export function normalizeWithSchema(data: object, entity: NormalizeEntity, array: boolean): NormalizedResult {
    return normalize(data, array ? [entity] : entity)
}

export function normalizeRaw(data: object, schema: object, array: boolean): NormalizedResult {  
    const entity: NSchema.Entity = getNormalizerSchema(schema);
    return normalize(data, array ? [entity] : entity); 
}

