import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api/install'
import { Button, Input, InputNumber, Row, Col, Table, TableColumn, Switch, Message, MessageBox, Loading, Pagination, Form, FormItem, Radio, RadioGroup, Select, Option, Cascader, Tabs, TabPane, Dialog, Collapse, CollapseItem, DatePicker } from 'element-ui';

Vue.config.productionTip = false;

Vue.use(api)

Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(DatePicker)

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
