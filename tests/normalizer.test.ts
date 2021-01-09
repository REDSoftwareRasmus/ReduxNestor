import { schema } from "normalizr";

import { 
    getEntity,
    normalizeRaw,
    normalizeWithEntity
} from "../src/normalizer";



describe("Test normalize schema formatting", () => {

    // Construct Normalizr Entity with manual approach
    const organisation = new schema.Entity("organisation")
    const user = new schema.Entity("user", {
        organisation: organisation
    })
    const comment = new schema.Entity("comment", {
        user: user
    })
    const completion = new schema.Entity("completion", {
        user: user
    })
    const geoData = new schema.Entity("geoData", {
        addedBy: user,
        intClosed: completion,
        extClosed: completion,
        comments: [comment]
    })
    const normalizrTestEntity = new schema.Entity("project", {
        geoData: [geoData],
        organisation: organisation
    })

    // Construct Nestor schema
    const testSchema = {
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
                geoData: ["geoData"],
                organisation: "organisation"
            }
        },
        type: "project"
    }

    test("Generate normalizer entity ", () => {
        const generatedEntity = getEntity(testSchema)
        expect(generatedEntity).toEqual(generatedEntity);
    })
})


