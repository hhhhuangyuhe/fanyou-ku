<template>
  <div id="BusinessAcceptance">
    <div class="page-header">
      <p class="page-path">业务管理<span class="slashline">/</span>业务受理</p>
      <p class="page-title">业务受理</p>
    </div>
    <div class="operation-pannel">
      <kutabs :tabs="Kutabs" @tabChanged="tabChanged"></kutabs>
    </div>
    <div class="operation-pannel">
      <el-form
        :model="filters"
        class="filters-form"
        label-width="110px"
        ref="filtersform"
      >
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="filters.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证：" prop="idCard">
              <el-input
                v-model="filters.idNumber"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位名称：" prop="company">
              <el-input
                v-model="filters.company"
                placeholder="请输入"
              ></el-input>
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
              <el-input
                v-model="filters.branch"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属客户：" prop="customer">
              <el-select v-model="filters.customer" placeholder="请选择">
                <el-option label="ERS" value="ERS"></el-option>
                <el-option label="FAR" value="FAR"></el-option>
                <el-option label="ESB" value="ESB"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button type="primary" @click="AcceptBusiness">受理业务</el-button>
        <el-button type="danger" plain @click="BusinessReturn"
          >业务退回</el-button
        >
        <el-button type="default">导出数据</el-button>
        <el-button type="default" @click="ImportData">导入数据</el-button>
      </div>
      <el-table
        ref="BusinessAcceptanceTable"
        max-height="500"
        :data="BusinessAcceptanceTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column type="selection" width="48"> </el-table-column>
        <el-table-column label="导出次数" prop="exportNum"></el-table-column>
        <el-table-column label="剩余处理时间" prop="exportNum" width="120"></el-table-column>
        <el-table-column label="受理状态">
<template slot-scope="scope">
            {{getApplyStatus(scope.row.applyStatus)}}
          </template>
        </el-table-column>
        <el-table-column label="托管网点" prop="branch" width="100"></el-table-column>
        <el-table-column label="所属客户" prop="customer"> </el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="身份证" prop="idCard" width="150"></el-table-column>
        <el-table-column label="联系方式" prop="phone" width="120"></el-table-column>
        <el-table-column label="单位名称" prop="enterpriseName">
        </el-table-column>
        <el-table-column label="个人信息" width="120">
          <template slot-scope="scope">
            <el-button type="default" @click="personnelInformation(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="申报类型">
          <template slot-scope="scope">
            {{ getApplyType(scope.row.applyType) }}
          </template>
        </el-table-column>
        <el-table-column
          label="参保类型"
          prop="insuranceType"
        ></el-table-column>
        <el-table-column label="申报基数" prop="applyBaseNum"></el-table-column>
        <el-table-column label="生效月份" prop="effectiveMonth">
        </el-table-column>
        <el-table-column
          label="补缴起始月份"
          prop="arrearsBegin"
          width="110"
        ></el-table-column>
        <el-table-column
          label="补缴结束月份"
          prop="arrearsEnd"
          width="110"
        ></el-table-column>
        <el-table-column
          label="退保起始月份"
          prop="withdrawBegin"
          width="110"
        ></el-table-column>
        <el-table-column
          label="退保结束月份"
          prop="withdrawEnd"
          width="110"
        ></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="订单编号" prop="orderNum"></el-table-column>
        <el-table-column
          label="第三方编号"
          prop="thirdPartNum"
          width="130"
        ></el-table-column>
        <el-table-column label="申请时间" prop="addTime" width="90">
          <template slot-scope="scope">
            {{
              commonjs.dateFtt(
                "yyyy-MM-dd hh:mm:ss",
                new Date(scope.row.addTime)
              )
            }}
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
    <el-dialog title="导入数据" :visible.sync="ImportDataDialog" width="500px">
      <el-form
        :model="ImportDataForm"
        ref="ImportDataForm"
        :rules="ImportDataFormRules"
        label-width="100px"
      >
        <el-form-item label="单位名称：" prop="company">
          <el-select v-model="ImportDataForm.company" placeholder="请选择">
            <el-option label="company1" value="0"></el-option>
            <el-option label="company11" value="1"></el-option>
            <el-option label="company111" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工数据：" prop="failDescribe">
          <el-button icon="el-icon-upload2">上传文件</el-button>
          <el-button type="text">下载模板</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ImportDataDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitImportDataForm('ImportDataForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="个人信息"
      :visible.sync="PersonnelInformationDialog"
      width="700px"
      @close="PersonnelInformationDialogTableData = []"
    >
      <el-table
        ref="PersonnelDataDialogTable"
        max-height="500"
        :data="PersonnelInformationDialogTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="名称" prop="key"> </el-table-column>
        <el-table-column label="值" prop="value"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="PersonnelInformationDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import kutabs from "@/components/kutabs";
export default {
  name: "AddNetwork",
  components: {
    kutabs,
  },
  data: function () {
    return {
      Kutabs: [
        {
          name: "全部",
          num: 56,
        },
        {
          name: "社保新增",
          num: 24,
        },
        {
          name: "社保续保",
          num: 24,
        },
        {
          name: "社保停保",
          num: 12,
        },
        {
          name: "社保变更",
          num: 23,
        },
        {
          name: "社保补缴",
          num: 44,
        },
        {
          name: "社保退保",
          num: 44,
        },
        {
          name: "公积金新增",
          num: 44,
        },
        {
          name: "公积金调入",
          num: 44,
        },
        {
          name: "公积金封存",
          num: 44,
        },
        {
          name: "公积金变更",
          num: 44,
        },
        {
          name: "公积金补缴",
          num: 44,
        },
        {
          name: "公积金退保",
          num: 44,
        },
      ],
      activeKutab: -1,
      filters: {
        name: "",
        idNumber: "",
        company: "",
        branch: "",
        customer: "",
      },
      BusinessAcceptanceTableData: [],
      totalCount: 0,
      ImportDataDialog: false,
      ImportDataForm: {
        company: "",
      },
      ImportDataFormRules: {
        company: [
          { required: true, message: "请选择单位名称", trigger: "change" },
        ],
      },
      PersonnelInformationDialog: false,
      PersonnelInformationDialogTableData: [],
      pageSize: 10,
      currentPage: 1,
    };
  },
  methods: {
    tabChanged(params) {
      if (params.name == "全部") {
        this.activeKutab = -1;
      } else if (params.name == "社保新增") {
        this.activeKutab = 0;
      } else if (params.name == "社保续保") {
        this.activeKutab = 1;
      } else if (params.name == "社保停保") {
        this.activeKutab = 2;
      } else if (params.name == "社保变更") {
        this.activeKutab = 3;
      } else if (params.name == "社保补缴") {
        this.activeKutab = 4;
      } else if (params.name == "社保退保") {
        this.activeKutab = 5;
      } else if (params.name == "公积金新增") {
        this.activeKutab = 6;
      } else if (params.name == "公积金调入") {
        this.activeKutab = 7;
      } else if (params.name == "公积金封存") {
        this.activeKutab = 8;
      } else if (params.name == "公积金变更") {
        this.activeKutab = 9;
      } else if (params.name == "公积金补缴") {
        this.activeKutab = 10;
      } else if (params.name == "公积金退保") {
        this.activeKutab = 11;
      } else {
        this.activeKutab = -1;
      }
      this.searchList();
    },
    getApplyType(applyType) {
      switch (applyType) {
        case 0:
          return "社保新增";
        case 1:
          return "社保续保";
        case 2:
          return "社保停保";
        case 3:
          return "社保变更";
        case 4:
          return "社保补缴";
        case 5:
          return "社保退保";
        case 6:
          return "公积金新增";
        case 7:
          return "公积金调入";
        case 8:
          return "公积金封存";
        case 9:
          return "公积金变更";
        case 10:
          return "公积金补缴";
        case 11:
          return "公积金退保";
        default:
          return "";
      }
    },
    getApplyStatus(applyStatus) {
      switch (applyStatus) {
        case 0:
          return "待受理";
        case 1:
          return "已受理";
        case 2:
          return "退回";
        default:
          return "";
      }
    },
    personnelInformation(row) {
      // 个人信息
      this.getPersonnelInformationDetail(row.id);
    },
    handleSizeChange(pageSize) {
      // 每页条数改变
      this.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      this.currentPage = currentPage;
    },
    AcceptBusiness() {
      // 受理业务
      let selection = this.$refs.BusinessAcceptanceTable.selection;
      let ids = [];
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        // 判断选中的数据状态是否全是'待受理'
        if (item.applyStatus != 0) {
          this.$message({
            message: "请选择“待受理”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
        ids.push(item.id);
      }
      this.$confirm("确认受理选中的业务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 受理业务
          this.acceptAPI(ids);
        })
        .catch(() => {});
    },
    BusinessReturn() {
      // 业务退回
      let selection = this.$refs.BusinessAcceptanceTable.selection;
      let ids = [];
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        // 判断选中的数据状态是否全是'待受理'
        if (item.applyStatus != 0) {
          this.$message({
            message: "请选择“待受理”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
        ids.push(item.id);
      }
      this.$confirm("确认退回选中的业务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 业务退回
          this.cancelAPI(ids);
        })
        .catch(() => {});
    },
    ImportData() {
      this.ImportDataDialog = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async acceptAPI(ids) {
      try{
        let res = await this.$apis.orderProcess.accept(ids)
        if(res == 200){
          this.$message({
            type: "success",
            message: "受理成功!",
          });
          this.searchList();
        } else {
          this.$message.error('操作失败！')
        }
      } catch (e) {
        this.$message.error('操作失败！')
        console.log(e)
      }
    },
    async cancelAPI(ids) {
      try{
        let res = await this.$apis.orderProcess.cancel(ids)
        if(res == 200){
          this.$message({
            type: "success",
            message: "业务退回成功!",
          });
          this.searchList();
        } else {
          this.$message.error('操作失败！')
        }
      } catch (e) {
        this.$message.error('操作失败！')
        console.log(e)
      }
    },
    async getPersonnelInformationDetail(id) {
      let params = {
        id: id,
      };
      try {
        let res = await this.$api.orderProcess.detail(params);
        if (res.code == 200) {
          this.PersonnelInformationDialogTableData = res.data;
          this.PersonnelInformationDialog = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    searchList() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getData();
    },
    async getData() {
      let listParams = {
        pageCount: this.currentPage,
        takeCount: this.pageSize,
        idCard: this.filters.idCard,
        name: this.filters.name,
        enterpriseName: this.filters.company,
        branch: this.filters.branch,
        // branchId: 0,
        customer: this.filters.customer,
      };
      if (this.activeKutab != -1) {
        listParams.applyType = this.activeKutab;
      }
      try {
        let [listData, stat] = await Promise.all([
          this.$api.orderProcess.list(listParams),
          this.$api.orderProcess.stat(),
        ]);
        this.totalCount = listData.data.totalCount;
        this.BusinessAcceptanceTableData = listData.data.item;
        let arr = [];
        for (let i of stat.data) {
          let obj = new Object();
          obj.name = i.name;
          obj.num = i.count;
          obj.applyType = i.applyType;
          arr.push(obj);
        }
        this.Kutabs = arr;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#BusinessAcceptance {
  padding: 20px;
}
#BusinessAcceptance .operation-pannel {
  padding-top: 0;
}
</style>
