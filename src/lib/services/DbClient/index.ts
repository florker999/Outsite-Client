import IHobby from "@/lib/models/IHobby";
import IPost from "@/lib/models/IPost";
import { ISignUpResponse } from "@/lib/models/ISignUpResponse";
import WithId from "@/lib/models/WithId";
import { IConfirmSignUpRequest } from "@/server/src/models/IConfirmSignUpRequest";
import ICreateHobbyRequest from "@/server/src/models/ICreateHobbyRequest";
import ICreatePostRequest from "@/server/src/models/ICreatePostRequest";

interface IDbClient {
    getHobbies(userId: string): Promise<WithId<IHobby>[]>,
    createHobby(hobbyRequest: ICreateHobbyRequest): Promise<string>,
    login(username: string, password: string): Promise<boolean>,
    signUp(username: string, password: string, email: string): Promise<ISignUpResponse>,
    confirmSignUp(request: IConfirmSignUpRequest): Promise<boolean>,
    getPosts(hobbyId: string): Promise<WithId<IPost>[]>,
    getPost(hobbyId: string, postId: string): Promise<WithId<IPost>>,
    createPost(request: ICreatePostRequest): Promise<string>,
}

export default class DbClient implements IDbClient {
    private dbUrl: string = "http://localhost:3001";

    private async post(path: string, body: any): Promise<Response> {
        return fetch(this.dbUrl + path, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    private async get(path: string): Promise<Response> {
        return fetch(this.dbUrl + path, {
            method: 'GET',
            credentials: 'include'
        })
    }

    async getPosts(hobbyId: string): Promise<WithId<IPost>[]> {
        return this.get('/posts?hobbyId=' + hobbyId)
            .then(res => res.json());
    }

    async getPost(hobbyId: string, postId: string): Promise<WithId<IPost>> {
        return this.get(`/posts?hobbyId=${hobbyId}&postId=${postId}`)
            .then(res => res.json());
    }

    async createPost(request: ICreatePostRequest): Promise<string> {
        return this.post('/posts', { request })
            .then(res => res.text());

    }

    async login(username: string, password: string): Promise<boolean> {
        return this.post('/login', {
            username,
            password
        })
            .then(res => res.ok);
    }

    async signUp(username: string, password: string, email: string): Promise<ISignUpResponse> {
        return this.post('/signUp', {
            username,
            password,
            email,
        })
            .then(res => res.json());
    }

    async confirmSignUp(request: IConfirmSignUpRequest): Promise<boolean> {
        return this.post('/confirmSignUp', request)
            .then(res => res.ok);
    }

    async getHobbies(): Promise<WithId<IHobby>[]> {
        return this.get('/hobbies')
            .then(res => res.json());
    }

    async createHobby(hobbyRequest: ICreateHobbyRequest): Promise<string> {
        return this.post('/hobbies', hobbyRequest)
            .then(res => res.text());
    }
}