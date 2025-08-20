export function loggerInfo(...params) {
    process.env.NODE_ENV !== 'test' && console.log(...params);
}

export function loggerError(...params) {
    process.env.NODE_ENV !== 'test' && console.error(...params);
}