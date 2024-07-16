import { defineStore } from "pinia";

export const useSessionInfoStore = defineStore("PAPD_SESSION_STORE", {
  state: () => ({
    sessionInfo: {
      actions: 0,
      data: null,
      link_to: null,
    },
  }),
  actions: {
    setsessionlinkstore(actions, data, link_to) {
      this.sessionInfo.actions = actions;
      this.sessionInfo.data = data;
      this.sessionInfo.link_to = link_to;
      sessionStorage.setItem("LINK_TO", JSON.stringify(this.sessionInfo));
    },
    getsessionlinkstore() {
      const session = sessionStorage.getItem("LINK_TO");
      if (session) this.sessionInfo = JSON.parse(session);
    },
  },
});
