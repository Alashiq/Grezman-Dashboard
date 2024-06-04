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
                first_name: "",
                last_name: "",
                phone: "",
                password: "",
                role_id: null,
                confirmPassword: ""
            },
            formValidate: {
                firstName: "",
                lastName: "",
                phone: "",
                password: "",
                confirmPassword: ""
            },
            loaded: 0,
            // Side Menu
            sideMenuPage: {
                main: 5,
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
        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
        this.$http
            .GetNewAdmin()
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.loaded = 200;
                    this.roleList = response.data.roles;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.loaded = 204;
                    this.$alert.Empty("تنبيه لا يوجد اي أدوار");
                } else {
                    this.loaded = 400;
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
        addNewItem: function () {
            this.validateFirstName();
            this.validateLastName();
            this.validatePhone();
            this.validateRole();
            this.validatePassword();
            this.validateConfirmPassword();
            if (this.formValidate.firstName != "") return 0;
            if (this.formValidate.lastName != "") return 0;
            if (this.formValidate.phone != "") return 0;
            if (this.formValidate.role != "") return 0;
            if (this.formValidate.password != "") return 0;
            if (this.formValidate.confirmPassword != "") return 0;

            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .PostNewAdmin(this.formData)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.formData.first_name = "";
                    this.formData.last_name = "";
                    this.formData.phone = "";
                    this.formData.role_id = null;
                    this.formData.password = "";
                    this.formData.confirmPassword = "";
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        validateFirstName: function () {
            this.formValidate.firstName = "";
            if (this.formData.first_name.trim() == "") {
                this.formValidate.firstName = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.first_name.trim().length < 5) {
                this.formValidate.firstName = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.first_name.trim().length > 16) {
                this.formValidate.firstName = "يجب ان يكون الإسم أقل من 16 حرف";
                return 1;
            }
        },
        validateLastName: function () {
            this.formValidate.lastName = "";
            if (this.formData.last_name.trim() == "") {
                this.formValidate.lastName = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.last_name.trim().length < 5) {
                this.formValidate.lastName = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.last_name.trim().length > 16) {
                this.formValidate.lastName = "يجب ان يكون الإسم أقل من 16 حرف";
                return 1;
            }
        },
        validatePhone: function () {
            this.formValidate.phone = "";
            if (this.formData.phone.trim() == "") {
                this.formValidate.phone = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.phone.trim().length < 9) {
                this.formValidate.phone =
                    "يجب ان يكون رقم الهاتف 9 أرقام أو اكثر";
                return 1;
            }
            if (this.formData.phone.trim().length > 16) {
                this.formValidate.phone =
                    "يجب ان يكون رقم الهاتف أقل من 16 رقم";
                return 1;
            }
        },
        validateRole: function () {
            this.formValidate.role = "";
            if (this.formData.role_id == null) {
                this.formValidate.role = "يجب عليك تحديد دور المشرف";
                return 1;
            }
        },
        validatePassword: function () {
            this.formValidate.password = "";
            if (this.formData.password.trim() == "") {
                this.formValidate.password = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.password.trim().length < 6) {
                this.formValidate.password =
                    "يجب ان تكون كلمة المرور أكثر من 6 أرقام ورموز";
                return 1;
            }
            if (this.formData.password.trim() != this.formData.password) {
                this.formValidate.password =
                    "يجب أن لا تحتوي كلمة المرور على اي فراغات";
                return 1;
            }
        },
        validateConfirmPassword: function () {
            this.formValidate.confirmPassword = "";
            if (this.formData.confirmPassword.trim() == "") {
                this.formValidate.confirmPassword =
                    "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.confirmPassword != this.formData.password) {
                this.formValidate.confirmPassword =
                    "يجب ان يتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور";
                return 1;
            }
        }
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};
