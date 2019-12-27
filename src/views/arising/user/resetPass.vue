<template>
  <div v-loading="loging" class="app-container" style="width:520px">
    <el-form ref="passForm" label-width="100px" :model="pass" :rules="rules">
      <el-form-item label="">
        <h1>修改/重置密码</h1>
      </el-form-item>
      <el-form-item label="自身密码" prop="oldpwd">
        <el-input v-model="pass.oldpwd" type="password" placeholder="请输入登录密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input v-model="pass.newpwd" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="重复新密码" prop="repeatpass">
        <el-input v-model="repeatpass" type="password" placeholder="重复新密码" />
      </el-form-item>
      <el-form-item v-if="userInfo.authorid != '15'" label="选择用户" prop="repeatpass">
        <el-select v-model="pass.newuserid" collapse-tags placeholder="请选择用户" style="width:100%" @change="chooseUser">
          <el-option v-for="(item, index) in users" :key="index" :label="item.cnname" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button type="primary" @click.native.prevent="repeat">确认提交</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { login, mdfpwd } from '@/api/user'
import { Message } from 'element-ui'
import MD5 from 'js-md5'
export default {
  name: 'ResetPassword',
  data() {
    return {
      loging: false,
      repeatpass: '',
      pass: {
        userid: '', // 当前登录员工ID
        username: '', // 当前登录员工username
        oldpwd: '',
        newpwd: '',
        newuserid: '',
        flag: '1'
      },
      rules: {
        oldpwd: [
          { required: true, message: '请输入自身密码', trigger: 'blur' },
          { validator: this.verifyPass, trigger: 'blur' }
        ],
        newpwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        repeatpass: [
          { validator: this.verifyRepeatpass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'users',
      userInfo: 'userInfo',
      token: 'token'
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
      console.log(value)
      try {
        await login({ username: this.userInfo.username, password: MD5(value) })
      } catch (error) {
        callback(new Error('原始密码不正确!'))
      }
    },
    verifyRepeatpass(rule, value, callback) {
      if (this.repeatpass === this.pass.newpwd) {
        callback()
      } else {
        callback(new Error('两次输入不一致'))
      }
    },
    repeat() {
      this.$refs['passForm'].validate((valid) => {
        if (valid) {
          this.loging = true
          this.pass.newpwd = MD5(this.pass.newpwd)
          this.pass.oldpwd = MD5(this.pass.oldpwd)
          mdfpwd(this.token, this.pass).then(() => {
            Message({
              message: '修改成功！',
              type: 'success',
              duration: 5 * 1000
            })
          }).catch(() => {
            Message({
              message: '修改失败！',
              type: 'warning',
              duration: 5 * 1000
            })
          })
          this.loging = false
        }
      })
    },
    chooseUser(val) {
      if (val === this.pass.userid) {
        this.pass.flag = '1'
      } else {
        this.pass.flag = '2'
      }
    }
  }
}
</script>

<style>

</style>
