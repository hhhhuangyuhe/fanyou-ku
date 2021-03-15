<template>
  <div id="BusinessAcceptance">
    <div class="page-header">
      <p class="page-path">
        业务管理<span class="slashline">/</span>业务反馈列表
      </p>
      <p class="page-title">业务反馈列表</p>
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
            <el-form-item label="所属单位名称：" prop="enterpriceName">
              <el-input
                v-model="filters.company"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="员工姓名：" prop="name">
              <el-input
                v-model="filters.name"
                placeholder="请输入姓名/身份证"
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
              <el-select v-model="filters.branch" placeholder="请选择">
                <el-option label="网点1" value="n1"></el-option>
                <el-option label="网点2" value="n2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="反馈时间：" prop="feedbackTime">
              <el-date-picker
                :editable="false"
                v-model="filters.feedbackTime"
                type="month"
                placeholder="请选择"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="反馈结果：" prop="feedbackResult">
              <el-select v-model="filters.feedbackResult" placeholder="请选择">
                <el-option label="待反馈" value="0"></el-option>
                <el-option label="成功" value="1"></el-option>
                <el-option label="失败" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="险种名称：" prop="insuranceName">
              <el-select v-model="filters.insuranceName" placeholder="请选择">
                <el-option label="医疗保险" value="0"></el-option>
                <el-option label="养老保险" value="1"></el-option>
                <el-option label="生育保险" value="2"></el-option>
                <el-option label="工伤保险" value="3"></el-option>
                <el-option label="失业保险" value="4"></el-option>
                <el-option label="大病/补充/大额医疗" value="5"></el-option>
                <el-option label="残保金" value="6"></el-option>
                <el-option label="公积金" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button type="primary" @click="handleSuccessfully"
          >办理成功</el-button
        >
        <el-button type="danger" plain @click="failedToHandle"
          >办理失败</el-button
        >
        <el-button type="default">异常反馈</el-button>
      </div>
      <el-table
        ref="OrderFeedbackTable"
        max-height="500"
        :data="OrderFeedbackTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column type="selection" width="48"> </el-table-column>
        <el-table-column label="反馈结果" prop="exportNum"></el-table-column>
        <el-table-column
          label="剩余处理时间"
          prop="exportNum"
          width="120"
        ></el-table-column>
        <el-table-column label="反馈结果说明"> </el-table-column>
        <el-table-column
          label="员工姓名"
          prop="branch"
          width="100"
        ></el-table-column>
        <el-table-column label="身份证号" prop="customer"> </el-table-column>
        <el-table-column label="所属单位" prop="name"> </el-table-column>
        <el-table-column
          label="托管网点"
          prop="idCard"
          width="150"
        ></el-table-column>
        <el-table-column
          label="所属地区"
          prop="phone"
          width="120"
        ></el-table-column>
        <el-table-column label="申报类型" prop="enterpriseName">
        </el-table-column>
        <el-table-column label="参缴城市" width="120"></el-table-column>
        <el-table-column label="险种名称"> </el-table-column>
        <el-table-column
          label="参缴类型"
          prop="insuranceType"
        ></el-table-column>
        <el-table-column label="申报基数" prop="applyBaseNum"></el-table-column>
        <el-table-column label="生效月份" prop="effectiveMonth">
        </el-table-column>
        <el-table-column
          label="实缴月份"
          prop="arrearsBegin"
          width="110"
        ></el-table-column>
        <el-table-column
          label="申报时间"
          prop="arrearsEnd"
          width="110"
        ></el-table-column>
        <el-table-column
          label="受理时间"
          prop="withdrawBegin"
          width="110"
        ></el-table-column>
        <el-table-column
          label="反馈时间"
          prop="withdrawEnd"
          width="110"
        ></el-table-column>
        <el-table-column label="异常反馈" width="100">
          <template slot-scope="scope">
            <el-button type="primary" @click="errorFeedbackDetail(scope.row.id)"
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
    <el-dialog
      title="办理失败"
      :visible.sync="failDialog"
      width="500px"
      @close="resetForm('fileDialogForm')"
    >
      <el-form
        :model="failDialogForm"
        ref="fileDialogForm"
        :rules="failDialogFormRules"
        label-width="100px"
      >
        <el-form-item label="失败原因：" prop="failReason">
          <el-select
            v-model="failDialogForm.failReason"
            placeholder="请选择失败原因"
          >
            <el-option label="资料不全" value="0"></el-option>
            <el-option label="不符合资格" value="1"></el-option>
            <el-option label="其他原因" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因说明：" prop="failDescribe">
          <el-input
            type="textarea"
            v-model="failDialogForm.failDescribe"
            maxlength="50"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ImportDataDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitFailDialogForm('fileDialogForm')"
          >确 定</el-button
        >
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
        company: "",
        name: "",
        branch: "",
        feedbackTime: "",
        feedbackResult: "",
        insuranceName: "",
      },
      OrderFeedbackTableData: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      failDialog: false, // 办理失败填写框
      failDialogForm: {
        failReason: "",
        failDescribe: "",
      },
      failDialogFormRules: {
        failReason: [
          { required: true, message: "请选择失败原因", trigger: "change" },
        ],
      },
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
    handleSizeChange(pageSize) {
      // 每页条数改变
      this.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      this.currentPage = currentPage;
    },
    handleSuccessfully() {
      // 办理成功
      let selection = this.$refs.OrderFeedbackTable.selection;
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
        // 判断选中的数据状态是否全是'待反馈'
        if (item.applyStatus != 0) {
          this.$message({
            message: "请选择“待反馈”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
        ids.push(item.id);
      }
      this.$confirm("确认所选的业务办理成功?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 受理业务
          this.successAPI(ids);
        })
        .catch(() => {});
    },
    failedToHandle() {
      // 办理失败
      let selection = this.$refs.OrderFeedbackTable.selection;
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
        // 判断选中的数据状态是否全是'待反馈'
        if (item.applyStatus != 0) {
          this.$message({
            message: "请选择“待反馈”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
        ids.push(item.id);
      }
      this.failDialog = true;
    },
    SubmitFailDialogForm(formName) {
      // 提交“办理失败”弹窗表格
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let selection = this.$refs.OrderFeedbackTable.selection;
          let ids = [];
          for (let i of selection) {
            ids.push(i.id);
          }
          // api --> 办理失败
          this.failedAPI(ids);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async successAPI(ids) {
      try {
        console.log(ids);
        // let res = await this.$apis.orderProcess.accept(ids);
        // if (res == 200) {
        //   this.$message({
        //     type: "success",
        //     message: "受理成功!",
        //   });
        //   this.searchList();
        // } else {
        //   this.$message.error("操作失败！");
        // }
      } catch (e) {
        this.$message.error("操作失败！");
        console.log(e);
      }
    },
    async failedAPI(ids) {
      try {
        console.log(ids);
        // let res = await this.$apis.orderProcess.cancel(ids);
        // if (res == 200) {
        //   this.$message({
        //     type: "success",
        //     message: "业务退回成功!",
        //   });
        //   this.searchList();
        // } else {
        //   this.$message.error("操作失败！");
        // }
      } catch (e) {
        this.$message.error("操作失败！");
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
        // branchId: this.filters.branch,
        branchId: 0,
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
        this.OrderFeedbackTableData = listData.data.item;
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
