<script setup lang="ts">

import type { MenuProps } from 'ant-design-vue';

const props = withDefaults(defineProps<{
  domId?: string;
  exportName?: string;
}>(), {
  domId: 'table',
  exportName: '导出',
});

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  if (key === 'Excel') {
    exportTableAsXlsx(props.domId, props.exportName);
  } else if (key === 'Word') {
    exportTableAsDocx(props.domId, props.exportName);
  } else if (key === 'PDF') {
    exportTableAsPdf(props.domId, props.exportName);
  }
};
</script>

<template>
  <a-dropdown trigger="click">
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="Excel">
          <BaseIcon icon="i-mdi-file-excel-box-outline" />
          导出为 Excel
        </a-menu-item>
        <a-menu-item key="Word">
          <BaseIcon icon="i-mdi-file-word-box-outline" />
          导出为 Word
        </a-menu-item>
        <a-menu-item key="PDF">
          <BaseIcon icon="i-mdi-file-pdf-box-outline" />
          导出为 PDF
        </a-menu-item>
      </a-menu>
    </template>
    <a-button ml-2 pr-2>
      <BaseIcon icon="i-mdi-export" />
      导出
      <BaseIcon icon="i-mdi-chevron-down" />
    </a-button>

  </a-dropdown>
</template>


