<template>
  <div class="app-container">
    <el-steps :active="chilstateinfo.length" align-center>
      <el-step v-for="(index, item) in chilstateinfo" :key="index" :title="item.currentdesc" :description="item.addtime" icon="el-icon-location" />
    </el-steps>
    <div style="margin:10px 0;">
      <label>处理状态：</label>
      <el-button type="" @click="handelCreate">有待跟进</el-button>
      <el-button type="" @click="handelCreate1">处理成功</el-button>
      <el-button type="" @click="handelCreate2">失败</el-button>
    </div>
    <el-form ref="form" label-position="left" :model="userinfo" label-width="160px" size="mini">
      <el-form-item label="单位全称：">
        <el-input v-model="userinfo.companyname" style="width: 47%;" />
      </el-form-item>
      <el-form-item label="单位所属行业：">
        <el-select v-model="userinfo.userindustryid" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位所在地区：">
        <el-select v-model="userinfo.provinceid" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位所在城市：">
        <el-select v-model="userinfo.usercityid" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="通讯地址：" class="yiban">
        <el-input v-model="userinfo.useraddress" />
      </el-form-item>
      <el-form-item label="邮编：" class="yiban">
        <el-input v-model="userinfo.userpostcode" />
      </el-form-item>
      <el-form-item label="联系人1：" class="yiban">
        <el-input v-model="userinfo.usercontactor" />
      </el-form-item>
      <el-form-item label="联系人:2：" class="yiban">
        <el-input v-model="userinfo.usercontactor2" />
      </el-form-item>
      <el-form-item label="国定电话1：" class="yiban">
        <el-input v-model="userinfo.usertelephone" />
      </el-form-item>
      <el-form-item label="手机：" class="yiban">
        <el-input v-model="userinfo.usermobile" />
      </el-form-item>
      <el-form-item label="传真：" class="yiban">
        <el-input v-model="userinfo.userfax" />
      </el-form-item>
      <el-form-item label="邮箱：" class="yiban">
        <el-input v-model="userinfo.useremail" />
      </el-form-item>
      <el-form-item size="large" style="clear:both">
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
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
export default {
  components: {
    FollowUp
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible1: false,
      importanceOptions: [1, 2, 3],
      userinfo: {},
      chilstateinfo: [],
      sninfos: []
    }
  },
  computed: {

  },
  created() {
    console.log(this.$route.params.registerno)
    customInfo(this.$store.state.user.token,
      {
        registerno: this.$route.params.registerno,
        userid: this.$store.state.user.userInfo.id
      }).then(val => {
      console.log('用户信息', val)
      if (!val.info1) {
        this.userinfo = val.info[0]
      } else {
        this.userinfo = val.info1[val.info1.length - 1]
      }
      this.sninfos = val.sninfo
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
    handelCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['handleFrom'].clearValidate()
      })
    },
    handelCreate1() {
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['handleFrom'].clearValidate()
      })
    },
    handelCreate2() {
      this.dialogFormVisible2 = true
      this.$nextTick(() => {
        this.$refs['handleFrom'].clearValidate()
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
