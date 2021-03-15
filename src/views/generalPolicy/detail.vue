<template>
  <div id="addGeneralPolicy">
    <div class="page-header">
      <p class="page-path">
        政策设置<span class="slashline">/</span>通用政策设置<span
          class="slashline"
          >/</span
        >政策详情
      </p>
      <p class="page-title">政策详情</p>
    </div>
    <div class="operation-pannel">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="basic-info">基本信息</div>
          </template>
          <el-form
            :model="basicInfoForm"
            label-position="top"
            ref="basicInfoForm"
            class="basic-info-form"
          >
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="政策名称">
                  <el-input
                    v-model="basicInfoForm.policyName"
                    placeholder="请输入"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属地区">
                  <el-select
                    v-model="basicInfoForm.region"
                    placeholder="请选择"
                    :disabled="true"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in regionList"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="参保类型">
                  <el-select
                    v-model="basicInfoForm.type"
                    placeholder="请选择"
                    :disabled="true"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in participateTypeList"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="生效月份">
                  <el-date-picker
                    :editable="false"
                    v-model="basicInfoForm.effectiveTime"
                    type="month"
                    placeholder="请选择"
                    :disabled="true"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议附件"> </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div class="policy-info">
        <el-tabs v-model="activeCard" type="card">
          <el-tab-pane label="正常" name="正常">
            <div class="control-panel">
              <div>政策信息</div>
            </div>
            <el-table
              ref="normalPolicyTable"
              max-height="500"
              :data="normalPolicyData"
              border
            >
              <el-table-column label="险种类别">
                <template slot-scope="scope">
                  {{ getType(scope.row.type) }}
                </template>
              </el-table-column>
              <el-table-column label="险种" prop="name"> </el-table-column>
              <el-table-column label="单位部分">
                <el-table-column
                  label="基数上限"
                  prop="enterpriseNumberCeiling"
                >
                </el-table-column>
                <el-table-column label="基数下限" prop="enterpriseNumberFloor">
                </el-table-column>
                <el-table-column label="缴纳比例%" prop="enterprisePercent">
                </el-table-column>
                <el-table-column label="最低缴费金额" prop="enterpriseMinMoney">
                </el-table-column>
              </el-table-column>
              <el-table-column label="个人部分">
                <el-table-column label="基数上限" prop="personNumberCeiling">
                </el-table-column>
                <el-table-column label="基数下限" prop="personNumberFloor">
                </el-table-column>
                <el-table-column label="缴纳比例%" prop="personPercent">
                </el-table-column>
                <el-table-column label="最低缴费金额" prop="personMinMoney">
                </el-table-column>
              </el-table-column>
              <el-table-column label="启用月份" prop="startMouth">
              </el-table-column>
              <el-table-column label="备注" prop="remark"> </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="补缴" name="补缴">
            <div class="control-panel">
              <div>政策信息</div>
            </div>
            <el-table
              ref="makeupPolicyTable"
              max-height="500"
              :data="makeupPolicyData"
              border
            >
              <el-table-column label="险种类别">
                <template slot-scope="scope">
                  {{ getType(scope.row.type) }}
                </template>
              </el-table-column>
              <el-table-column label="险种" prop="name"></el-table-column>
              <el-table-column label="跨周期补缴">
                <template slot-scope="scope">
                  {{ scope.row.isPeriod == "0" ? "允许" : "不允许" }}
                </template>
              </el-table-column>
              <el-table-column label="周期起始时间" width="120">
                <template slot-scope="scope">
                  {{ scope.row.peridStartMouth }}
                </template>
              </el-table-column>
              <el-table-column label="周期截止时间" width="120">
                <template slot-scope="scope">
                  {{ scope.row.peridEndMouth }}
                </template>
              </el-table-column>
              <el-table-column label="单位部分">
                <el-table-column
                  label="基数上限"
                  prop="enterpriseNumberCeiling"
                >
                </el-table-column>
                <el-table-column label="基数下限" prop="enterpriseNumberFloor">
                </el-table-column>
                <el-table-column label="缴纳比例%" prop="enterprisePercent">
                </el-table-column>
                <el-table-column label="最低缴费金额" prop="enterpriseMinMoney">
                </el-table-column>
              </el-table-column>
              <el-table-column label="个人部分">
                <el-table-column label="基数上限" prop="personNumberCeiling">
                </el-table-column>
                <el-table-column label="基数下限" prop="personNumberFloor">
                </el-table-column>
                <el-table-column label="缴纳比例%" prop="personPercent">
                </el-table-column>
                <el-table-column label="最低缴费金额" prop="personMinMoney">
                </el-table-column>
              </el-table-column>
              <el-table-column label="启用月份" prop="startMonth">
              </el-table-column>
              <el-table-column label="备注" prop="remark"> </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom-btn-group">
        <el-button @click="returnGeneralPolicyList">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNetwork",
  components: {},
  data: function () {
    return {
      activeNames: ["1"],
      basicInfoForm: {
        policyName: "",
        region: "",
        type: "",
        effectiveTime: "",
      },
      participateTypeList: [], // 根据城市维护的参保类型list
      regionList: [], // 所属地区list
      activeCard: "正常",
      normalPolicyData: [], // 正常--政策信息表
      makeupPolicyData: [], // 补缴--政策信息表
    };
  },
  methods: {
    returnGeneralPolicyList() {
      this.$router.push("/GeneralPolicy");
    },
    getType(type) {
      switch (type) {
        case "0":
          return "社保";
        case "1":
          return "公积金";
        case "2":
          return "自定义险种";
        default:
          return "";
      }
    },
    async getPolicy() {
      let params = {
        Type: 0, // 0-全部，1-正常，2-补缴
        PolicyNumbers: this.$route.params.policyNumber,
      };
      try {
        let res = await this.$api.policy.getPolicyByNumber(params);
        let normalList = [];
        let unnormalList = [];
        let policies = [];
        for (let i in res.data.data) {
          policies.push(res.data.data[i]);
        }
        for (let j of policies[0]) {
          if (j.isNormal) {
            normalList.push(j);
          } else {
            unnormalList.push(j);
          }
        }
        this.normalPolicyData = normalList;
        this.makeupPolicyData = unnormalList;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    let pm = this.$route.params;
    (this.basicInfoForm = {
      policyName: pm.policyName,
      region: pm.district,
      type: pm.insuranceType,
      effectiveTime: pm.startMonth,
    }),
      this.getPolicy();
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#addGeneralPolicy {
  padding: 20px;
}
.basic-info {
  width: 100%;
  font-size: 14px;
  background: #fafafa;
  padding: 0 20px;
  border-radius: 2px 2px 0 0;
  border-bottom: 1px solid #ededed;
}
.el-collapse {
  border-top: 0;
}
.basic-info-form {
  padding: 20px 20px 0;
}
.basic-info-form .el-select {
  width: 100%;
}
.basic-info-form .el-date-editor {
  width: 100%;
}
.policy-info {
  margin: 20px 0 0;
}
.control-panel {
  width: 100%;
  height: 48px;
  background: #fafafa;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
}
</style>
