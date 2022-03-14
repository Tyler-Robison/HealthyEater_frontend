import { useState, useEffect } from "react";

const useTimedMessage = (millisecs = 4000) => {
    const [active, setActive] = useState(false);

    useEffect(
        function showSavedMessage() {
            if (active) {
                setTimeout(function removeMessage() {
                    setActive(false);
                }, millisecs);
            }
        },
        [active, millisecs]

    );

    return [active, setActive];
}

export default useTimedMessage;