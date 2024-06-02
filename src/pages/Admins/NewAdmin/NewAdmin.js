export default {
    data() {
        return {
            roleList: [],
            college: [],
            department: [],
            formData: {
                first_name: "",
                last_name: "",
                phone: "",
                password: "",
                role_id: null,
                confirmPassword: "",
                level: 1,  // 1 University - 2 College - 3 Department
                college: null,
                department: null,

            },
            formValidate: {
                firstName: "",
                lastName: "",
                phone: "",
                password: "",
                confirmPassword: "",
                level: '',
                college: '',
                department: '',
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
            .GetAllRoles(0,100,'')
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.loaded = 200;
                    this.roleList = response.data.data.data;
                    this.college = response.data.college;
                    this.department = response.data.department;
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
            if (this.formValidate.firstName != "") return 0;

            this.validateLastName();
            if (this.formValidate.lastName != "") return 0;

            this.validatePhone();
            if (this.formValidate.phone != "") return 0;

            this.validateRole();
            if (this.formValidate.role != "") return 0;

            this.validatePassword();
            if (this.formValidate.password != "") return 0;

            this.validateConfirmPassword();
            if (this.formValidate.confirmPassword != "") return 0;

            this.validateLevel();
            if (this.formValidate.level != '') return 0;
            this.validateCollege();
            if (this.formValidate.college != '') return 0;
            this.validateDepartment();
            if (this.formValidate.department != '') return 0;


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
        },
        validateLevel: function () {
            if(this.formData.level==1){
                this.formData.college=0;
                this.formData.department=0;
            }
            if(this.formData.level==2){
                this.formData.department=0;
            }
            this.formValidate.level = ''
            if (this.formData.level == null) {
                this.formValidate.level = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateCollege: function () {
            this.formValidate.college = ''
            if (this.formData.college == null || (this.formData.level>1 && this.formData.college==0)) {
                this.formValidate.college = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateDepartment: function () {
            this.formValidate.department = ''
            if (this.formData.department == null || (this.formData.level>2 && this.formData.department==0)) {
                this.formValidate.department = 'لا يمكن ترك هذا الحقل فارغ';
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
