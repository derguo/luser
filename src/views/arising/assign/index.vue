<template>
  <div class="app-container">
    <div>将选中用户分配给：{{ chooseData.name || '' }}<span v-show="!chooseData.name" style="color:#ccc;">请选择</span></div>
    <div>
      <el-input v-model="sherchStr" placeholder="搜索" size="mini" style="margin:20px 0px;width:220px;" />
    </div>
    <el-radio-group v-model="chooseLable">
      <el-radio v-for="item in sherchRadios" :key="item.id" :label="item.id" border style="margin:0px 30px 10px 0px">{{ item.cnname }}</el-radio>
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
      radios: [],
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
        return item.registerno
      }).join(',')
    }
  },
  watch: {
    sherchStr(val) {
      this.sherchRadios = this.radios.filter((item) => {
        return this.chooseData.id === item.id || item.cnname.indexOf(val) === 0
      })
    }
  },
  created() {
    this.radios = this.$store.state.user.users
    this.sherchRadios = this.radios
  },
  methods: {
    allocationsub() {
      if (!this.chooseData.cnname) {
        Message({
          message: '请选择一个员工',
          type: 'error',
          duration: 5 * 1000
        })
        return true
      }
      allocation(this.$store.state.user.token, {
        registerno: this.userides,
        rsuserid: this.chooseLable,
        userid: this.$store.state.user.userInfo.id
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
