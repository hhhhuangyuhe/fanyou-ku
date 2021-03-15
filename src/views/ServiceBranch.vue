<template>
  <div id="ServiceBranch">
    <div class="page-header">
      <p class="page-path">
        服务网点管理<span class="slashline">/</span>小库网点列表
      </p>
      <p class="page-title">小库网点列表</p>
    </div>
    <div class="operation-pannel">
      <div class="op-row">
        网点编号：<el-input
          class="row-input"
          v-model="netNumber"
          placeholder="请输入"
        ></el-input>
        网点名称：<el-input
          class="row-input"
          v-model="netName"
          placeholder="请输入"
        ></el-input>
        <el-button type="primary">查询</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </div>
      <div class="op-row">
        <el-button type="primary" icon="el-icon-plus" @click="AddBranch"
          >新建</el-button
        >
        <el-button type="primary" plain @click="aprovedAudit"
          >审核通过</el-button
        >
        <el-button type="danger" plain @click="failedAudit">审核拒绝</el-button>
        <el-button>编辑</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        max-height="500"
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 30px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="number" label="网点编号"></el-table-column>
        <el-table-column prop="name" label="网点名称"></el-table-column>
        <el-table-column prop="address" label="收件地址"></el-table-column>
        <el-table-column prop="charger" label="网点负责人"></el-table-column>
        <el-table-column prop="auditstatus" label="审核状态"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.satuscontrol"
              active-color="#1890ff"
              inactive-color="#c0c0c0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column prop="modifytime" label="修改时间"></el-table-column>
        <el-table-column
          prop="num"
          label="开户是否需要在保人员"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="checkDetails(scope)">查看详情</el-button>
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
export default {
  name: "ServiceBranch",
  components: {},
  data: function () {
    return {
      netNumber: "",
      netName: "",
      tableData: [
        {
          number: "1123123",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          charger: "AD",
          auditstatus: "审核通过",
          createtime: "2021-01-26 14:22",
          modifytime: "2021-01-26 14:22",
          num: "3",
          satuscontrol: false,
        },
        {
          number: "1312312",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
          charger: "DF",
          auditstatus: "审核通过",
          createtime: "2021-01-26 14:22",
          modifytime: "2021-01-26 14:22",
          num: "3",
          satuscontrol: true,
        },
        {
          number: "32141221",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1518 弄",
          charger: "GS",
          auditstatus: "审核通过",
          createtime: "2021-01-26 14:22",
          modifytime: "2021-01-26 14:22",
          num: "2",
          satuscontrol: false,
        },
      ],
    };
  },
  methods: {
    resetFilter() {
      this.netNumber = this.netName = "";
    },
    checkDetails(scope) {
      console.log(scope);
    },
    aprovedAudit() {
      // 审核通过
      this.$confirm("你确定要通过审核吗?", "审核通过提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已通过!",
          });
        })
        .catch(() => {});
    },
    failedAudit() {
      // 审核拒绝
      this.$confirm("你确定要拒绝审核吗?", "审核拒绝提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已拒绝!",
          });
        })
        .catch(() => {});
    },
    handleSizeChange(pageSize) {
      // 每页条数改变
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      // 当前页码改变
      console.log(currentPage);
    },
    AddBranch() {
      this.$router.push("/AddBranch");
    },
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#ServiceBranch {
  padding: 20px;
}
.op-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}
.row-input {
  width: 240px;
  margin: 0 20px 0 10px;
}
.table-container {
  background: #fff;
  padding: 0 20px 20px;
}
</style>
