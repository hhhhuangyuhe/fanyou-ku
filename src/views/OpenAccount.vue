<template>
  <div id="OpenAccount">
    <div class="page-header">
      <p class="page-path">开户申报列表</p>
      <p class="page-title">开户申报列表</p>
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
          <el-col :span="4">
            <el-form-item label="开户单位名称：">
              <el-input
                v-model="filters.accountName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="申请编号：">
              <el-input
                v-model="filters.applyCode"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开户类型：">
              <el-select v-model="filters.applyType" placeholder="请选择">
                <el-option label="社保户" value="socialSecurity"></el-option>
                <el-option label="公积金户" value="providentFund"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">查询</el-button>
            <el-button type="default">重置</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="4">
            <el-form-item label="所属客户：">
              <el-select v-model="filters.client" placeholder="请选择">
                <el-option label="客户1" value="client1"></el-option>
                <el-option label="客户2" value="client2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开户网点：">
              <el-input
                v-model="filters.openNet"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button type="primary" @click="AcceptBusiness">受理业务</el-button>
        <el-button type="primary" plain @click="BusinessSucceed"
          >办理成功</el-button
        >
        <el-button type="danger" plain @click="BusinessFailed"
          >办理失败</el-button
        >
        <el-button type="warning" plain @click="BusinessCancel"
          >取消办理</el-button
        >
        <el-button type="default" @click="MailMaterial">资料回寄</el-button>
        <el-button type="default">导出数据</el-button>
      </div>
      <el-table
        ref="openAccountTable"
        max-height="500"
        :data="openAccountTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column type="selection" width="48"> </el-table-column>
        <el-table-column label="申请编号" prop="applyCode"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column label="反馈结果说明" prop="responseText">
        </el-table-column>
        <el-table-column label="状态变更时间" prop="stateChangeTime">
        </el-table-column>
        <el-table-column label="单位名称" prop="companyName"> </el-table-column>
        <el-table-column label="开户类型" prop="accountType"></el-table-column>
        <el-table-column label="所属客户" prop="client"></el-table-column>
        <el-table-column label="开户网点" prop="openNet"></el-table-column>
        <el-table-column label="开户人员信息">
          <template slot-scope="scope">
            <el-button
              type="default"
              @click="AccountOpeningPersonnelInformation(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="开户资料">
          <template slot-scope="scope">
            <el-button
              type="default"
              @click="AccountOpeningInformation(scope.row)"
              >资料下载</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          label="业务申报时间"
          prop="applyTime"
        ></el-table-column>
        <el-table-column label="是否托管" prop="isHosting"></el-table-column>
        <el-table-column label="资料邮寄往来">
          <template slot-scope="scope">
            <el-button type="default" @click="InformationMailing(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="mark"></el-table-column>
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
    <el-dialog
      title="办理失败"
      :visible.sync="BusinessFailedDialog"
      width="500px"
    >
      <el-form
        :model="BusinessFailedForm"
        ref="BusinessFailedForm"
        :rules="BusinessFailedFormRules"
        label-width="100px"
      >
        <el-form-item label="失败原因：" prop="failReason">
          <el-select
            v-model="BusinessFailedForm.failReason"
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
            v-model="BusinessFailedForm.failDescribe"
            maxlength="50"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BusinessFailedDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitBusinessFailedForm('BusinessFailedForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="取消办理"
      :visible.sync="BusinessCancelDialog"
      width="500px"
    >
      <el-form
        :model="BusinessCancelForm"
        ref="BusinessCancelForm"
        :rules="BusinessCancelFormRules"
        label-width="100px"
      >
        <el-form-item label="失败原因：" prop="failReason">
          <el-select
            v-model="BusinessCancelForm.cancelReason"
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
            v-model="BusinessCancelForm.cancelDescribe"
            maxlength="50"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BusinessCancelDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitBusinessCancelForm('BusinessCancelForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="资料回寄"
      :visible.sync="MailMaterialDialog"
      width="500px"
    >
      <el-form
        :model="MailMaterialForm"
        ref="MailMaterialForm"
        :rules="MailMaterialFormRules"
        label-width="120px"
      >
        <el-form-item label="回寄单号：" prop="returnNoteNumber">
          <el-input
            placeholder="请输入"
            v-model="MailMaterialForm.returnNoteNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名：" prop="recipientName">
          <el-input
            placeholder="请输入"
            v-model="MailMaterialForm.recipient"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人电话：" prop="recipientPhone">
          <el-input
            placeholder="请输入"
            v-model="MailMaterialForm.recipient"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input
            type="textarea"
            placeholder="请输入"
            v-model="MailMaterialForm.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="MailMaterialDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitMailMaterialForm('MailMaterialForm')"
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
          num: 356,
        },
        {
          name: "待受理",
          num: 24,
        },
        {
          name: "办理中",
          num: 24,
        },
        {
          name: "办理成功",
          num: 12,
        },
        {
          name: "办理失败",
          num: 23,
        },
        {
          name: "已取消",
          num: 44,
        },
      ],
      filters: {
        accountName: "",
        applyCode: "",
        applyType: "",
        client: "",
        openNet: "",
      },
      openAccountTableData: [
        {
          applyCode: "123",
          status: "待受理",
          responseText: "",
          stateChangeTime: new Date().toLocaleDateString(),
          companyName: "",
          accountType: "",
          client: "",
          openNet: "",
          isHosting: "是",
          mark: "备注1",
        },
        {
          applyCode: "1234",
          status: "办理中",
          responseText: "",
          stateChangeTime: new Date().toLocaleDateString(),
          companyName: "",
          accountType: "",
          client: "",
          openNet: "",
          isHosting: "是",
          mark: "备注2",
        },
        {
          applyCode: "12345",
          status: "办理成功",
          responseText: "",
          stateChangeTime: new Date().toLocaleDateString(),
          companyName: "",
          accountType: "",
          client: "",
          openNet: "",
          isHosting: "否",
          mark: "备注3",
        },
        {
          applyCode: "12522",
          status: "办理失败",
          responseText: "",
          stateChangeTime: new Date().toLocaleDateString(),
          companyName: "",
          accountType: "",
          client: "",
          openNet: "",
          isHosting: "否",
          mark: "备注4",
        },
        {
          applyCode: "13502",
          status: "已取消",
          responseText: "",
          stateChangeTime: new Date().toLocaleDateString(),
          companyName: "",
          accountType: "",
          client: "",
          openNet: "",
          isHosting: "否",
          mark: "备注4",
        },
      ],
      BusinessFailedDialog: false, // 办理失败填写框
      BusinessFailedForm: {
        failReason: "",
        failDescribe: "",
      },
      BusinessFailedFormRules: {
        failReason: [
          { required: true, message: "请选择失败原因", trigger: "change" },
        ],
      },
      BusinessCancelDialog: false, // 取消办理填写框
      BusinessCancelForm: {
        cancelReason: "",
        cancelDescribe: "",
      },
      BusinessCancelFormRules: {
        cancelReason: [
          { required: true, message: "请选择取消原因", trigger: "change" },
        ],
      },
      MailMaterialDialog: false,
      MailMaterialForm: {
        returnNoteNumber: "",
        recipientName: "",
        recipientPhone: "",
        address: "",
      },
      MailMaterialFormRules: {
        returnNoteNumber: [
          { required: true, message: "请输入回寄单号", trigger: "blur" },
        ],
        recipientName: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" },
        ],
        recipientPhone: [
          { required: true, message: "请输入收件人电话", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    tabChanged(params) {
      console.log(params);
    },
    AccountOpeningPersonnelInformation(row) {
      // 开户人员信息
      console.log(row);
    },
    AccountOpeningInformation(row) {
      // 开户资料
      console.log(row);
    },
    InformationMailing(row) {
      // 资料邮寄往来
      console.log(row);
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
      let selection = this.$refs.openAccountTable.selection;
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
        if (item.status != "待受理") {
          this.$message({
            message: "请选择“待受理”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
    },
    BusinessSucceed() {
      // 办理成功
      let selection = this.$refs.openAccountTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        // 判断选中的数据状态是否全是'办理中'
        if (item.status != "办理中") {
          this.$message({
            message: "请选择“办理中”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认办理成功?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 办理成功
          this.$message({
            type: "success",
            message: "办理成功!",
          });
        })
        .catch(() => {});
    },
    BusinessFailed() {
      // 办理失败
      let selection = this.$refs.openAccountTable.selection;
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
        if (item.status != "办理中") {
          this.$message({
            message: "请选择“办理中”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.BusinessFailedDialog = true;
    },
    SubmitBusinessFailedForm(formName) {
      // 提交“办理失败”弹窗表格
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // api --> 办理失败
          this.BusinessFailedDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    BusinessCancel() {
      // 取消办理
      let selection = this.$refs.openAccountTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        // 判断选中的数据状态是否全是“待受理”和“办理中”
        if (item.status != "待受理" && item.status != "办理中") {
          this.$message({
            message: "请选择“待受理” 或“办理中”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.BusinessCancelDialog = true;
    },
    SubmitBusinessCancelForm(formName) {
      // 提交“取消办理”弹窗表格
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // api --> 取消办理
          this.BusinessCancelDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    MailMaterial() {
      // 资料回寄
      let selection = this.$refs.openAccountTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      if (selection == undefined || selection.length > 1) {
        this.$message({
          message: "请选择1条需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      this.MailMaterialDialog = true;
    },
    SubmitMailMaterialForm(formName) {
      // 提交“资料回寄”弹窗表格
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // api --> 资料回寄
          this.MailMaterialDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#OpenAccount {
  padding: 20px;
}
#OpenAccount .operation-pannel {
  padding-top: 0;
}
</style>
