<template>
  <div id="generalPolicy">
    <div class="page-header">
      <p class="page-path">
        政策设置<span class="slashline">/</span>单位政策设置
      </p>
      <p class="page-title">单位政策设置</p>
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
            <el-form-item label="名称：">
              <el-input v-model="filters.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="编号：">
              <el-input
                v-model="filters.number"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="所属地区：">
              <el-cascader
                v-model="filters.region"
                :options="regionOptions"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">查询</el-button>
            <el-button type="default" @click="resetForm('filtersform')"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button type="primary">新增</el-button>
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
        <el-table-column label="单位名称" prop="unitName"> </el-table-column>
        <el-table-column label="政策名称" prop="policyName"> </el-table-column>
        <el-table-column label="所属地区" prop="region"> </el-table-column>
        <el-table-column label="参保类型" prop="type"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column
          label="生效月份"
          prop="effectiveTime"
        ></el-table-column>
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
        :total="1000"
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
          num: 356,
        },
        {
          name: "待审核",
          num: 24,
        },
        {
          name: "审核通过",
          num: 24,
        },
        {
          name: "审核不通过",
          num: 12,
        },
        {
          name: "未提交",
          num: 23,
        },
        {
          name: "已撤回",
          num: 44,
        },
      ],
      filters: {
        name: "",
        number: "",
        region: "",
      },
      regionOptions: [
        // 所属地区
        {
          value: "北京市",
          label: "北京市",
          children: [
            {
              value: "朝阳区",
              label: "朝阳区",
            },
            {
              value: "海淀区",
              label: "海淀区",
            },
          ],
        },
        {
          value: "深圳市",
          label: "深圳市",
          children: [
            {
              value: "南山区",
              label: "南山区",
            },
            {
              value: "福田区",
              label: "福田区",
            },
          ],
        },
        {
          value: "上海市",
          label: "上海市",
          children: [
            {
              value: "静安区",
              label: "静安区",
            },
            {
              value: "浦东新区",
              label: "浦东新区",
            },
          ],
        },
        {
          value: "杭州市",
          label: "杭州市",
          children: [
            {
              value: "江干区",
              label: "江干区",
            },
            {
              value: "滨江区",
              label: "滨江区",
            },
          ],
        },
        {
          value: "成都市",
          label: "成都市",
          children: [
            {
              value: "高新区",
              label: "高新区",
            },
          ],
        },
        {
          value: "广州市",
          label: "广州市",
          children: [
            {
              value: "天河区",
              label: "天河区",
            },
          ],
        },
      ],
      policyData: [
        // 表数据
        {
          policyNumber: "311232342",
          unitName: "深圳市XXX网络科技有限公司",
          policyName: "深户一档21",
          region: "深圳市南山区",
          type: "社保",
          status: "待审核",
          effectiveTime: "2021-01",
          updateTime: "2021-01",
        },
        {
          policyNumber: "311232342",
          unitName: "深圳市XXX网络科技有限公司",
          policyName: "深户一档21",
          region: "深圳市南山区",
          type: "社保",
          status: "审核通过",
          effectiveTime: "2021-01",
          updateTime: "2021-01",
        },
        {
          policyNumber: "311232342",
          unitName: "深圳市XXX网络科技有限公司",
          policyName: "深户一档21",
          region: "深圳市南山区",
          type: "社保",
          status: "审核不通过",
          effectiveTime: "2021-01",
          updateTime: "2021-01",
        },
        {
          policyNumber: "311232342",
          unitName: "深圳市XXX网络科技有限公司",
          policyName: "深户一档21",
          region: "深圳市南山区",
          type: "社保",
          status: "未提交",
          effectiveTime: "2021-01",
          updateTime: "2021-01",
        },
        {
          policyNumber: "311232342",
          unitName: "深圳市XXX网络科技有限公司",
          policyName: "深户一档21",
          region: "深圳市南山区",
          type: "社保",
          status: "已撤回",
          effectiveTime: "2021-01",
          updateTime: "2021-01",
        },
      ],
    };
  },
  methods: {
    tabChanged(params) {
      // 标签页切换
      console.log(params);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goPolicyDetail(row) {
      // 查看政策详情
      console.log(row);
      this.$router.push({
        path: "/generalPolicy/detail",
        params: row,
      });
    },
    handleSizeChange(pageSize) {
      // 每页条数改变
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      console.log(currentPage);
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
      this.$router.push({
        path: "/unitPolicy/edit",
        params: selection,
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
      // api
    },
    submitReview() {
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
        if (item.status != "未提交") {
          this.$message({
            message: "请选择“未提交”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      // api
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
        if (item.status != "待审核") {
          this.$message({
            message: "请选择“待审核”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      // api
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
        if (item.status != "待审核") {
          this.$message({
            message: "请选择“待审核”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      // api
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
        if (item.status != "待审核") {
          this.$message({
            message: "请选择“待审核”状态的数据进行处理",
            type: "error",
            showClose: true,
          });
          return;
        }
      }
      // api
    },
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
