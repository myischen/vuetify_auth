<template>
  <v-app id="inspire">
    <TheDrawer ref="drawer" />
    <TheHeader @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer" />
    <template>
      <router-view />
    </template>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader'
import TheDrawer from '@/components/layouts/TheDrawer'
import TheFooter from '@/components/layouts/TheFooter'
export default {
  data () {
    return {
      drawer: false,
    };
  },
  components: {
    TheHeader,
    TheDrawer,
    TheFooter
  },
  methods: {}
}

</script>
<style>
</style>