<template>
  <v-content>
    <v-container
      fluid
      fill-height
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>{{$t('singin')}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  v-model="username"
                  name="username"
                  :label="$t('username')"
                  type="text"
                  v-validate="'required'"
                  :error-messages="errors.collect('username')"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  v-model="password"
                  name="password"
                  :label="$t('password')"
                  type="password"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="submit"
              >{{ $t('singin') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            加载中.....
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import * as api from '@/api/user'

export default {
  data: () => ({
    username: '',
    password: '',
    token: null,
    dialog: false
  }),
  methods: {
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
          const params = {
            username: this.username,
            password: this.password
          }
          api.singin(params).then(res => {
            this.token = res;
            this.$store.commit('updateToken', res.access_token);
            this.dialog = true;
          }).then(() => {
            api.info().then(data => {
              this.$store.commit('singIn', data.data);
            })
          })
        }
      })
    }
  }
}
</script>
