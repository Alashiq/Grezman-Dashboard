// State
const state = {
    language:'ar',
};

// Getters
const getters = {
    language(state) {
        return state.language;
    },
    dir(state) {
        if(state.language=='ar')
        return 'rtl';
        else
        return 'ltr';
    },
};

// Mutations
const mutations = {
    channgeLanguage(state,language){
        state.language=language;
        localStorage.setItem("language", language);
    }
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