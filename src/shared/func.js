export function debounce(fn , duration = 1000) {
    if(typeof fn !== 'function') {
        throw Error('debounce needs function..');
    } else {
        let functionId = undefined;
        return (...args) => {
            if(functionId !== undefined) {
                clearTimeout(functionId)
            }
            
            functionId = setTimeout(() => {
                fn(...args);
                clearTimeout(functionId);
                functionId = undefined;
            }, duration);
        }
    }
}