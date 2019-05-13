import {mapGetters,mapActions} from 'vuex';

export const blogMixin = {
  computed: {
    ...mapGetters(['blogpageWidth','preLoadImages'])
  },
  methods: {
    ...mapActions(['setBlogPageWidth','setPreLoadImages'])
  },
}