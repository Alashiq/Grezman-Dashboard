import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                name: '',
type: 0,
season_id: 0,
rank: 0,

            },
            formValidate: {
                name: '',
type: '',
season_id: '',
date_start: '',
date_end: '',
is_active: '',
rank: '',
note: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 43,
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
                .GetCalendarById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.name=response.data.data.name;
this.formData.type=response.data.data.type;
this.formData.season_id=response.data.data.season_id;
this.formData.date_start=response.data.data.date_start;
this.formData.date_end=response.data.data.date_end;
this.formData.is_active=response.data.data.is_active;
this.formData.rank=response.data.data.rank;
this.formData.note=response.data.data.note;

                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه التقويم غير متوفر");
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
this.validateType();
 if (this.formValidate.type != '') return 0;
this.validateSeason_id();
 if (this.formValidate.season_id != '') return 0;
this.validateDate_start();
 if (this.formValidate.date_start != '') return 0;
this.validateDate_end();
 if (this.formValidate.date_end != '') return 0;
this.validateIs_active();
 if (this.formValidate.is_active != '') return 0;
this.validateRank();
 if (this.formValidate.rank != '') return 0;
this.validateNote();
 if (this.formValidate.note != '') return 0;

            // this.validateName();
            // if (this.formValidate.name != "") return 0;

        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .EditCalendar(this.$route.params.id,this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا التقويم متوفرة, قد يكون شخص أخر قام بحذفه"
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
validateType: function() { 
this.formValidate.type = '' 
if (this.formData.type == null) { 
this.formValidate.type = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateSeason_id: function() { 
this.formValidate.season_id = '' 
if (this.formData.season_id == null) { 
this.formValidate.season_id = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateDate_start: function() { 
this.formValidate.date_start = '' 
if (this.formData.date_start == null) { 
this.formValidate.date_start = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateDate_end: function() { 
this.formValidate.date_end = '' 
if (this.formData.date_end == null) { 
this.formValidate.date_end = 'لا يمكن ترك هذا الحقل فارغ'; 
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
validateRank: function() { 
this.formValidate.rank = '' 
if (this.formData.rank == null) { 
this.formValidate.rank = 'لا يمكن ترك هذا الحقل فارغ'; 
return 1; 
}
},
validateNote: function() { 
this.formValidate.note = '' 
if (this.formData.note == null) { 
this.formValidate.note = 'لا يمكن ترك هذا الحقل فارغ'; 
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
