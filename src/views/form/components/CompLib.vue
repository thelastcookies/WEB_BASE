<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { nanoid } from "nanoid";
import { cloneDeep } from "lodash";

function handleClone(el: Record<string, string>) {
    return Object.assign(cloneDeep(el), {
        key: el.type + '_' + nanoid(8),
    });
}

</script>

<template>
    <div class="w-full h-full border border-ant.border border-solid">
        <div class="w-full h-8 line-height-8 text-center
            bg-ant.fill-quaternary border-b border-ant.border border-b-solid">组件库
        </div>
        <div class="p-3">
            <div v-for="(group, gi) in componentGroups" :key="gi">
                <div class="mb-2">{{ group.name }}</div>
                <vue-draggable
                    v-model="group.components"
                    :group="{ name: 'FormDesign', pull: 'clone', put: false }"
                    :sort="false"
                    :clone="handleClone"
                    class="grid grid-cols-2 grid-gap-1 mb-4"
                >
                    <div v-for="comp in group.components" :key="comp.type" class="comp-item">
                        <BaseIcon :icon="comp.icon" />
                        <span class="ml-1">{{ comp.name }}</span>
                    </div>
                </vue-draggable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.comp-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.75rem;
    background-color: var(--colorBgContainer);
    border: 1px solid var(--colorBorder);

    &:hover {
        background-color: var(--colorPrimaryBg);
        border-color: var(--colorPrimaryBorderHover);
        color: var(--colorPrimaryTextHover);
        cursor: grab;
    }
}
</style>
