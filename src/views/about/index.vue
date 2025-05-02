<template>
  <div>this is about page</div>
  <div>{{ $t(`home.description`) }}</div>
  <button>{{ $t('common.confirm') }}</button>
  <button @click="changeLanguage">changeLanguage</button>
</template>

<script lang="ts" setup>
import { getLocale, setLocale } from '@/language'

const changeLanguage = () => {
  let language = getLocale()
  language === 'zh-CN' ? setLocale('en') : setLocale('zh-CN')
}
</script>

<style lang="scss" scoped></style>
