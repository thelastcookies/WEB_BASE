/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_TITLE
    readonly APP_BUILD_NAME
    readonly APP_TAB_MODE
    readonly APP_HOMEPAGE
    readonly APP_API_BASE_URL
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
