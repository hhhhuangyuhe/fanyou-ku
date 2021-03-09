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
          <el-col :span="6">
            <el-form-item label="开户单位名称：" prop="accountName">
              <el-input
                v-model="filters.accountName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请编号：" prop="applyCode">
              <el-input
                v-model="filters.applyCode"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户类型：" prop="applyType">
              <el-select v-model="filters.applyType" placeholder="请选择">
                <el-option label="社保账户" value="0"></el-option>
                <el-option label="公积金账户" value="1"></el-option>
                <el-option label="社保公积金账户" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="searchAccount">查询</el-button>
            <el-button type="default" @click="resetForm('filtersform')"
              >重置</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="所属客户：" prop="client">
              <el-select v-model="filters.client" placeholder="请选择">
                <el-option label="ERS" value="KH100010"></el-option>
                <el-option label="FAR" value="KH100009"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户网点：" prop="branch">
              <el-input
                v-model="filters.branch"
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
        <el-table-column
          label="申请编号"
          prop="code"
          width="150"
        ></el-table-column>
        <el-table-column label="状态" prop="statusText"> </el-table-column>
        <el-table-column label="反馈结果说明" prop="failResson" width="150">
        </el-table-column>
        <el-table-column label="状态变更时间" prop="operationTime" width="120">
        </el-table-column>
        <el-table-column
          label="单位名称"
          prop="enterpriseName"
          width="180"
        ></el-table-column>
        <el-table-column label="开户类型" prop="typeText"></el-table-column>
        <el-table-column label="所属客户" prop="customer"></el-table-column>
        <el-table-column
          label="开户网点"
          prop="branch"
          width="130"
        ></el-table-column>
        <el-table-column label="开户人员信息" width="120">
          <template slot-scope="scope">
            <el-button
              type="default"
              @click="AccountOpeningPersonnelInformation(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="开户资料" width="120">
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
          prop="creationTime"
          width="150"
        ></el-table-column>
        <el-table-column label="是否托管">
          <template slot-scope="scope">
            <div v-if="scope.row.isEntrusted">是</div>
            <div v-else>否</div>
          </template>
        </el-table-column>
        <el-table-column label="资料邮寄往来" width="120">
          <template slot-scope="scope">
            <el-button type="default" @click="InformationMailing(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          width="120"
        ></el-table-column>
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
      @close="cancelMaillingMaterial"
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
            v-model="MailMaterialForm.recipientName"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人电话：" prop="recipientPhone">
          <el-input
            placeholder="请输入"
            v-model="MailMaterialForm.recipientPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input
            type="textarea"
            placeholder="请输入"
            v-model="MailMaterialForm.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="回寄图片：" prop="fileName">
          <el-button icon="el-icon-upload2" @click="uploadMailFile"
            >上传文件</el-button
          >
          <p class="uploadTips">
            支持拓展名：.rar .zip .doc .docx .pdf .jpg...
          </p>
          <input
            type="file"
            hidden
            id="mailFile"
            ref="mailFile"
            @change="getUploadMailFile"
          />
          <span>{{ MailMaterialForm.fileName }}</span>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            class="delUploadFileIcon"
            v-if="MailMaterialForm.fileName != ''"
            @click="delUploadFile"
          ></el-button>
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
    <el-dialog
      title="在保人员信息"
      :visible.sync="InsuranceMemberInfo"
      width="750px"
    >
      <el-table
        ref="InsuranceMemberInfoTable"
        max-height="500"
        :data="InsuranceMemberInfoTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column
          label="身份证"
          prop="idCard"
          width="150"
        ></el-table-column>
        <el-table-column
          label="联系方式"
          prop="phone"
          width="120"
        ></el-table-column>
        <el-table-column label="申报类型">
          <template slot-scope="scope">
            {{ transferApplyType(scope.row.applyType) }}
          </template>
        </el-table-column>
        <el-table-column label="申报基数" prop="applyNum"></el-table-column>
        <el-table-column label="生效月份" prop="startMonth"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsuranceMemberInfo = false">取 消</el-button>
        <el-button type="primary" @click="InsuranceMemberInfo = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="资料邮寄往来"
      :visible.sync="InformationMailingDialog"
      width="500px"
    >
      <div class="mailDetailInfo">
        <div
          class="eachMailInfo"
          v-for="(item, index) in InformationMailingDetail"
          :key="index"
        >
          <p class="mail-info" v-if="item.type === 0">
            客户邮寄单号：{{ item.trackingNo }}
          </p>
          <p class="mail-info" v-if="item.type === 1">
            回寄单号：{{ item.trackingNo }}
          </p>
          <p class="mail-info">收件人姓名：{{ item.name }}</p>
          <p class="mail-info">收件人联系方式：{{ item.phone }}</p>
          <p class="mail-info">详细地址：{{ item.address }}</p>
          <p class="mail-info">物流信息：</p>
          <el-timeline :reverse="false">
            <el-timeline-item
              v-for="(activity, index) in item.tracksJson"
              :key="index"
              :timestamp="dateFtt('yyyy-MM-dd hh:mm', new Date(activity.time))"
            >
              {{ activity.station }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InformationMailingDialog = false">取 消</el-button>
        <el-button type="primary" @click="InformationMailingDialog = false"
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
        branch: "",
      },
      openAccountTableData: [],
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
        fileName: "",
        file: "",
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
        fileName: [
          { required: true, message: "请上传回寄图片", trigger: "change" },
        ],
      },
      InsuranceMemberInfo: false,
      InsuranceMemberInfoTableData: [],
      InformationMailingDialog: false,
      InformationMailingDetail: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
    };
  },
  methods: {
    tabChanged(params) {
      console.log(params);
    },
    AccountOpeningPersonnelInformation(row) {
      // 开户人员信息
      console.log(row);
      this.InsuranceMemberInfo = true;
      this.getPesonals(row.id);
    },
    AccountOpeningInformation(row) {
      // 开户资料
      console.log(row);
    },
    InformationMailing(row) {
      // 资料邮寄往来
      console.log(row);
      this.InformationMailingDialog = true;
      this.getLogistics(row.id);
    },
    handleSizeChange(pageSize) {
      // 每页条数改变
      this.pageSize = pageSize;
      this.getAccounts();
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      this.currentPage = currentPage;
      this.getAccounts();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    transferApplyType(applyType) {
      if (applyType == 0) {
        return "社保新增";
      } else if (applyType == 1) {
        return "社保续保";
      } else if (applyType == 6) {
        return "公积金新增";
      } else if (applyType == 7) {
        return "公积金续保";
      } else {
        return "";
      }
    },
    AcceptBusiness() {
      //办理状态枚举名：0 待受理；1 办理中；2 办理成功；3 办理失败；4 已取消；
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
        if (item.status != 0) {
          this.$message({
            message: "请选择“待受理”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认受理业务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api --> 受理业务
          let ids = [];
          for (let i of selection) {
            ids.push(i.id);
          }
          this.updateStatus(ids, 1);
          this.$message({
            type: "success",
            message: "受理成功!",
          });
        })
        .catch(() => {});
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
          let ids = [];
          for (let i of selection) {
            ids.push(i.id);
          }
          this.updateStatus(ids, 2);
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
      if (selection == undefined || selection.length > 1) {
        this.$message({
          message: "请选择1条需要处理的数据",
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
          this.updateStatus(this.$refs.openAccountTableData.selection[0].id, 3);
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
          this.logistic();
          // this.MailMaterialDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getAccounts() {
      let params = {
        Keyword: this.filters.accountName,
        Code: this.filters.applyCode,
        Type: this.filters.applyType,
        CustomerId: this.filters.client,
        Branch: this.filters.branch,
        PageCount: this.currentPage,
        TakeCount: this.pageSize,
      };
      try {
        let res = await this.$api.accounts.accounts(params);
        this.totalCount = res.totalCount;
        this.openAccountTableData = res.item;
      } catch (e) {
        console.log(e);
      }
    },
    async getPesonals(id) {
      let params = {
        id: id,
      };
      try {
        let res = await this.$api.accounts.pesonals(params);
        this.InsuranceMemberInfoTableData = res;
      } catch (e) {
        console.log(e);
      }
    },
    async getLogistics(id) {
      let params = {
        id: id,
      };
      try {
        let res = await this.$api.accounts.logistics(params);
        this.InformationMailingDetail = res;
      } catch (e) {
        console.log(e);
      }
    },
    async logistic() {
      let selection = this.$refs.openAccountTable.selection;
      let params = {
        file: this.MailMaterialForm.file,
        EntrustId: selection[0].id,
        Name: this.MailMaterialForm.recipientName,
        Phone: this.MailMaterialForm.recipientPhone,
        Address: this.MailMaterialForm.address,
        TrackingNo: this.MailMaterialForm.returnNoteNumber,
      };
      try {
        let res = await this.$api.accounts.logistic(params);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    async updateStatus(ids, status) {
      let failReason = "";
      let params = {
        IstId: ids,
        status: status,
        failResson: failReason,
      };
      try {
        let res = await this.$api.accounts.status(params);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    searchAccount() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getAccounts();
    },
    uploadMailFile() {
      // 资料回寄上传文件
      this.$refs.mailFile.click();
    },
    getUploadMailFile(event) {
      let files = event.target.files;
      this.MailMaterialForm.fileName = files[0].name;
    },
    delUploadFile() {
      this.MailMaterialForm.fileName = "";
      this.MailMaterialForm.file = "";
    },
    cancelMaillingMaterial() {
      this.$refs["MailMaterialForm"].resetFields();
      this.MailMaterialForm = {
        returnNoteNumber: "",
        recipientName: "",
        recipientPhone: "",
        address: "",
        fileName: "",
        file: "",
      };
    },
    dateFtt(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
  },
  mounted() {
    this.getAccounts();
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
