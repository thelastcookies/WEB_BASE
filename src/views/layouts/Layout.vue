<script setup lang="ts">
const {routeTo} = useActionStore();

onMounted(() => {
    routeTo({id: import.meta.env.APP_HOMEPAGE_ID});
});
</script>

<template>
    <a-layout w-full h-full>
        <a-layout-header h-52px p-lr-16px>
            <Header/>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="280">
                <SidebarMenu></SidebarMenu>
            </a-layout-sider>
            <a-layout>
                <Breadcrumb></Breadcrumb>
                <a-layout-content p-24px>
                    <router-view v-slot="{ Component }">
                        <suspense timeout="0">
                            <component :is="Component"></component>
                            <template #fallback>
                                <BaseLoading/>
                            </template>
                        </suspense>
                    </router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
