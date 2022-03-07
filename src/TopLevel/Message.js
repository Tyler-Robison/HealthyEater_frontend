import React from "react";

const Message = ({ msg, color = 'black' }) => {

    if (!msg) return <h3></h3>
    if (msg && msg.length === 0) return <h3></h3>
    return <h3 style={{ color: `${color}` }}>{msg}</h3>

}

export default Message;