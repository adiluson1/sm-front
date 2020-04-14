

export const getCurrentDateStr = () => {
    let date = new Date();
    return date.getHours().toString() + ' ' +
        + date.getMinutes().toString() + ' ' +
        + date.getSeconds().toString() + ' ' +
        + date.getMilliseconds().toString();
};