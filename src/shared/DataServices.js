import axios from "axios";
// const domain = 'https://cloudsoft.ly/admin/api';
const domain = 'http://localhost:8000/admin/v1/api';

export default {
    // ============== Auth Part =======================
    Login(loginData) {
        return axios.post(`${domain}/login`, loginData);
    },
    CheckToken() {
        return axios.get(`${domain}/auth/profile`);
    },
    Logout() {
        return axios.get(`${domain}/logout`);
    },
    ChangeName(formData) {
        return axios.post(`${domain}/auth/name`, formData);
    },
    ChangePassword(formData) {
        return axios.post(`${domain}/auth/password`, formData);
    },
    ChangePhoto(data, config) {
        return axios.post(`${domain}/auth/photo`, data, config);
    },
    // ============== Home Part =======================
    GetHome() {
        return axios.get(`${domain}/home`);
    },

    
    // ============== Admin Part =======================
    GetAllAdmins(page,countPerPage,tag,phone,firstName,lastName) {
        return axios.get(`${domain}/admin?page=` + page + "&count=" + countPerPage + "&status=" + (tag==null?'':tag) + "&phone=" + phone + "&first_name=" + firstName + "&last_name=" + lastName);
    },
    ActiveAdmin(admin) {
        return axios.put(`${domain}/admin/` + admin + "/active");
    },
    DisActiveAdmin(admin) {
        return axios.put(`${domain}/admin/` + admin + "/disActive");
    },
    DeleteAdmin(admin) {
        return axios.delete(`${domain}/admin/` + admin);
    },
    BannedAdmin(admin) {
        return axios.put(`${domain}/admin/` + admin + "/banned");
    },
    ResetAdminPassword(admin) {
        return axios.put(`${domain}/admin/` + admin + "/reset");
    },
    GetAdminById(admin) {
        return axios.get(`${domain}/admin/` + admin);
    },
    GetAdminByIdWithRoles(admin) {
        return axios.get(`${domain}/admin/` + admin + "/roles");
    },
    GetNewAdmin() {
        return axios.get(`${domain}/admin/new`);
    },
    PostNewAdmin(admin) {
        return axios.post(`${domain}/admin`, admin);
    },
    UpdateAdminRole(admin, formData) {
        return axios.put(`${domain}/admin/` + admin , formData);
    },

    // ============== Role Part =======================
    GetAllRoles(page,countPerPage,name) {
        return axios.get(`${domain}/role?page=` + page + "&count=" + countPerPage + "&name=" + name);
    },
    GetRoleById(role) {
        return axios.get(`${domain}/role/` + role);
    },
    DeleteRole(role) {
        return axios.delete(`${domain}/role/` + role);
    },
    GetNewRole() {
        return axios.get(`${domain}/role/new`);
    },
    PostNewRole(role) {
        return axios.post(`${domain}/role`, role);
    },
    EditRole(role, formData) {
        return axios.put(`${domain}/role/` + role, formData);
    },





 // ============== Currency Part =======================
GetAllCurrencies(page,countPerPage,name,abbreviation) { 
return axios.get('https://cloudsoft.ly/admin/api/currency?page=' + page + '&count=' + countPerPage+ '&name=' + name+ '&abbreviation=' + abbreviation);
}, 

DeleteCurrency(id){
return axios.delete('https://cloudsoft.ly/admin/api/currency/' + id);
}, 
GetCurrencyById(id){
return axios.get('https://cloudsoft.ly/admin/api/currency/' + id);
}, 
PostNewCurrency(formData){
return axios.post('https://cloudsoft.ly/admin/api/currency' , formData);
}, 
EditCurrency(id,formData){
return axios.put('https://cloudsoft.ly/admin/api/currency/' + id , formData);
}, 
GetCurrencyNew(){
return axios.get('https://cloudsoft.ly/admin/api/currency/new');
}, 



 
    // ============== User Part =======================
    GetAllUsers(page,countPerPage,tag,phone,firstName,lastName) {
        return axios.get(`${domain}/user?page=` + page + "&count=" + countPerPage + "&status=" + (tag==null?'':tag) + "&phone=" + phone + "&first_name=" + firstName + "&last_name=" + lastName);
    },

    GetUserById(user) {
        return axios.get(`${domain}/user/` + user);
    },
    BannedUser(user) {
        return axios.put(`${domain}/user/` + user + "/banned");
    },

    DeleteUser(user) {
        return axios.delete(`${domain}/user/` + user);
    },



    // ============== User Notifications Part =======================
    GetAllUserNotifications(page,countPerPage,title,type,is_sent,user_id) {
        return axios.get(`${domain}/usernotification?page=` + page + "&count=" + countPerPage + "&user_id=" + (user_id==null?'':user_id) + "&title=" + title + "&type=" + type + "&is_sent=" + is_sent);
    },


    DeleteUserNotification(notification) {
        return axios.delete(`${domain}/usernotification/` + notification);
    },






 //xapi


    
};
