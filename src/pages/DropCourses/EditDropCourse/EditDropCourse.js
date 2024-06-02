import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                std_id: 0,
course_id: 0,
college_id: 0,
department_id: 0,
std_name: '',

            },
            formValidate: {
                std_id: '',
course_id: '',
college_id: '',
department_id: '',
std_name: '',
is_solved: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 45,
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
                .GetDropCourseById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.std_id=response.data.data.std_id;
this.formData.course_id=response.data.data.course_id;
this.formData.college_id=response.data.data.college_id;
this.formData.department_id=response.data.data.department_id;
this.formData.std_name=response.data.data.std_name;
this.formData.is_solved=response.data.data.is_solved;

                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الطلبـإسقاط غير متوفر");
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
            this.validateStd_id();
 if (this.formValidate.std_id != '') return 0;
this.validateCourse_id();
 if (this.formValidate.course_id != '') return 0;
this.validateCollege_id();
 if (this.formValidate.college_id != '') return 0;
this.validateDepartment_id();
 if (this.formValidate.department_id != '') return 0;
this.validateStd_name();
 if (this.formValidate.std_name != '') return 0;
this.validateIs_solved();
 if (this.formValidate.is_solved != '') return 0;

            // this.validateName();
            // if (this.formValidate.name != "") return 0;

        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .EditDropCourse(this.$route.params.id,this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا الطلبـإسقاط متوفرة, قد يكون شخص أخر قام بحذفه"
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
        validateStd_id: function() { 
this.formValidate.std_id = '' 
if (this.formData.std_id == null) { 
this.formValidate.std_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateCourse_id: function() { 
this.formValidate.course_id = '' 
if (this.formData.course_id == null) { 
this.formValidate.course_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateCollege_id: function() { 
this.formValidate.college_id = '' 
if (this.formData.college_id == null) { 
this.formValidate.college_id = 'لا يمكن ترك هذا الحقل فارغ'; 
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
validateStd_name: function() { 
this.formValidate.std_name = '' 
if (this.formData.std_name.trim() == '') { 
this.formValidate.std_name = 'لا يمكن ترك هذا الحقل فارغ'; 
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

    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};
