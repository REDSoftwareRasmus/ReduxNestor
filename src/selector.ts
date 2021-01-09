import { Session, createSelector, Ref } from "redux-orm";

import orm, { Schema } from "./orm";
import { Project, GeoData, User, Comment, Completion } from "./models";
import { SchemaArray } from "normalizr";




/** 
 * Generic Selector object collecting 
 * all selectors as static functions.
*/ 

export default class Selector {
 
    // Selects the state managed by Redux-ORM.
    static ormSelector = (state) => state.orm;

    // Redux-ORM selectors work with reselect. To feed input
    // selectors to a Redux-ORM selector, we use the 
    // reselect `createSelector` function.
    public static getProjects = createSelector(
        // The first input selector should always be the orm selector.
        // Behind the scenes, `schema.createSelector` begins a Redux-ORM
        // session with the value returned by `ormSelector` and passes
        // that Session instance as an argument instead.
        // So `orm` below is a Session instance.
        orm, 
        (session: Session<Schema>) => session.Project.all().toRefArray()
    )

    public static getUsers = createSelector<Schema, readonly Ref<User>[]>(
        orm,
        (session: Session<Schema>) => {   
            return session.User.all().toRefArray()
        }
    )
}


