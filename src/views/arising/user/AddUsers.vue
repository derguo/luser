<template>
  <div v-loading="loging" :model="user" class="app-container addusers">
    <el-form>
      <div style="margin: 20px auto;width: 320px;">
        <h1>添加销售员工</h1>
      </div>
      <el-form-item>
        <el-input v-model="user.newusername" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.newcnname" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.phone" placeholder="移动电话" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="user.provinceid" placeholder="请选择员工所在省份">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="user.authorid" placeholder="级别" disabled>
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="user.regionid" collapse-tags placeholder="请选择所在区域">
          <el-option v-for="(item,index) in region" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有分配权限">
        <el-radio-group v-model="user.assignment">
          <el-radio label="1有" />
          <el-radio label="0无" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button>确认提交</el-button>
          <el-button>取消返回</el-button>
        </el-row>
      </el-form-item>
      <div>
        <span>默认密码:英文名888，如admin888</span>
      </div>
    </el-form>
    {{ userInfo }}<br><br>{{ user }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addusers } from '@/api/user'
export default {
  name: 'AddUsers',
  data() {
    return {
      loging: false,
      user: {
        userid: '2', // 当前登录员工ID
        username: 'admin', // 当前登录员工username
        newusername: '',
        newcnname: '',
        phone: '',
        provinceid: '',
        regionid: '',
        authorid: '',
        assignment: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      region: 'region',
      token: 'token'
    })
  },
  async created() {
    await this.getRegion()
    this.user.userid = this.userInfo.id
    this.user.username = this.userInfo.username
  },
  methods: {
    ...mapActions({
      getRegion: 'user/getBigRegion'
    }),
    addusers() {
      addusers(this.token, this.user)
    }
  }
}
</script>

<style>
.addusers{
    width: 220px;
}
</style>
