import { useQuery } from "@tanstack/react-query";
import createDOMPurify from "dompurify";
import Round from "../../ui/Round";
import "./Message.css"
import { fetchUser, type User, type Message as MessageType } from "../../utils/http";

const Message: React.FC<MessageType> = ({ author_id, text }) => {

    const { data } = useQuery({
        queryKey: ['events', { id: author_id }],
        queryFn: ({ queryKey }) => {
            if (typeof queryKey[1] !== 'string') {
                return fetchUser(queryKey[1].id);
            }
            return {};
        }
    });

    const name = (data as User)?.name ?? '';

    const DOMPurify = createDOMPurify(window)

    return (
        <div className="Message">
            <Round name={name}></Round>
            <div className="Message-text-box">
                <div className="Message-user">
                    {name}
                </div>
                <div className="Message-text">
                    {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />}
                </div>
            </div>
        </div>
    );
}

export default Message;