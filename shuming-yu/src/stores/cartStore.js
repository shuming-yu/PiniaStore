import axios from "axios";
import { defineStore } from "pinia";
import statusStore from "./statusStore";

const status = statusStore();

export default defineStore("cartStore", {

  state: () => {
    return {
      cart: {}, // 購物車列表資訊
    };
  },

  actions: {
    // 可以使用 this
    addToCart(id) {
      status.isLoading = true;
      //console.log(id);
      // 加入購物車api = https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%8A%A0%E5%85%A5%E8%B3%BC%E7%89%A9%E8%BB%8A
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      status.cartLoadingItem = id; // 將取得 id 放入, 後續比對用
      const cart = {
        product_id: id, // 將取得 id 放入 product_id
        qty: 1, // 預設數量為 1
      };
      axios.post(api, { data: cart }).then((res) => {
        status.isLoading = false;
        status.cartLoadingItem = ""; // 成功後清空
        console.log(res); // 確認送出是否成功
        if(res.data.success){
          // this.emitter.emit('push-message', {
          //   style: 'success',
          //   title: '新增商品成功',
          // })
          // 對應 statusStore 事件參數
          status.pushManager({
            style: 'success',
            title: '加入購物車成功',
          })
        }else{
          // this.emitter.emit('push-message', {
          //   style: 'danger',
          //   title: '新增商品失敗',
          //   content: res.data.message.join('、'),
          // })
          status.pushManager({
            style: 'danger',
            title: '加入購物車失敗',
            content: res.data.message.join('、'),
          })
        }
        this.getCart(); // 重整購物車列表
      });
    },

    getCart() {
      status.isLoading = true;
      // 取得購物車列表api = https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%8F%96%E5%BE%97%E8%B3%BC%E7%89%A9%E8%BB%8A%E5%88%97%E8%A1%A8
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      axios.get(api).then((res) => {
        status.isLoading = false;
        console.log(res.data.data.carts);
        this.cart = res.data.data;
      });
    },

    updateCart(item) {
      status.cartLoadingItem = item.id;
      // 更新購物車api = https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E6%9B%B4%E6%96%B0%E8%B3%BC%E7%89%A9%E8%BB%8A
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        // id - 單一品項 id
        product_id: item.product_id, // product_id - 產品 id
        qty: item.qty, // 更新後數量
      };
      axios.put(api, { data: cart }).then((res) => {
        // console.log(res);
        status.cartLoadingItem = ""; // 觸發 disable 動作(使用者無法狂點)
        this.getCart(); // 重整購物車列表
      });
    },

    removeCartItem(id) {
      status.cartLoadingItem = id;
      // 刪除某一筆購物車資料 api = https://github.com/hexschool/vue3-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D#%E5%88%AA%E9%99%A4%E6%9F%90%E4%B8%80%E7%AD%86%E8%B3%BC%E7%89%A9%E8%BB%8A%E8%B3%87%E6%96%99
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      axios.delete(api).then((res) => {
        //console.log(res);
        status.cartLoadingItem = "";
        this.getCart(); // 重整購物車列表
      });
    },
  }

});
