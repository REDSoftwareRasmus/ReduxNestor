import {
    OrmSession
} from "redux-orm/Session";

import {
    ORM, 
    OrmState
} from "redux-orm";

import {
    getORM
} from "../src/orm";

import { 
    Project,
    GeoData,
    Organisation,
    Comment,
    Completion,
    User
} from "./data/models";


describe("Test ORM function", () => {

    var orm;

    beforeEach(() => orm = undefined)

    test("ORM instantiation", () => {
        const models = [Project, GeoData, Organisation, Comment, User, Completion];
        type ORMSchema = typeof models;

        // Create ORM instance with Nestor ORM creator
        const orm: ORM<ORMSchema> = getORM<ORMSchema>(models, "testReducerKey");
        console.log(orm.getEmptyState())
        // Create session with ORM 
        const session: OrmSession<ORMSchema> = orm.mutableSession(orm.getEmptyState());

        // Check all models have been registered on ORM instance
        const registeredModels: string[] = session.sessionBoundModels.map(a => a.modelName)
        models.forEach(m => {
            expect(registeredModels.includes(m.modelName))
        })
    })
})