/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_FRONT_END_URL: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}