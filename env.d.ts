/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_TITLE
    readonly APP_BUILD_NAME
    readonly APP_TAB_MODE
    readonly APP_HOMEPAGE
    readonly APP_SOURCE_MAP
    readonly APP_API_BASE_URL
    readonly APP_API_PERM_URL
}


interface ImportMeta {
    readonly env: ImportMetaEnv
}
