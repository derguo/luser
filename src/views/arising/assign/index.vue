<template>
  <div class="app-container">
    <div>将选中用户分配给：{{ chooseData.name || '' }}<span v-show="!chooseData.name" style="color:#ccc;">请选择</span></div>
    <div>
      <el-input v-model="sherchStr" placeholder="搜索" size="mini" style="margin:20px 0px;width:220px;" />
    </div>
    <el-radio-group v-model="chooseLable">
      <el-radio v-for="item in sherchRadios" :key="item.id" :label="item.id" border>{{ item.name }}</el-radio>
    </el-radio-group>
    <div style="margin:10px 0;">
      <el-button type="primary">确定</el-button>
    </div>

  </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
      chooseLable: -1,
      sherchStr: '',
      radios: [
        { id: 1, name: 'tome' },
        { id: 2, name: 'jjjjj' },
        { id: 3, name: 'aaaa' },
        { id: 4, name: 'dddd' },
        { id: 5, name: 'ccc' },
        { id: 6, name: '1111' },
        { id: 7, name: 'tomeeee' },
        { id: 8, name: 'c11' }
      ],
      sherchRadios: []
    }
  },
  computed: {
    chooseData() {
      const d = this.radios.filter((item) => {
        return this.chooseLable === item.id
      })

      return d.length ? d[0] : {}
    }
  },
  watch: {
    sherchStr(val) {
      this.sherchRadios = this.radios.filter((item) => {
        return this.chooseData.id === item.id || item.name.indexOf(val) === 0
      })
    }
  },
  created() {
    this.sherchRadios = this.radios
  },
  methods: {
    tochange(e, val) {
      console.log(e, val)
    }
  }
}
</script>

<style></style>
