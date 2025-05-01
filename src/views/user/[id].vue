<!-- src/views/user/[id].vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('User ID:', route.params.id) // 应该输出 4
</script>

<template>
  <div>正在查看用户ID: {{ $route.params.id }}</div>
</template>
