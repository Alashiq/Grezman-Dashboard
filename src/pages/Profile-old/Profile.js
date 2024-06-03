import { mapGetters, mapActions,mapMutations } from "vuex"

export default {
    data() {
        return {
            formData: {
                file: "",
                first_name: "",
                last_name: "",
                old_password: "",
                new_password: "",
                confirm_password: ""
            },
            formValidate: {
                first_name: "",
                last_name: "",
                old_password: "",
                new_password: "",
                confirm_password: ""
            }
        };
    },
    methods: {
        onChange(e) {
            this.formData.file = e.target.files[0];
        },
        changePhoto: function() {
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("file", this.formData.file);
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");

            this.$http
                .ChangePhoto(data, config)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.$store.commit("updatePhoto", response.data.photo);
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        changeName: function() {
            if (this.user.first_name == this.formData.first_name.trim() && this.user.last_name == this.formData.last_name.trim()) {
                this.formValidate.name = "لم تقم بإدخال اي اسم جديد";
                return 0;
            }
            this.validateFirstName();
            if (this.formValidate.first_name != "") return 0;
            this.$store.commit("loadingStart");
             //this.$loading.Start();
            this.$http
                .ChangeName({
                    first_name: this.formData.first_name,
                    last_name: this.formData.last_name
                })
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.$store.commit("updateName",this.formData);

                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        changePassword: function() {
            this.validateOldPassword();
            this.validateNewPassword();
            this.validateConfirmPassword();
            if (this.formValidate.old_password != "") return 0;
            if (this.formValidate.new_password != "") return 0;
            if (this.formValidate.confirm_password != "") return 0;

            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .ChangePassword({
                    old_password: this.formData.old_password,
                    new_password: this.formData.new_password
                })
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.formData.old_password = "";
                    this.formData.new_password = "";
                    this.formData.confirm_password = "";
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        validateFirstName: function() {
            this.formValidate.first_name = "";
            if (this.formData.first_name.trim() == "") {
                this.formValidate.first_name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.first_name.trim().length < 5) {
                this.formValidate.first_name =
                    "يجب ان يكون الإسم اكثر 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.first_name.trim().length > 16) {
                this.formValidate.first_name = "يجب ان يكون الإسم أقل من 16";
                return 1;
            }
        },
        validateLastName: function() {
            this.formValidate.last_name = "";
            if (this.formData.last_name.trim() == "") {
                this.formValidate.last_name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.last_name.trim().length < 5) {
                this.formValidate.last_name =
                    "يجب ان يكون الإسم اكثر 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.last_name.trim().length > 16) {
                this.formValidate.last_name = "يجب ان يكون الإسم أقل من 16";
                return 1;
            }
        },
        validateOldPassword: function() {
            this.formValidate.old_password = "";
            if (this.formData.old_password.trim() == "") {
                this.formValidate.old_password = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.old_password.trim().length < 6) {
                this.formValidate.old_password =
                    "يجب ان تكون كلمة المرور أكثر من 6 أرقام ورموز";
                return 1;
            }
        },
        validateNewPassword: function() {
            this.formValidate.new_password = "";
            if (this.formData.new_password.trim() == "") {
                this.formValidate.new_password = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.new_password.trim().length < 6) {
                this.formValidate.new_password =
                    "يجب ان تكون كلمة المرور أكثر من 6 أرقام ورموز";
                return 1;
            }
        },
        validateConfirmPassword: function() {
            this.formValidate.confirm_password = "";
            if (this.formData.confirm_password.trim() == "") {
                this.formValidate.confirm_password =
                    "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.confirm_password != this.formData.new_password) {
                this.formValidate.confirm_password =
                    "يجب ان يتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور";
                return 1;
            }
        }
    },
    mounted() {
        this.$store.commit("activePage", 0);
        this.formData.first_name = this.user.first_name;
        this.formData.last_name = this.user.last_name;
    },
    computed: {
        ...mapGetters(["user","language"]),
        lang() {
            return this.language;
        },
        t() {
            return this.$lang.Profile[this.language];
        }
    },
    created() {}
};
