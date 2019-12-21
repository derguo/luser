<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="userListQuery.provinceid" placeholder="用户省份" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in $store.state.user.province" :key="item.index" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userListQuery.productid" placeholder="产品类型" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in $store.state.user.products" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userListQuery.stateid" :v-if="role" placeholder="处理状态" clearable class="filter-item" style="width: 120px">
        <el-option v-for="item in $store.state.user.states" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userListQuery.rsuserid" placeholder="跟进人" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in $store.state.user.users" :key="item.id" :label="item.cnname" :value="item.id" />
      </el-select>
      <el-input v-model="userListQuery.companyname" placeholder="单位全称" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.registerno" placeholder="用户ID" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.usercontactor" placeholder="联系人" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.usertelephone" placeholder="固定电话" style="width: 130px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-date-picker v-model="userregdate" class="filter-item" type="daterange" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss.SSS" start-placeholder="注册开始日期" end-placeholder="注册结束日期" />
      <el-date-picker v-model="upgradedate" class="filter-item" type="daterange" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss.SSS" start-placeholder="升级开始日期" end-placeholder="升级结束日期" />
      <el-input v-model="userListQuery.prodmincount1" placeholder="授权点数上限" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.prodmaxcount1" placeholder="授权点数下限" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <div>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查询
        </el-button>
        <el-button v-if="$store.state.user.userInfo.assignment === '1'" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          分配
        </el-button>
      </div>

      <el-dialog title="分配" :v-if="role" :visible.sync="assignVisible">
        <assign :choose-user="selected" @allocationsucces="allocationsucces" />
      </el-dialog>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelection"
    >
      <el-table-column type="selection" align="center" />

      <el-table-column
        type="index"
        width="50"
        label="NO."
        align="center"
      />

      <el-table-column label="跟进人" width="90" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rsusername }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位全称" min-width="250" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="注册时间" min-width="170" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userregdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后升级时间" min-width="170" align="center">
        <template slot-scope="{row}">
          <span>{{ row.upgradedate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="授权点数" width="90" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prodcount1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户省份" width="90" align="center">
        <template slot-scope="{row}">
          <span>{{ row.provincename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="处理状态" width="120" align="center">
        <template slot-scope="{row}">
          <span :class="'statestyle'+row.stateid">{{ row.statename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            详情
          </el-button>
          <el-button v-if="false" size="mini" @click="handleUpdate(row)">
            变更
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="userListQuery.currentpageindex"
      :limit.sync="userListQuery.pagesize"
      @pagination="getList"
    />

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <el-steps :active="stateinfo.length" align-center>
      <el-step
        v-for="(item, index) in stateinfo"
        :key="item.stateid + index + ''"
        icon="el-icon-location"
        @click.native="getStepList(item)"
      >
        <template v-slot:title>
          <el-popover
            :disabled="!(item.substateinfo || []).length"
            placement="top"
            trigger="hover"
            :width="$el.scrollWidth - 20"
          >
            <el-steps :active="(item.substateinfo || []).length" align-center>
              <el-step
                v-for="(sitem, sindex) in item.substateinfo"
                :key="sindex"
                :description="sitem.num+'个'"
                :title="sitem.statename"
                icon="el-icon-location"
                style="cursor: pointer;"
                @click.native="getStepList(sitem)"
              />
            </el-steps>
            <div slot="reference" style="cursor: pointer;">
              <div>{{ item.statename }}</div>
              <div style="font-size:12px;line-height:12px;cursor: pointer;">
                {{ item.num+'个' }}
              </div>
            </div>
          </el-popover>
        </template>
      </el-step>
    </el-steps>
  </div>

</template>

<script>
import { fetchUsers, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import assign from '@/views/arising/assign/index'
import { Message } from 'element-ui'
// import moment from 'moment'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'Home',
  components: { Pagination, assign },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      role: this.$store.state.user.userInfo.authorid === 0,
      assignVisible: false,
      nowPage: [],
      basices: [],
      selected: [],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      stateinfo: [],
      userListQuery: {
        provinceid: '',
        productid: 'nver',
        stateid: '',
        rsuserid: '',
        companyname: '',
        registerno: '',
        usercontactor: '',
        usertelephone: '',
        userregsdate: '', // moment(new Date() - 7948800 * 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
        userregedate: '', // moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
        upgradesdate: '', // moment(new Date() - 7948800 * 1000).format('YYYY-MM-DD HH:mm:ss.SSS'),
        upgradeedate: '', // moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
        prodmincount1: '',
        prodmaxcount1: '',
        userid: this.$store.state.user.userInfo.id,
        currentpageindex: 1,
        pagesize: 20
      },
      listQuery: {
        page: 1,
        limit: 30,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    userregdate: {
      get() {
        return (this.userListQuery.userregsdate && this.userListQuery.userregedate)
          ? [
            this.userListQuery.userregsdate,
            this.userListQuery.userregedate
          ]
          : null
      },
      set(val) {
        [
          this.userListQuery.userregsdate,
          this.userListQuery.userregedate
        ] = val || ['', '']
      }
    },
    upgradedate: {
      get() {
        return (this.userListQuery.upgradesdate && this.userListQuery.upgradeedate)
          ? [
            this.userListQuery.upgradesdate,
            this.userListQuery.upgradeedate
          ]
          : null
      },
      set(val) {
        [
          this.userListQuery.upgradesdate,
          this.userListQuery.upgradeedate
        ] = val || ['', '']
      }
    }
  },
  watch: {
  },
  created() {
    this.getList()
  },
  methods: {
    getStepList(val) {
      this.userListQuery.stateid = val.stateid
      this.getList()
    },
    allocationsucces() {
      this.assignVisible = false
    },
    handleSelection(val) {
      this.selected = val
    },
    getList() {
      this.listLoading = true
      fetchUsers(this.$store.state.user.token, this.userListQuery).then(response => {
        this.list = response.info || []
        this.stateinfo = response.stateinfo || []
        this.total = response.count

        this.listLoading = false
      })
    },
    handleFilter() {
      this.userListQuery.currentpageindex = 1
      this.getList()
    },
    handleModifyStatus(row, status) {

    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      if (this.selected.length > 0) {
        this.assignVisible = true
      } else {
        Message({
          message: '请选择用户',
          type: 'warning',
          duration: 5 * 1000
        })
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.$nextTick(() => {
        this.$router.push({
          path: `auser/index/${row.registerno}`,
          query: { rsuserid: row.rsuserid }
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
<style scoped>
.statestyle-1{
  color: #ccc;
}
.statestyle1{
  color: blue;
}
.statestyle3{
  color: rgb(225, 158, 53)
}
.statestyle5{
  color: green
}
.statestyle7{
  color: red
}

</style>
