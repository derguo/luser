<template>
  <el-select v-model="checked" clearable @change="choose">
    <slot />
    {{ states }}
  </el-select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'StateSelect',
  model: {
    prop: 'selectValue',
    event: 'selected'
  },
  props: {
    selectValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checked: ''
    }
  },
  computed: {
    ...mapGetters(['states'])
  },
  watch: {
    selectValue(val) {
      console.log(this.states)
      const sitem = this.states.find((item) => {
        if (item.id === val) {
          return true
        } else {
          const citem = item.bchildren.find((i) => {
            return i.bid === val
          })
          return !!citem
        }
      })
      this.checked = sitem ? sitem.id : ''
    }
  },
  async created() {
    await this.getRegion()
  },
  methods: {
    ...mapActions({
      getRegion: 'user/getRegion'
    }),
    choose(val) {
      this.$emit('selected', val)
    }
  }
}
</script>

<style>

</style>
