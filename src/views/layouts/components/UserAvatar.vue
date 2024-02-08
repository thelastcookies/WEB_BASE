<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import {message} from "ant-design-vue";
import {useAppStore} from "@/stores/app.ts";
import BaseIcon from "@/components/base/BaseIcon.vue";

const userStore = useUserStore();
const realName = computed(() => userStore.userInfo ? userStore.userInfo.realName : '');
const appStore = useAppStore();

async function handleClick(key: string) {
    if (key === 'logout') {
        const hide = message.loading('注销中，请稍候。', 0);
        appStore.signOut().finally(() => {
            hide();
            message.success('注销成功', 3);
        });
    }
}

</script>

<template>
    <a-dropdown>
        <span>
            <a-avatar :size="30">
                <BaseIcon icon="UserOutlined" :size="30"></BaseIcon>
            </a-avatar>
            <span>{{ realName }}</span>
        </span>
        <template #overlay>
            <a-menu @click="handleClick">
                <a-menu-divider/>
                <a-menu-item key="logout">
                    <template #icon>
                        <BaseIcon icon="LogoutOutlined"></BaseIcon>
                    </template>
                    注销
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<style scoped lang="less">

</style>
