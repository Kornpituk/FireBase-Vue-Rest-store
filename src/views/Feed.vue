<template >
    <header class="header-search ">
        <div class="container mt-5 border">
            <form class="">
                <div class="row g-2 mt-5">
                    <div class="col-3">
                        <div class="input-group">
                            <span class="input-group-text">Bacode :</span>
                            <input type="password" class="form-control " id="inputPassword2" placeholder="Bacode">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="input-group">
                            <span class="input-group-text">Product ID :</span>
                            <input type="password" class="form-control " id="inputPassword2" placeholder="Product ID">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="input-group">
                            <span class="input-group-text">Description :</span>
                            <input type="password" class="form-control " id="inputPassword2" placeholder="Description">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="input-group mb-3">
                            <span class="input-group-text">UoM :</span>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>UoM</option>
                                <option value="1">UoM One</option>
                                <option value="2">UoM Two</option>
                                <option value="3">UoM Three</option>
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
                        <router-link to="/" class="btn btn-primary me-lg-2 mb-2" aria-current="page"
                            style="text-decoration: none; color: inherit; color: white;">Back Home</router-link>
                    </div>
                </div>
            </form>
        </div>
    </header>

    <body>
        <div class="container mt-2 border">
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.no">
                        <th scope="row">{{ item.no }}</th>
                        <td>{{ item.barcode }}</td>
                        <td>{{ item.productID }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.tagQty }}</td>
                        <td>{{ item.nonTagQty }}</td>
                        <td>{{ item.totalQty }}</td>
                        <td>{{ item.uoM }}</td>
                    </tr>
                </tbody>
            </table>






        </div>
    </body>
</template>

<script>
;


export default {
    data() {
        return {
            items: [],
            perPage: 10, // จำนวนรายการต่อหน้า
            currentPage: 1, // หน้าปัจจุบัน
        }
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },
    },
    created() {
        fetch("https://22f0be81-fab1-4dc9-96d5-525c5d3acca5.mock.pstmn.io/vprocuct?no=" + this.$route.params.id)
            .then((res) => res.json())
            .then((result) => {
                this.items = result;
            });
        console.log(this.items);
    },
}
</script>
<style scoped="">
.header-search {
    border-radius: 1px;
    border-color: black;
}

.container{
  background-color: white;
  border-radius: 10px;
}

.img-thumbnail {
    max-width: 100px;
    /* กำหนดความกว้างสูงสุดของรูปภาพ */
    height: auto;
    /* รักษาสัดส่วนของรูปภาพ */
}

.router-link {}
</style>