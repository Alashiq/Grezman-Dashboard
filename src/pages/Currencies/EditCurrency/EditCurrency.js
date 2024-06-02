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
        'Btn-Submit-New-Item':BtnSubmitNewItem,
      },
    data() {
        return {
            mainItem: [],
            formData: {
                name: '',
abbreviation: '',

            },
            formValidate: {
                name: '',
abbreviation: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 10,
                sub: 1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload:function () {
            this.loadData();
        },
        loadData:function(){
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetCurrencyById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.name=response.data.data.name;
this.formData.abbreviation=response.data.data.abbreviation;

                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه العملة غير متوفر");
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
        editMainItem: function (id) {
            this.validateName();
 if (this.formValidate.name != '') return 0;
this.validateAbbreviation();
 if (this.formValidate.abbreviation != '') return 0;

            // this.validateName();
            // if (this.formValidate.name != "") return 0;

        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .EditCurrency(this.$route.params.id,this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا العملة متوفرة, قد يكون شخص أخر قام بحذفه"
                    );
                }
                else if (response.status == 400) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        response.data.messageresponse.data.message
                    );
                }
            })
            .catch(error => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                this.$alert.BadRequest(error.response.data.message);
            });

        },
        validateName: function() {
            this.formValidate.name = "";
            if (this.formData.name.trim() == "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.name.trim().length < 5) {
                this.formValidate.name = "يجب ان يكون الحقل 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الحقل أقل من 16 حرف";
                return 1;
            }
        },
        validateName: function() { 
this.formValidate.name = '' 
if (this.formData.name.trim() == '') { 
this.formValidate.name = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateAbbreviation: function() { 
this.formValidate.abbreviation = '' 
if (this.formData.abbreviation.trim() == '') { 
this.formValidate.abbreviation = 'لا يمكن ترك هذا الحقل فارغ'; 
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
