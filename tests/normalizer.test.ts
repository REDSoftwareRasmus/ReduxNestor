import { 
    getNormalizerSchema,
    normalizeRaw,
    normalizeWithSchema
} from "../src/normalizer";



describe("Test normalize schema formatting", () => {

    const testSchema: object = {
        models: {
            organisation: {},
            user: {
                organisation: "organisation"
            },
            comment: {
                user: "user"
            },
            completion: {
                user: "user"
            },
            geoData: {
                addedBy: "user",
                intClose: "completion",
                extClosed: "completion",
                comments: ["comment"]
            },
            project: {
                geoData: "geoData",
                organisation: "organisation"
            }
        },
        type: "project"
    }

    test("Instantiate test ")

})


