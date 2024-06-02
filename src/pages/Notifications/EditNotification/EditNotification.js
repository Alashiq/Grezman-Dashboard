import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                title: '',
type: '',
student_id: 0,
section_id: 0,
department_id: 0,
college_id: 0,

            },
            formValidate: {
                title: '',
message: '',
type: '',
student_id: '',
section_id: '',
department_id: '',
college_id: '',
is_sent: '',
send_time: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 39,
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
                .GetNotificationById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.title=response.data.data.title;
this.formData.message=response.data.data.message;
this.formData.type=response.data.data.type;
this.formData.student_id=response.data.data.student_id;
this.formData.section_id=response.data.data.section_id;
this.formData.department_id=response.data.data.department_id;
this.formData.college_id=response.data.data.college_id;
this.formData.is_sent=response.data.data.is_sent;
this.formData.send_time=response.data.data.send_time;

                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الإشعار غير متوفر");
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
            this.validateTitle();
 if (this.formValidate.title != '') return 0;
this.validateMessage();
 if (this.formValidate.message != '') return 0;
this.validateType();
 if (this.formValidate.type != '') return 0;
this.validateStudent_id();
 if (this.formValidate.student_id != '') return 0;
this.validateSection_id();
 if (this.formValidate.section_id != '') return 0;
this.validateDepartment_id();
 if (this.formValidate.department_id != '') return 0;
this.validateCollege_id();
 if (this.formValidate.college_id != '') return 0;
this.validateIs_sent();
 if (this.formValidate.is_sent != '') return 0;
this.validateSend_time();
 if (this.formValidate.send_time != '') return 0;

            // this.validateName();
            // if (this.formValidate.name != "") return 0;

        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .EditNotification(this.$route.params.id,this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا الإشعار متوفرة, قد يكون شخص أخر قام بحذفه"
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
        validateTitle: function() { 
this.formValidate.title = '' 
if (this.formData.title.trim() == '') { 
this.formValidate.title = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateMessage: function() { 
this.formValidate.message = '' 
if (this.formData.message == null) { 
this.formValidate.message = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateType: function() { 
this.formValidate.type = '' 
if (this.formData.type.trim() == '') { 
this.formValidate.type = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateStudent_id: function() { 
this.formValidate.student_id = '' 
if (this.formData.student_id == null) { 
this.formValidate.student_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateSection_id: function() { 
this.formValidate.section_id = '' 
if (this.formData.section_id == null) { 
this.formValidate.section_id = 'لا يمكن ترك هذا الحقل فارغ'; 
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
validateCollege_id: function() { 
this.formValidate.college_id = '' 
if (this.formData.college_id == null) { 
this.formValidate.college_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateIs_sent: function() { 
this.formValidate.is_sent = '' 
if (this.formData.is_sent == null) { 
this.formValidate.is_sent = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateSend_time: function() { 
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
