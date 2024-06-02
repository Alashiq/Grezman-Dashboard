import axios from "axios";
export default {
    // ============== Auth Part =======================
    Login(loginData) {
        return axios.post("https://mobile.sabu.edu.ly/admin/api/login", loginData);
    },
    CheckToken() {
        return axios.get("https://mobile.sabu.edu.ly/admin/api/auth/auth");
    },
    Logout() {
        return axios.get("https://mobile.sabu.edu.ly/admin/api/logout");
    },
    ChangeName(formData) {
        return axios.post("https://mobile.sabu.edu.ly/admin/api/auth/editName", formData);
    },
    ChangePassword(formData) {
        return axios.post("https://mobile.sabu.edu.ly/admin/api/auth/editPassword", formData);
    },
    ChangePhoto(data, config) {
        return axios.post("https://mobile.sabu.edu.ly/admin/api/auth/editPhoto", data, config);
    },
    // ============== Home Part =======================
    GetHome() {
        return axios.get("https://mobile.sabu.edu.ly/admin/api/home");
    },

    
    // ============== Admin Part =======================
    GetAllAdmins(page,countPerPage,tag,phone,firstName,lastName) {
        return axios.get("/admin/api/admin?page=" + page + "&count=" + countPerPage + "&state=" + tag + "&phone=" + phone + "&first_name=" + firstName + "&last_name=" + lastName);
    },
    ActiveAdmin(admin) {
        return axios.put("/admin/api/admin/" + admin + "/active");
    },
    DisActiveAdmin(admin) {
        return axios.put("/admin/api/admin/" + admin + "/disActive");
    },
    DeleteAdmin(admin) {
        return axios.delete("/admin/api/admin/" + admin);
    },
    BannedAdmin(admin) {
        return axios.put("/admin/api/admin/" + admin + "/banned");
    },
    ResetAdminPassword(admin) {
        return axios.put("/admin/api/admin/" + admin + "/reset");
    },
    GetAdminById(admin) {
        return axios.get("/admin/api/admin/" + admin);
    },
    GetAdminByIdWithPermissions(admin) {
        return axios.get("/admin/api/admin/" + admin + "/withPermissions");
    },
    GetAdminRolesForNewAdmin() {
        return axios.get("/admin/api/admin/role");
    },
    PostNewAdmin(admin) {
        return axios.post("/admin/api/admin", admin);
    },
    UpdateAdminRole(admin, formData) {
        return axios.put("/admin/api/admin/" + admin + "/role", formData);
    },

    // ============== Role Part =======================
    GetAllRoles(page,countPerPage,name) {
        return axios.get("/admin/api/permission?page=" + page + "&count=" + countPerPage + "&name=" + name);
    },
    GetRoleById(role) {
        return axios.get("/admin/api/permission/" + role);
    },
    DeleteRole(role) {
        return axios.delete("/admin/api/permission/" + role);
    },
    GetAllPermissionsForNewRole() {
        return axios.get("/admin/api/permission/allPermissions");
    },
    PostNewRole(role) {
        return axios.post("/admin/api/permission", role);
    },
    EditRole(role, formData) {
        return axios.put("/admin/api/permission/" + role, formData);
    },





 // ============== Currency Part =======================
GetAllCurrencies(page,countPerPage,name,abbreviation) { 
return axios.get('/admin/api/currency?page=' + page + '&count=' + countPerPage+ '&name=' + name+ '&abbreviation=' + abbreviation);
}, 

DeleteCurrency(id){
return axios.delete('/admin/api/currency/' + id);
}, 
GetCurrencyById(id){
return axios.get('/admin/api/currency/' + id);
}, 
PostNewCurrency(formData){
return axios.post('/admin/api/currency' , formData);
}, 
EditCurrency(id,formData){
return axios.put('/admin/api/currency/' + id , formData);
}, 
GetCurrencyNew(){
return axios.get('/admin/api/currency/new');
}, 



 // ============== BankAccount Part =======================
GetAllBankAccounts(page,countPerPage,name,branch,account_number) { 
return axios.get('/admin/api/bankaccount?page=' + page + '&count=' + countPerPage+ '&name=' + name+ '&branch=' + branch+ '&account_number=' + account_number);
}, 

DeleteBankAccount(id){
return axios.delete('/admin/api/bankaccount/' + id);
}, 
GetBankAccountById(id){
return axios.get('/admin/api/bankaccount/' + id);
}, 
PostNewBankAccount(formData){
return axios.post('/admin/api/bankaccount' , formData);
}, 
EditBankAccount(id,formData){
return axios.put('/admin/api/bankaccount/' + id , formData);
}, 
GetBankAccountNew(){
return axios.get('/admin/api/bankaccount/new');
}, 






 // ============== Student Part =======================
GetAllStudents(page,countPerPage,username,email,platform,std_number,first_name,family_name,faculty_id,department_id) { 
return axios.get('/admin/api/student?page=' + page + '&count=' + countPerPage+ '&username=' + username+ '&email=' + email+ '&platform=' + platform+ '&std_number=' + std_number+ '&first_name=' + first_name+ '&family_name=' + family_name+ '&faculty_id=' + faculty_id+ '&department_id=' + department_id);
}, 

DeleteStudent(id){
return axios.delete('/admin/api/student/' + id);
}, 
GetStudentById(id){
return axios.get('/admin/api/student/' + id);
}, 
PostNewStudent(formData){
return axios.post('/admin/api/student' , formData);
}, 
EditStudent(id,formData){
return axios.put('/admin/api/student/' + id , formData);
}, 
GetStudentNew(){
return axios.get('/admin/api/student/new');
}, 






 // ============== College Part =======================
GetAllColleges(page,countPerPage,name,description,address,study_system) { 
return axios.get('/admin/api/college?page=' + page + '&count=' + countPerPage+ '&name=' + name+ '&description=' + description+ '&address=' + address+ '&study_system=' + study_system);
}, 

DeleteCollege(id){
return axios.delete('/admin/api/college/' + id);
}, 
GetCollegeById(id){
return axios.get('/admin/api/college/' + id);
}, 
PostNewCollege(formData){
return axios.post('/admin/api/college' , formData);
}, 
EditCollege(id,formData){
return axios.put('/admin/api/college/' + id , formData);
}, 
GetCollegeNew(){
return axios.get('/admin/api/college/new');
}, 



 // ============== Department Part =======================
GetAllDepartments(page,countPerPage,name) { 
return axios.get('/admin/api/department?page=' + page + '&count=' + countPerPage+ '&name=' + name);
}, 

DeleteDepartment(id){
return axios.delete('/admin/api/department/' + id);
}, 
GetDepartmentById(id){
return axios.get('/admin/api/department/' + id);
}, 
PostNewDepartment(formData){
return axios.post('/admin/api/department' , formData);
}, 
EditDepartment(id,formData){
return axios.put('/admin/api/department/' + id , formData);
}, 
GetDepartmentNew(){
return axios.get('/admin/api/department/new');
}, 



 // ============== Notification Part =======================
GetAllNotifications(page,countPerPage,type,student_id,section_id,department_id,college_id,is_sent) { 
return axios.get('/admin/api/notification?page=' + page + '&count=' + countPerPage+ '&type=' + type+ '&student_id=' + student_id+ '&section_id=' + section_id+ '&department_id=' + department_id+ '&college_id=' + college_id+ '&is_sent=' + is_sent);
}, 

DeleteNotification(id){
return axios.delete('/admin/api/notification/' + id);
}, 
GetNotificationById(id){
return axios.get('/admin/api/notification/' + id);
}, 
PostNewNotification(formData){
return axios.post('/admin/api/notification' , formData);
}, 
EditNotification(id,formData){
return axios.put('/admin/api/notification/' + id , formData);
}, 
GetNotificationNew(){
return axios.get('/admin/api/notification/new');
}, 



 // ============== Banner Part =======================
GetAllBanners(page,countPerPage) { 
return axios.get('/admin/api/banner?page=' + page + '&count=' + countPerPage);
}, 

DeleteBanner(id){
return axios.delete('/admin/api/banner/' + id);
}, 
GetBannerById(id){
return axios.get('/admin/api/banner/' + id);
}, 
PostNewBanner(formData, config){
return axios.post('/admin/api/banner' , formData, config);
}, 
EditBanner(id,formData){
return axios.put('/admin/api/banner/' + id , formData);
}, 
GetBannerNew(){
return axios.get('/admin/api/banner/new');
}, 



 // ============== Board Part =======================
GetAllBoards(page,countPerPage,is_active,level,college,department,admin) { 
return axios.get('/admin/api/board?page=' + page + '&count=' + countPerPage+ '&is_active=' + is_active+ '&level=' + level+ '&college=' + college+ '&department=' + department+ '&admin=' + admin);
}, 

DeleteBoard(id){
return axios.delete('/admin/api/board/' + id);
}, 
GetBoardById(id){
return axios.get('/admin/api/board/' + id);
}, 
PostNewBoard(formData){
return axios.post('/admin/api/board' , formData);
}, 
EditBoard(id,formData){
return axios.put('/admin/api/board/' + id , formData);
}, 
GetBoardNew(){
return axios.get('/admin/api/board/new');
}, 



 // ============== OldStudent Part =======================
GetAllOldStudents(page,countPerPage,index,std_number,first_name,family_name,graduation_year,is_solved) { 
return axios.get('/admin/api/oldstudent?page=' + page + '&count=' + countPerPage+ '&index=' + index+ '&std_number=' + std_number+ '&first_name=' + first_name+ '&family_name=' + family_name+ '&graduation_year=' + graduation_year+ '&is_solved=' + is_solved);
}, 

DeleteOldStudent(id){
return axios.delete('/admin/api/oldstudent/' + id);
}, 
GetOldStudentById(id){
return axios.get('/admin/api/oldstudent/' + id);
}, 
PostNewOldStudent(formData){
return axios.post('/admin/api/oldstudent' , formData);
}, 
EditOldStudent(id,formData){
return axios.put('/admin/api/oldstudent/' + id , formData);
}, 
GetOldStudentNew(){
return axios.get('/admin/api/oldstudent/new');
}, 



 // ============== Calendar Part =======================
GetAllCalendars(page,countPerPage,name,type,season_id,is_active) { 
return axios.get('/admin/api/calendar?page=' + page + '&count=' + countPerPage+ '&name=' + name+ '&type=' + type+ '&season_id=' + season_id+ '&is_active=' + is_active);
}, 

DeleteCalendar(id){
return axios.delete('/admin/api/calendar/' + id);
}, 
GetCalendarById(id){
return axios.get('/admin/api/calendar/' + id);
}, 
PostNewCalendar(formData){
return axios.post('/admin/api/calendar' , formData);
}, 
EditCalendar(id,formData){
return axios.put('/admin/api/calendar/' + id , formData);
}, 
GetCalendarNew(){
return axios.get('/admin/api/calendar/new');
}, 



 // ============== College Part =======================
GetAllColleges(page,countPerPage,name) { 
return axios.get('/admin/api/college?page=' + page + '&count=' + countPerPage+ '&name=' + name);
}, 

DeleteCollege(id){
return axios.delete('/admin/api/college/' + id);
}, 
GetCollegeById(id){
return axios.get('/admin/api/college/' + id);
}, 
PostNewCollege(formData){
return axios.post('/admin/api/college' , formData);
}, 
EditCollege(id,formData){
return axios.put('/admin/api/college/' + id , formData);
}, 
GetCollegeNew(){
return axios.get('/admin/api/college/new');
}, 



 // ============== Email Part =======================
GetAllEmails(page,countPerPage,user_id,email,is_created,reset_password) { 
return axios.get('/admin/api/email?page=' + page + '&count=' + countPerPage+ '&user_id=' + user_id+ '&email=' + email+ '&is_created=' + is_created+ '&reset_password=' + reset_password);
}, 

DeleteEmail(id){
return axios.delete('/admin/api/email/' + id);
}, 
GetEmailById(id){
return axios.get('/admin/api/email/' + id);
}, 
PostNewEmail(formData){
return axios.post('/admin/api/email' , formData);
}, 
EditEmail(id,formData){
return axios.put('/admin/api/email/' + id , formData);
}, 
GetEmailNew(){
return axios.get('/admin/api/email/new');
}, 



 // ============== Email Part =======================
GetAllEmails(page,countPerPage,user_id,email,is_created,reset_password) { 
return axios.get('/admin/api/email?page=' + page + '&count=' + countPerPage+ '&user_id=' + user_id+ '&email=' + email+ '&is_created=' + is_created+ '&reset_password=' + reset_password);
}, 

DeleteEmail(id){
return axios.delete('/admin/api/email/' + id);
}, 
GetEmailById(id){
return axios.get('/admin/api/email/' + id);
}, 
PostNewEmail(formData){
return axios.post('/admin/api/email' , formData);
}, 
EditEmail(id,formData){
return axios.put('/admin/api/email/' + id , formData);
}, 
GetEmailNew(){
return axios.get('/admin/api/email/new');
}, 













 // ============== DropCourse Part =======================
GetAllDropCourses(page,countPerPage,std_id,course_id,college_id,department_id,std_name,is_solved) { 
return axios.get('/admin/api/dropcourse?page=' + page + '&count=' + countPerPage+ '&std_id=' + std_id+ '&course_id=' + course_id+ '&college_id=' + college_id+ '&department_id=' + department_id+ '&std_name=' + std_name+ '&is_solved=' + is_solved);
}, 

DeleteDropCourse(id){
return axios.delete('/admin/api/dropcourse/' + id);
}, 
GetDropCourseById(id){
return axios.get('/admin/api/dropcourse/' + id);
}, 
PostNewDropCourse(formData){
return axios.post('/admin/api/dropcourse' , formData);
}, 
EditDropCourse(id,formData){
return axios.put('/admin/api/dropcourse/' + id , formData);
}, 
GetDropCourseNew(){
return axios.get('/admin/api/dropcourse/new');
}, 



 //xapi


    
};
