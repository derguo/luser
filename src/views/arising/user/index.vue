<template>
  <div class="app-container">
    <div style="margin:10px 0;">
      <label>处理状态：</label>
      <el-button type="" @click="handelCreate">有待跟进</el-button>
      <el-button type="">处理成功</el-button>
      <el-button type="">失败</el-button>
    </div>
    <el-form ref="form" label-position="left" :model="sizeForm" label-width="160px" size="mini">
      <el-form-item label="单位全称：">
        <el-input v-model="sizeForm.name" style="width: 47%;" />
      </el-form-item>
      <el-form-item label="单位所属行业：">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位所在地区：">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位所在城市：">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="通讯地址：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="邮编：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="联系人1：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="联系人:2：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="国定电话1：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="国定电话2：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="手机：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="传真：" class="yiban">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <el-form-item label="产品类型：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>
      <el-form-item label="用户ID：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>
      <el-form-item label="基本序列号：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>
      <el-form-item label="扩容序列号：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>
      <el-form-item label="授权点数：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>
      <el-form-item label="注册日期：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>
      <el-form-item label="最后使用时间：" class="yiban">
        <div>aaaaaaaaaaaa</div>
      </el-form-item>

      <el-form-item size="large" style="clear:both">
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="有待跟进" :visible.sync="dialogFormVisible">
      <follow-up ref="handleFrom" @upsucces="followupsuccess" />
    </el-dialog>
  </div>
</template>

<script>
import FollowUp from '@/views/arising/handle/FollowUp'

export default {
  components: {
    FollowUp
  },
  data() {
    return {
      dialogFormVisible: false,
      importanceOptions: [1, 2, 3],
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {

  },
  methods: {
    handelCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['handleFrom'].clearValidate()
      })
    },
    followupsuccess() {
      console.log(this)
      this.dialogFormVisible = false
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
    margin-right: 10px
  }
</style>
