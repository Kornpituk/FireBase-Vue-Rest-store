<template >
  <header class="header-search ">
    <div class="container mt-2 border">
      <form class="" @submit="searchItems">
        <div class="row g-2 mt-2">
          <div class="col-3">
            <div class="input-group">
              <span class="input-group-text">Bacode :</span>
              <input type="text" class="form-control " v-model="searchQueryBarcode" id="inputtext2" placeholder="Bacode">
            </div>
          </div>
          <div class="col-3">
            <div class="input-group">
              <span class="input-group-text">Product ID :</span>
              <input type="text" class="form-control " v-model="searchQueryProductID" id="inputtext2"
                placeholder="Product ID">
            </div>
          </div>
          <div class="col-3">
            <div class="input-group">
              <span class="input-group-text">Description :</span>
              <input type="text" class="form-control " v-model="searchQueryDescript" id="inputtext2"
                placeholder="Description">
            </div>
          </div>
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text">UoM :</span>
              <select class="form-select" aria-label="Default select example" v-model="searchQueryUoM">
                <option selected>UoM</option>
                <option value="PCS">PCS</option>
                <option value="Gross">Gross</option>
                <option value="YARD">YARD</option>
              </select>
            </div>
          </div>

        </div>
        <div class="row g-2 mt-3">
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Warehouse :</span>
              <select class="form-select" aria-label="Default select example">
                <option selected>Warehouse</option>
                <option value="1">Bkk(กรุ่งเทพ)</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Zone :</span>
              <select class="form-select" aria-label="Default select example">
                <option selected>Zone</option>
                <option value="1">Zone One</option>
                <option value="2">Zone Two</option>
                <option value="3">Zone Three</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Area :</span>
              <select class="form-select" aria-label="Default select example">
                <option selected>Area</option>
                <option value="1">Area One</option>
                <option value="2">Area Two</option>
                <option value="3">Area Three</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Sub-Area :</span>
              <select class="form-select" aria-label="Default select example">
                <option selected>Sub-Area</option>
                <option value="1">Sub-Area One</option>
                <option value="2">Sub-Area Two</option>
                <option value="3">Sub-Area Three</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <router-link to="/" @click="searchItems" class="btn btn-primary me-lg-2 mb-2" aria-current="page"
              style="text-decoration: none; color: inherit; color: white;">Search</router-link>
            <router-link to="/" class="btn btn-primary me-lg-2 mb-2" aria-current="page"
              style="text-decoration: none; color: inherit; color: white;" @click="relocate">
              <font-awesome-icon :icon="['fas', 'sync']" />Home Refresh
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </header>

  <body>
    <div class="container mt-2 border">

      <!-- <div class="search-table mt-2 mb-2">
        <div class="row g-3 justify-content-start">
          <div class="col-auto">
            <label for="">Show</label>
          </div>
          <div class="col-auto">
            <select class="form-select" aria-label="Default select example" @click="showPerPgae()" v-model="totalPages">
              <option value="10" >10</option>
              <option value="20" >20</option>
              <option value="30" >30</option>
            </select>
          </div>
        </div>
      </div> -->

      <table class="table ">
        <thead class="table-light">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Barcode</th>
            <th scope="col">Product ID.</th>
            <th scope="col">Description</th>
            <th scope="col">Tag Qty.</th>
            <th scope="col">Non-Tag Qty.</th>
            <th scope="col">Total Qty.</th>
            <th scope="col">UoM</th>
            <th scope="col">See</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.no">
            <th scope="row">{{ item.no }}</th>
            <td>{{ item.barcode }}</td>
            <td>{{ item.productID }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.tagQty }}</td>
            <td>{{ item.nonTagQty }}</td>
            <td>{{ item.totalQty }}</td>
            <td>{{ item.uoM }}</td>
            <td><router-link :to="{ name: 'productDetails', params: { id: item.no } }"
                class="btn btn-primary"><font-awesome-icon :icon="['fas', 'bars-progress']" /></router-link></td>
          </tr>
        </tbody>
      </table>

      <!--------------------------------------------------- pagination  ------------------------------------>

      <div class="">
        <d class="gorup">
          <label for="">Number Product To End</label>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" @click="changePage(currentPage - 1)">Previous</a>
              </li>
              <li class="page-item" v-for="page in pageRange" :key="page" :class="{ active: currentPage === page }">
                <a class="page-link" @click="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" @click="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </d>
      </div>




    </div>
  </body>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ref, watch  } from 'vue';

library.add(fas);

const totalPages = 10

const valuePageSelect = ref(totalPages); // กำหนดค่าเริ่มต้นให้เป็น 10

export default {
  data() {
    return {
      items: [],
      originalItems: [], // เพิ่ม originalItems ในส่วนนี้
      // perPage: valuePageSelect, // จำนวนรายการต่อหน้า
      perPage: ref(valuePageSelect), // จำนวนรายการต่อหน้า
      currentPage: 1, // หน้าปัจจุบัน
      searchQuery: '',
    }
  },
  
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    fetchItems() {
      fetch("https://22f0be81-fab1-4dc9-96d5-525c5d3acca5.mock.pstmn.io/vprocuct")
        .then((res) => res.json())
        .then((result) => {
          this.items = result || [];
        });
      console.log(this.items);
    },
    goToFeed(id) {
      // นำคุณไปยังหน้า Details ที่มี id เป็นพารามิเตอร์
      this.$router.push(`/vproduct/${id}`);
    },
    searchItems() {
      // แปลงค่า searchQuery เป็น string หากมีความจำเป็น
      const queryBarcode = this.searchQueryBarcode;
      const queryProductID = this.searchQueryProductID;
      const queryDescript = this.searchQueryDescript;
      const queryUoM = this.searchQueryUoM;

      // ดึงข้อมูลสินค้าที่ตรงกับคำค้นที่ผู้ใช้ป้อนใน searchQuery
      const filteredItems = this.items.filter((item) => {
        // แปลง barcode และ productID เป็น string แล้วใช้ includes
        if (item.barcode.toString().includes(queryBarcode) ||
          item.productID.toString().includes(queryProductID) ||
          item.description.includes(queryDescript) ||
          item.uoM === queryUoM // เปรียบเทียบกับ UoM
        ) {
          return true;
        }
        // ในกรณีอื่น ๆ คืนค่า false
        return false;
      });

      // อัปเดตรายการสินค้าที่ถูกค้นพบใน pagination
      this.items = filteredItems;

      // รีเซ็ตค่า searchQuery ให้เป็นค่าว่าง
      this.searchQueryBarcode = ''; // รีเซ็ตค่าค้นหาเป็นค่าว่าง
      this.searchQueryProductID = ''; // รีเซ็ตค่าค้นหาเป็นค่าว่าง
      this.searchQueryDescript = ''; // รีเซ็ตค่าค้นหาเป็นค่าว่าง
      this.searchQueryUoM = ''; // รีเซ็ตค่าค้นหาเป็นค่าว่าง

      ;
    },
    relocate() {
      // รีเฟรชหน้าเว็บ
      window.location.reload()
    },
    showPerPgae(){
      console.log("valuePageSelect"+valuePageSelect);
    }
  },

  computed: {
    // คำนวณหน้าที่ควรแสดงข้อมูล
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      return this.items.slice(startIndex, startIndex + this.perPage);
      // const startIndex = (this.currentPage - 1) * this.perPage;
      // const endIndex = startIndex + this.perPage;
      // const itemsToDisplay = this.items.slice(startIndex, endIndex);
      // return itemsToDisplay;
    },
    totalPages() {
      return Math.ceil(this.items.length / this.perPage);
    },
    pageRange() {
      const totalPages = this.totalPages;
      const maxPagesToShow = 5;
      const currentPage = this.currentPage;

      if (totalPages <= maxPagesToShow) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const halfMax = Math.floor(maxPagesToShow / 2);
      let startPage = currentPage - halfMax;
      let endPage = currentPage + halfMax;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxPagesToShow + 1;
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },

  created() {
    this.fetchItems();
  },

  // setup() {
  //   const valuePageSelect = ref("10"); // Set the default value to "10"

  //   // Watch for changes in valuePageSelect and update perPage
  //   const perPage = ref(valuePageSelect.value);
  //   // valuePageSelect.value = perPage.value;

  //   // Watch for changes in valuePageSelect and update perPage
  //   watch(valuePageSelect, (newVal) => {
  //     perPage.value = newVal; // Update perPage when valuePageSelect changes
  //   });

  //   return {
  //     valuePageSelect,
  //     perPage,
  //     // ... rest of your code ...
  //   };
  // },
  // watch: {
  //   valuePageSelect(newVal) {
  //     this.perPage = newVal; // Update perPage when valuePageSelect changes
  //   }
  // },


  setup() {
    // const perPage = ref(10); // กำหนดค่าเริ่มต้นให้เป็น 10

    // // ส่วนอื่น ๆ ของคอมโพเนนต์
    // // ...

    // return {
    //   perPage,
    //   // คืนค่าตัวแปร perPage ใน setup
    // };

  }
}
</script>
<style scoped="">
.header-search {
  border-radius: 1px;
  border-color: black;
}

.container {
  background-color: white;
  border-radius: 10px;
}

.img-thumbnail {
  max-width: 100px;
  /* กำหนดความกว้างสูงสุดของรูปภาพ */
  height: auto;
  /* รักษาสัดส่วนของรูปภาพ */
}
</style>