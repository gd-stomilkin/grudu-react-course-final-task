import React from "react";
import Round from "../../ui/Round";
import "./Header.css"

const Header: React.FC<{ name: string }> = ({ name }) => {

    return (
        <div className="Header">
            <div className="Header-title">
                X Messageing App
            </div>
            <div className="Header-user">
                {name}
                <Round name={name} />
            </div>
        </div>
    );
}

export default Header;