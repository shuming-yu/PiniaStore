import { defineStore } from "pinia";

export default defineStore("statusStore", {

  state: () => {
    return {
      // 對應 UserCart data 資料結構
      isLoading: false,
      cartLoadingItem: '',
      // 對應 ToastMessages 資料結構
      messages: [],
    };
  },

  actions: {
    pushManager(data) {
      const { style = 'success', title, content } = data;
      this.messages.push({ style, title, content });
    }
  }

});
