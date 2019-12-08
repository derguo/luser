<template>
  <div class="app-container">
    <div>将选中用户分配给：{{ chooseData.name || '' }}<span v-show="!chooseData.name" style="color:#ccc;">请选择</span></div>
    <div>
      <el-input v-model="sherchStr" placeholder="搜索" size="mini" style="margin:20px 0px;width:220px;" />
    </div>
    <el-radio-group v-model="chooseLable">
      <el-radio v-for="item in sherchRadios" :key="item.id" :label="item.id" border style="margin:0px 30px 10px 0px">{{ item.name }}</el-radio>
    </el-radio-group>
    <div style="margin:10px 0;">
      <el-button type="primary" @click="allocationsub">确定</el-button>
    </div>

  </div>
</template>

<script>
import { allocation } from '@/api/handle'
import { Message } from 'element-ui'
export default {
  name: 'Assign',
  components: { },
  props: ['chooseUser'],
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
    },
    userides() {
      return this.chooseUser.map((item) => {
        return item.id
      }).join(',')
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
    allocationsub() {
      allocation({
        registerno: this.userides,
        reuserid: this.$store.state.user,
        allocationinfo: {}
      }).then(val => {
        if (val.errorcode === 0) {
          this.$emit('allocationsucces', '')
          Message({
            message: '提交成功',
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          Message({
            message: '提交失败',
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>

<style></style>
