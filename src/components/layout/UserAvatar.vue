<script setup lang="ts">
import {message} from "ant-design-vue";
import type {MenuInfo} from "ant-design-vue/es/menu/src/interface";

const props = withDefaults(defineProps<{
    size: number
}>(), {
    size: 14
});

const userStore = useUserStore();
const realName = computed(() => userStore.userInfo ? userStore.userInfo.realName : '');
const appStore = useAppStore();

async function handleClick({key}: MenuInfo) {
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
        <div class="cursor-pointer h-full flex">
            <a-avatar :size="size" mr-8px>
                <BaseIcon icon="UserOutlined" :size="size"></BaseIcon>
            </a-avatar>
            <span class="user-name">{{ realName }}</span>
        </div>
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
.user-name {
    font-size: ~'@{fontSizeLG}px';
    color: @colorBgContainer;
}
</style>
