import { mapGetters, mapActions } from "vuex";

export const blogMixin = {
  computed: {
    ...mapGetters([
      "blogpageWidth",
      "preLoadImages",
      "canshowNextBar",
      "blogRender",
      "blogValue"
    ])
  },
  methods: {
    ...mapActions([
      "setBlogPageWidth",
      "setPreLoadImages",
      "setNextBar",
      "setBlogValue",
      "setBlogRender"
    ])
  }
};
