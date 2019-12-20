<template>
  <el-form ref="fu" v-loading="loging" class="app-container">
    <el-form-item label="">
      <el-checkbox-group v-model="stateides">
        <el-checkbox v-for="item in statesinfo.children" :key="item.bid" :disabled="item.disabled" :label="item.bid">{{ item.bname }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="备注说明">
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
import { chilstateinfo } from '@/api/user'

export default {
  name: 'FollowUp',
  props: ['userinfo', 'parentstateid'],
  data() {
    return {
      loging: true,
      chilstateinfo: [],
      stateides: [],
      followdata: {
        registerno: -1,
        rsuserid: -1,
        parentstateid: 3,
        stateid: '',
        cerrentdesc: '',
        userid: -1
      }
    }
  },
  computed: {
    statesinfo() {
      return this.$store.state.user.states.find(item => {
        return item.aid === this.parentstateid.toString()
      }) || { children: [] }
    }
  },
  watch: {
    chilstateinfo(val) {
      val.forEach(element => {
        const sinfo = this.statesinfo.children.find(item => {
          return item.bid === element.stateid
        })
        console.log(sinfo.bid)
        sinfo && this.$set(sinfo, 'disabled', true)
        // this.stateides.push(element.stateid)
      })
    }
  },
  beforeCreate() {
    this.loging = true
  },
  async created() {
    this.followdata.registerno = this.userinfo.registerno
    this.followdata.rsuserid = this.userinfo.rsuserid
    this.followdata.parentstateid = this.parentstateid
    this.followdata.userid = this.$store.state.user.userInfo.id

    try {
      await this.$store.dispatch('user/getRegion')
      this.chilstateinfo = await this.getChilstateInfo()
      this.loging = false
    } catch (error) {
      throw new Error('获取状态有误')
    }
  },
  methods: {
    async getChilstateInfo() {
      const chilstate = await chilstateinfo(this.$store.state.user.token,
        {
          rsuserid: this.$route.query.rsuserid,
          registerno: this.$route.query.registerno,
          parentstateid: this.parentstateid
        })

      return chilstate.info
    },
    clearValidate() {
      this.followdata.registerno = ''
      this.followdata.parentstateid = -1
      this.followdata.stateid = []
      this.followdata.cerrentdesc = ''
    },
    handleSub() {
      this.loging = true
      this.followdata.stateid = this.stateides.join(',')
      followUp(this.$store.state.user.token, this.followdata).then(
        async val => {
          if (val.errorcode === 0) {
            this.followdata.stateid = ''
            await this.getChilstateInfo()
            this.stateides = []
            this.loging = false
            Message({
              message: '提交成功',
              type: 'success',
              duration: 5 * 1000
            })
          } else {
            this.loging = false
            Message({
              message: '提交失败',
              type: 'error',
              duration: 5 * 1000
            })
          }
          this.$emit('upsucces', '')
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
