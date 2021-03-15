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
                    :editable="true"
                    v-model="basicInfoForm.effectiveTime"
                    type="month"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议附件">
                  <el-button type="default" icon="el-icon-upload2"
                    >上传文件</el-button
                  >
                  <p style="color: #999">
                    支持拓展名：.rar .zip .doc .docx .pdf .jpg...
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div class="policy-info">
        <el-tabs v-model="activeCard" type="card">
          <el-tab-pane label="正常" name="正常">
            <div class="control-panel">
              <div>
                政策信息<el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="addNormalPolicyRow"
                  >新增</el-button
                ><el-button type="primary" plain @click="downloadDemo(0)"
                  >模板下载</el-button
                ><el-button type="default">批量导入</el-button>
              </div>
              <el-button type="default" icon="el-icon-plus"
                >关联大库政策</el-button
              >
            </div>
            <el-table
              ref="normalPolicyTable"
              max-height="500"
              :data="normalPolicyData"
              border
            >
              <el-table-column type="selection" width="48"> </el-table-column>
              <el-table-column label="险种类别" width="110">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.type"
                    placeholder="请选择"
                    @change="
                      (val) =>
                        normalCategoryChange(val, scope.row, scope.$index)
                    "
                  >
                    <el-option label="社保" value="0"></el-option>
                    <el-option label="公积金" value="1"></el-option>
                    <el-option label="自定义险种" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="险种" width="140">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.name"
                    placeholder="请选择"
                    v-if="scope.row.type == '0'"
                  >
                    <el-option label="医疗保险" value="医疗保险"></el-option>
                    <el-option label="养老保险" value="养老保险"></el-option>
                    <el-option label="生育保险" value="生育保险"></el-option>
                    <el-option label="工伤保险" value="工伤保险"></el-option>
                    <el-option label="失业保险" value="失业保险"></el-option>
                    <el-option
                      label="大病/补充/大额医疗"
                      value="大病/补充/大额医疗"
                    ></el-option>
                    <el-option label="残保金" value="残保金"></el-option>
                  </el-select>
                  <el-select
                    v-model="scope.row.name"
                    placeholder="请选择"
                    v-if="scope.row.type == '2'"
                  >
                    <el-option label="公积金" value="公积金"></el-option>
                  </el-select>
                  <el-select
                    v-model="scope.row.name"
                    placeholder="先选险种类别"
                    v-if="scope.row.type != '0' && scope.row.type != '1'"
                    :disabled="true"
                  >
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="单位部分">
                <el-table-column
                  label="基数上限"
                  prop="enterpriseNumberCeiling"
                  width="90"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterpriseNumberCeiling"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="基数下限" width="90">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterpriseNumberFloor"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="缴纳比例%" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterprisePercent"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="最低缴费金额" width="110">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterpriseMinMoney"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="个人部分">
                <el-table-column label="基数上限" width="90">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personNumberCeiling"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="基数下限" width="90">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personNumberFloor"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="缴纳比例%" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personPercent"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="最低缴费金额" width="110">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personMinMoney"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="启用月份" width="140">
                <template slot-scope="scope">
                  <el-date-picker
                    :editable="false"
                    v-model="scope.row.effectiveTime"
                    type="month"
                    placeholder="请选择"
                    style="width: 110px"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="delNormalPolicy(scope)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="补缴" name="补缴">
            <div class="control-panel">
              <div>
                政策信息<el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="addMakeupPolicyRow"
                  >新增</el-button
                ><el-button type="primary" plain @click="downloadDemo(1)"
                  >模板下载</el-button
                ><el-button type="default">批量导入</el-button>
              </div>
              <el-button type="default" icon="el-icon-plus"
                >关联大库政策</el-button
              >
            </div>
            <el-table
              ref="makeupPolicyTable"
              max-height="500"
              :data="makeupPolicyData"
              border
            >
              <el-table-column type="selection" width="48"> </el-table-column>
              <el-table-column label="险种类别" width="110">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.type"
                    placeholder="请选择"
                    @change="
                      (val) =>
                        makeupCategoryChange(val, scope.row, scope.$index)
                    "
                  >
                    <el-option label="社保" value="0"></el-option>
                    <el-option label="公积金" value="1"></el-option>
                    <el-option label="自定义险种" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="险种" width="140">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.name"
                    placeholder="请选择"
                    v-if="scope.row.type == '0'"
                  >
                    <el-option label="医疗保险" value="医疗保险"></el-option>
                    <el-option label="养老保险" value="养老保险"></el-option>
                    <el-option label="生育保险" value="生育保险"></el-option>
                    <el-option label="工伤保险" value="工伤保险"></el-option>
                    <el-option label="失业保险" value="失业保险"></el-option>
                    <el-option
                      label="大病/补充/大额医疗"
                      value="大病/补充/大额医疗"
                    ></el-option>
                    <el-option label="残保金" value="残保金"></el-option>
                  </el-select>
                  <el-select
                    v-model="scope.row.name"
                    placeholder="请选择"
                    v-if="scope.row.type == '1'"
                  >
                    <el-option label="公积金" value="公积金"></el-option>
                  </el-select>
                  <el-select
                    v-model="scope.row.name"
                    placeholder="先选险种类别"
                    v-if="scope.row.type != '0' && scope.row.type != '1'"
                    :disabled="true"
                  >
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="跨周期补缴" width="110">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.isPeriod" placeholder="请选择">
                    <el-option label="允许" :value="0"></el-option>
                    <el-option label="不允许" :value="1"></el-option>
                    <!-- <el-option label="残保金" value="残保金"></el-option> -->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="周期起始时间" width="188">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.cycleStartYear"
                    placeholder="请选择"
                    style="width: 90px"
                  >
                    <el-option label="上年" value="上年"></el-option>
                    <el-option label="当年" value="当年"></el-option>
                  </el-select>
                  <el-input-number
                    v-model="scope.row.cycleStartMonth"
                    controls-position="right"
                    :precision="0"
                    :min="1"
                    :max="12"
                    style="width: 50px; margin-left: 6px"
                    :controls="false"
                  ></el-input-number>
                  月
                </template>
              </el-table-column>
              <el-table-column label="周期截止时间" width="188">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.cycleEndYear"
                    placeholder="请选择"
                    style="width: 90px"
                  >
                    <el-option label="上年" value="上年"></el-option>
                    <el-option label="当年" value="当年"></el-option>
                  </el-select>
                  <el-input-number
                    v-model="scope.row.cycleEndMonth"
                    controls-position="right"
                    :precision="0"
                    :min="1"
                    :max="12"
                    style="width: 50px; margin-left: 6px"
                    :controls="false"
                  ></el-input-number>
                  月
                </template>
              </el-table-column>
              <el-table-column label="单位部分">
                <el-table-column
                  label="基数上限"
                  prop="enterpriseNumberCeiling"
                  width="90"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterpriseNumberCeiling"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="基数下限" width="90">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterpriseNumberFloor"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="缴纳比例%" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterprisePercent"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="最低缴费金额" width="110">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.enterpriseMinMoney"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="个人部分">
                <el-table-column label="基数上限" width="90">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personNumberCeiling"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="基数下限" width="90">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personNumberFloor"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="缴纳比例%" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personPercent"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="最低缴费金额" width="110">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.personMinMoney"
                      placeholder="请输入"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="启用月份" width="140">
                <template slot-scope="scope">
                  <el-date-picker
                    :editable="false"
                    v-model="scope.row.effectiveTime"
                    type="month"
                    placeholder="请选择"
                    style="width: 110px"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="140">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="delMakeupPolicy(scope)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom-btn-group">
        <el-button @click="returnGeneralPolicyList">取消</el-button>
        <el-button type="primary" @click="savePolicy">保存</el-button>
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
        file: "",
      },
      participateTypeList: [], // 根据城市维护的参保类型list
      regionList: [], // 所属地区list
      activeCard: "正常",
      normalPolicyData: [], // 正常--政策信息表
      makeupPolicyData: [], // 补缴--政策信息表
    };
  },
  methods: {
    addNormalPolicyRow() {
      let normalPolicyData = this.normalPolicyData;
      if (normalPolicyData == undefined) {
        normalPolicyData = new Array();
      }
      let obj = new Object();
      obj = {
        type: "0",
        name: "",
        unitRatio: "",
        peronalRatio: "",
        effectiveTime: "",
        remark: "",
      };
      normalPolicyData.push(obj);
      this.normalPolicyData = normalPolicyData;
    },
    delNormalPolicy(obj) {
      // 删除正常政策信息row
      let index = obj.$index;
      this.normalPolicyData.splice(index, 1);
    },
    addMakeupPolicyRow() {
      let makeupPolicyData = this.makeupPolicyData;
      if (makeupPolicyData == undefined) {
        makeupPolicyData = new Array();
      }
      let obj = new Object();
      obj = {
        type: "0",
        name: "",
        interCycle: "不允许",
        cycleStartYear: "",
        cycleStartMonth: "",
        cycleEndYear: "",
        cycleEndMonth: "",
        unitRatio: "",
        peronalRatio: "",
        effectiveTime: "",
        remark: "",
      };
      makeupPolicyData.push(obj);
      this.makeupPolicyData = makeupPolicyData;
    },
    delMakeupPolicy(obj) {
      // 删除正常政策信息row
      let index = obj.$index;
      this.makeupPolicyData.splice(index, 1);
    },
    returnGeneralPolicyList() {
      this.$router.push("/generalPolicy");
    },
    inputUnitRatio(val, obj) {
      obj.row.unitRatio = val.replace(/[^\d]/g, "");
    },
    inputPersonalRatio(val, obj) {
      obj.row.personalRatio = val.replace(/[^\d]/g, "");
    },
    normalCategoryChange(val, row, index) {
      this.$set(this.normalPolicyData[index], "name", "");
    },
    makeupCategoryChange(val, row, index) {
      this.$set(this.makeupPolicyData[index], "name", "");
    },
    async downloadDemo(type) {
      let params = {
        type: type, // 0-正常，1-补缴
      };
      try {
        let res = await this.$api.policy.downloadDemo(params);
        if (!res) {
          return false;
        }
        const blob = new Blob([res]);
        const downloadElement = document.createElement("a");
        const href = window.URL.createObjectURL(blob);
        // let contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        // let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        // let result = patt.exec(contentDisposition);
        // let filename = decodeURI(result[1]);
        downloadElement.style.display = "none";
        downloadElement.href = href;
        downloadElement.download = "政策设置模板.xlsx"; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      } catch (e) {
        console.log(e);
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
    async savePolicy() {
      let params = {
        policy: {
          policyId: "",
          policyNumber: "",
          enterpriseId: "",
          enterpriseName: "",
          policyName: "",
          district: "",
          insuranceType: "",
          status: "",
          startMonth: "",
          updateTime: "",
          source: "",
          description: "",
          attachAddress: "",
        },
        policyNormalDetails: this.normalPolicyData,
        policyRepairDetails: this.makeupPolicyData,
      };
      try {
        await this.$api.policy.savePolicy(params);
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
