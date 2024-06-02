export default {
    data() {
        return {
            mainItem: {
            },
            loaded: 0, // 0 not load - 200 done - 204 empty 
            sideMenuPage: {
                main: 2,
                sub: 0,
            },
            errorMessage: "حدث خطأ ما"
        };
    },
    methods: {
        reload: function () {
            this.loadData(1)
        },
        loadData: function (page) {
            this.pageId = page;
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetHome()
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.$alert.Success(response.data.message);
                        this.loaded = 200;
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("لا يوجد اي بيانات");
                    } else {
                        this.loaded = 400;
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
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};