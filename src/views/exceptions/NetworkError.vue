<script setup lang="ts">
import networkErrorSvg from '~/exceptions/500.svg';
</script>

<template>
  <a-result title="Network Error" sub-title="网络连接失败，请稍后重试">
    <template #icon>
      <img :src="networkErrorSvg" alt="500.svg">
    </template>
  </a-result>
</template>
