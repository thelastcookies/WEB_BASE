import {InjectionKey} from "vue";
import type {MessageInstance} from "ant-design-vue/es/message/interface";
import type {NotificationInstance} from "ant-design-vue/es/notification/interface";

export const MsgInjectionKey = Symbol() as InjectionKey<MessageInstance>;
export const MsgContextHolderInjectionKey = Symbol() as InjectionKey<Function>;
export const NotiInjectionKey = Symbol() as InjectionKey<NotificationInstance>;
export const NotiContextHolderInjectionKey = Symbol() as InjectionKey<Function>;
