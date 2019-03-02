<template>
  <v-alert
    v-show="show"
    dismissible
    :type="type"
  >
    {{ msg }}
  </v-alert>
</template>

<script>
export default {
  name: 'Message',
  propos: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
    msg: {
      type: String,
      default: ''
    }
  },
  watch: {
    show (value) {
      if (vaule) {
        this.$nextTick(() => {
          this.$el.scrollIntoView(true);
        })
      }
    }
  },
  methods: {
    // close () {
    //   this.$emit('update:show', false);
    // }
  }
}

</script>
<style lang='scss' scoped>
</style>