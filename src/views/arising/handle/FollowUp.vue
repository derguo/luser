<template>
  <el-form ref="fu" class="app-container">
    <el-form-item label="">
      <el-checkbox-group v-model="followdata.stateid">
        <el-checkbox label="1">有待于跟进</el-checkbox>
        <el-checkbox label="2">电话预约</el-checkbox>
        <el-checkbox label="3">工商查询</el-checkbox>
        <el-checkbox label="4">第三方管理</el-checkbox>
        <el-checkbox label="5">百度搜索</el-checkbox>
        <el-checkbox label="6">114查询电话</el-checkbox>
        <el-checkbox label="7">上门拜访</el-checkbox>
        <el-checkbox label="8">其他</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="有待跟进备注说明">
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
export default {
  name: 'FollowUp',
  data() {
    return {
      followdata: {
        registerno: '',
        parentstateid: -1,
        stateid: [],
        cerrentdesc: ''
      }
    }
  },
  methods: {
    clearValidate() {
      this.followdata.registerno = ''
      this.followdata.parentstateid = -1
      this.followdata.stateid = []
      this.followdata.cerrentdesc = ''
    },
    handleSub() {
      followUp(this.followdata).then(
        val => {
          if (val.errorcode === 0) {
            this.$emit('upsucces', '')
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
    cancel() {
      this.$emit('upsucces', '')
    }
  }
}
</script>

<style></style>
