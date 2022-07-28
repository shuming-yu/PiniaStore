<template>
  <!-- 定位使用 -->
  <div
    class="toast-container position-absolute pe-4 pt-5 top-0 end-0"
    style="z-index: 1050" 
  >
    <!-- 列表呈現 -->
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from "@/components/Toast.vue";
import statusStore from "@/stores/statusStore";
import { storeToRefs } from 'pinia';

export default {
  // data() {
  //   return {
  //     messages: [],
  //   };
  // },

  // CompositionAPI 寫法
  setup(){
    const status = statusStore();

    // 解構形式取出
    const { messages } = storeToRefs(status); // 載入定義的 store
    // messages 內層對應訊息名稱需一致 (第8行程式碼)

    return {
      messages,
    }
  },

  components: {
    Toast,
  },

  // inject: ["emitter"],

  // mounted() {
  //   // 接受部分建議放入 created & mounted 內
  //   // on 方式監聽
  //   // push-message 事件加入至 emitter 上
  //   // push-message 觸發後會觸發後面 message (參數)事件
  //   // (message) -> 外層傳來資訊
  //   this.emitter.on("push-message", (message) => {
  //     const { style = "success", title, content } = message;
  //     this.messages.push({ style, title, content });
  //   });
  // },
};
</script>
