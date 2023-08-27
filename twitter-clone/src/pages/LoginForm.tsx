import { Link, useNavigate } from "react-router-dom";
import FormBox from "../ui/FormBox";
import { useCallback, useState } from "react";
import FormInput from "../ui/FormInput";
import { type State } from "../ui/FormInput";
import { getUser } from "../utils/http";

const emptyState = {
    value: '',
    isTouched: false,
    isValid: false
};

const LoginForm = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState(emptyState);
    const [password, setPassword] = useState(emptyState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isButtonEnabled = username.isValid && password.isValid;

    const validateLogin = useCallback(
        (value: string): boolean => Boolean(value.length && value.length <= 256)
        , []);
    const validatePassword = useCallback(
        (value: string): boolean => Boolean(value.length >= 8 && value.length <= 256)
        , []);

    const usernameChangeHandler = useCallback((state: State) => {
        setError('');
        setUsername(state)
    }, []);

    const passwordChangeHandler = useCallback((state: State) => {
        setError('');
        setPassword(state)
    }, []);

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const result = await getUser(username.value, password.value);
            setIsLoading(false);

            localStorage.setItem('id', username.value);
            localStorage.setItem('name', result.name);
            navigate('/messager')
        } catch (error) {
            let message = 'Unknown Error'
            if (error instanceof Error) {
                message = error.message
            }
            setIsLoading(false);
            setError(message);
        }
    }

    return (
        <>
            <FormBox>
                Log In
                <form onSubmit={loginHandler}>
                    <FormInput
                        type="text"
                        name="username"
                        placeholder="Username"
                        errorText="Username can't be empty"
                        validate={validateLogin}
                        onChange={usernameChangeHandler}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        errorText="Password can't be empty"
                        validate={validatePassword}
                        onChange={passwordChangeHandler}
                    />
                    {!isLoading && <button disabled={!isButtonEnabled}>Log In</button>}
                    {isLoading && <button disabled={true}>Pending...</button>}
                    {error && <div className="FormError">{error}</div>}
                </form>
            </FormBox>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </>
    );
}

export default LoginForm;