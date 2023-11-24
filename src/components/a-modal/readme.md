# 模态框

### 全局引入
```json
 "easycom": {
    "^a-(.*)": "@/components/a-$1/a-$1.vue"
  },
```
### 使用方法
```html
<template>
  <!-- 如需防止模态框点击穿透可加以下代码 -->
  <page-meta :page-style="'overflow:' + (show ? 'hidden' : 'visible')"></page-meta>
  <!-- 绑定点击事件 -->
  <button @click='open'>打开模态框</button>
  <!-- 组件已全局注册无需引入 -->
  <a-modal ref="modal" :show.sync="show" />
</template>

<script>
export default {
    data(){
        return{
            show:false, //控制禁止穿透
        }
    },
    
    methods:{
        open(){
            // API调用范式显示模态框
            this.$refs.modal.open({
                title: "隐私声明",
                content: "XXXX有限公司（以下称“XXXX”或“我们”）...",
                cancelText: "拒绝",
                confirmText: "同意",
                confirm: () => {},
                cancel: () => {},
            });
        }
    }
}
</script>
```
### 参数说明

| 参数        | 说明                                     | 类型     | 默认值 |
| ----------- | ---------------------------------------- | -------- | ------ |
| title       | 标题内容                                 | String   | -      |
| content     | 模态框内容，如传入slot内容，则此参数无效 | String   | -      |
| confirmText | 确认按钮的文字                           | String   | -      |
| cancelText  | 取消按钮的文字                           | String   | -      |
| confirm     | 点击确认按钮时触发                       | Function | -      |
| cancel      | 点击取消按钮时触发                       | Function | -      |
| close       | 点击遮罩或关闭按钮时触发                 | Function | -      |
