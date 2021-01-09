import { ORM, OrmState } from "redux-orm";
import { Project, GeoData, Comment, Completion, User, Organisation } from "./models";


// Define ORM DB schema
const schema = {Project, GeoData, Comment, Completion, User, Organisation};
export type Schema = typeof schema;

// Define ORM instance
export interface RootState { orm: OrmState<Schema>;}
const orm = new ORM<Schema>({
    // .orm refers to wherever the reducer is put during createStore
    stateSelector: (state: RootState) => state.orm 
});

// Register used DB Models on ORM 
orm.register(Project, GeoData, Comment, Completion, User, Organisation);

export default orm;

