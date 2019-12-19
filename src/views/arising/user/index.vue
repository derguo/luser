<template>
  <div v-loading="loging" class="app-container">
    <el-steps :active="customHandleState.length" align-center>
      <el-step v-for="(item, index) in customHandleState" :key="index" :title="'[' + $route.query.rsusername + ']' + item.statename" :description="item.addtime" icon="el-icon-location" />
    </el-steps>
    <div style="margin:10px 0;">
      <label style="display:inline-block;width:108px">处理状态： </label>
      <el-button type="" @click="handelCreate">有待跟进</el-button>
      <el-button type="" @click="handelCreate1">处理成功</el-button>
      <el-button type="" @click="handelCreate2">失败</el-button>
    </div>
    <el-form ref="form" label-position="left" label-width="110px" size="mini">
      <el-form-item label="客户注册码：">
        <div>{{ userinfo.registerno }}</div>
      </el-form-item>
      <el-form-item label="单位全称：">
        <el-input v-model="userinfo.companyname" style="width: 47%;" />
        <edit-history :source="info1Array.companyname" />
      </el-form-item>
      <el-form-item label="单位所属行业：">
        <el-select v-model="userinfo.userindustryid" placeholder="请选择活动区域" @change="provinceChange">
          <el-option v-for="item in $store.state.user.industry" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <edit-history :source="info1Array.userindustryid" />
      </el-form-item>
      <el-form-item label="单位所在地区：">
        <el-select v-model="userinfo.provinceid" placeholder="请选择省份" @change="provinceChange">
          <el-option v-for="item in $store.state.user.province" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <edit-history :source="info1Array.provinceid" />
      </el-form-item>
      <el-form-item label="单位所在城市：">
        <el-select ref="ucity" v-model="userinfo.usercityid" placeholder="请选择城市">
          <el-option v-for="item in city" :key="item.cid" :label="item.cname" :value="item.cid" />
        </el-select>
        <edit-history :source="info1Array.usercityid" />
      </el-form-item>
      <el-form-item label="通讯地址：" class="yiban">
        <el-input v-model="userinfo.useraddress" style="width:90%" />
        <edit-history :source="info1Array.useraddress" />
      </el-form-item>
      <el-form-item label="邮编：" class="yiban">
        <el-input v-model="userinfo.userpostcode" style="width:90%" />
        <edit-history :source="info1Array.userpostcode" />
      </el-form-item>
      <el-form-item label="联系人1：" class="yiban">
        <el-input v-model="userinfo.usercontactor" style="width:90%" />
        <edit-history :source="info1Array.usercontactor" />
      </el-form-item>
      <el-form-item label="联系人:2：" class="yiban">
        <el-input v-model="userinfo.usercontactor2" style="width:90%" />
        <edit-history :source="info1Array.usercontactor2" />
      </el-form-item>
      <el-form-item label="国定电话1：" class="yiban">
        <el-input v-model="userinfo.usertelephone" style="width:90%" />
        <edit-history :source="info1Array.usertelephone" />
      </el-form-item>
      <el-form-item label="手机：" class="yiban">
        <el-input v-model="userinfo.usermobile" style="width:90%" />
        <edit-history :source="info1Array.usermobile" />
      </el-form-item>
      <el-form-item label="传真：" class="yiban">
        <el-input v-model="userinfo.userfax" style="width:90%" />
        <edit-history :source="info1Array.userfax" />
      </el-form-item>
      <el-form-item label="邮箱：" class="yiban">
        <el-input v-model="userinfo.useremail" style="width:90%" />
        <edit-history :source="info1Array.useremail" />
      </el-form-item>
      <el-form-item size="large" style="clear:both">
        <el-button type="primary" @click="changeUser">修改</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-collapse v-if="sninfos.length" accordion>
      <el-collapse-item v-for="item in sninfos" :key="item.sn" :title="'sn:'+item.sn">
        <el-form label-position="left" label-width="160px" size="mini">
          <el-form-item label="序列号：">
            <div>{{ item.sn }}</div>
          </el-form-item>
          <el-form-item label="用户ID：" class="yiban">
            <div>{{ item.registerno }}</div>
          </el-form-item>
          <el-form-item label="添加时间：" class="yiban">
            <div>{{ item.createdate }}</div>
          </el-form-item>
          <el-form-item label="注册日期：" class="yiban">
            <div>{{ item.regdate }}</div>
          </el-form-item>
          <el-form-item label="序列号状态：" class="yiban">
            <div>{{ item.snstate }}</div>
          </el-form-item>
          <el-form-item label="服务开始日期：" class="yiban">
            <div>{{ item.startdate }}</div>
          </el-form-item>
          <el-form-item label="服务截至日期：" class="yiban">
            <div>{{ item.enddate }}</div>
          </el-form-item>
          <el-form-item label="注册状态：" class="yiban">
            <div>{{ item.regstate }}</div>
          </el-form-item>
          <el-form-item label="规模1：" class="yiban">
            <div>{{ item.prodcount1 }}</div>
          </el-form-item>
          <el-form-item label="规模2：" class="yiban">
            <div>{{ item.prodcount2 }}</div>
          </el-form-item>
          <el-form-item label="规模3：" class="yiban">
            <div>{{ item.prodcount3 }}</div>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="有待跟进" :visible.sync="dialogFormVisible">
      <follow-up ref="handleFrom" :userinfo="this.$route.query" :parentstateid="3" @upsucces="followupsuccess" />
    </el-dialog>
    <el-dialog title="处理成功" :visible.sync="dialogFormVisible1">
      <follow-up ref="handleFrom1" :userinfo="this.$route.query" :parentstateid="5" @upsucces="followupsuccess" />
    </el-dialog>
    <el-dialog title="失败" :visible.sync="dialogFormVisible2">
      <follow-up ref="handleFrom2" :userinfo="this.$route.query" :parentstateid="7" @upsucces="followupsuccess" />
    </el-dialog>
  </div>
</template>

<script>
import FollowUp from '@/views/arising/handle/FollowUp'
import { customInfo, getCustomHandleState } from '@/api/user'
import editHistory from './editHistory.vue'
import { upUserInfo } from '@/api/handle'
import { Message } from 'element-ui'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Auser',
  components: {
    FollowUp,
    editHistory
  },
  data() {
    return {
      loging: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible1: false,
      userinfo: {},
      info1: [],
      startUserInfo: {},
      customHandleState: [],
      sninfos: []
    }
  },
  computed: {
    ...mapGetters({
      citys: 'citys',
      industry: 'industry'
    }),
    city() {
      const c = this.citys.find(item => {
        return item.id === this.userinfo.provinceid
      })
      return c ? c.city : []
    },
    info1Array: function() {
      if (!this.info1[0]) { return {} }

      const temp = JSON.parse(JSON.stringify(this.info1[0]))
      for (const key in temp) {
        temp[key] = []
      }
      this.info1.forEach((item) => {
        for (const key in item) {
          !item[key].toString().trim() || temp[key].push(item[key])
        }
      })
      temp.userindustryid = temp.userindustryid.map(item => { return this.finedIndustryName(item) })
      temp.provinceid = temp.provinceid.map(item => { return this.finedProvinceName(item) })
      temp.usercityid = temp.usercityid.map(item => { return this.finedCityName(item) })
      return temp
    },
    selectedProvinceName() {
      return this.finedProvinceName(this.userinfo.provinceid)
    },
    selectedCityName() {
      return this.finedCityName(this.userinfo.usercityid)
    },
    selectIndustryName() {
      return this.finedIndustryName(this.userinfo.userindustryid)
    }
  },
  watch: {
  },
  async created() {
    try {
      await this.$store.dispatch('user/getCity')
      await this.$store.dispatch('user/getIndustry')
      await this.$store.dispatch('user/getAuthorType')
      await this.getCustom()
      const customHandleState = await this.getCustomHandleState()

      this.customHandleState = customHandleState.info || []

      this.loging = false
    } catch (error) {
      Message({
        message: '读取基础数据有误。请尝试刷新页面！',
        type: 'warning',
        duration: 5 * 1000
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'getCity'
    ]),
    async getCustom() {
      const custom = await customInfo(this.$store.state.user.token,
        {
          registerno: this.$route.params.registerno,
          userid: this.$store.state.user.userInfo.id
        })

      this.userinfo = custom.info[0]
      this.startUserInfo = JSON.parse(JSON.stringify(this.userinfo))
      this.info1 = custom.info1 || []

      this.sninfos = custom.sninfo
      return custom
    },
    finedProvinceName(provinceid) {
      const p = this.citys.find(item => {
        return provinceid === item.id
      })
      return p ? p.name : ''
    },
    finedCityName(cityid) {
      const c = this.city.find(item => {
        return item.cid === cityid
      })
      return c ? c.cname : ''
    },
    finedIndustryName(industryid) {
      const i = this.industry.find(item => {
        return item.id === industryid
      })
      return i ? i.name : ''
    },
    async getCustomHandleState() {
      const response = await getCustomHandleState(this.$store.state.user.token,
        {
          rsuserid: this.$route.query.rsuserid,
          registerno: this.$route.query.registerno,
          userid: this.$store.state.user.userInfo.id
        })
      return response
    },
    provinceChange(val) {
      this.userinfo.usercityid = ''
    },
    addUserInfodata() {
      this.userinfo.provincename = this.selectedProvinceName
      this.userinfo.userindustryname = this.selectIndustryName
      this.userinfo.usercityname = this.selectedCityName
      this.userinfo.userid = this.$store.state.user.userInfo.id
    },
    submitData() {
      let s = false
      const temp = {}
      temp.provincename = ''
      temp.userindustryname = ''
      temp.usercityname = ''
      temp.userid = this.$store.state.user.userInfo.id
      for (const key in this.userinfo) {
        console.log(this.startUserInfo[key], this.userinfo[key])
        if (this.startUserInfo[key] === this.userinfo[key]) {
          temp[key] = ''
        } else {
          s = true
          temp[key] = this.userinfo[key]
          switch (key) {
            case 'provinceid':
              temp.provincename = this.selectedProvinceName
              break
            case 'userindustryid':
              temp.userindustryname = this.selectIndustryName
              break
            case 'usercityid':
              temp.usercityname = this.selectedCityName
              break
            default:
              break
          }
        }
      }
      temp.registerno = this.userinfo.registerno
      temp.stateid = this.userinfo.stateid
      return s && temp
    },
    changeUser() {
      const sd = this.submitData()
      if (!sd) {
        Message({
          message: '没有修改！',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      upUserInfo(this.$store.state.user.token, sd).then(
        val => {
          if (val.errorcode === 0) {
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
    reset() {
      this.userinfo = JSON.parse(JSON.stringify(this.startUserInfo))
    },
    handelCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
      })
    },
    handelCreate1() {
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
      })
    },
    handelCreate2() {
      this.dialogFormVisible2 = true
      this.$nextTick(() => {
      })
    },
    async followupsuccess() {
      this.dialogFormVisible = false
      this.dialogFormVisible1 = false
      this.dialogFormVisible2 = false

      const customHandleState = await this.getCustomHandleState()
      this.customHandleState = customHandleState.info || []
    }
  }
}
</script>

<style lang="scss">
.user-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .nobb{
    background-color: white;
    border: none
  }

}
.yiban{
    width: 47%;
    float: left;
    margin-right: 10px;
  }
</style>
