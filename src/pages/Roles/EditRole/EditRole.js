
import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                name: "",
                permissions: []
            },
            formValidate: {
                name: "",
                permissions: ""
            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 5,
                sub: 3,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload:function() {
            this.loadData();
        },
        loadData:function(){
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetRoleById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.name=response.data.data.name;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الدور غير متوفر");
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
        togglePermission(index) {
            this.mainItem.permissions[index].state = !this.mainItem.permissions[index]
                .state;
        },
        editMainItem: function (id) {

            this.formData.permissions = [];

            for (var i = 0; i < this.mainItem.permissions.length; i++) {
                if (this.mainItem.permissions[i].state == true)
                    this.formData.permissions.push(
                        this.mainItem.permissions[i].name
                    );
            }

            this.validateName();
            this.validatePermissions();
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.permissions != "") return 0;

        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .EditRole(this.$route.params.id,this.formData)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.mainItem = [];
                    this.loaded = 204;
                    this.$alert.Empty(
                        "لم يعد هذا الدور متوفرة, قد يكون شخص أخر قام بحذفه"
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
                this.formValidate.name = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 16 حرف";
                return 1;
            }
        },
        validatePermissions: function() {
            this.formValidate.permissions = "";
            if (this.formData.permissions.length == 0) {
                this.formValidate.permissions =
                    "يجب عليك اختيار صلاحية واحدة على الأقل";
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
