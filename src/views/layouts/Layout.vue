<script setup lang="ts">
import Parent from '@/views/common/Parent.vue';

const { deviceType } = useAppStore();
</script>
<template>
  <a-layout w-full h-full>
    <a-layout-header class="!h-12 px-6">
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="deviceType === 'desktop'" width="220"
        breakpoint="xl" collapsed-width="50">
        <SidebarMenu></SidebarMenu>
      </a-layout-sider>
      <a-layout>
        <PageHeader v-if="deviceType === 'desktop'"></PageHeader>
        <a-layout-content overflow-x-hidden overflow-y-auto>
          <Parent />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer v-if="deviceType === 'mobile'" class="!p-0">
      <FooterMenu></FooterMenu>
    </a-layout-footer>
  </a-layout>
</template>
