import { useEffect, useRef } from 'react';

/**
 * `usePrevious` returns a mutable ref object's `.current` property which is initialized to the passed argument `(value)` and
 *  immediately returned before updates from the current render.
 *
 * `usePrevious` is useful to store the previous prop or state value passed in as input.
 *
 * @function usePrevious
 * @returns {MutableRefObject.current} a mutable ref object's `.current` property.
*/

const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default usePrevious;