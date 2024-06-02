import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                title: '',
image: '',
level: 0,
college: 0,
department: 0,
admin: 0,

            },
            formValidate: {
                title: '',
content: '',
image: '',
is_active: '',
level: '',
college: '',
department: '',
admin: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 41,
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
                .GetBoardById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.title=response.data.data.title;
this.formData.content=response.data.data.content;
this.formData.image=response.data.data.image;
this.formData.is_active=response.data.data.is_active;
this.formData.level=response.data.data.level;
this.formData.college=response.data.data.college;
this.formData.department=response.data.data.department;
this.formData.admin=response.data.data.admin;

                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الإعلان غير متوفر");
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
this.validateContent();
 if (this.formValidate.content != '') return 0;
this.validateImage();
 if (this.formValidate.image != '') return 0;
this.validateIs_active();
 if (this.formValidate.is_active != '') return 0;
this.validateLevel();
 if (this.formValidate.level != '') return 0;
this.validateCollege();
 if (this.formValidate.college != '') return 0;
this.validateDepartment();
 if (this.formValidate.department != '') return 0;
this.validateAdmin();
 if (this.formValidate.admin != '') return 0;

            // this.validateName();
            // if (this.formValidate.name != "") return 0;

        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .EditBoard(this.$route.params.id,this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا الإعلان متوفرة, قد يكون شخص أخر قام بحذفه"
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
validateContent: function() { 
this.formValidate.content = '' 
if (this.formData.content == null) { 
this.formValidate.content = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateImage: function() { 
this.formValidate.image = '' 
if (this.formData.image.trim() == '') { 
this.formValidate.image = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateIs_active: function() { 
this.formValidate.is_active = '' 
if (this.formData.is_active == null) { 
this.formValidate.is_active = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateLevel: function() { 
this.formValidate.level = '' 
if (this.formData.level == null) { 
this.formValidate.level = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateCollege: function() { 
this.formValidate.college = '' 
if (this.formData.college == null) { 
this.formValidate.college = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateDepartment: function() { 
this.formValidate.department = '' 
if (this.formData.department == null) { 
this.formValidate.department = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateAdmin: function() { 
this.formValidate.admin = '' 
if (this.formData.admin == null) { 
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
