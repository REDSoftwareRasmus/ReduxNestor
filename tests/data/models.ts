import { 
    Model,
    fk, 
    attr, 
    MutableQuerySet, 
    ModelType, 
    many,
    oneToOne
} from "redux-orm";

interface IProject {
    id: number
    name: string
    color: string
    description: string
    boundaries: [number, number][]
    geoData: MutableQuerySet<GeoData>
    organisation: Organisation
}
export class Project extends Model<typeof Project, IProject> {
    static modelName = "Project" as const;
    static fields = {
        name: attr(),
        color: attr({ getDefault: () => "rgb(255, 0, 0)"}),
        description: attr(),
        boundaries: attr(),
        geoData: many("GeoData", "projects"),
        organisation: fk("Organisation", "projects")
    }
}


interface IGeoData {
    id: number
    name: string
    description: string
    coordinate: [number, number]
    timeAdded: Date
    addedBy: MutableQuerySet<User>
    intClosed: Completion | null
    extClosed: Completion | null
    comments: MutableQuerySet<Comment>
    archived: boolean
    images: string[]
}
export class GeoData extends Model<typeof GeoData, IGeoData> {
    static modelName = "GeoData" as const;
    static fields = {
        id: attr(),
        name: attr(),
        description: attr(),
        coordinate: attr(),
        timeAdded: attr(),
        addedBy: fk("User"),
        intClosed: fk("Completion", "internalCompletions"),
        extClosed: fk("Completion", "externalCompletions"),
        comments: many("Comment", "geoData"),
        archived: attr(),
        images: attr()
    }
}



interface IComment {
    id: number
    time: Date
    user: User
    content: string
}
export class Comment extends Model<typeof Comment, IComment> {
    static modelName = "Comment" as const;
    static fields = {
        id: attr(),
        time: attr(),
        user: fk("User", "comments"),
        content: attr()
    }
}


interface ICompletion {
    id: number
    time: string
    user: User
}
export class Completion extends Model<typeof Completion, ICompletion> {
    static modelName = "Completion" as const;
    static fields = {
        id: attr(),
        time: attr(),
        user: fk("User", "completions"),
    }
}




interface IUser {
    id: number
    name: string
    isEmployee: boolean,
    organisation: Organisation
}
export class User extends Model<typeof User, IUser> {

    static modelName = "User" as const;
    static fields = {
        id: attr(),
        name: attr(),
        isEmployee: attr(),
        organisation: fk("Organisation", "users")
    }
}



interface IOrganisation {
    id: number
    name: string
}
export class Organisation extends Model<typeof Organisation, IOrganisation> {
    static modelName = "Organisation" as const;
    static fields = {
        id: attr(),
        name: attr()
    }
}
