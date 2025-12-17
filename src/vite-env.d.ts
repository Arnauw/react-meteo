/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_METEO_KEY: string;
    readonly VITE_GEO_KEY: string;
    readonly VITE_IPIFY_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
