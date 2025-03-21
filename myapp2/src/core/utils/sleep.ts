export const sleep = (milli: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, milli);
    });
}