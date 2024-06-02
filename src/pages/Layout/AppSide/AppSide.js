
import { mapGetters } from "vuex"
import axios from 'axios'

export default {
    data: function() {
        return {
        };
    },
    methods: {
        logout: function() {
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .Logout()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                        this.$router.push("/login");
                        this.$store.commit("clearUser");
                        localStorage.removeItem("token");
                        axios.defaults.headers.common["Authorization"] = null;
                        this.$alert.Success(response.data.message);
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        toggleSideList:function(id){
        this.$store.commit("toggllePageList", id);
        },
    },
    computed: {
        ...mapGetters(["user","language"]),
        userMenu() {
            return this.$store.state.storeModule.userMenu;
        },
        pageList() {
            return this.$store.state.storeModule.pageList;
        },
        pages() {
            return this.$store.state.storeModule.pages;
        },
        pageActive() {
            return this.$store.state.storeModule.pageActive;
        },
        subPageActive() {
            return this.$store.state.storeModule.subPageActive;
        },
        openPageList() {
            return this.$store.state.storeModule.openPageList;
        },
        menu() {
            return this.$store.state.storeModule.menu;
        },
        lang(){
            return this.language;
        },
        t() {
            return this.$lang.Profile[this.language];
        }
    }
};
