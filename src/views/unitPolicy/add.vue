<template>
  <div id="addUnitPolicy">
    <div class="page-header">
      <p class="page-path">
        政策设置<span class="slashline">/</span>单位政策设置<span
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
                <el-form-item label="所属单位">
                  <el-select v-model="basicInfoForm.unit" placeholder="请选择">
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in unitList"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="政策名称">
                  <el-input
                    v-model="basicInfoForm.policyName"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="参保类型">
                  <el-select v-model="basicInfoForm.type" placeholder="请选择">
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
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="basic-info modify-info">变更信息</div>
          </template>
          <el-form
            :model="modifyInfoForm"
            label-position="top"
            ref="modifyInfoForm"
            class="modify-info-form"
          >
            <el-row :gutter="0">
              <el-col :span="24">
                <el-form-item label="变更说明">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入"
                    v-model="modifyInfoForm.describe"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="24">
                <el-form-item label="协议附件">
                  <el-button type="default" icon="el-icon-upload2"
                    >上传文件</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div class="policy-info">
        <el-tabs v-model="activeCard" type="card" @tab-click="cardChange">
          <el-tab-pane label="正常" name="正常">
            <div class="control-panel">
              <div>
                政策信息<el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="addNormalPolicyRow"
                  >新增</el-button
                ><el-button type="primary" plain>模板下载</el-button
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
              <el-table-column label="险种类别">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.category" placeholder="请选择">
                    <el-option label="社保" value="社保"></el-option>
                    <el-option label="公积金" value="公积金"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="险种">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.insurance"
                    placeholder="请选择"
                    v-if="scope.row.category == '社保'"
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
                    v-model="scope.row.insurance"
                    placeholder="请选择"
                    v-if="scope.row.category == '公积金'"
                  >
                    <el-option label="公积金" value="公积金"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="单位比例%">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.unitRatio"
                    @input="(val) => inputUnitRatio(val, scope)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="个人比例%">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.personalRatio"
                    @input="(val) => inputPersonalRatio(val, scope)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="启用月份">
                <template slot-scope="scope">
                  <el-date-picker
                    :editable="false"
                    v-model="scope.row.effectiveTime"
                    type="month"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.mark"></el-input>
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
                ><el-button type="primary" plain>模板下载</el-button
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
              <el-table-column label="险种类别">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.category" placeholder="请选择">
                    <el-option label="社保" value="社保"></el-option>
                    <el-option label="公积金" value="公积金"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="险种">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.insurance"
                    placeholder="请选择"
                    v-if="scope.row.category == '社保'"
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
                    v-model="scope.row.insurance"
                    placeholder="请选择"
                    v-if="scope.row.category == '公积金'"
                  >
                    <el-option label="公积金" value="公积金"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="跨周期补缴">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.interCycle"
                    placeholder="请选择"
                  >
                    <el-option label="允许" value="允许"></el-option>
                    <el-option label="不允许" value="不允许"></el-option>
                    <el-option label="残保金" value="残保金"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="周期起始时间" width="180">
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
                    style="width: 50px"
                    :controls="false"
                  ></el-input-number>
                  月
                </template>
              </el-table-column>
              <el-table-column label="周期截止时间" width="180">
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
                    style="width: 50px"
                    :controls="false"
                  ></el-input-number>
                  月
                </template>
              </el-table-column>
              <el-table-column label="单位比例%">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.unitRatio"
                    @input="(val) => inputUnitRatio(val, scope)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="个人比例%">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.personalRatio"
                    @input="(val) => inputPersonalRatio(val, scope)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="启用月份">
                <template slot-scope="scope">
                  <el-date-picker
                    :editable="false"
                    v-model="scope.row.effectiveTime"
                    type="month"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.mark"></el-input>
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
        <el-button @click="returnUnitPolicyList">取消</el-button>
        <el-button type="primary">保存</el-button>
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
      activeNames: ["1", "2"],
      basicInfoForm: {
        unit: "",
        policyName: "",
        type: "",
        effectiveTime: "",
      },
      participateTypeList: [
        // 根据城市维护的参保类型list
        {
          name: "深户一档",
          value: 0,
        },
        {
          name: "深户二档",
          value: 1,
        },
      ],
      unitList: [
        // 所属单位list
        {
          name: "unit1",
          value: 0,
        },
        {
          name: "unit2",
          value: 1,
        },
      ],
      modifyInfoForm: {
        describe: "",
        file: "",
      },
      activeCard: "正常",
      normalPolicyData: [
        // 正常--政策信息表
        {
          category: "社保",
          insurance: "",
          unitRatio: "",
          peronalRatio: "",
          effectiveTime: "",
          mark: "",
        },
      ],
      makeupPolicyData: [
        // 补缴--政策信息表
        {
          category: "社保",
          insurance: "",
          interCycle: "不允许",
          cycleStartYear: "",
          cycleStartMonth: "",
          cycleEndYear: "",
          cycleEndMonth: "",
          unitRatio: "",
          peronalRatio: "",
          effectiveTime: "",
          mark: "",
        },
      ],
    };
  },
  methods: {
    cardChange(tab, event) {
      console.log(tab, event);
    },
    addNormalPolicyRow() {
      let normalPolicyData = this.normalPolicyData;
      if (normalPolicyData == undefined) {
        normalPolicyData = new Array();
      }
      let obj = new Object();
      obj = {
        category: "社保",
        insurance: "",
        unitRatio: "",
        peronalRatio: "",
        effectiveTime: "",
        mark: "",
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
        category: "社保",
        insurance: "",
        interCycle: "不允许",
        cycleStartYear: "",
        cycleStartMonth: "",
        cycleEndYear: "",
        cycleEndMonth: "",
        unitRatio: "",
        peronalRatio: "",
        effectiveTime: "",
        mark: "",
      };
      makeupPolicyData.push(obj);
      this.makeupPolicyData = makeupPolicyData;
    },
    delMakeupPolicy(obj) {
      // 删除正常政策信息row
      let index = obj.$index;
      this.makeupPolicyData.splice(index, 1);
    },
    returnUnitPolicyList() {
      this.$router.push("/unitPolicy");
    },
    inputUnitRatio(val, obj) {
      obj.row.unitRatio = val.replace(/[^\d]/g, "");
    },
    inputPersonalRatio(val, obj) {
      obj.row.personalRatio = val.replace(/[^\d]/g, "");
    },
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#addUnitPolicy {
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
.basic-info-form,
.modify-info-form {
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
