<template>
  <el-form ref="fu" class="app-container">
    <el-form-item label="">
      <el-checkbox-group v-model="followdata.stateid">
        <el-checkbox v-for="item in statesinfo.children" :key="item.bid" :label="item.bid">{{ item.bname }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="有待跟进备注说明">
      <el-input
        v-model="followdata.cerrentdesc"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
      />
    </el-form-item>
    <div style="margin:10px 0;">
      <el-button type="primary" @click="handleSub">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>

</template>

<script>
import { followUp } from '@/api/handle'
import { Message } from 'element-ui'
export default {
  name: 'FollowUp',
  props: ['userinfo', 'parentstateid'],
  data() {
    return {
      followdata: {
        registerno: -1,
        rsuserid: -1,
        parentstateid: 3,
        stateid: [],
        cerrentdesc: '',
        userid: -1
      }
    }
  },
  computed: {
    statesinfo() {
      return this.$store.state.user.states.find(item => {
        return item.aid === this.parentstateid.toString()
      })
    }
  },
  created() {
    console.log('==========', this.parentstateid)
    this.followdata.registerno = this.userinfo.registerno
    this.followdata.rsuserid = this.userinfo.rsuserid
    this.followdata.parentstateid = this.parentstateid
    this.followdata.userid = this.$store.state.user.userInfo.id
  },
  methods: {
    clearValidate() {
      this.followdata.registerno = ''
      this.followdata.parentstateid = -1
      this.followdata.stateid = []
      this.followdata.cerrentdesc = ''
    },
    handleSub() {
      this.followdata.stateid = this.followdata.stateid.join(',')
      followUp(this.$store.state.user.token, this.followdata).then(
        val => {
          if (val.errorcode === 0) {
            this.$emit('upsucces', '')
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
        }
      )
    },
    cancel() {
      this.$emit('upsucces', '')
    }
  }
}
</script>

<style></style>
