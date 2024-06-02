
import language from "../../lang/layout.json";
import { mapGetters } from "vuex"
import AppSide from './AppSide/AppSide.vue'
import AppHeader from './AppHeader/AppHeader.vue'
import LoadingBox from '../../components/LoadingBox/LoadingBox.vue'
import axios from 'axios'

export default {
    data: function () {
        return {
            t: language,
            xxx:'aaa',
        };
    },
    components: {
        'App-Side': AppSide,
        'App-Header': AppHeader,
        'Loading-Box': LoadingBox
      },
    computed: {
        ...mapGetters(["loadAuth","user","auth","permissions","dir"]),
        loading() {
            return this.$store.state.storeModule.loading;
        },
    },
    methods: {
        closeMenu(event) {
            if (event.target.id != "languageMenu") {
                this.$store.commit("toggleLanguageMenu", 0);
            }
            if (event.target.id != "userMenu") {
                this.$store.commit("toggleUserMenu", 0);
            }
        },
        checkPermission: function (perName) {
            var item = this.permissions.filter(project => {
                return project.name == perName;
            });
            if (item[0] != null) return item[0].state;
            return false;
        },
        openOptions: function (event) {
            if (event.target.id == 0) {
                this.optionId = 0;
                console.log(event.target.id);
            } else {
                this.optionId = event.target.id;
                console.log(event.target.id);
            }

        },
    },
    mounted() {

        if (this.auth) {
            alert("hello");
        } else if (localStorage.getItem("token") && !this.auth) {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("token");
            this.$http
                .CheckToken()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.$store.commit("setUser", response.data.admin);
                    console.log(response.data.admin.permissions);
                    this.$store.commit(
                        "setPermissions",
                        response.data.admin.permissions
                    );
                    this.$store.commit("authLoaded");
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                    this.$store.commit("authLoaded");
                });
        } else {
            this.$router.push("/login");
        }
    }
};
