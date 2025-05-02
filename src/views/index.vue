<template>
  <div>this is home page{{ counter }}</div>
  <button class="btn" @click="increment">increment</button>
  <button class="test-api" @click="getProduct">getProduct</button>
  <button class="test-api" @click="postProduct">postProduct</button>
</template>

<script lang="ts" setup>
import { getProductions, postProductions } from '@/api/module/test_api'
import { useCounterStore } from '@s/counter'
import { storeToRefs } from 'pinia'
const store = useCounterStore()
const { counter } = storeToRefs(store)
const { increment } = store

const getProduct = () => {
  getProductions().then(res => {
    console.log(res)
  })
}
const postProduct = () => {
  postProductions().then(res => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped></style>
