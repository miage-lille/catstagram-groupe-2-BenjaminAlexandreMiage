import { Picture } from "./picture.type";

export type Success = { status:'success'; data: Picture[] }; // TODO : Update this type !
export type Loading = { status:'loading' }; // TODO : Update this type !
export type Failure = { status:'failure'; error: String}; // TODO : Update this type !
