 import React, {useEffect} from 'react';
 const onClickOutside = (ref, handleClickOutside) => {
    useEffect(() => {
        const listener = (event) => {
            const element = ref?.current;
            if(!element || element.contains((event?.target) || null)){
                return
            }
            handleClickOutside(event)
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        }
    },[ref, handleClickOutside])
}

export default onClickOutside;