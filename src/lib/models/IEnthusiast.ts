import IHobby from "./IHobby";

export default interface IEnthusiast {
    username: string,
    password: string,
    mainHobby?: IHobby
}