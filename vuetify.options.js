import colors from 'vuetify/es5/util/colors';

const { base, lighten5, lighten4, lighten3, lighten2, lighten1, darken1, darken2, darken3, darken4 } = colors.lightGreen;

export default {
  theme: {
    themes: {
      light: {
        primary: { base, lighten5, lighten4, lighten3, lighten2, lighten1, darken1, darken2, darken3, darken4 },
      },
    },
  },
};
