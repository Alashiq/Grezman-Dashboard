

<template>
        <RouterLink class="bg-blue-300" to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterView />

        <div v-if="loadAuth" class="w-full" :dir="dir" @click="closeMenu($event)">
    <!-- Side Menu -->
    <App-Side></App-Side>
    <!-- End Side Menu -->

    <!-- Left Part -->
    <div v-if="dir=='rtl'" class="relative md:mr-64">
        <!-- Header Bar -->
        <App-Header></App-Header>
        <!-- End Header Bar -->
        <RouterView />

        <div class="h-12"></div>
    </div>
    <!-- End Left Part -->

    <!-- Left Part -->
    <div v-else class="relative md:ml-64">
        <!-- Header Bar -->
        <App-Header></App-Header>
        <!-- End Header Bar -->
        <RouterView />

        <div class="h-12"></div>

    </div>
    <!-- End Left Part -->


    <Loading-Box v-if="loading == true"></Loading-Box>
</div>
<div v-else></div>
</template>

<style scoped>
</style>
<script >
import language from "./lang/layout.json";
import { mapGetters } from "vuex"
import AppSide from './pages/Layout/AppSide/AppSide.vue'
import AppHeader from './pages/Layout/AppHeader/AppHeader.vue'
import LoadingBox from './components/LoadingBox/LoadingBox.vue'

export default {
    data: function () {
        return {
            t: language,
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
            return this.$store.state.loading;
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

        if (this.auth==false) {
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
            this.$router.push("/admin/login");
        }
    }
};

</script>