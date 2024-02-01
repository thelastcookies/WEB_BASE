import type {ActionItem} from "@/types";

declare module 'vue-router' {
    // @ts-ignore
    import type {RouteRecordRaw} from 'vue-router';

    interface RouteMeta extends ActionItem {
    }
}
