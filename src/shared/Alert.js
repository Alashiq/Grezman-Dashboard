import Swal from "sweetalert2";


export default {
    Success(message) {
        Swal.mixin({
            position: "bottom-start",
            timer: 3000,
            toast: true,
            showConfirmButton: false
        }).fire("نجاح", message, "success");
    },
    Empty(message) {
        if (!message)
            Swal.mixin({
                position: "bottom-start",
                timer: 3000,
                toast: true,
                showConfirmButton: false
            }).fire("تنبيه", "لا يوجد اي بيانات", "warning");
        else
            Swal.mixin({
                position: "bottom-start",
                timer: 3000,
                toast: true,
                showConfirmButton: false
            }).fire("تنبيه", message, "warning");
    },



    BadRequest(message) {
        Swal.fire("فشل", message, "warning");
    },



    NotAuth() {
        Swal.fire(
            "فشل",
            "انتهت الجلسة الخاصة بك قم بعمل تسجيل دخول مجددا",
            "warning"
        );
        localStorage.removeItem("token");
        console.log(root);
        this.root.$router.push("/admin");
        root.$store.commit("clearUser");
        root.$router.push("/login");

    },



}