import './NewMessage.css'
import { useMutation } from '@tanstack/react-query';
import { addMessage, type Message } from '../../utils/http';
import { useState } from 'react';

const NewMessage: React.FC<{ author_id: string, onAdd: (message: Message) => void }> = ({ author_id, onAdd }) => {
    const [text, setText] = useState('')

    const { mutate, status, isError } = useMutation({
        mutationFn: addMessage,
        onSuccess: () => {
            onAdd({
                author_id,
                text
            })
            setText('');
        },
    });

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutate({
            author_id,
            text
        });
    }

    const messageChangeHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setText(event.currentTarget.value);
    }

    const isPending = status === 'loading';
    const isButtonEnabled = text.length && text.length <= 140;

    return (
        <div className="NewMessage">
            <form onSubmit={formSubmitHandler}>
                <textarea value={text} placeholder="What's happening?" onChange={messageChangeHandler}></textarea>
                {!isPending && <button disabled={!isButtonEnabled}>Send</button>}
                {isPending && <button disabled={true}>Pending...</button>}
                {isError && <div className="FormError">Failed to send message.</div>}
            </form>

        </div>
    );
}

export default NewMessage;