<script setup lang="ts">
const appTitle = import.meta.env.APP_TITLE;
</script>

<template>
  <div class="w-full h-full flex-sb">
    <div class="h-full flex">
      <BaseIcon icon="/logo.svg" type="logo" :size="1.75" lt-sm:hidden></BaseIcon>
      <span class="c-ant.white ml-3 font-size-18px font-700 tracking-wide line-height-13
                  lt-sm:ml-0 lt-sm:mx-auto">{{ appTitle }}</span>
    </div>
    <div class="h-full lh-13">
      <UserAvatar :size="24" />
    </div>
  </div>
</template>
