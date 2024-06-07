<template dir="rtl" style="margin: 0 auto;">
    <div>
        <div style="padding:0px; margin:0px;"  v-for=" (paginate, paginateIndex)  in pagesCount" :key="paginate.id" >
            <!-- Header -->
           
            <div class="">
                Header {{ parseInt(list.length / paginateCountElemint) }} 
            </div>
            <!-- End Header -->

            <!-- Content -->
            <div id="customers">

                <table style="width: 90%;border: 1px; margin: 0 auto;">
                    <thead>
                        <th>الرقم</th>
                        <th>الاسم</th>
                        <th >رقم الهاتف</th>
                    </thead>
                    <tbody>
                        <tr class="table-row" v-for="(item, index) in list" v-show="index >=paginateIndex && index< paginateIndex+ paginateCountElemint " :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.fullName }}</td>
                            <td >{{ item.mobileNo }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- End Content -->

            <!-- Footer -->
            <div>
                Footer
            </div>
            <!-- End Footer -->

            <div class="html2pdf__page-break"/>
        </div>
    </div>
</template>

<style scoped>

</style>


<script>
export default {
    name: 'listPDF',
    props: ['list',],
    data() {
        return {
            paginateCountElemint:5,
        }
    },
    created() {
    },
    methods: {
    },
    computed:{
        pagesCount:function(){
            
            var x= parseInt(this.employees.length / this.paginateCountElemint)
            console.log("kkkk"+parseInt(this.employees.length / this.paginateCountElemint))
             if(x!=this.employees.length / this.paginateCountElemint)
            return  parseInt(this.employees.length / this.paginateCountElemint)+1;
            return parseInt(this.employees.length / this.paginateCountElemint);
        }
    } ,
   
}
</script>  