<template>
  <div v-loading="loging" class="app-container" style="width:520px">
    <el-form ref="passForm" label-width="80px" :model="pass" :rules="rules">
      <el-form-item label="">
        <h1>修改/重置密码</h1>
      </el-form-item>
      <el-form-item label="原始密码" prop="oldpwd">
        <el-input v-model="pass.oldpwd" type="password" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input v-model="pass.newpwd" type="password" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item label="重复新密码" prop="oldpwd">
        <el-input v-model="pass.oldpwd" type="password" placeholder="请输入登录名" />
      </el-form-item>
    </el-form>
    {{ userInfo }}<br><br>
    {{ users }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { login } from '@/api/user'
import MD5 from 'js-md5'
export default {
  name: 'ResetPassword',
  data() {
    return {
      loging: false,
      pass: {
        userid: '', // 当前登录员工ID
        username: '', // 当前登录员工username
        oldpwd: '',
        newpwd: '',
        newuserid: '',
        flag: ''
      },
      rules: {
        oldpwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { validator: this.verifyPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'users',
      userInfo: 'userInfo',
      username: 'username'
    })
  },
  async created() {
    await this.getUsers()

    this.pass.userid = this.userInfo.id
    this.pass.newuserid = this.userInfo.id
    this.pass.username = this.userInfo.username
  },
  methods: {
    ...mapActions({
      getUsers: 'user/getUsers'
    }),
    async verifyPass(rule, value, callback) {
      try {
        const response = await login({ username: 'admin', password: MD5(value) })
        console.log(response)
      } catch (error) {
        callback(new Error('原始密码不正确!'))
      }
    }
  }
}
</script>

<style>

</style>
