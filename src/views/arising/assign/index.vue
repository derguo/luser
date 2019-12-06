<template>
  <div class="app-container">
    <div>将选中用户分配给：</div>
    <div>
      <!-- <el-input v-model="input" placeholder="搜索" size="mini" style="margin:20px 0px;width:220px;"></el-input> -->
    </div>
    <el-radio-group v-model="chooseOne" @change="tochange">
      <my-radio v-for="item in radios" :key="item.id" label="name" :data="item" />
    </el-radio-group>
    <el-button type="primary">确定</el-button>
    {{ chooseOne }}
  </div>
</template>

<script>
import myRadio from './myRadio'
export default {
  components: { myRadio },
  data() {
    return {
      chooseOne: {},
      radios: [
        { id: 1, name: 'tome' },
        { id: 2, name: 'jjjjj' },
        { id: 3, name: 'aaaa' },
        { id: 4, name: 'dddd' },
        { id: 5, name: 'ccc' },
        { id: 6, name: '1111' }
      ]
    }
  },
  methods: {
    tochange(e, val) {
      console.log(e, val)
    }
  }
}
</script>

<style>

</style>
