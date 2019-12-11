<template>
  <el-popover
    v-if="source.length"
    placement="right"
    width="400"
    trigger="hover"
  >
    <div v-for="(item, index) in source" :key="index" style="border-bottom: solid 1px #ccc;">
      {{ item }}
    </div>
    <el-button slot="reference" icon="el-icon-time" circle />
  </el-popover>
</template>

<script>
export default {
  name: 'EditHistory',
  props: {
    source: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>

</style>
