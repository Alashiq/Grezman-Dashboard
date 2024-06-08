import Swal from "sweetalert2";
import { mapGetters, mapActions,mapMutations } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';
import BtnSubmitNewItem from "@/components/BtnSubmitNewItem/BtnSubmitNewItem.vue";
export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Pagination-Bar': PaginationBar,
        'Single-Page-Header': SinglePageHeader,
        'Btn-Submit-New-Item': BtnSubmitNewItem,
      },
    data() {
        return {
            roleList: [],
            formData: {
                title: '',
                message: '',
                type: 1, // 1 public - 2
                user_id: null,
                send_time: '',
            },
            formValidate: {
                title: '',
                message: '',
                type: '',
                user_id: '',
                send_time: '',
            },
            loaded: 0,
            // Side Menu
            sideMenuPage: {
                main: 12,
                sub: 2,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload:function(){
            this.loadData();
        },
        loadData:function(){

            if(this.$route.params.id){
                this.formData.user_id=this.$route.params.id;
                this.formData.type=2;
            }


        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
        this.$http
            .GetNewUserNotification()
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.loaded = 200;
                    this.roleList = response.data.roles;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.loaded = 204;
                    this.$alert.Empty("تنبيه لا يوجد اي بيانات");
                } else {
                    this.loaded = 400;
                }
            })
            .catch(error => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                this.loaded = 404;
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
                    this.$router.push("/login");
                } else {
                    this.errorMessage="حدث خطأ ما";
                    this.loaded = 404;
                    this.$alert.BadRequest("حدث خطأ ما, الرجاء إعادة المحاولة");
                }
            });
        },
        addNewItem: function () {
            this.validateTitle();
            if (this.formValidate.title != '') return 0;
            this.validateMessage();
            if (this.formValidate.message != '') return 0;
            this.validateType();
            if (this.formValidate.type != '') return 0;
            this.validateUser();
            if (this.formValidate.user_id != '') return 0;

            this.validateSend_time();
            if (this.formValidate.send_time != '') return 0;

            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .PostNewUserNotification(this.formData)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.formData.title = "";
                    this.formData.message = "";
                    this.formData.type = 1;
                    this.formData.user_id = null;
                    this.formData.send_time = "";
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },

        validateTitle: function () {
            this.formValidate.title = ''
            if (this.formData.title.trim() == '') {
                this.formValidate.title = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateMessage: function () {
            this.formValidate.message = ''
            if (this.formData.message.trim() == '') {
                this.formValidate.message = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateType: function () {
            this.formValidate.type = ''
            if (this.formData.type == null) {
                this.formValidate.type = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateUser: function () {
            this.formValidate.user_id = ''
            if (this.formData.user_id == null && this.formData.type == 2) {
                this.formValidate.user_id = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
     
        validateSend_time: function () {
            this.formValidate.send_time = ''
            if (this.formData.send_time == null) {
                this.formValidate.send_time = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};
