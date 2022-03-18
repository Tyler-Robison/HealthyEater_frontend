import { useState, useEffect } from "react";

 /** custom hook that displays a msg for a specified amount of time  */
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