<template>
  <div class="ku-tabs-component">
    <div class="ku-tabs-container">
      <div
        class="ku-tab"
        :class="{ 'ku-active-tab': activeTab === index }"
        v-for="(item, index) in tabs"
        :key="index"
        @click="changeTab(item, index)"
      >
        {{ item.name
        }}<span
          class="ku-tab-num"
          v-if="item.num != undefined && typeof item.num === 'number'"
          >（{{ item.num }}）</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "kutabs",
  props: {
    tabs: Array,
  },
  data: function () {
    return {
      activeTab: 0,
    };
  },
  methods: {
    changeTab(tab, tabIndex) {
      this.activeTab = tabIndex;
      this.$emit("tabChanged", tab);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ku-tabs-container {
  background: #fff;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
}
.ku-tabs-container .ku-tab {
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  margin-right: 35px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 14px;
}
.ku-tabs-container .ku-tab:hover {
  color: #1890ff;
}
.ku-tabs-container .ku-tab:last-child {
  margin-right: 0;
}
.ku-tabs-container .ku-tab.ku-active-tab {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}
.ku-tabs-container .ku-tab .ku-tab-num {
  margin-left: 0px;
}
</style>
