<script setup lang="ts">
import { message } from "ant-design-vue";
import type { MenuInfo } from "ant-design-vue/es/menu/src/interface";

withDefaults(defineProps<{
  size: number
}>(), {
  size: 14,
});

const userStore = useUserStore();
const realName = computed(() => userStore.userInfo ? userStore.userInfo.RealName : "");
const appStore = useAppStore();

async function handleClick({ key }: MenuInfo) {
  if (key === "logout") {
    const hide = message.loading("注销中，请稍候。", 0);
    appStore.signOut().finally(() => {
      hide();
      message.success("注销成功", 3);
    });
  }
}

const { deviceType } = useAppStore();
</script>

<template>
  <a-dropdown>
    <div class="cursor-pointer h-full flex-s px-4 lt-sm:px-0">
      <a-avatar :size="size" mr-8px lt-sm:m-0 bg-ant.bg-container>
        <template #icon>
          <BaseIcon icon="i-mdi-account" text-14px c-ant.text></BaseIcon>
        </template>
      </a-avatar>
      <span v-if="deviceType === 'desktop'" class="c-ant.white text">{{ realName }}</span>
    </div>
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-divider />
        <a-menu-item key="logout">
          <template #icon>
            <BaseIcon icon="i-mdi-logout"></BaseIcon>
          </template>
          注销
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
