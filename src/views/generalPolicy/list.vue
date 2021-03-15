<template>
  <div id="generalPolicy">
    <div class="page-header">
      <p class="page-path">
        政策设置<span class="slashline">/</span>通用政策设置
      </p>
      <p class="page-title">通用政策设置</p>
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
            <el-form-item label="名称：" prop="name">
              <el-input v-model="filters.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="编号：" prop="number">
              <el-input
                v-model="filters.number"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="所属地区：" prop="region">
              <el-select v-model="filters.region" placeholder="请选择">
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item, index) in regionList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchPolicyList">查询</el-button>
            <el-button type="default" @click="resetForm('filtersform')"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button type="primary" @click="$router.push('/generalPolicy/add')"
          >新增</el-button
        >
        <el-button type="primary" plain @click="editData">编辑</el-button>
        <el-button type="danger" plain @click="delData">删除</el-button>
        <el-button type="warning" plain @click="submitReview"
          >提交审核</el-button
        >
        <el-button type="primary" plain @click="reviewPassed"
          >审核通过</el-button
        >
        <el-button type="danger" plain @click="reviewRejected"
          >审核拒绝</el-button
        >
        <el-button type="default" @click="withdraw">撤回</el-button>
      </div>
      <el-table
        ref="generalPolicyTable"
        max-height="500"
        :data="policyData"
        border
        style="margin: 32px 0 30px"
      >
        <el-table-column type="selection" width="48"> </el-table-column>
        <el-table-column label="政策编号" prop="policyNumber">
        </el-table-column>
        <el-table-column label="政策名称" prop="policyName"> </el-table-column>
        <el-table-column label="所属地区" prop="district"> </el-table-column>
        <el-table-column label="参保类型" prop="insuranceType">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="生效月份" prop="startMonth"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="政策详情">
          <template slot-scope="scope">
            <el-button type="default" @click="goPolicyDetail(scope.row)"
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
          num: 0,
        },
        {
          name: "待审核",
          num: 0,
        },
        {
          name: "审核通过",
          num: 0,
        },
        {
          name: "审核不通过",
          num: 0,
        },
        {
          name: "未提交",
          num: 0,
        },
        {
          name: "已撤回",
          num: 0,
        },
      ],
      filters: {
        name: "",
        number: "",
        region: "",
      },
      regionList: [],
      policyData: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    tabChanged(params) {
      if (params.name == "全部") {
        this.activeKutab = -1;
      } else if (params.name == "待审核") {
        this.activeKutab = 1;
      } else if (params.name == "审核通过") {
        this.activeKutab = 2;
      } else if (params.name == "审核不通过") {
        this.activeKutab = 3;
      } else if (params.name == "未提交") {
        this.activeKutab = 0;
      } else if (params.name == "已撤回") {
        this.activeKutab = 4;
      } else {
        this.activeKutab = -1;
      }
      this.searchPolicyList();
    },
    getStatus(status) {
      switch (status) {
        case 0:
          return "未提交";
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "审核不通过";
        case 4:
          return "已撤回";
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goPolicyDetail(row) {
      // 查看政策详情
      this.$router.push({
        name: "GeneralPolicyDetail",
        params: {
          policyNumber: row.policyNumber,
          policyName: row.policyName,
          district: row.district,
          insuranceType: row.insuranceType,
          startMonth: row.startMonth,
          rowDetail: row,
        },
      });
    },
    handleSizeChange(pageSize) {
      // 每页条数改变
      this.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      this.currentPage = currentPage;
    },
    editData() {
      // 编辑操作
      let selection = this.$refs.generalPolicyTable.selection;
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
      let row = selection[0];
      this.$router.push({
        name: "GeneralPolicyEdit",
        params: {
          policyNumber: row.policyNumber,
          policyName: row.policyName,
          district: row.district,
          insuranceType: row.insuranceType,
          startMonth: row.startMonth,
        },
      });
    },
    delData() {
      // 删除操作
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
        if (
          item.status != "已撤回" &&
          item.status != "未提交" &&
          item.status != "审核不通过"
        ) {
          this.$message({
            message: "请选择“已撤回”或“未提交”或“审核不通过”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api--Delete
          this.Delete(selection);
        })
        .catch(() => {});
    },
    submitReview() {
      // 状态；0-未提交，1-待审核，2-审核通过，3-审核不通过，4-已撤回
      // 提交审核
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
        if (item.status != 0) {
          this.$message({
            message: "请选择“未提交”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认提交审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api--Operate
          this.Operate(0, selection);
        })
        .catch(() => {});
    },
    reviewPassed() {
      // 审核通过
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
        if (item.status != 1) {
          this.$message({
            message: "请选择“待审核”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认审核通过?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api--Operate
          this.Operate(1, selection);
        })
        .catch(() => {});
    },
    reviewRejected() {
      // 审核拒绝
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
        if (item.status != 1) {
          this.$message({
            message: "请选择“待审核”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认拒绝审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api--Operate
          this.Operate(2, selection);
        })
        .catch(() => {});
    },
    withdraw() {
      // 撤回
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
        if (item.status != 1) {
          this.$message({
            message: "请选择“待审核”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      this.$confirm("是否确认撤回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // api--Operate
          this.Operate(3, selection);
        })
        .catch(() => {});
    },
    async Operate(operateType, selection) {
      let data = [];
      for (let i of selection) {
        data.push(i.policyNumber);
      }
      let params = {
        type: operateType,
      };
      try {
        let res = await this.$api.policy.operate(data, params);
        if (res.code == 200) {
          this.$message({
            message: "操作成功！",
            type: "success",
          });
          this.getPolicyList();
        } else {
          this.$message.error("操作失败！");
        }
      } catch (e) {
        console.log(e);
        this.$message.error("操作失败！");
      }
    },
    async Delete(selection) {
      let params = [];
      for (let i of selection) {
        params.push(i.policyNumber);
      }
      try {
        let res = await this.$api.policy.delete(params);
        if (res.code == 200) {
          this.$message({
            message: "操作成功！",
            type: "success",
          });
          this.getPolicyList();
        } else {
          this.$message.error("操作失败！");
        }
      } catch (e) {
        console.log(e);
        this.$message.error("操作失败！");
      }
    },
    searchPolicyList() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getPolicyList();
    },
    async getPolicyList() {
      let params = {
        Type: 0, // 通用0，单位1
        Name: this.filters.name,
        PolicyNumber: this.filters.number,
        District: this.filters.region,
        PageCount: this.currentPage,
        TakeCount: this.pageSize,
      };
      if (this.activeKutab != -1) {
        params.Status = this.activeKutab;
      }
      try {
        let res = await this.$api.policy.policyList(params);
        this.totalCount = res.totalCount;
        this.policyData = res.item;
        this.Kutabs = [
          {
            name: "全部",
            num:
              res.waitVerifyCount +
              res.verifySuccessCount +
              res.verifyFailCount +
              res.noSubmitCount +
              res.recallCount,
          },
          {
            name: "待审核",
            num: res.waitVerifyCount,
          },
          {
            name: "审核通过",
            num: res.verifySuccessCount,
          },
          {
            name: "审核不通过",
            num: res.verifyFailCount,
          },
          {
            name: "未提交",
            num: res.noSubmitCount,
          },
          {
            name: "已撤回",
            num: res.recallCount,
          },
        ];
      } catch (e) {
        console.log(e);
      }
    },
    async getDistrict() {
      try {
        let res = await this.$api.policy.getDistrict({ enterpriseName: " " });
        if (res.code == 200) {
          this.regionList = res.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getPolicyList();
    this.getDistrict();
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#generalPolicy {
  padding: 20px;
}
#generalPolicy .operation-pannel {
  padding-top: 0;
}
</style>
