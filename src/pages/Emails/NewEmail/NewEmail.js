import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                user_id: null,
email: '',
password: '',

            },
            formValidate: {
                user_id: '',
email: '',
password: '',
is_created: '',
reset_password: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 44,
                sub: 2,
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
                .GetEmailNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه البريد_إلكتروني غير متوفر");
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
            this.validateUser_id();
 if (this.formValidate.user_id != '') return 0;
this.validateEmail();
 if (this.formValidate.email != '') return 0;
this.validatePassword();
 if (this.formValidate.password != '') return 0;
this.validateIs_created();
 if (this.formValidate.is_created != '') return 0;
this.validateReset_password();
 if (this.formValidate.reset_password != '') return 0;


        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .PostNewEmail(this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا البريد_إلكتروني متوفرة, قد يكون شخص أخر قام بحذفه"
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

        validateUser_id: function() { 
this.formValidate.user_id = '' 
if (this.formData.user_id == null) { 
this.formValidate.user_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateEmail: function() { 
this.formValidate.email = '' 
if (this.formData.email.trim() == '') { 
this.formValidate.email = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validatePassword: function() { 
this.formValidate.password = '' 
if (this.formData.password.trim() == '') { 
this.formValidate.password = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateIs_created: function() { 
this.formValidate.is_created = '' 
if (this.formData.is_created == null) { 
this.formValidate.is_created = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateReset_password: function() { 
this.formValidate.reset_password = '' 
if (this.formData.reset_password == null) { 
this.formValidate.reset_password = 'لا يمكن ترك هذا الحقل فارغ'; 
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
