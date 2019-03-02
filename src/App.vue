<template>
  <v-app>
    <router-view />
    <TheFooter />
  </v-app>
</template>

<script>
import TheFooter from '@/components/layouts/TheFooter'
export default {
  components: {
    TheFooter
  },
  data () {
    return {
    }
  }
}
</script>
