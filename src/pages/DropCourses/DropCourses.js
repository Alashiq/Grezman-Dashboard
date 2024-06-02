
import Swal from "sweetalert2";
export default {
    data() {
        return {
            mainList: [],
            loaded: 0, // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet 
            tagId: null, //null =>All ,  1 => Active , 0 =>Not Active , 2=>Banned 
            pageId: 1,
            countPerPage: 5,
            lastPage: 0,
            totalRows: 0,
            itemFrom: 0,
            itemTo: 0,
            // Search 
            std_idSrh:'',
course_idSrh:'',
college_idSrh:'',
department_idSrh:'',
std_nameSrh:'',
is_solvedSrh:'',

            // UI
            optionId: 0,
            // Side Menu
            sideMenuPage: {
                main: 45,
                sub: 1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload: function () {
            this.loadData(this.pageId);
        },
        loadData: function (page) {
            this.pageId = page;
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetAllDropCourses(this.pageId, this.countPerPage
                    ,this.std_idSrh,this.course_idSrh,this.college_idSrh,this.department_idSrh,this.std_nameSrh,this.is_solvedSrh
                )
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainList = response.data.data.data;
                        this.lastPage = response.data.data.last_page;
                        this.totalRows = response.data.data.total;
                        this.itemFrom = response.data.data.from;
                        this.itemTo = response.data.data.to;
                        this.$alert.Success(response.data.message);
                        this.loaded = 200;
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("تنبيه لا يوجد اي ادوار");
                    } else {
                        this.loaded = 400;
                        alert("400");
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
        changePerPage: function (event) {
            this.countPerPage = event.target.value;
            this.pageId = 1;
            this.loadData(this.pageId);
        },
        clearSearch: function () {
            this.std_idSrh='',
this.course_idSrh='',
this.college_idSrh='',
this.department_idSrh='',
this.std_nameSrh='',
this.is_solvedSrh='',

            this.loadData(this.pageId);
        },
        moveToNext: function () {
            this.pageId++;
            this.loadData(this.pageId);
        },
        moveToPrevius: function () {
            this.pageId--
            this.loadData(this.pageId);
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
        deleteMainItem: function (id) {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذا الطلبـإسقاط !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    /*this.$loading.Start();*/ this.$store.commit("loadingStart");
                    this.$http
                        .DeleteDropCourse(id)
                        .then(response => {
                            /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                                this.$alert.Empty(
                                    "لم يعد هذا الطلبـإسقاط متوفر, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                            else if (response.status == 400) {
                                this.$alert.Empty(
                                    response.data.message
                                );
                            }
                        })
                        .catch(error => {
                            /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },


    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
        this.loadData(this.pageId);
    },
    computed: {
    },
    created() { }
};
