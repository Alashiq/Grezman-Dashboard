import Swal from "sweetalert2";
import { mapGetters, mapActions,mapMutations } from "vuex"

export default {
    data() {
        return {
            mainItem: [],
            college: [],
            department: [],
            formData: {
                file: "",
                title: '',
                level: null,
                college: null,
                department: null,
                admin: null,
                is_active: false,

            },
            formValidate: {
                file: "",
                title: '',
                content: '',
                is_active: '',
                level: '',
                college: '',
                department: '',
                admin: '',

            },
            previewImage: null,

            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 41,
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
                .GetBoardNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.college = response.data.college;
                        this.department = response.data.department;

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

            this.validateTitle();
            if (this.formValidate.title != '') return 0;
            this.validateContent();
            if (this.formValidate.content != '') return 0;
            this.validateIs_active();
            if (this.formValidate.is_active != '') return 0;
            this.validateLevel();
            if (this.formValidate.level != '') return 0;
            this.validateCollege();
            if (this.formValidate.college != '') return 0;
            this.validateDepartment();
            if (this.formValidate.department != '') return 0;


            /*this.$loading.Start();*/ this.$store.commit("loadingStart");

            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("title", this.formData.title);
            data.append("content", this.formData.content);
            data.append("is_active", this.formData.is_active == true ? 1 : 0);
            data.append("level", this.formData.level);
            data.append("college", this.formData.college);
            data.append("department", this.formData.department);
            data.append("image", this.formData.file);


            this.$http
                .PostNewBoard(data, config)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.$alert.Success(response.data.message);
                        this.formData.file = "";
                        this.formData.title = "";
                        this.formData.content = "";
                        this.formData.level = 0;
                        this.formData.college = 0;
                        this.formData.department = 0;
                        this.formData.is_active = false;
                        this.previewImage = null;
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
        validateTitle: function () {
            this.formValidate.title = ''
            if (this.formData.title.trim() == '') {
                this.formValidate.title = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateContent: function () {
            this.formValidate.content = ''
            if (this.formData.content == null) {
                this.formValidate.content = 'لا يمكن ترك هذا الحقل فارغ';
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
        validateLevel: function () {
            if (this.formData.level == 0) {
                this.formData.college = 0;
                this.formData.department = 0;
            }
            if (this.formData.level == 1) {
                this.formData.department = 0;
            }
            this.formValidate.level = ''
            if (this.formData.level == null) {
                this.formValidate.level = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateCollege: function () {
            this.formValidate.college = ''
            if (this.formData.college == null || (this.formData.level > 0 && this.formData.college == 0)) {
                this.formValidate.college = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateDepartment: function () {
            this.formValidate.department = ''
            if (this.formData.department == null || (this.formData.level > 1 && this.formData.department == 0)) {
                this.formValidate.department = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },


    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {
            ...mapGetters(["user","language"]),
    },
    created() { }
};
