import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                file: "",
                is_active: 0,
            },
            formValidate: {
                file: "",
                is_active: '',
            },
            previewImage: null,
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 40,
                sub: 2,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload: function () {
            this.loadData();
        },
        loadData: function () {
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetBannerNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه البانر غير متوفر");
                    }
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (error.response.status == 400) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = 400;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 403) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = 403;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                    } else {
                        this.errorMessage = "حدث خطأ ما";
                        this.loaded = 404;
                        this.$alert.BadRequest("حدث خطأ ما, الرجاء إعادة المحاولة");
                    }
                });
        },
        addNewItem: function () {
            this.validateFile();
            if (this.formValidate.file != "") return 0;
            this.validateIs_active();
            if (this.formValidate.is_active != '') return 0;


            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("is_active", this.formData.is_active);
            data.append("image", this.formData.file);

            this.$http
                .PostNewBanner(data, config)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.$alert.Success(response.data.message);
                        this.formData.file = "";
                        this.formData.is_active = "";
                        this.previewImage = null;
                    } else if (response.status == 204) {
                        this.mainItem = [];
                        this.loaded = 204;
                        this.$alert.Empty(
                            "لم يعد هذا البانر متوفرة, قد يكون شخص أخر قام بحذفه"
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
        onChange(e) {
            this.formData.file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.file);
            reader.onload = e => {
                this.previewImage = e.target.result;
            };
        },
        validateFile: function () {
            this.formValidate.file = "";
            if (this.formData.file == "") {
                this.formValidate.file = "يجب اختيار صورة";
                return 1;
            }
        },
        validateIs_active: function () {
            this.formValidate.is_active = ''
            if (this.formData.is_active == null) {
                this.formValidate.is_active = 'لا يمكن ترك هذا الحقل فارغ';
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
