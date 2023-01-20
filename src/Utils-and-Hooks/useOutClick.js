import {useEffect} from "react";

export const useOutClick = (ref, setClose, dropdownOptions) => {
    useEffect(() => {
        const clickHandler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                console.log('run')
                setClose && setClose(false);
                dropdownOptions && dropdownOptions('options-hide');
            }
        };

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [ref]);

};