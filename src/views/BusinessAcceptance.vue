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
            <el-form-item label="姓名：">
              <el-input v-model="filters.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证：">
              <el-input
                v-model="filters.idNumber"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位名称：">
              <el-input
                v-model="filters.company"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary">查询</el-button>
            <el-button type="default">重置</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="托管网点：">
              <el-select v-model="filters.outlets" placeholder="请选择">
                <el-option label="网点1" value="n1"></el-option>
                <el-option label="网点2" value="n2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属客户：">
              <el-input
                v-model="filters.client"
                placeholder="请输入"
              ></el-input>
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
        <el-table-column label="导出次数" prop="exportNumber">
        </el-table-column>
        <el-table-column label="剩余处理时间" prop="leftTime" width="120">
        </el-table-column>
        <el-table-column
          label="托管网点"
          prop="outlets"
          width="100"
        ></el-table-column>
        <el-table-column label="所属客户" prop="client"> </el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column
          label="身份证"
          prop="idNumber"
          width="150"
        ></el-table-column>
        <el-table-column
          label="联系方式"
          prop="contact"
          width="120"
        ></el-table-column>
        <el-table-column label="单位名称" prop="company"> </el-table-column>
        <el-table-column label="个人信息" width="120">
          <template slot-scope="scope">
            <el-button type="default" @click="personnelInformation(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="申报类型" prop="declarationType">
        </el-table-column>
        <el-table-column
          label="参保类型"
          prop="participationType"
        ></el-table-column>
        <el-table-column label="申报基数" prop="baseNum"></el-table-column>
        <el-table-column label="生效月份" prop="effectiveTime">
        </el-table-column>
        <el-table-column
          label="补缴起始月份"
          prop="makeupStartTime"
          width="110"
        ></el-table-column>
        <el-table-column
          label="补缴结束月份"
          prop="makeupEndTime"
          width="110"
        ></el-table-column>
        <el-table-column
          label="退保起始月份"
          prop="surrenderStartTime"
          width="110"
        ></el-table-column>
        <el-table-column
          label="退保结束月份"
          prop="surrenderEndTime"
          width="110"
        ></el-table-column>
        <el-table-column label="备注" prop="remarks"></el-table-column>
        <el-table-column label="订单编号" prop="orderId"></el-table-column>
        <el-table-column
          label="第三方编号"
          prop="thirdPartyNumber"
          width="130"
        ></el-table-column>
        <el-table-column label="申请时间" prop="applyTime"></el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="1000"
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
      width="500px"
    >
      <el-table
        ref="PersonnelDataDialogTable"
        max-height="500"
        :data="PersonnelInformationDialogTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column label="序号" type="index" width="80">
        </el-table-column>
        <el-table-column label="名称" prop="name"> </el-table-column>
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
      filters: {
        name: "",
        idNumber: "",
        company: "",
        outlets: "",
        client: "",
      },
      BusinessAcceptanceTableData: [
        {
          exportNumber: "1",
          leftTime: "12h",
          outlets: "1",
          client: "client1",
          name: "sese",
          idNumber: "441111111111555555",
          contact: "13699999999",
          company: "company1",
          declarationType: "社保新增",
          participationType: "深户一档",
          baseNum: "4422",
          effectiveTime: "2021-04",
          makeupStartTime: "",
          makeupEndTime: "",
          surrenderStartTime: "",
          surrenderEndTime: "",
          remarks: "备注",
          orderId: "11112045",
          thirdPartyNumber: "123132SEEW",
          applyTime: new Date().getUTCDate,
        },
      ],
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
      PersonnelInformationDialogTableData: [
        {
          name: "AA",
          value: "123",
        },
        {
          name: "BB",
          value: "442",
        },
      ],
    };
  },
  methods: {
    tabChanged(params) {
      console.log(params);
    },
    personnelInformation(row) {
      // 个人信息
      console.log(row);
      this.PersonnelInformationDialog = true;
    },
    handleSizeChange(pageSize) {
      // 每页条数改变
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      console.log(currentPage);
    },
    AcceptBusiness() {
      // 受理业务
      let selection = this.$refs.BusinessAcceptanceTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      this.$confirm("确认受理选中的业务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 受理业务
          this.$message({
            type: "success",
            message: "受理成功!",
          });
        })
        .catch(() => {});
    },
    BusinessReturn() {
      // 业务退回
      let selection = this.$refs.BusinessAcceptanceTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      this.$confirm("确认退回选中的业务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 业务退回
          this.$message({
            type: "success",
            message: "业务退回成功!",
          });
        })
        .catch(() => {});
    },
    ImportData() {
      this.ImportDataDialog = true;
    },
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
