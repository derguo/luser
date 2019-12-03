<template>
  <div>{{ massage }}
    <div>
      {{ this.$store.state.user }}
    </div>
    <div>
      {{ this.$store.state.user.username }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      massage: 'this is index page'
    }
  }
}
</script>

<style>
</style>
