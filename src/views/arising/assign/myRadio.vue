<template>
  <el-radio :label="data[label]" @change="chooseme" />
</template>

<script>
export default {
  name: 'MyRadio',
  props: ['label', 'data'],
  methods: {
    chooseme(val) {

    }
  }
}
</script>

<style>

</style>
