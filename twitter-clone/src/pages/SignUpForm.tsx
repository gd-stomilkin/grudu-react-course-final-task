import { Link, useNavigate } from "react-router-dom";
import FormBox from "../ui/FormBox";
import { useCallback, useState } from "react";
import FormInput from "../ui/FormInput";
import * as EmailValidator from 'email-validator';

import { type State } from "../ui/FormInput";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../utils/http";

const emptyState = {
    value: '',
    isTouched: false,
    isValid: false
};

const SignUpForm = () => {

    const navigate = useNavigate()

    const { mutate, status, isError } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            navigate('/messager');
        },
    });

    const [username, setUsername] = useState(emptyState);
    const [password, setPassword] = useState(emptyState);
    const [fullNmae, setFullNmae] = useState(emptyState);
    const [email, setEmail] = useState(emptyState);
    const isPending = status === 'loading';

    const isButtonEnabled = username.isValid && password.isValid && fullNmae.isValid && email.isValid;

    const validateUsername = useCallback(
        (value: string): boolean => Boolean(value.length && value.length <= 256)
        , []);

    const validatePassword = useCallback(
        (value: string): boolean => Boolean(value.length >= 8 && value.length <= 256)
        , []);

    const validateFullNmae = useCallback(
        (value: string): boolean => Boolean(value.length && value.length <= 512)
        , []);

    const validateEmail = useCallback(
        (value: string): boolean => EmailValidator.validate(value)
        , []);

    const usernameChangeHandler = useCallback((state: State) => {
        setUsername(state)
    }, []);

    const passwordChangeHandler = useCallback((state: State) => {
        setPassword(state)
    }, []);

    const emailChangeHandler = useCallback((state: State) => {
        setEmail(state)
    }, []);

    const fullNmaeChangeHandler = useCallback((state: State) => {
        setFullNmae(state)
    }, []);

    const signupHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutate({
            id: username.value,
            email: email.value,
            name: fullNmae.value,
            password: password.value
        });
    }

    return (
        <>
            <FormBox>
                Sign Up
                <form onSubmit={signupHandler}>
                    <FormInput
                        type="text"
                        name="email"
                        placeholder="Email"
                        errorText="Invalid Email"
                        validate={validateEmail}
                        onChange={emailChangeHandler}
                    />
                    <FormInput
                        type="text"
                        name="username"
                        placeholder="Username"
                        errorText="Invalid Username (1-256 symbols)"
                        validate={validateUsername}
                        onChange={usernameChangeHandler}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        errorText="Invalid Password (8-256 symbols)"
                        validate={validatePassword}
                        onChange={passwordChangeHandler}
                    />
                    <FormInput
                        type="text"
                        name="fullNmae"
                        placeholder="Full Nmae"
                        errorText="Invalid Full Nmae (1-512 symbols)"
                        validate={validateFullNmae}
                        onChange={fullNmaeChangeHandler}
                    />
                    {!isPending && <button disabled={!isButtonEnabled}>Sign Up</button>}
                    {isPending && <button disabled={true}>Pending...</button>}
                    {isError && <div className="FormError">Failed to create user. Please check your inputs and try again later.</div>}
                </form>

            </FormBox>
            <p>
                Already have an account? <Link to="/">Log in</Link>
            </p>
        </>
    );
}

export default SignUpForm;