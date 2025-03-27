export const sleep = (mili: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, mili);
    });
