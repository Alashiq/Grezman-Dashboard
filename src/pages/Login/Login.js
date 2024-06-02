import { mapGetters } from "vuex"
import LoadingBox from '../../components/LoadingBox/LoadingBox.vue'
import axios from 'axios'

export default {
    data() {
        return {
            formData: {
                phone: "",
                password: ""
            },
            formValidate: {
                phone: "",
                password: ""
            }
        };
    },
    components: {
        'Loading-Box': LoadingBox
    },
    methods: {
        login: function () {
            this.validatePhone();
            this.validatePassword();
            if (
                this.formValidate.phone != "" ||
                this.formValidate.password != ""
            )
                return 0;

            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .Login(this.formData)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    localStorage.setItem("token", response.data.admin.token);

                    axios.defaults.headers.common["Authorization"] =
                    "Bearer " + response.data.admin.token;
                    this.$store.commit("setUser", response.data.admin);
                    this.$store.commit(
                        "setPermissions",
                        response.data.admin.permissions
                    );
                    this.$store.commit("authLoaded");
                    this.$alert.Success(response.data.message);

                    this.$router.push("/admin");
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                    this.$store.commit("authLoaded");
                });
        },
        validatePhone: function () {
            this.formValidate.phone = "";
            if (this.formData.phone.trim() == "") {
                this.formValidate.phone = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.phone.trim().length < 3) {
                this.formValidate.phone =
                    "يجب ان يكون اسم المستخدم 3 أحرف أو اكثر";
                return 1;
            }
        },
        validatePassword: function () {
            this.formValidate.password = "";
            if (this.formData.password.trim() == "") {
                this.formValidate.password = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.password.trim().length < 6) {
                this.formValidate.password =
                    "يجب ان تكون كلمة المرور أكثر من 6 حرف وأرقام";
                return 1;
            }
        }
    },
    computed: {
        ...mapGetters(["loadAuth", "auth"]),
        loading() {
            return this.$store.state.storeModule.loading;
        }
    },
    mounted() {
        if (this.auth) {
            this.$router.push("/admin");
        } else if (localStorage.getItem("token") && !this.loadAuth) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
            this.$http.CheckToken()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.$store.commit("setUser", response.data.admin);
                    this.$store.commit("setPermissions", response.data.permissions);
                    this.$store.commit("authLoaded");
                    this.$router.push("/admin");
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                    this.$store.commit("authLoaded");
                });
        }
    },
    created() { }
};