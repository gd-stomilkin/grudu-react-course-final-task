import React, { useEffect, useState } from "react";
import "./FormInput.css"

export type State = {
    value: string;
    isTouched: boolean;
    isValid: boolean;
}

export type Input = {
    placeholder?: string;
    name?: string;
    type?: string;
    errorText?: string;
    onChange?: (state: State) => void
    reset?: () => void
    validate?: (valse: string) => boolean
}

const FormInput: React.FC<Input> = ({
    validate,
    onChange,
    placeholder,
    name,
    type,
    errorText
}: Input) => {

    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validate ? validate(value) : true;

    const showError = !isValid && isTouched;


    useEffect(() => {
        if (onChange) {
            onChange({
                value,
                isTouched,
                isValid
            });
        }
    }, [onChange, value, isTouched, isValid])


    const onBlurHandler = () => {
        setIsTouched(true);
    }

    const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const classes = `FormInput ${showError && 'FormInputError'}`;

    return (
        <>
            <input
                className={classes}
                placeholder={placeholder}
                name={name}
                type={type}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
            />
            {showError && <label className="FormInputErrorLabel">{errorText}</label>}
        </>

    );
}

export default React.memo(FormInput);