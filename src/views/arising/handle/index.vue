<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A" />
      <el-checkbox label="复选框 B" />
      <el-checkbox label="复选框 C" />
      <el-checkbox label="禁用" disabled />
      <el-checkbox label="选中且禁用" disabled />
    </el-checkbox-group>
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
    />
    <div style="margin:10px 0;">
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
