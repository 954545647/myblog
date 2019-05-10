import {mapGetters,mapActions} from 'vuex';

export const blogMixin = {
  computed: {
    ...mapGetters(['blogpageWidth'])
  },
  methods: {
    ...mapActions(['setBlogPageWidth'])
  },
}