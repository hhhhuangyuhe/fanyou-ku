<template>
  <div id="AddNetwork">
    <div class="page-header">
      <p class="page-path">
        服务网点管理<span class="slashline">/</span>小库网点列表<span
          class="slashline"
          >/</span
        >新建网点
      </p>
      <p class="page-title">新建网点</p>
    </div>
    <div class="info-filling">
      <div class="info-basic">
        <p class="title">网点基本信息</p>
        <el-form
          ref="basicform"
          :model="basicform"
          label-width="140px"
          class="basicform"
          :rules="basicformRules"
        >
          <el-form-item label="网点地区：" prop="region">
            <el-cascader
              v-model="basicform.region"
              :options="regionOptions"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="网点名称：" prop="name">
            <el-input v-model="basicform.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="网点负责人：" prop="leader">
            <el-input
              v-model="basicform.leader"
              placeholder="请输入"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否需要在保人员：">
            <el-radio-group v-model="basicform.hasinsurer">
              <el-radio label="否"></el-radio>
              <el-radio label="是"></el-radio>
            </el-radio-group>
            <div class="form-inline-group">
              <el-form-item
                prop="socialsecurity"
                :rules="
                  basicform.hasinsurer == '是'
                    ? basicformRules.socialsecurity
                    : [{ required: false }]
                "
              >
                <span class="text">社保</span>
                <el-input
                  v-model="basicform.socialsecurity"
                  placeholder="请输入"
                  style="width: 70px"
                  :disabled="basicform.hasinsurer == '否'"
                ></el-input>
                <span class="text">人</span>
              </el-form-item>
              <el-form-item
                prop="providentfund"
                :rules="
                  basicform.hasinsurer == '是'
                    ? basicformRules.providentfund
                    : [{ required: false }]
                "
              >
                <span class="text">公积金</span>
                <el-input
                  v-model="basicform.providentfund"
                  placeholder="请输入"
                  style="width: 70px"
                  :disabled="basicform.hasinsurer == '否'"
                ></el-input>
                <span class="text">人</span>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="收件地址：" prop="address">
            <el-input
              type="textarea"
              v-model="basicform.address"
              placeholder="请输入收件人、电话号码和详细地址"
              maxlength="200"
            ></el-input>
          </el-form-item>
          <el-form-item label="公积金比例设置：">
            <div
              class="form-inline-group"
              style="margin-left: 0; margin-bottom: 14px"
              v-for="(item, index) in basicform.providentfundRatio"
              :key="index"
            >
              <el-form-item
                :prop="'providentfundRatio.' + index + '.personnel'"
                :rules="{
                  required: true,
                  message: '请输入个人缴纳比例',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="item.personnel"
                  placeholder="个人缴纳比例（%）"
                ></el-input>
              </el-form-item>
              <el-form-item
                style="margin-left: 10px"
                :prop="'providentfundRatio.' + index + '.enterprice'"
                :rules="{
                  required: true,
                  message: '请输入单位缴纳比例',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="item.enterprice"
                  placeholder="单位缴纳比例（%）"
                ></el-input>
              </el-form-item>
              <el-button
                type="default"
                icon="el-icon-delete"
                @click.prevent="removeProvidentfundRatio(item)"
                style="margin-left: 6px"
              ></el-button>
            </div>
            <div>
              <el-button
                icon="el-icon-plus"
                class="addButton"
                type="primary"
                @click="addprovidentfundRatio"
              ></el-button>
            </div>
          </el-form-item>
          <el-form-item label="特殊情况说明：" prop="remark">
            <el-input
              type="textarea"
              v-model="basicform.remark"
              placeholder="请输入"
              maxlength="200"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-filling">
        <p class="title">开户所需资料</p>
        <div class="filling-btn-group">
          <el-button type="primary" @click="addCreateRow">新增</el-button
          ><el-button @click="delCreateRow">删除</el-button>
        </div>
        <el-table
          ref="createTable"
          max-height="500"
          :data="createTableData"
          border
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="资料名称">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.dataname"
                placeholder="请输入"
                maxlength="10"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="资料类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.datatype" placeholder="请选择">
                <el-option label="原件类" value="0"></el-option>
                <el-option label="图像类" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资料要求">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.datarequest"
                placeholder="请输入"
                maxlength="50"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="资料份数">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.datanum"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="适用场景">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.applicablescene"
                placeholder="请选择"
              >
                <el-option label="场景1" value="0"></el-option>
                <el-option label="场景2" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资料样本">
            <template slot-scope="scope">
              <div v-if="scope.row.datatype === '1'">
                {{ scope.row.datasample
                }}<el-button type="text">删除</el-button>
              </div>
              <el-button v-if="scope.row.datatype === '1'">上传文件</el-button>
              <div v-if="scope.row.datatype === '0'">*</div>
            </template>
          </el-table-column>
          <el-table-column label="空表上传">
            <template slot-scope="scope">
              <div v-if="scope.row.datatype === '1'">
                {{ scope.row.emptyform }}<el-button type="text">删除</el-button>
              </div>
              <el-button v-if="scope.row.datatype === '1'">上传文件</el-button>
              <div v-if="scope.row.datatype === '0'">*</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="hosting-filling">
        <p class="title">托管所需资料</p>
        <div class="filling-btn-group">
          <el-button type="primary" @click="addHostingRow">新增</el-button
          ><el-button @click="delHostingRow">删除</el-button>
        </div>
        <el-table
          ref="hostingTable"
          max-height="500"
          :data="hostingTableData"
          border
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="资料名称">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.dataname"
                placeholder="请输入"
                maxlength="10"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="资料类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.datatype" placeholder="请选择">
                <el-option label="原件类" value="0"></el-option>
                <el-option label="图像类" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资料要求">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.datarequest"
                placeholder="请输入"
                maxlength="50"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="资料份数">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.datanum"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="适用场景">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.applicablescene"
                placeholder="请选择"
              >
                <el-option label="场景1" value="0"></el-option>
                <el-option label="场景2" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资料样本">
            <template slot-scope="scope">
              <div v-if="scope.row.datatype === '1'">
                {{ scope.row.datasample
                }}<el-button type="text">删除</el-button>
              </div>
              <el-button v-if="scope.row.datatype === '1'">上传文件</el-button>
              <div v-if="scope.row.datatype === '0'">*</div>
            </template>
          </el-table-column>
          <el-table-column label="空表上传">
            <template slot-scope="scope">
              <div v-if="scope.row.datatype === '1'">
                {{ scope.row.emptyform }}<el-button type="text">删除</el-button>
              </div>
              <el-button v-if="scope.row.datatype === '1'">上传文件</el-button>
              <div v-if="scope.row.datatype === '0'">*</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-btn-group">
      <el-button @click="returnServiceNetwork">返回</el-button>
      <el-button type="primary" @click="submitSource">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNetwork",
  components: {},
  data: function () {
    return {
      basicform: {
        // 网点基本信息
        region: "",
        name: "",
        leader: "",
        hasinsurer: "是",
        address: "",
        socialsecurity: "",
        providentfund: "",
        remark: "",
        providentfundRatio: [
          {
            personnel: "",
            enterprice: "",
          },
        ],
      },
      basicformRules: {
        region: [
          { required: true, message: "请选择网点地区", trigger: "change" },
        ],
        name: [
          { required: true, message: "网点名称不能为空", trigger: "change" },
        ],
        leader: [
          { required: true, message: "请输入网点负责人", trigger: "blur" },
          { min: 1, max: 20, message: "长度在1到20个字符", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入网点负责人", trigger: "blur" },
          { min: 1, max: 200, message: "长度在1到200个字符", trigger: "blur" },
        ],
        socialsecurity: [
          { required: true, message: "请输入社保人数", trigger: "blur" },
        ],
        providentfund: [
          { required: true, message: "请输入公积金人数", trigger: "blur" },
        ],
      },
      regionOptions: [
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
      createTableData: [
        // 开户所需资料--表数据
        {
          rowindex: 0,
          dataname: "",
          datatype: "",
          datarequest: "",
          datanum: "",
          applicablescene: "",
          datasample: "",
          emptyform: "",
        },
      ],
      hostingTableData: [
        // 托管所需资料--表数据
        {
          rowindex: 0,
          dataname: "",
          datatype: "",
          datarequest: "",
          datanum: "",
          applicablescene: "",
          datasample: "",
          emptyform: "",
        },
      ],
    };
  },
  methods: {
    addCreateRow() {
      // 新增一行开户所需资料
      if (this.createTableData == undefined) {
        this.createTableData = [];
      }
      let obj = {
        rowindex:
          this.createTableData == [] || this.createTableData.length == 0
            ? 0
            : this.createTableData[this.createTableData.length - 1].rowindex +
              1,
        dataname: "",
        datatype: "",
        datarequest: "",
        datanum: "",
        applicablescene: "",
        datasample: "",
        emptyform: "",
      };
      this.createTableData.push(obj);
    },
    delCreateRow() {
      for (let i = this.createTableData.length; i > 0; i--) {
        for (let j = 0; j < this.$refs.createTable.selection.length; j++) {
          if (
            this.createTableData[i - 1].rowindex ==
            this.$refs.createTable.selection[j].rowindex
          ) {
            this.createTableData.splice(i - 1, 1);
            break;
          }
        }
      }
    },
    addHostingRow() {
      // 新增一行托管所需资料
      if (this.hostingTableData == undefined) {
        this.hostingTableData = [];
      }
      let obj = {
        rowindex:
          this.hostingTableData == [] || this.hostingTableData.length == 0
            ? 0
            : this.hostingTableData[this.hostingTableData.length - 1].rowindex +
              1,
        dataname: "",
        datatype: "",
        datarequest: "",
        datanum: "",
        applicablescene: "",
        datasample: "",
        emptyform: "",
      };
      this.hostingTableData.push(obj);
    },
    delHostingRow() {
      for (let i = this.hostingTableData.length; i > 0; i--) {
        for (let j = 0; j < this.$refs.hostingTable.selection.length; j++) {
          if (
            this.hostingTableData[i - 1].rowindex ==
            this.$refs.hostingTable.selection[j].rowindex
          ) {
            this.hostingTableData.splice(i - 1, 1);
            break;
          }
        }
      }
    },
    returnServiceNetwork() {
      this.$router.push("/");
    },
    submitSource() {
      // 提交
      this.$refs.basicform.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addprovidentfundRatio() {
      this.basicform.providentfundRatio.push({
        personnel: "",
        enterprice: "",
      });
    },
    removeProvidentfundRatio(item) {
      var index = this.basicform.providentfundRatio.indexOf(item);
      if (index !== -1) {
        this.basicform.providentfundRatio.splice(index, 1);
      }
    },
  },
};
</script>


<style src="@/assets/public.css"></style>
<style scoped>
#AddNetwork {
  padding: 20px;
}
.info-filling {
  background: #fff;
  padding: 20px 20px;
}
.info-filling .title {
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  font-family: 微软雅黑;
  display: inline-block;
  margin-right: 16px;
}
.basicform {
  width: 600px;
  padding: 20px 16px;
}
.form-inline-group {
  display: inline-block;
  margin-left: 30px;
  color: #606266;
}
.form-inline-group .el-form-item {
  display: inline-block;
  margin-bottom: 0;
}
.form-inline-group .text {
  margin: 0 10px;
}
.filling-btn-group {
  display: inline-block;
}
#AddNetwork .el-table {
  margin: 20px 0;
}
.bottom-btn-group {
  display: block;
  margin: 0 auto;
  text-align: center;
}
.addButton {
  width: 100%;
}
</style>
