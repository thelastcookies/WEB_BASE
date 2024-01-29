import type {ActionItem} from "@/router/types.ts";

declare module 'vue-router' {
    import type {RouteRecordRaw} from 'vue-router';

    interface RouteMeta extends ActionItem {
    }
}
