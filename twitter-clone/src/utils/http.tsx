import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
};

export type Message = {
    id?: string;
    author_id: string;
    text: string;
};

export const addUser = async (user: User) => {
    const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Unable to create a user');
    }
    return await response.json();
};

export const getUser = async (name: string, password: string) => {
    const response = await fetch(`http://localhost:3001/users/${name}?password=${password}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const error = new Error();
        if (response.status === 404) {
            error.message = 'Invalid email or password';

        } else {
            error.message = 'Something went wrong';
        }
        throw error;
    }
    return await response.json();
};

export const fetchUser = async (id: string) => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const error = new Error();
        error.message = 'Something went wrong';
        throw error;
    }
    return await response.json();
};

export const fetchMessages = async () => {
    const response = await fetch('http://localhost:3001/tweets?_sort=id&_order=desc', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const error = new Error();
        error.message = 'Something went wrong';
        throw error;
    }
    return await response.json();
};

export const addMessage = async (message: Message) => {
    const response = await fetch('http://localhost:3001/tweets', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Unable to create a user');
    }
    return await response.json();
};