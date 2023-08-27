import Header from './Messages/Header';
import Message from './Messages/Message';
import './Messages.css'
import { useQuery } from '@tanstack/react-query';
import { fetchMessages, queryClient, type Message as MessageType } from '../utils/http';
import NewMessage from './Messages/NewMessage';
import { currenUser } from '../utils/auth';

const Messages = () => {

    const { data, isError, status } = useQuery({
        queryKey: ['messages'],
        queryFn: () => fetchMessages(),
    });

    const { id, name } = currenUser()
    const isPending = status === 'loading';

    const newMessageHandler = (message: MessageType) => {
        queryClient.invalidateQueries({ queryKey: ['messages'] });
    }

    let content;
    if (isError) {
        content = <div> Failed to load messages </div>
    } else if (isPending) {
        content = <div>Loading...</div>
    } else {
        content = data.map((message: MessageType) => <Message key={message.id} author_id={message.author_id} text={message.text} />)
    }
    return (
        <div className="Messages">
            <Header name={name} />
            <NewMessage author_id={id} onAdd={newMessageHandler} />

            <div className="Messages-list">
                {content}
            </div>
        </div>
    );
}

export default Messages;