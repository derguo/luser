<template>
  <div v-loading="loging" class="app-container addusers">
    <el-form>
      <div style="margin: 20px auto;width: 220px;">
        <h1>添加销售员工</h1>
      </div>
      <el-form-item>
        <el-input placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="移动电话" />
      </el-form-item>
      <el-form-item>
        <el-select placeholder="请选择员工所在省份">
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="级别" disabled>
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select collapse-tags placeholder="请选择所在区域">
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item>
        <span>是否有分配权限 </span>
        <el-radio label="1">有</el-radio>
        <el-radio label="0">无</el-radio>
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
    {{ userInfo }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      userInfo: 'userInfo'
    })
  }
}
</script>

<style>
.addusers{
    width: 220px;
}
</style>
