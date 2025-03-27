export const getEnvVariables = () => {
    // esto da error cuando hacen el build (vite aun no lo arregla)
    // import.meta.env

    return {
        // ...import.meta.env
        VITE_MODE: import.meta.env.VITE_MODE,
        VITE_API_URL: import.meta.env.VITE_API_URL,
    };
};