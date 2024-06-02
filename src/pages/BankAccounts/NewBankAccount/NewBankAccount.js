import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainItem: [],
            currenciesList: [],
            formData: {
                name: '',
                branch: '',
                account_number: '',
                currency_id: null,
                name_holder: '',

            },
            formValidate: {
                name: '',
                branch: '',
                account_number: '',
                currency_id: '',
                name_holder: '',

            },
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            // Side Menu
            sideMenuPage: {
                main: 12,
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
                .GetBankAccountNew()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.currenciesList = response.data.currencies;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه الحساب غير متوفر");
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
            this.validateBranch();
            if (this.formValidate.branch != '') return 0;
            this.validateAccount_number();
            if (this.formValidate.account_number != '') return 0;
            this.validateCurrency_id();
            if (this.formValidate.currency_id != '') return 0;
            this.validateName_holder();
            if (this.formValidate.name_holder != '') return 0;


            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .PostNewBankAccount(this.formData)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.mainItem = [];
                        this.loaded = 204;
                        this.$alert.Empty(
                            "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
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
        validateBranch: function () {
            this.formValidate.branch = ''
            if (this.formData.branch.trim() == '') {
                this.formValidate.branch = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateAccount_number: function () {
            this.formValidate.account_number = ''
            if (this.formData.account_number.trim() == '') {
                this.formValidate.account_number = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateCurrency_id: function () {
            this.formValidate.currency_id = ''
            if (this.formData.currency_id == null) {
                this.formValidate.currency_id = 'لا يمكن ترك هذا الحقل فارغ';
                return 1;
            }
        },
        validateName_holder: function () {
            this.formValidate.name_holder = ''
            if (this.formData.name_holder.trim() == '') {
                this.formValidate.name_holder = 'لا يمكن ترك هذا الحقل فارغ';
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
