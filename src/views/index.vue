<template>
  <div>this is home page{{ counter }}</div>
  <button class="btn" @click="increment">increment</button>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@s/counter'
import { storeToRefs } from 'pinia'
const store = useCounterStore()
const { counter } = storeToRefs(store)
const { increment } = store
</script>

<style lang="scss" scoped></style>
