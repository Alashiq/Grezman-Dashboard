import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            formData: {
                name: '',
                college_id: null,
                year: null,
                city: '',
                address: '',
                phone: '',
                facebook: '',
                email: '',
                president: '',
                longt: '',
                latt: '',

                // president_photo: '',
                it_department_phone: '',
                // image: '',
                // logo: '',

                // Upload Files 
                filePresident: "",
                fileImage: "",
                fileLogo: "",


            },
            formValidate: {
                name: '',
                college_id: '',
                year: '',
                city: '',
                address: '',
                phone: '',
                longt: '',
                latt: '',
                facebook: '',
                email: '',
                about: '',
                our_vision: '',
                our_goal: '',
                departments: '',
                president: '',
                // president_photo: '',
                president_word: '',
                it_department_phone: '',
                // image: '',
                // logo: '',

                // Uploads 
                filePresident: "",
                fileImage: "",
                fileLogo: "",

            },
            previewPresident: null,
            previewImage: null,
            previewLogo: null,

            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 37,
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
                .GetCollegeNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الكلية غير متوفر");
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
            this.validateName();
            if (this.formValidate.name != '') return 0;
            this.validateCollege_id();
            if (this.formValidate.college_id != '') return 0;
            this.validateYear();
            if (this.formValidate.year != '') return 0;
            this.validateCity();
            if (this.formValidate.city != '') return 0;
            this.validateAddress();
            if (this.formValidate.address != '') return 0;
            this.validatePhone();
            if (this.formValidate.phone != '') return 0;
            this.validateLongt();
            if (this.formValidate.longt != '') return 0;
            this.validateLatt();
            if (this.formValidate.latt != '') return 0;
            this.validateFacebook();
            if (this.formValidate.facebook != '') return 0;
            this.validateEmail();
            if (this.formValidate.email != '') return 0;
            this.validateAbout();
            if (this.formValidate.about != '') return 0;
            this.validateOur_vision();
            if (this.formValidate.our_vision != '') return 0;
            this.validateOur_goal();
            if (this.formValidate.our_goal != '') return 0;
            this.validateDepartments();
            if (this.formValidate.departments != '') return 0;
            this.validatePresident();
            if (this.formValidate.president != '') return 0;

            this.validatePresident_word();
            if (this.formValidate.president_word != '') return 0;
            this.validateIt_department_phone();
            if (this.formValidate.it_department_phone != '') return 0;
            // this.validatePresident_photo();
            // if (this.formValidate.president_photo != '') return 0;
            // this.validateImage();
            // if (this.formValidate.image != '') return 0;
            // this.validateLogo();
            // if (this.formValidate.logo != '') return 0;


            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("name", this.formData.name);
            data.append("college_id", this.formData.college_id);
            data.append("year", this.formData.year);
            data.append("city", this.formData.city);
            data.append("address", this.formData.address);
            data.append("phone", this.formData.phone);
            data.append("longt", this.formData.longt);
            data.append("latt", this.formData.latt);
            data.append("facebook", this.formData.facebook);
            data.append("email", this.formData.email);
            data.append("about", this.formData.about);
            data.append("our_vision", this.formData.our_vision);
            data.append("our_goal", this.formData.our_goal);
            data.append("departments", this.formData.departments);
            data.append("president_word", this.formData.president_word);
            data.append("president", this.formData.president);
            data.append("it_department_phone", this.formData.it_department_phone);
            data.append("president_photo", this.formData.filePresident);
            data.append("image", this.formData.fileImage);
            data.append("logo", this.formData.fileLogo);
            this.$http
                .PostNewCollege(data, config)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {

                        this.$alert.Success(response.data.message);
                        this.formData.filePresident = "";
                        this.previewPresident = null;

                        this.formData.fileImage = "";
                        this.previewImage = null;

                        this.formData.fileLogo = "";
                        this.previewLogo = null;


                    } else if (response.status == 204) {
                        this.mainItem = [];
                        this.loaded = 204;
                        this.$alert.Empty(
                            "لم يعد هذا الكلية متوفرة, قد يكون شخص أخر قام بحذفه"
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

        validateName: function () {
            this.formValidate.name = ''
            if (this.formData.name.trim() == '') {
                this.formValidate.name = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateCollege_id: function () {
            this.formValidate.college_id = ''
            if (this.formData.college_id == null) {
                this.formValidate.college_id = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateYear: function () {
            this.formValidate.year = ''
            if (this.formData.year == null) {
                this.formValidate.year = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateCity: function () {
            this.formValidate.city = ''
            if (this.formData.city.trim() == '') {
                this.formValidate.city = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateAddress: function () {
            this.formValidate.address = ''
            if (this.formData.address.trim() == '') {
                this.formValidate.address = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validatePhone: function () {
            this.formValidate.phone = ''
            if (this.formData.phone.trim() == '') {
                this.formValidate.phone = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateLongt: function () {
            this.formValidate.longt = ''
            if (this.formData.longt == null) {
                this.formValidate.longt = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateLatt: function () {
            this.formValidate.latt = ''
            if (this.formData.latt == null) {
                this.formValidate.latt = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateFacebook: function () {
            this.formValidate.facebook = ''
            if (this.formData.facebook.trim() == '') {
                this.formValidate.facebook = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateEmail: function () {
            this.formValidate.email = ''
            if (this.formData.email.trim() == '') {
                this.formValidate.email = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateAbout: function () {
            this.formValidate.about = ''
            if (this.formData.about == null) {
                this.formValidate.about = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateOur_vision: function () {
            this.formValidate.our_vision = ''
            if (this.formData.our_vision == null) {
                this.formValidate.our_vision = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateOur_goal: function () {
            this.formValidate.our_goal = ''
            if (this.formData.our_goal == null) {
                this.formValidate.our_goal = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateDepartments: function () {
            this.formValidate.departments = ''
            if (this.formData.departments == null) {
                this.formValidate.departments = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validatePresident: function () {
            this.formValidate.president = ''
            if (this.formData.president.trim() == '') {
                this.formValidate.president = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validatePresident_photo: function () {
            this.formValidate.president_photo = ''
            if (this.formData.president_photo.trim() == '') {
                this.formValidate.president_photo = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validatePresident_word: function () {
            this.formValidate.president_word = ''
            if (this.formData.president_word == null) {
                this.formValidate.president_word = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateIt_department_phone: function () {
            this.formValidate.it_department_phone = ''
            if (this.formData.it_department_phone.trim() == '') {
                this.formValidate.it_department_phone = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateImage: function () {
            this.formValidate.image = ''
            if (this.formData.image.trim() == '') {
                this.formValidate.image = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateLogo: function () {
            this.formValidate.logo = ''
            if (this.formData.logo.trim() == '') {
                this.formValidate.logo = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },

        //  Choose File
        onChangePresident(e) {
            this.formData.filePresident = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.filePresident);
            reader.onload = e => {
                this.previewPresident = e.target.result;
            };
        },
        onChangeImage(e) {
            this.formData.fileImage = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.fileImage);
            reader.onload = e => {
                this.previewImage = e.target.result;
            };
        },

        onChangeLogo(e) {
            this.formData.fileLogo = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.fileLogo);
            reader.onload = e => {
                this.previewLogo = e.target.result;
            };
        },



    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};
