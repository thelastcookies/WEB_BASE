<script setup lang="ts">
import Parent from "@/views/common/Parent.vue";

const { deviceType } = useAppStore();
</script>
<template>
  <a-layout w-full h-full>
    <a-layout-header class="h-12 px-6">
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="deviceType === 'desktop'" width="220"
        breakpoint="xl" collapsed-width="50">
        <SidebarMenu></SidebarMenu>
      </a-layout-sider>
      <a-layout>
        <Breadcrumb v-if="deviceType === 'desktop'"></Breadcrumb>
        <a-layout-content>
          <Parent />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
