
import authModule from './modules/auth'
import langModule from './modules/lang'

export default {
    state: () => ({
        pages: [
            {
                id: 1,
                target: 0, // 0 label - 1 page
                name: "الرئيسية",
                nameEn: "Home",
                role: "HomeLabel",
                url: "/admin",
                icon: "fa-regular fa-house",
                list: [],
            },
            {
                id: 2,
                target: 1, // 0 label - 1 page
                name: "الصفحة الرئيسية",
                nameEn: "Home Page",
                role: "HomeChart",
                url: "/admin",
                icon: "fa-sharp fa-solid fa-house",
                list: [],
            },






            {
                id: 3,
                target: 0, // 0 label - 1 page
                name: "الإعدادات",
                nameEn: "Settings",
                role: "SettingLabel",
                url: "/admin",
                icon: "fas fa-home",
                list: [],
            },
            {
                id: 5,
                target: 1, // 0 label - 1 page
                name: "المشرفين والصلاحيات",
                nameEn: "Admins & Roles",
                role: "RolePermissionsList",
                url: "/admin",
                icon: "fas fa-user-shield",
                list: [
                    {
                        id: 1,
                        name: "قائمة المشرفين",
                        nameEn: "Admins List",
                        role: "ReadAdmin",
                        url: "/admin/admin",
                    },
                    {
                        id: 2,
                        name: "إضافة مشرف",
                        nameEn: "New Admin",
                        role: "CreateAdmin",
                        url: "/admin/admin/new",
                    },
                    {
                        id: 3,
                        name: "أدوار المشرفين",
                        nameEn: "Roles List",
                        role: "ReadRole",
                        url: "/admin/role",
                    },
                    {
                        id: 4,
                        name: "إضافة دور",
                        nameEn: "New Role",
                        role: "CreateRole",
                        url: "/admin/role/new",
                    },
                ],
            },






            {
                id: 36,
                target: 1,
                name: 'الطلاب',
                nameEn: 'Students',
                role: 'RolePermissionsList',
                url: '/student',
                icon: 'fas fa-user-graduate',
                list: [
                    {
                        id: 1,
                        name: 'قائمة الطلاب',
                        nameEn: 'Students List',
                        role: 'ReadStudent',
                        url: '/admin/student',
                    },
                    {
                        id: 2,
                        name: 'أضف طالب',
                        nameEn: 'New Students',
                        role: 'CreateStudent',
                        url: '/admin/student/new',
                    },
                ],
            },







 { 
id: 38,  
target: 1,  
 name: 'الأقسام', 
nameEn: 'Departments', 
role: 'RolePermissionsList', 
url: '/department', 
icon: 'far fa-building', 
list: [ 
{ 
id: 1, 
name: 'قائمة الأقسام', 
nameEn: 'Departments List', 
role: 'ReadDepartment', 
url: '/admin/department', 
}, 
{ 
id: 2, 
name: 'أضف قسم', 
nameEn: 'New Departments', 
role: 'CreateDepartment', 
url: '/admin/department/new', 
}, 
], 
}, 


 { 
id: 39,  
target: 1,  
 name: 'الإشعارات', 
nameEn: 'Notifications', 
role: 'RolePermissionsList', 
url: '/notification', 
icon: 'far fa-bell', 
list: [ 
{ 
id: 1, 
name: 'قائمة الإشعارات', 
nameEn: 'Notifications List', 
role: 'ReadNotification', 
url: '/admin/notification', 
}, 
{ 
id: 2, 
name: 'أضف إشعار', 
nameEn: 'New Notifications', 
role: 'CreateNotification', 
url: '/admin/notification/new', 
}, 
], 
}, 


 { 
id: 40,  
target: 1,  
 name: 'البانرات', 
nameEn: 'Banners', 
role: 'RolePermissionsList', 
url: '/banner', 
icon: 'far fa-newspaper', 
list: [ 
{ 
id: 1, 
name: 'قائمة البانرات', 
nameEn: 'Banners List', 
role: 'ReadBanner', 
url: '/admin/banner', 
}, 
{ 
id: 2, 
name: 'أضف بانر', 
nameEn: 'New Banners', 
role: 'CreateBanner', 
url: '/admin/banner/new', 
}, 
], 
}, 


 { 
id: 41,  
target: 1,  
 name: 'الإعلانات', 
nameEn: 'Boards', 
role: 'RolePermissionsList', 
url: '/board', 
icon: 'fas fa-tv', 
list: [ 
{ 
id: 1, 
name: 'قائمة الإعلانات', 
nameEn: 'Boards List', 
role: 'ReadBoard', 
url: '/admin/board', 
}, 
{ 
id: 2, 
name: 'أضف إعلان', 
nameEn: 'New Boards', 
role: 'CreateBoard', 
url: '/admin/board/new', 
}, 
], 
}, 


 { 
id: 42,  
target: 1,  
 name: 'الطلاب_قدامى', 
nameEn: 'OldStudents', 
role: 'RolePermissionsList', 
url: '/oldstudent', 
icon: 'fas fa-user-shield', 
list: [ 
{ 
id: 1, 
name: 'قائمة الطلاب_قدامى', 
nameEn: 'OldStudents List', 
role: 'ReadOldStudent', 
url: '/admin/oldstudent', 
}, 
{ 
id: 2, 
name: 'أضف طالب_قديم', 
nameEn: 'New OldStudents', 
role: 'CreateOldStudent', 
url: '/admin/oldstudent/new', 
}, 
], 
}, 


 { 
id: 43,  
target: 1,  
 name: 'التقاويم', 
nameEn: 'Calendars', 
role: 'RolePermissionsList', 
url: '/calendar', 
icon: 'fas fa-user-shield', 
list: [ 
{ 
id: 1, 
name: 'قائمة التقاويم', 
nameEn: 'Calendars List', 
role: 'ReadCalendar', 
url: '/admin/calendar', 
}, 
{ 
id: 2, 
name: 'أضف تقويم', 
nameEn: 'New Calendars', 
role: 'CreateCalendar', 
url: '/admin/calendar/new', 
}, 
], 
}, 


 { 
id: 37,  
target: 1,  
 name: 'الكليات', 
nameEn: 'Colleges', 
role: 'RolePermissionsList', 
url: '/college', 
icon: 'fas fa-user-shield', 
list: [ 
{ 
id: 1, 
name: 'قائمة الكليات', 
nameEn: 'Colleges List', 
role: 'ReadCollege', 
url: '/admin/college', 
}, 
{ 
id: 2, 
name: 'أضف كلية', 
nameEn: 'New Colleges', 
role: 'CreateCollege', 
url: '/admin/college/new', 
}, 
], 
}, 


 { 
id: 44,  
target: 1,  
 name: 'البريدات_إلكترونية', 
nameEn: 'Emails', 
role: 'RolePermissionsList', 
url: '/email', 
icon: 'fas fa-user-shield', 
list: [ 
{ 
id: 1, 
name: 'قائمة البريدات_إلكترونية', 
nameEn: 'Emails List', 
role: 'ReadEmail', 
url: '/admin/email', 
}, 
{ 
id: 2, 
name: 'أضف بريد_إلكتروني', 
nameEn: 'New Emails', 
role: 'CreateEmail', 
url: '/admin/email/new', 
}, 
], 
}, 









 { 
id: 45,  
target: 1,  
 name: 'الطلباتـالإسقاط', 
nameEn: 'DropCourses', 
role: 'RolePermissionsList', 
url: '/dropcourse', 
icon: 'fas fa-user-shield', 
list: [ 
{ 
id: 1, 
name: 'قائمة الطلباتـالإسقاط', 
nameEn: 'DropCourses List', 
role: 'ReadDropCourse', 
url: '/admin/dropcourse', 
}, 
{ 
id: 2, 
name: 'أضف طلبـإسقاط', 
nameEn: 'New DropCourses', 
role: 'CreateDropCourse', 
url: '/admin/dropcourse/new', 
}, 
], 
}, 


 //xlink
        ],
        pageActive: 4,
        subPageActive: 1,
        openPageList: 4,
        loading: false,

        // Menu
        menu: false,
        languageMenu: false,
        userMenu: false,


    }),

    mutations: {

        activePage(state, v) {
            state.pageActive = v.main;
            state.subPageActive = v.sub;
            state.openPageList = v.main;
        },
        toggllePageList(state, pageNumber) {
            if (state.openPageList != pageNumber)
                state.openPageList = pageNumber;
            else
                state.openPageList = 0;
        },
        // Loading 
        loadingStart(state) {
            state.loading = true;
        },
        loadingStop(state) {
            state.loading = false;
        },
        // Menu
        toggleMenu(state) {
            state.menu = !state.menu;
        },
        toggleLanguageMenu(state, val) {
            if (val == 1)
                state.languageMenu = !state.languageMenu;
            else
                state.languageMenu = false;
        },
        toggleUserMenu(state, val) {
            if (val == 1)
                state.userMenu = !state.userMenu;
            else
                state.userMenu = false;
        },
    },

    actions: {
    },
    modules: {
        authModule: authModule,
        langModule: langModule
    }
};

