<template>
  <div class="app-container">
    {{ userListQuery }}
    <div class="filter-container">
      <el-select v-model="userListQuery.provinceid" placeholder="用户省份" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in $store.state.user.province" :key="item.index" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userListQuery.productid" placeholder="产品类型" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in $store.state.user.products" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userListQuery.stateid" placeholder="处理状态" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in $store.state.user.state" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userListQuery.rsuserid" placeholder="跟进人" clearable class="filter-item" style="width: 110px">
        <el-option v-for="item in $store.state.user.users" :key="item.id" :label="item.cnname" :value="item.id" />
      </el-select>
      <el-input v-model="userListQuery.companyname" placeholder="单位全称" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.registerno" placeholder="用户ID" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.usercontactor" placeholder="联系人" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.usertelephone" placeholder="固定电话" style="width: 130px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-date-picker v-model="userregdate" class="filter-item" type="daterange" range-separator="-" value-format="yyyy/MM/dd" start-placeholder="注册开始日期" end-placeholder="注册结束日期" />
      <el-date-picker v-model="upgradedate" class="filter-item" type="daterange" range-separator="-" value-format="yyyy/MM/dd" start-placeholder="升级开始日期" end-placeholder="升级结束日期" />
      <el-input v-model="userListQuery.prodmincount1" placeholder="授权点数下限" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="userListQuery.prodmaxcount1" placeholder="授权点数下限" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <div>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查询
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          分配
        </el-button>
      </div>

      <el-dialog title="分配" :visible.sync="assignVisible">
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

      <el-table-column label="跟进人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rsusername }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位全称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="注册时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userregdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后升级时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.upgradedate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="授权点数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prodcount1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户省份" align="center">
        <template slot-scope="{row}">
          <span>{{ row.provincename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="处理状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.statename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            详情
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            变更
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

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
      <el-step v-for="item in stateinfo" :key="item.stateid" :title="item.statename" :description="item.num+'个'" icon="el-icon-location" />
    </el-steps>
    {{ selected }}
  </div>

</template>

<script>
import { fetchUsers, fetchPv, createArticle, updateArticle } from '@/api/article'
import { basicType, getBasic } from '@/api/basicData'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import assign from '@/views/arising/assign/index'
import { Message } from 'element-ui'

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
  name: 'ComplexTable',
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
      assignVisible: false,
      startBasicType: [
        basicType.PROVINCE,
        basicType.CITY,
        basicType.PRODUCT,
        basicType.STATE,
        basicType.USERS
      ],
      basices: [],
      selected: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      userregdate: [],
      upgradedate: [],
      stateinfo: null,
      userListQuery: {
        provinceid: '',
        productid: '',
        stateid: '',
        rsuserid: '',
        companyname: '',
        registerno: '',
        usercontactor: '',
        usertelephone: '',
        userregsdate: '',
        userregedate: '',
        upgradesdate: '',
        upgradeedate: '',
        prodmincount1: '',
        prodmaxcount1: '',
        userid: this.$store.state.user.userInfo.id
      },
      listQuery: {
        page: 1,
        limit: 20,
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
  watch: {
    userregdate(val) {
      this.userListQuery.userregsdate = val[0]
      this.userListQuery.userregedate = val[1]
    },
    upgradedate(val) {
      this.userListQuery.upgradesdate = val[0]
      this.userListQuery.upgradeedate = val[1]
    }
  },
  created() {
    this.getList()
    // this.getBasicAll()
    // console.log(this.basices)
  },
  methods: {
    allocationsucces() {
      this.assignVisible = false
    },
    handleSelection(val) {
      this.selected = val
    },
    async getBasicAll() {
      console.log('getBasicAll')
      for (let t = 0; t < this.startBasicType.length; t++) {
        console.log('getBasicAll', this.startBasicType[t])
        const val = await getBasic(this.$store.state.user.token, this.startBasicType[t])
        this.basices.push(val)
      }
    },
    getList() {
      this.listLoading = false // -----------------------
      fetchUsers(this.$store.state.user.token, this.userListQuery).then(response => {
        console.log(response.data)

        this.list = response.data.info
        this.stateinfo = response.data.stateinfo

        this.listLoading = true // -------------
      })
    },
    handleFilter() {
      this.listQuery.page = 1
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
          type: 'error',
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
