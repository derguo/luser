<template>
  <div v-loading="loging" class="app-container addusers">
    <el-form ref="userForm" label-width="80px" :model="user" :rules="rules">
      <el-form-item label="">
        <h1>添加销售员工</h1>
      </el-form-item>
      <el-form-item label="登录名" prop="newusername">
        <el-input v-model="user.newusername" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item label="姓名" prop="newcnname">
        <el-input v-model="user.newcnname" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="移动电话" prop="phone">
        <el-input v-model="user.phone" placeholder="移动电话" />
      </el-form-item>
      <el-form-item label="省 份" prop="provinceid">
        <el-select v-model="user.provinceid" placeholder="请选择员工所在省份" style="width:100%">
          <el-option v-for="(item, index) in province" :key="index" :label="'['+item.id+'] '+item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="authorid">
        <el-select v-model="user.authorid" placeholder="级别" style="width:100%">
          <el-option v-for="(item, index) in authorType" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="regionid">
        <el-select v-model="user.regionid" collapse-tags placeholder="请选择所在区域" style="width:100%">
          <el-option v-for="(item, index) in region" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分配权限" prop="assignment">
        <el-radio-group v-model="user.assignment">
          <el-radio label="1">有</el-radio>
          <el-radio label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button type="primary" @click.native.prevent="addUser">确认提交</el-button>
        </el-row>
      </el-form-item>
      <div>
        <span style="font-size:14px;color:#606266">默认密码:英文名888，如admin888</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addusers, getone } from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'AddUsers',
  data() {
    return {
      loging: false,
      user: {
        userid: '', // 当前登录员工ID
        username: '', // 当前登录员工username
        newusername: '',
        newcnname: '',
        phone: '',
        provinceid: '',
        regionid: '',
        authorid: '15',
        assignment: '0'
      },
      rules: {
        newusername: [
          { required: true, message: '请输入登陆名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' },
          { pattern: /^[a-zA-z]+$/, message: '必须用英文字母' },
          { validator: this.exist, trigger: 'blur' }
        ],
        newcnname: [
          { required: true, message: '请输入中文名', trigger: 'blur' },
          { min: 2, message: '长度至少两个汉字', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5]+$/, message: '必须用中文' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '格式不对' }
        ],
        provinceid: [
          { required: true, message: '必选项目', trigger: 'blur' }
        ],
        authorid: [
          { required: true, message: '必选项目', trigger: 'blur' }
        ],
        regionid: [
          { required: true, message: '必选项目', trigger: 'blur' }
        ],
        assignment: [
          { required: true, message: '必选项目', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      region: 'region',
      token: 'token',
      authorType: 'authorType',
      province: 'province'
    })
  },
  async created() {
    await this.getRegion()
    await this.getAuthorType()

    this.user.userid = this.userInfo.id
    this.user.username = this.userInfo.username
  },
  methods: {
    ...mapActions({
      getRegion: 'user/getBigRegion',
      getAuthorType: 'user/getAuthorType',
      getCity: 'user/getCity',
      getInfo: 'user/getInfo'
    }),
    addUser() {
      this.$nextTick(() => {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            addusers(this.token, this.user).then((val) => {
              Message({
                message: '添加用户成功！',
                type: 'success',
                duration: 5 * 1000
              })
            }).catch(() => {
              Message({
                message: '添加用户失败！',
                type: 'warning',
                duration: 5 * 1000
              })
            })
          } else {
            return false
          }
        })
      })
    },
    async exist(rule, value, callback) {
      try {
        this.loging = true
        const un = await getone(this.token, value)

        un.info.length ? callback(new Error('用户名已经存在!')) : callback()
        this.loging = false
      } catch (error) {
        callback(new Error('未知!' + error))
      }
    }
  }
}
</script>

<style>
.addusers{
    width: 520px;
}
</style>
