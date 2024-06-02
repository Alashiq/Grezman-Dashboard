// State
const state = {
    loadAuth: false,
    auth: false,
    user: {
        id: null,
        name: "",
        phone: "",
        photo: "",
        role: "",
        level: "",
        college_id: "",
        department_id: ""
    },
    permissions: [],
};

// Getters
const getters = {
    loadAuth(state) {
        return state.loadAuth;
    },
    auth(state) {
        return state.auth;
    },
    user(state) {
        return state.user;
    },
    permissions(state) {
        return state.permissions;
    },
};

// Mutations
const mutations = {
    setUser(state, data) {
        state.user = data;
        state.user.name = data.first_name + " " + data.last_name
        state.auth = true;
    },
    setPermissions(state, data) {
        state.permissions = data;
    },
    authLoaded(state) {
        state.loadAuth = true;
    },
    clearUser(state) {
        state.user = {
            id: null,
            name: "",
            phone: "",
            photo: ""
        };
        state.auth = false;
        state.loadAuth = false;
    },
    updateName(state, data) {
        state.user.first_name = data.first_name;
        state.user.last_name = data.last_name;
        state.user.name = data.first_name + " " + data.last_name;
    },
    updatePhoto(state, photo) {
        state.user.photo = photo;
    },
};

// Actions
const actions = {
    async clearAuth({ commit }) {
        this.commit("clearUser");
    },
};



export default {
    state,
    getters,
    mutations,
    actions,
}