import Swal from "sweetalert2";
import { mapGetters, mapActions,mapMutations } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';
export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Pagination-Bar': PaginationBar,
        'Single-Page-Header': SinglePageHeader,
      },
    data() {
        return {
            mainList: [],
            loaded: 0, // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            pageId:1,
            countPerPage:5, 
            lastPage:0,
            totalRows:0,
            itemFrom:0,
            itemTo:0,
            // Search 
            title:"",
            type:"",
            is_sent:"",
            user_id:null,
            // UI
            optionId:0,
            // Side Menu
            sideMenuPage:{
                main:12,
                sub:1,
            },
            errorMessage: "حدث خطأ ما"
        };
    },
    methods: {
        reload:function(){
            this.loadData(1)
        },
        loadData: function(page) {
            this.pageId=page;
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetAllUserNotifications(this.pageId,this.countPerPage,this.title,this.type,this.is_sent,this.user_id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainList = response.data.data.data;
                        this.lastPage = response.data.data.last_page;
                        this.totalRows = response.data.data.total;
                        this.itemFrom = response.data.data.from;
                        this.itemTo = response.data.data.to;
                        this.$alert.Success(response.data.message);
                        this.loaded=200;
                    } else if (response.status == 204) {
                        this.loaded=204;
                        this.$alert.Empty("تنبيه لا يوجد اي مشرفين");
                    }else{
                    this.loaded=400;
                    }
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (error.response.status == 400) {
                        this.errorMessage=error.response.data.message;
                        this.loaded = 400;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 403) {
                        this.errorMessage=error.response.data.message;
                        this.loaded = 403;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                    } else {
                        this.errorMessage="حدث خطأ ما";
                        this.loaded = 404;
                        this.$alert.BadRequest("حدث خطأ ما, الرجاء إعادة المحاولة");
                    }
                });
        },
        changePerPage: function(event){
            this.countPerPage=event.target.value;
            this.pageId=1;
            this.loadData(this.pageId);
        },
        clearSearch:function(){
            this.type="";
            this.is_sent="";
            this.title="";
            this.user_id="";
            this.loadData(this.pageId);
        },
        moveToNext: function(){
            this.pageId++;
            this.loadData(this.pageId);
        },
        moveToPrevius: function(){
            this.pageId--
            this.loadData(this.pageId);
        },
        openOptions: function(event){
            if(event.target.id==0){
                this.optionId=0;
            console.log(event.target.id);
            }else{
                this.optionId=event.target.id;
            console.log(event.target.id);
            }

        },

        deleteUserNotification: function(id) {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذا الإشعار !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                                /*this.$loading.Start();*/ this.$store.commit("loadingStart");

                    this.$http
                        .DeleteUserNotification(id)
                        .then(response => {
                            /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                                this.$alert.Empty(
                                    "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                        })
                        .catch(error => {
                            /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },


    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
                    /*this.$loading.Start();*/ this.$store.commit("loadingStart");

        this.loadData(this.pageId);
    },
    computed: {
        ...mapGetters(["language"]),
        t() {
            return this.$lang.Profile[this.language];
        }
    },
    created() {}
};
