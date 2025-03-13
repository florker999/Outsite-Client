'use server'

import { IConfirmSignUpRequest } from "@/lib/models/IConfirmSignUpRequest";
import ICreateHobbyRequest from "@/lib/models/ICreateHobbyRequest";
import ICreatePostRequest from "@/lib/models/ICreatePostRequest";
import IHobby from "@/lib/models/IHobby";
import IPost from "@/lib/models/IPost";
import { ISignUpResponse } from "@/lib/models/ISignUpResponse";
import WithId from "@/lib/models/WithId";

const dbUrl: string = "http://localhost:3001";

async function post(path: string, body: any): Promise<Response> {
    const headers: any = {
        'content-type': 'application/json',
    };

    return fetch(dbUrl + path, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(body)
    })
}

async function get(path: string): Promise<Response> {
    return fetch(dbUrl + path, {
        method: 'GET',
        credentials: 'include',
    })
}

async function del(path: string) {
    return fetch(dbUrl + path, {
        method: 'DELETE',
        credentials: 'include',
    })
}

export async function getPosts(hobbyId: string): Promise<WithId<IPost>[]> {
    return get('/posts?hobbyId=' + hobbyId)
        .then(res => res.json());
}

export async function getPost(hobbyId: string, postId: string): Promise<WithId<IPost>> {
    return get(`/posts?hobbyId=${hobbyId}&postId=${postId}`)
        .then(res => res.json());
}

export async function createPost(request: ICreatePostRequest): Promise<string> {
    return post('/posts', { request })
        .then(res => res.text());

}

export async function logIn(username: string, password: string): Promise<boolean> {
    return post('/login', {
        username,
        password
    })
        .then(res => res.ok);
}

export async function logOut(): Promise<any> {
    return get('/logout');
}

export async function signup(username: string, password: string, email: string): Promise<ISignUpResponse> {
    return post('/signUp', {
        username,
        password,
        email,
    })
        .then(res => res.json());
}

export async function confirmSignUp(request: IConfirmSignUpRequest): Promise<boolean> {
    return post('/confirmSignUp', request)
        .then(res => res.ok);
}

export async function getHobbies(): Promise<WithId<IHobby>[] | undefined> {
    return get('/hobbies')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 403) {
                return undefined;
            } else throw new Error("Failed to get hobbies.");
        });
}

export async function createHobby(hobbyRequest: ICreateHobbyRequest): Promise<string> {
    return post('/hobbies', hobbyRequest)
        .then(res => res.text());
}

export async function deleteHobby(hobbyId: string): Promise<void> {
    const res = await del('/hobbies?hobbyId=' + hobbyId);
    
    if (!res.ok)
        throw new Error("Delete hobby request failed.");
}