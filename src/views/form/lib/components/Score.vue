<script setup lang="ts">
// import { EyeFilled, HeartFilled, LikeFilled, StarFilled, TrophyFilled } from "@ant-design/icons-vue";
import type { ScoreConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

withDefaults(defineProps<ScoreConfigProps>(), {
    ...componentCommonPropsDefault,
    ...scoreConfigPropsDefault,
});

</script>

<template>
    <a-rate :allow-half="enableHalf" allow-clear
            :count="max" v-model:value="value">
        <template #character><BaseIcon :icon="icon" /></template>
    </a-rate>
<!--    <template v-if="icon === 'Star'">-->
<!--      <a-rate :allow-half="enableHalf" allow-clear-->
<!--              :count="max" v-model:value="value">-->
<!--        <template #character><StarFilled/></template>-->
<!--      </a-rate>-->
<!--    </template>-->
<!--    <template v-else-if="icon === 'Eye'">-->
<!--      <a-rate :allow-half="enableHalf" allow-clear-->
<!--            :count="max" v-model:value="value">-->
<!--        <template #character><EyeFilled/></template>-->
<!--      </a-rate>-->
<!--    </template>-->
<!--    <template v-else-if="icon === 'Heart'">-->
<!--      <a-rate :allow-half="enableHalf" allow-clear-->
<!--            :count="max" v-model:value="value">-->
<!--        <template #character><HeartFilled/></template>-->
<!--      </a-rate>-->
<!--    </template>-->
<!--    <template v-else-if="icon === 'Trophy'">-->
<!--      <a-rate :allow-half="enableHalf" allow-clear-->
<!--            :count="max" v-model:value="value">-->
<!--        <template #character><TrophyFilled/></template>-->
<!--      </a-rate>-->
<!--    </template>-->
<!--    <template v-else-if="icon === 'Like'">-->
<!--      <a-rate :allow-half="enableHalf" allow-clear-->
<!--            :count="max" v-model:value="value">-->
<!--        <template #character><LikeFilled/></template>-->
<!--      </a-rate>-->
<!--    </template>-->
</template>
