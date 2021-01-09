import { 
    Model,
    fk, 
    attr, 
    MutableQuerySet, 
    ModelType, 
    many,
    oneToOne
} from "redux-orm";

import { IDispatch, ClientActionType, ClientAction } from "./ClientAction";
import Sleipnir from "../api/Sleipnir";





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
    
    static reducer(action: IDispatch, project: ModelType<Project>) {  
        const { type, payload } = action;
        switch (type) {
        case ClientActionType.createProject:
            // Sleipnir.createProject(payload.props).catch(e => console.error("SleipnirAPI: Error!", e));
            project.create(payload.props);
            break;
        case ClientActionType.deleteProject:
            // Sleipnir.deleteProjectForID(payload).catch(e => console.error("SleipnirAPI: Error!", e));
            project.withId(payload).delete();
            break;
        case ClientActionType.renameProject:
            // Sleipnir.updateProjectForID(payload.id, {"name": payload.value}).catch(e => console.error("SleipnirAPI: Error!", e));
            project.withId(payload.id).update({name: payload.value});
            break;
        case ClientActionType.updateProjectBoundaries:
            // Sleipnir.updateProjectForID(payload.id, {"boundaries": payload.value}).catch(e => console.error("SleipnirAPI: Error!", e));
            project.withId(payload.id).update({boundaries: payload.value})
            break;       
        }
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
    
    static reducer(action: IDispatch, geoData: ModelType<GeoData>) {  
        const { type, payload } = action;
        switch (type) {
            case ClientActionType.createGeoData:
                // Sleipnir.createGeoData(payload.props).catch(e => console.error("SleipnirAPI: Error!", e))
                geoData.create(payload.props);
                break;
            case ClientActionType.toggleArchivation:
                // Sleipnir.updateGeoDataForID(payload.id, {"archived": payload.value}).catch(e => console.error("SleipnirAPI: Error!", e));
                geoData.withId(payload.id).update({archived: payload.value});
                break;
            case ClientActionType.renameGeoData:
                // Sleipnir.updateGeoDataForID(payload.id, {"name": payload.value}).catch(e => console.error("SleipnirAPI: Error!", e));
                geoData.withId(payload.id).update({name: payload.value});
                break;
            case ClientActionType.moveGeoData:
                // Sleipnir.updateGeoDataForID(payload.id, {"coordinate": payload.value}).catch(e => console.error("SleipnirAPI: Error!", e));
                geoData.withId(payload.id).update({coordinate: payload.value});
                break;
        }
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
    
    static reducer(action: IDispatch, comment: ModelType<Comment>) {  
        const { type, payload } = action;
        switch (type) {
            case ClientActionType.submitComment:
                // Sleipnir.comment(payload.geoDataID, payload.props).catch(e => console.error("SleipnirAPI: Error!", e))
                comment.create(payload.props);
                break;
            case ClientActionType.deleteComment:
                // Sleipnir.deleteComment(payload.commentID).catch(e => console.error("SleipnirAPI: Error!", e))
                comment.withId(payload).delete();
                break;
        }
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
    
    static reducer(action: IDispatch, completion: ModelType<Completion>) {  
        const { type, payload } = action;
        switch (type) {
            case ClientActionType.setCompletion:
                // Sleipnir.complete(payload.props).catch(e => console.error("SleipnirAPI: Error!", e));
                completion.create(payload.props);
                break;
            case ClientActionType.removeCompletion:
                // Sleipnir.removeCompletion(payload).catch(e => console.error("SleipnirAPI: Error!", e));
                completion.withId(payload).delete();
                break;
        }
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
