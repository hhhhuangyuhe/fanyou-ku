<template>
  <div id="InsuredEmployee">
    <div class="page-header">
      <p class="page-path">
        在保员工名册<span class="slashline">/</span>参保员工名册
      </p>
      <p class="page-title">参保员工名册</p>
    </div>
    <div class="operation-pannel">
      <el-form
        :model="filters"
        class="filters-form"
        label-width="110px"
        ref="filtersform"
        style="padding-top: 20px"
      >
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="所属单位名称：" prop="enterpriceName">
              <el-input
                v-model="filters.enterpriceName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="员工姓名：" prop="employeeName">
              <el-input
                v-model="filters.employeeName"
                placeholder="请输入姓名/身份证"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属客户：" prop="customer">
              <el-select v-model="filters.customer" placeholder="请选择">
                <el-option label="ERS" value="ERS"></el-option>
                <el-option label="FAR" value="FAR"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="searchList">查询</el-button>
            <el-button type="default" @click="resetForm('filtersform')"
              >重置</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="托管网点：" prop="branch">
              <el-select v-model="filters.branch" placeholder="请选择">
                <el-option label="网点1" value="n1"></el-option>
                <el-option label="网点2" value="n2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="12">
            <el-button type="default">导入数据</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="insuredEmployeeTable"
        max-height="500"
        :data="insuredEmployeeTableData"
        border
        style="margin: 0px 0 30px"
      >
        <el-table-column type="selection" width="48"> </el-table-column>
        <el-table-column label="所属客户" prop="customer"></el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="身份证号" prop="idCard" width="120">
        </el-table-column>
        <el-table-column label="所属单位" prop="enterprice" width="100">
        </el-table-column>
        <el-table-column
          label="托管网点"
          prop="branch"
          width="120"
        ></el-table-column>
        <el-table-column label="参缴城市" prop="city"></el-table-column>
        <el-table-column
          label="社保生效月份"
          prop="sbEffectiveMonth"
          width="120"
        ></el-table-column>
        <el-table-column
          label="社保申报基数"
          prop="sbBaseNum"
        ></el-table-column>
        <el-table-column label="社保状态">
          <template slot-scope="scope">
            {{ scope.row.sbStatus }}
          </template>
        </el-table-column>
        <el-table-column
          label="公积金生效月份"
          prop="gjjEffectiveMonth"
          width="120"
        ></el-table-column>
        <el-table-column
          label="公积金申报基数"
          prop="gjjBaseNum"
        ></el-table-column>
        <el-table-column label="公积金状态">
          <template slot-scope="scope">
            {{ scope.row.gjjStatus }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="default" @click="checkDetails(scope.row.id)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="totalCount"
        layout="prev, pager, next, sizes, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNetwork",
  components: {},
  data: function () {
    return {
      filters: {
        enterpriceName: "",
        employeeName: "",
        cutomer: "",
        branch: "",
      },
      insuredEmployeeTableData: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      // 每页条数改变
      this.pageSize = pageSize;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      this.currentPage = currentPage;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    checkDetails(id) {
      console.log(id);
    },
    searchList() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getList();
    },
    updateTableData() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.$refs["filtersform"].resetFields();
      this.getList();
    },
    async getList() {
      try {
        console.log("在保员工名册list api");
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getList();
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#InsuredEmployee {
  padding: 20px;
}
#InsuredEmployee .operation-pannel {
  padding-top: 0;
}
.mailDetailInfo .eachMailInfo {
  border-bottom: 1px solid #ededed;
}
.eachMailInfo + .eachMailInfo {
  margin-top: 30px;
}
.mail-info {
  line-height: 20px;
  margin-bottom: 16px;
}
.mailDetailInfo {
  max-height: 500px;
  overflow-y: auto;
}
.delUploadFileIcon {
  margin-left: 16px;
}
.uploadTips {
  color: #888;
}
</style>
