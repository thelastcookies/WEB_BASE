<script setup lang="ts">
const { deviceType } = useAppStore();
</script>
<template>
  <a-layout w-full h-full>
    <a-layout-header h-13 p-lr-4>
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-if="deviceType === 'desktop'" width="280">
        <SidebarMenu></SidebarMenu>
      </a-layout-sider>
      <a-layout>
        <Breadcrumb v-if="deviceType === 'desktop'"></Breadcrumb>
        <a-layout-content>
          <router-view v-slot="{ Component }">
            <suspense timeout="0">
              <div class="h-full w-full">
                <component :is="Component"></component>
              </div>
              <template #fallback>
                <BaseLoading />
              </template>
            </suspense>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
