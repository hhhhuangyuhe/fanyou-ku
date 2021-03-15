<template>
  <div id="ApplyList">
    <div class="page-header">
      <p class="page-path">
        业务管理<span class="slashline">/</span>托管业务申报列表
      </p>
      <p class="page-title">托管业务申报列表</p>
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
            <el-form-item label="单位名称：" prop="enterpriceName">
              <el-input
                v-model="filters.enterpriceName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请编号：" prop="applyNum">
              <el-input
                v-model="filters.applyNum"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="托管类型：" prop="hostingType">
              <el-select v-model="filters.hostingType" placeholder="请选择">
                <el-option label="社保托管" value="1"></el-option>
                <el-option label="公积金托管" value="2"></el-option>
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
          <el-col :span="6">
            <el-form-item label="申请状态：" prop="applyStatus">
              <el-select v-model="filters.applyStatus" placeholder="请选择">
                <el-option label="待受理" value="1"></el-option>
                <el-option label="办理中" value="2"></el-option>
                <el-option label="托管成功" value="3"></el-option>
                <el-option label="托管失败" value="4"></el-option>
              </el-select>
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
        <el-button type="primary" @click="HostingAcceptance"
          >受理业务</el-button
        >
        <el-button type="primary" plain>托管成功</el-button>
        <el-button type="danger" plain>托管失败</el-button>
        <el-button type="default">新增托管</el-button>
      </div>
      <el-table
        ref="ApplyListTable"
        max-height="500"
        :data="ApplyListTableData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column type="selection" width="48"> </el-table-column>
        <el-table-column
          label="申请编号"
          prop="applyNum"
          width="110"
        ></el-table-column>
        <el-table-column
          label="单位名称"
          prop="enterpriceName"
          width="110"
        ></el-table-column>
        <el-table-column label="所属客户" prop="customer"></el-table-column>
        <el-table-column label="托管类型" prop="hostingType"></el-table-column>
        <el-table-column label="申请类型" prop="applyType"> </el-table-column>
        <el-table-column label="托管网点" prop="branch"> </el-table-column>
        <el-table-column label="快递单号" width="100">
          <template slot-scope="scope">
            <el-button type="default" @click="checkExpressDelivery(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          label="托管申报时间"
          prop="applyTime"
          width="150"
        ></el-table-column>
        <el-table-column label="托管资料">
          <template slot-scope="scope">
            <el-button type="default" @click="checkHostingMaterial(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="反馈说明" width="100">
          <template slot-scope="scope">
            <el-button type="default" @click="checkFeedback(scope.row)"
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
      :visible.sync="failedDialog"
      width="500px"
      @close="resetForm('failedDialogForm')"
    >
      <el-form
        :model="failedDialogForm"
        ref="failedDialogForm"
        :rules="failedDialogFormRules"
        label-width="110px"
      >
        <el-form-item label="失败原因：" prop="failReason">
          <el-select
            v-model="failedDialogForm.failReason"
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
            v-model="failedDialogForm.failDescribe"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="回寄单号：" prop="returnNoteNumber">
          <el-input v-model="failedDialogForm.returnNoteNumber"></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名：" prop="recipientName">
          <el-input v-model="failedDialogForm.recipientName"></el-input>
        </el-form-item>
        <el-form-item label="收件人电话：" prop="recipientPhone">
          <el-input v-model="failedDialogForm.recipientPhone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input
            type="textarea"
            v-model="failedDialogForm.address"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="回寄图片：" prop="uploadFileName">
          <el-button
            icon="el-icon-upload2"
            @click="$refs.failedDialogUploadFile.click()"
            >上传文件</el-button
          >
          <p>支持扩展名: .rar .zip .doc .docx .pdf .jpg...</p>
          <input
            type="file"
            id="failedDialogUploadFile"
            ref="failedDialogUploadFile"
            hidden
            @change="
              (e) => {
                failedDialogForm.uploadFile = e.target.files[0];
                failedDialogForm.uploadFileName = e.target.files[0].name;
              }
            "
          />
          <div v-if="failedDialogForm.uploadFileName != ''">
            {{ failedDialogForm.uploadFileName }}
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              style="margin-left: 10px"
              @click="
                failedDialogForm.uploadFileName = failedDialogForm.uploadFile =
                  ''
              "
            ></el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BusinessFailedDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitFailedDialogForm('failedDialogForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="快递单号"
      :visible.sync="expressDeliveryDialog"
      width="500px"
      @close="expressDeliveryInfo = ''"
    >
      <div class="mailDetailInfo">
        <div class="eachMailInfo">
          <p class="mail-info">
            快递单号：{{ expressDeliveryInfo.trackingNo }}
          </p>
          <p class="mail-info">物流信息：</p>
          <el-timeline :reverse="false">
            <el-timeline-item
              v-for="(activity, index) in expressDeliveryInfo.tracksJson"
              :key="index"
              :timestamp="
                commonjs.dateFtt('yyyy-MM-dd hh:mm', new Date(activity.time))
              "
            >
              {{ activity.station }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            expressDeliveryInfo = '';
            expressDeliveryDialog = false;
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            expressDeliveryInfo = '';
            expressDeliveryDialog = false;
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="托管资料"
      :visible.sync="hostingInformationDialog"
      width="500px"
      @close="resetForm('hostingInformationForm')"
    >
      <el-form
        :model="hostingInformationForm"
        ref="hostingInformationForm"
        label-width="90px"
      >
        <el-form-item label="Ukey：" prop="Ukey">
          <el-input
            v-model="hostingInformationForm.Ukey"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="account">
          <el-input
            v-model="hostingInformationForm.account"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="hostingInformationForm.password"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BusinessFailedDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubmitFailedDialogForm('failedDialogForm')"
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
          name: "申请托管",
          num: 56,
        },
        {
          name: "取消托管",
          num: 24,
        },
      ],
      activeKutab: 0,
      filters: {
        enterpriceName: "",
        applyNum: "",
        hostingType: "",
        branch: "",
        applyType: "",
        customer: "",
      },
      ApplyListTableData: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      failedDialog: false,
      failedDialogForm: {
        failReason: "",
        failDescribe: "",
        returnNoteNumber: "",
        recipientName: "",
        recipientPhone: "",
        address: "",
        uploadFileName: "",
      },
      failedDialogFormRules: {
        failReason: [
          { required: true, message: "请选择失败原因", trigger: "change" },
        ],
        returnNoteNumber: [
          { required: true, message: "请填写回寄单号", trigger: "blur" },
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
        uploadFileName: [
          { required: true, message: "请上传回寄图片", trigger: "change" },
        ],
      },
      expressDeliveryDialog: false,
      expressDeliveryInfo: {
        trackingNo: "",
        tracksJson: [
          {
            station: "出发",
            time: new Date(),
          },
          {
            station: "路上",
            time: new Date(),
          },
          {
            station: "到达",
            time: new Date(),
          },
        ],
      },
      hostingInformationDialog: false,
      hostingInformationForm: {
        Ukey: "",
        account: "",
        password: "",
      },
    };
  },
  methods: {
    tabChanged(params) {
      if (params.name == "申请托管") {
        this.activeKutab = 0;
      } else if (params.name == "取消托管") {
        this.activeKutab = 1;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    HostingAcceptance() {
      // 受理业务--托管
      let selection = this.$refs.generalPolicyTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        if (item.status != "待受理") {
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
          // api--
        })
        .catch(() => {});
    },
    HostingSuccessfully() {
      // 托管成功
      let selection = this.$refs.generalPolicyTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        if (item.status != "办理中") {
          this.$message({
            message: "请选择“办理中”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认业务托管成功?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api--
        })
        .catch(() => {});
    },
    HostingFailed() {
      // 托管失败
      let selection = this.$refs.generalPolicyTable.selection;
      if (selection == undefined || selection.length <= 0) {
        this.$message({
          message: "请选择需要处理的数据",
          type: "warning",
          showClose: true,
        });
        return;
      }
      for (let item of selection) {
        if (item.status != "办理中") {
          this.$message({
            message: "请选择“办理中”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.failedDialog = true;
    },
    SubmitFailedDialogForm(formName) {
      // 提交“办理失败”弹窗表格
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let selection = this.$refs.ApplyListTable.selection;
          let ids = [];
          for (let i of selection) {
            ids.push(i.id);
          }
          // api --> 办理失败
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkExpressDelivery(row) {
      // 查看快递详情
      console.log(row);
    },
    checkHostingMaterial(row) {
      // 查看托管资料
      console.log(row);
    },
    checkFeedback(row) {
      // 查看反馈说明
      console.log(row);
    },
    searchList() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getData();
    },
    async getData() {
      // let listParams = {
      // };
      // try {
      //   let [listData, stat] = await Promise.all([
      //     this.$api.orderProcess.list(listParams),
      //     this.$api.orderProcess.stat(),
      //   ]);
      //   this.totalCount = listData.data.totalCount;
      //   this.ApplyListTableData = listData.data.item;
      //   let arr = [];
      //   for (let i of stat.data) {
      //     let obj = new Object();
      //     obj.name = i.name;
      //     obj.num = i.count;
      //     obj.applyType = i.applyType;
      //     arr.push(obj);
      //   }
      //   this.Kutabs = arr;
      // } catch (err) {
      //   console.log(err);
      // }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#ApplyList {
  padding: 20px;
}
#ApplyList .operation-pannel {
  padding-top: 0;
}
.mail-info {
  line-height: 20px;
  margin-bottom: 16px;
}
</style>
