<script setup lang="ts">
const {routeTo} = useActionStore();

onMounted(() => {
    routeTo({id: import.meta.env.APP_HOMEPAGE_ID});
});
</script>

<template>
    <a-layout w-full h-full>
        <a-layout-header h-48px>
            <Header />
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="280">
                <SidebarMenu></SidebarMenu>
            </a-layout-sider>
            <a-layout pl-15px>
                <Breadcrumb></Breadcrumb>
                <a-layout-content class="main-container">
                    <router-view v-slot="{ Component }">
                        <suspense timeout="0">
                            <div>
                                <component :is="Component"></component>
                            </div>
                            <template #fallback>
                                <Loading />
                            </template>
                        </suspense>
                    </router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<style scoped lang="less">
.main-container {
    background-color: @colorBgContainer;
}

</style>
