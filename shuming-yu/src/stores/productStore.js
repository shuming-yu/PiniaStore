import axios from "axios";
import { defineStore } from "pinia";
import statusStore from "./statusStore";

const status = statusStore();

export default defineStore("productStore", {

  state: () => {
    return {
      products: [],
    };
  },

  getters: {
    // sort 升冪排序
    sortProducts: (state) => state.products.sort((a, b) => a.price - b.price),
  },

  actions: {
    // 可以使用 this
    getProducts() {
      // 顯示後台產品
      // 取的商品列表api = https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%8F%96%E5%BE%97%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      status.isLoading = true;
      // this.$http 更換為 axios
      axios.get(api).then((res) => {
        console.log(res.data);
        this.products = res.data.products; // 取得資訊丟到 products 陣列內
        status.isLoading = false;
      });
    },
  }

});
