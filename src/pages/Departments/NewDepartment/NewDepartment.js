import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                name: '',
college_id: null,
description: '',

            },
            formValidate: {
                name: '',
college_id: '',
description: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 38,
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
                .GetDepartmentNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه القسم غير متوفر");
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
            this.validateName();
 if (this.formValidate.name != '') return 0;
this.validateCollege_id();
 if (this.formValidate.college_id != '') return 0;
this.validateDescription();
 if (this.formValidate.description != '') return 0;


        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .PostNewDepartment(this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا القسم متوفرة, قد يكون شخص أخر قام بحذفه"
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
this.formValidate.name = '' 
if (this.formData.name.trim() == '') { 
this.formValidate.name = 'لا يمكن ترك هذا الحقل فارغ'; 
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
validateDescription: function() { 
this.formValidate.description = '' 
if (this.formData.description.trim() == '') { 
this.formValidate.description = 'لا يمكن ترك هذا الحقل فارغ'; 
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
