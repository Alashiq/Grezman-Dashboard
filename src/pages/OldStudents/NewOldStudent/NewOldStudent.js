import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                index: null,
std_number: null,
first_name: '',
second_name: '',
third_name: '',
family_name: '',
graduation_year: '',
certificate_type: '',
graduation_degree: '',
admin: '',

            },
            formValidate: {
                index: '',
std_number: '',
first_name: '',
second_name: '',
third_name: '',
family_name: '',
graduation_year: '',
certificate_type: '',
graduation_degree: '',
is_solved: '',
admin: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 42,
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
                .GetOldStudentNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الطالب_قديم غير متوفر");
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
            this.validateIndex();
 if (this.formValidate.index != '') return 0;
this.validateStd_number();
 if (this.formValidate.std_number != '') return 0;
this.validateFirst_name();
 if (this.formValidate.first_name != '') return 0;
this.validateSecond_name();
 if (this.formValidate.second_name != '') return 0;
this.validateThird_name();
 if (this.formValidate.third_name != '') return 0;
this.validateFamily_name();
 if (this.formValidate.family_name != '') return 0;
this.validateGraduation_year();
 if (this.formValidate.graduation_year != '') return 0;
this.validateCertificate_type();
 if (this.formValidate.certificate_type != '') return 0;
this.validateGraduation_degree();
 if (this.formValidate.graduation_degree != '') return 0;
this.validateIs_solved();
 if (this.formValidate.is_solved != '') return 0;
this.validateAdmin();
 if (this.formValidate.admin != '') return 0;


        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .PostNewOldStudent(this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا الطالب_قديم متوفرة, قد يكون شخص أخر قام بحذفه"
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

        validateIndex: function() { 
this.formValidate.index = '' 
if (this.formData.index == null) { 
this.formValidate.index = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateStd_number: function() { 
this.formValidate.std_number = '' 
if (this.formData.std_number == null) { 
this.formValidate.std_number = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateFirst_name: function() { 
this.formValidate.first_name = '' 
if (this.formData.first_name.trim() == '') { 
this.formValidate.first_name = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateSecond_name: function() { 
this.formValidate.second_name = '' 
if (this.formData.second_name.trim() == '') { 
this.formValidate.second_name = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateThird_name: function() { 
this.formValidate.third_name = '' 
if (this.formData.third_name.trim() == '') { 
this.formValidate.third_name = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateFamily_name: function() { 
this.formValidate.family_name = '' 
if (this.formData.family_name.trim() == '') { 
this.formValidate.family_name = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateGraduation_year: function() { 
this.formValidate.graduation_year = '' 
if (this.formData.graduation_year.trim() == '') { 
this.formValidate.graduation_year = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateCertificate_type: function() { 
this.formValidate.certificate_type = '' 
if (this.formData.certificate_type.trim() == '') { 
this.formValidate.certificate_type = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateGraduation_degree: function() { 
this.formValidate.graduation_degree = '' 
if (this.formData.graduation_degree.trim() == '') { 
this.formValidate.graduation_degree = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateIs_solved: function() { 
this.formValidate.is_solved = '' 
if (this.formData.is_solved == null) { 
this.formValidate.is_solved = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateAdmin: function() { 
this.formValidate.admin = '' 
if (this.formData.admin.trim() == '') { 
this.formValidate.admin = 'لا يمكن ترك هذا الحقل فارغ'; 
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
