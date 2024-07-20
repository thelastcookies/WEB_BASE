<template>
  <RouterView v-slot="{ Component, route }">
    <Transition appear name="slide-fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
