import Swal from "sweetalert2";
import { mapGetters, mapActions,mapMutations } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';
export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Pagination-Bar': PaginationBar,
        'Single-Page-Header': SinglePageHeader,
      },
    data() {
        return {
            mainItem: [],
            roles: [],
            loaded: 0,
                                    // Side Menu
            sideMenuPage:{
                main:5,
                sub:1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload:function(){
            this.loadData();
        },
        loadData:function(){
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
            .GetAdminByIdWithRoles(this.$route.params.id)
            .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                if (response.status == 200) {
                    this.mainItem = response.data.data;
                    this.roles = response.data.roles;
                    this.loaded=200;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.loaded=204;
                    this.$alert.Empty("هذه العنصر غير متوفرة");
                }
                else  {
                    this.loaded=400;
                    this.$alert.Empty(response.data.message);
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
        updateAdminRole: function() {
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .UpdateAdminRole(this.$route.params.id, {
                    role_id: this.mainItem.role_id
                })
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        }
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() {}
};
