import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue = []) => {
    const [state, setState] = useState(() => {
        let value
        try {
            value = JSON.parse(
                window.localStorage.getItem(key) || JSON.stringify(defaultValue)
            )
        } catch (e) {
            console.log(e)
            value = defaultValue;
        }
        return value;
    })
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    const clearStorage = () => {
        setState([])
    }

    return [state, setState, clearStorage];
}

export default useLocalStorage;