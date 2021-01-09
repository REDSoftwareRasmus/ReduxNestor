import { IProject, IGeoData, IComment, ICompletion } from "../api/APIModel";





export interface IDispatch { type: string, payload: any }
const Dispatch = (t: string, p: any): IDispatch => ({type: t, payload: p});



export enum ClientActionType {

    // PROJECT:
    createProject = "CREATE_PROJECT",   
    deleteProject = "DELETE_PROJECT",
    renameProject = "RENAME_PROJECT",
    updateProjectBoundaries = "UPDATE_PROJECT_BOUNDARIES",

    // GEODATA:
    createGeoData = "CREATE_GEODATA",
    toggleArchivation = "TOGGLE_ARCHIVATION_GEODATA",
    renameGeoData = "RENAME_GEODATA",
    moveGeoData = "MOVE_GEODATA",
    
    // COMMENTS: 
    submitComment = "SUBMIT_COMMENT",
    deleteComment = "DELETE_COMMENT",
    
    // COMPLETION: 
    setCompletion = "SET_COMPLETION",
    removeCompletion = "REMOVE_COMPLETION"
}


export class ClientAction {

    static readonly createProject = (props: IProject): IDispatch =>                             Dispatch(ClientActionType.createProject, props);
    static readonly deleteProject = (id: number): IDispatch =>                                  Dispatch(ClientActionType.deleteProject, id);
    static readonly renameProject = (id: number, value: string): IDispatch =>                   Dispatch(ClientActionType.renameProject, {id, value});
    static readonly updateProjectBoundaries = (id: number, value: [number, number][]) =>        Dispatch(ClientActionType.updateProjectBoundaries, {id, value});

    static readonly createGeoData = (props: IGeoData): IDispatch =>                             Dispatch(ClientActionType.createGeoData, props);
    static readonly archiveGeoData = (id: number, value: boolean): IDispatch =>                 Dispatch(ClientActionType.toggleArchivation, {id, value});
    static readonly renameGeoData = (id: number, value: string): IDispatch =>                   Dispatch(ClientActionType.renameGeoData, {id, value});
    static readonly moveGeoData = (id: number, value: [number, number]): IDispatch =>           Dispatch(ClientActionType.moveGeoData, {id, value});
    
    static readonly submitComment = (geoDataID: number, props: IComment): IDispatch =>          Dispatch(ClientActionType.submitComment, {geoDataID, props});
    static readonly deleteComment = (id: number): IDispatch =>                                  Dispatch(ClientActionType.deleteComment, id);

    static readonly setCompleted = (props: ICompletion): IDispatch =>                           Dispatch(ClientActionType.setCompletion, props);
    static readonly removeCompletion = (id: number): IDispatch =>                               Dispatch(ClientActionType.removeCompletion, id);
}


