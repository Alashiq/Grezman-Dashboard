import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                username: '',
email: '',
phone: '',
std_number: '',
first_name: '',
second_name: '',
third_name: '',
family_name: '',
faculty_id: null,
department_id: null,

            },
            formValidate: {
                username: '',
email: '',
phone: '',
std_number: '',
first_name: '',
second_name: '',
third_name: '',
family_name: '',
faculty_id: '',
department_id: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 36,
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
                .GetStudentNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الطالب غير متوفر");
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
            this.validateUsername();
 if (this.formValidate.username != '') return 0;
this.validateEmail();
 if (this.formValidate.email != '') return 0;
this.validatePhone();
 if (this.formValidate.phone != '') return 0;
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
this.validateFaculty_id();
 if (this.formValidate.faculty_id != '') return 0;
this.validateDepartment_id();
 if (this.formValidate.department_id != '') return 0;


        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .PostNewStudent(this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا الطالب متوفرة, قد يكون شخص أخر قام بحذفه"
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

        validateUsername: function() { 
this.formValidate.username = '' 
if (this.formData.username.trim() == '') { 
this.formValidate.username = 'لا يمكن ترك هذا الحقل فارغ'; 
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
validatePhone: function() { 
this.formValidate.phone = '' 
if (this.formData.phone.trim() == '') { 
this.formValidate.phone = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateStd_number: function() { 
this.formValidate.std_number = '' 
if (this.formData.std_number.trim() == '') { 
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
validateFaculty_id: function() { 
this.formValidate.faculty_id = '' 
if (this.formData.faculty_id == null) { 
this.formValidate.faculty_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateDepartment_id: function() { 
this.formValidate.department_id = '' 
if (this.formData.department_id == null) { 
this.formValidate.department_id = 'لا يمكن ترك هذا الحقل فارغ'; 
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
