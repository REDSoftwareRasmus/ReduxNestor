import { 
    schema as NormalizerSchema, 
    normalize as normalizr
} from "normalizr";


export type Entity = NormalizerSchema.Entity;
export interface NormalizerResult {
    result: any;
    entities: object;
}

/**
 * Schema for API response. 
 * 
 * Example:
 * models: { 
 *       modelA: {},
 *       modelB: {
 *           modelAProp: "modelA"
 *       },
 *       modelC: {
 *           modelBProp: "modelB"
 *       },
 *       modelD: {
 *           modelAProp: ["modelA"], 
 *           modelCProp: "modelC"
 *       }
 *   },
 *   type: "modelD"
 * 
 * @property models: Model definitions with props specifying other model dependency properties.
 * @property type: Main model in API response. 
 */
export interface NestorSchema {
    models: object, 
    type: string
}

/**
 * Convert {@link NestorSchema} for raw API response 
 * to vanilla Normalizr Entity. 
 * 
 * Read {@link NestorSchema} docs for syntax and order rules.
 * 
 * @param raw NestorSchema defining API response structure.
 * @returns Regular Normalizr Entity.
 */

export function getEntity(raw: NestorSchema): Entity {
    
    // Store parsed Normalizr Entity models  
    // for model name.
    const models: {[key: string]: NormalizerSchema.Entity} = {};

    for (const [modelName, depModels] of Object.entries(raw.models)) {

        // Associate parsed Normalizr Entities to 
        // properties of model. Essentially follows 
        // standard Normalizr protocol.
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
 * Normalize data raw data, i.e. API response, 
 * with specified Normalizr Entity.
 * 
 * @param data Raw JSON data to normalize.
 * @param entity Normalizr Entity to use in normalizing. Entity or [Entity] if data is an array. 
 * @returns: Normalized JSON data.
 */

export function normalize(data: object, entity: Entity | Entity[]): NormalizerResult {
    return normalizr(data, entity)
}

/**
 * Normalize raw data, i.e. API response, directly
 * with specified {@link NestorSchema}.
 * 
 * @param data Raw JSON data to normalize.
 * @param schema NestorSchema for raw data.
 * @param array Flag for parsing and normalizing data as array or not. 
 * @returns Normalized data. 
 */
export function normalizeRaw(data: object, schema: NestorSchema, array: boolean): NormalizerResult {  
    const entity: NormalizerSchema.Entity = getEntity(schema);
    return normalizr(data, array ? [entity] : entity); 
}

