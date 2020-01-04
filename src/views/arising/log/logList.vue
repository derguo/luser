<template>
  <div class="app-container">
    <el-select v-model="logReq.ltid" collapse-tags placeholder="请选择日志类别" clearable>
      <el-option v-for="(item, index) in logType" :key="index" :label="item.name" :value="item.id" />
    </el-select>
    <el-select v-model="logReq.rsuserid" collapse-tags placeholder="请选择操作人" clearable>
      <el-option v-for="(item, index) in users" :key="index" :label="item.cnname" :value="item.id" />
    </el-select>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
      查询
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="logList"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top:30px;"
    >
      <el-table-column label="ID" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志类型" width="90" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ltname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人用户名" width="130" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人姓名" width="130" align="center">
        <template slot-scope="{row}">
          <span>{{ row.usercnname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.logdesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户IP" width="160" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="180" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addtime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      prev-text=" < 上一页 "
      next-text=" 下一页 > "
      :page.sync="logReq.currentpageindex"
      :limit.sync="logReq.pagesize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getBasic, basicType } from '@/api/basicData'
import { Message } from 'element-ui'
import Pagination from '@/components/Pagination'

export default {
  name: 'LogList',
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      logReq: {
        userid: '',
        username: '',
        ltid: '',
        rsuserid: '',
        currentpageindex: 1,
        pagesize: 20
      },
      logList: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'logType',
      'users',
      'userInfo',
      'token'
    ])
  },
  created() {
    this.logReq.userid = this.userInfo.id
    this.logReq.username = this.userInfo.username
    this.getList()
  },
  mounted() {
    this.getLogList()
  },
  methods: {
    ...mapActions({
      getLogList: 'user/getLogList'
    }),
    async getList() {
      this.listLoading = true
      try {
        const req = await getBasic(this.token, basicType.LOGLIST, this.logReq)
        this.logList = req.info
        this.total = req.count
      } catch (error) {
        Message({
          message: '日志读取有误！',
          type: 'warning',
          duration: 5 * 1000
        })
      }
      this.listLoading = false
    }
  }
}
</script>

<style>

</style>
