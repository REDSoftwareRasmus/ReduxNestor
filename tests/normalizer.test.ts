import { 
    getEntity,
    normalizeRaw,
    normalize
} from "../src/normalizer";

import { 
    testNestorSchema,
    normalizrTestEntity,
    testAPIResponse
} from "./data";

const util = require("util");

describe("Normalizer test", () => {

    test("Generate normalizer entity ", () => {
        const generatedEntity = getEntity(testNestorSchema)
        const a = util.inspect(generatedEntity, false, null, true)
        const b = util.inspect(normalizrTestEntity, false, null, true)
        expect(a).toMatch(b);
    })

    test("Normalize with Entity", () => {
        const generatedEntity = getEntity(testNestorSchema)
        
        // Test with single entity
        var normalizedWGeneratedEntity = normalize(testAPIResponse, generatedEntity);
        var normalizedWNormalizrEntity = normalize(testAPIResponse, normalizrTestEntity);

        expect(normalizedWGeneratedEntity).toEqual(normalizedWNormalizrEntity);

        // Test with array of entities
        normalizedWGeneratedEntity = normalize(testAPIResponse, [generatedEntity]);
        normalizedWNormalizrEntity = normalize(testAPIResponse, [normalizrTestEntity]);

        expect(normalizedWGeneratedEntity).toEqual(normalizedWNormalizrEntity);
    })

    test("Normalize with raw Nestor schema", () => {

        const generatedEntity = getEntity(testNestorSchema)
        
        // Test with single entity
        var normalizedFromNestorSchema = normalizeRaw(testAPIResponse, testNestorSchema, false)
        var normalizedWNormalizrEntity = normalize(testAPIResponse, normalizrTestEntity);

        expect(normalizedFromNestorSchema).toEqual(normalizedWNormalizrEntity);

        // Test with array of entities
        normalizedFromNestorSchema = normalizeRaw(testAPIResponse, testNestorSchema, true)
        normalizedWNormalizrEntity = normalize(testAPIResponse, [normalizrTestEntity]);

        expect(normalizedFromNestorSchema).toEqual(normalizedWNormalizrEntity);
    })
})


