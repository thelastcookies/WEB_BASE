<script setup lang="ts">
const route = useRoute();
const url = computed(() => route?.meta?.href as string);
const loading = ref(true);

const finishLoading = () => {
  loading.value = false;
};

// 接收来自 iframe 页面中的消息
window.addEventListener('message', function(event) {
  // 确认消息来源是预期的域名
  if (event.origin !== 'http://10.0.0.10:8195') {
    return;
  }

  // 处理消息
  console.log('来自 iframe 的消息:', event.data);
});
</script>

<template>
  <div
    class="w-full h-full of-hidden
    flex-c bg-ant.bg-layout iframe-wrapper"
  >
    <a-spin
      :spinning="loading"
      wrapper-class-name="of-hidden w-full h-full flex flex-col flex-1"
    >
      <iframe class="w-full h-full flex flex-col flex-1 border-none" :src="url" @load="finishLoading" />
    </a-spin>
  </div>
</template>

<style>
.iframe-wrapper {
  .ant-spin-container {
    height: 100% !important;
    width: 100% !important;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
