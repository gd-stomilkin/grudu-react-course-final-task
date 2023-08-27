import { redirect } from "react-router-dom";

export const tokenLoader = () => {
    return localStorage.getItem('id');
}

export const currenUser = () => {
    return {
        name: localStorage.getItem('name') || '',
        id: localStorage.getItem('id') || ''
    };
}

export const checkUnauthorizedLoader = () => {
    if (!tokenLoader()) {
        return redirect('/');
    }
    return null;
}

export const checkAuthorizedLoader = () => {
    if (tokenLoader()) {
        return redirect('/messager');
    }
    return null;
}