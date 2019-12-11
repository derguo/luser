<template>
  <div v-loading="loging" class="app-container">
    <el-steps :active="chilstateinfo.length" align-center>
      <el-step v-for="(index, item) in chilstateinfo" :key="index" :title="item.currentdesc" :description="item.addtime" icon="el-icon-location" />
    </el-steps>
    <div style="margin:10px 0;">
      <label>处理状态：</label>
      <el-button type="" @click="handelCreate">有待跟进</el-button>
      <el-button type="" @click="handelCreate1">处理成功</el-button>
      <el-button type="" @click="handelCreate2">失败</el-button>
    </div>
    <el-form ref="form" label-position="left" label-width="160px" size="mini">
      <el-form-item label="单位全称：">
        <el-input v-model="userinfo.companyname" style="width: 47%;" />
        <edit-history :source="info1Array.companyname" />
      </el-form-item>
      <el-form-item label="单位所属行业：">
        <el-select v-model="userinfo.userindustryid" placeholder="请选择活动区域">
          <el-option v-for="item in $store.state.user.industry" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <edit-history :source="info1Array.companyname" />
      </el-form-item>
      <el-form-item label="单位所在地区：">
        <el-select v-model="userinfo.provinceid" placeholder="请选择省份" @change="changeprovince">
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
import { customInfo, chilstateinfo } from '@/api/user'
import editHistory from './editHistory.vue'
import { upUserInfo } from '@/api/handle'
import { Message } from 'element-ui'

export default {
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
      importanceOptions: [1, 2, 3],
      userinfo: {},
      info1: [],
      startUserInfo: {},
      chilstateinfo: [],
      sninfos: [],
      city: []
    }
  },
  computed: {
    info1Array: function() {
      const temp = this.info1[0] ? JSON.parse(JSON.stringify(this.info1[0])) : {}
      console.log('拷贝---', temp)
      this.info1.forEach((item) => {
        for (const key in item) {
          temp[key] = []
          !item[key].toString().trim() || temp[key].push(item[key])
        }
      })
      return temp
    }
  },
  watch: {
  },
  beforeCreate() {
    console.log(this.$route.params.registerno)
    customInfo(this.$store.state.user.token,
      {
        registerno: this.$route.params.registerno,
        userid: this.$store.state.user.userInfo.id
      }).then(val => {
      console.log('用户信息', val)
      this.userinfo = val.info[0]
      this.startUserInfo = JSON.parse(JSON.stringify(this.userinfo))
      this.info1 = val.info1 ? val.info1 : []

      this.sninfos = val.sninfo
      this.city = this.$store.state.user.city.find((item) => {
        return this.userinfo.provinceid === item.id
      }).city
      console.log(this.city)
      this.loging = false
    })
    chilstateinfo(this.$store.state.user.token,
      {
        rsuserid: this.$route.query.rsuserid,
        registerno: this.$route.query.registerno,
        parentstateid: this.$route.query.stateid
      }).then(val => {
      console.log('处理信息', val)
      this.chilstateinfo = val.info
    })
  },
  methods: {
    addUserInfodata() {
      this.userinfo.provincename = ' '
      this.userinfo.userindustryname = ' '
      this.userinfo.usercityname = ' '
      this.userinfo.userid = this.$store.state.user.userInfo.id
    },
    changeUser() {
      this.addUserInfodata()
      upUserInfo(this.$store.state.user.token, this.userinfo).then(
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
      this.changeprovince()
    },
    changeprovince() {
      this.city = this.$store.state.user.city.find((item) => {
        return this.userinfo.provinceid === item.id
      }).city
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
    followupsuccess() {
      console.log(this)
      this.dialogFormVisible = false
      this.dialogFormVisible1 = false
      this.dialogFormVisible2 = false
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
