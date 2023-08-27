import "./Round.css"

const Round: React.FC<{ name: string }> = ({ name }) => {
    const initials = name.split(' ').map((word) => word[0]).join('').toUpperCase();
    return (
        <div className="Round">{initials}</div>
    );
}

export default Round;