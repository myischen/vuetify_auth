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
                  :error-messages="reserrors.username?reserrors.username:
                  errors.collect('username')"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="
                  lock"
                  v-model="password"
                  name="password"
                  :label="$t('password')"
                  type="password"
                  v-validate="'required|min:6'"
                  :error-messages="reserrors.password?reserrors.password:errors.collect('password')"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="rememberMe"
                  required
                ></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="submit"
                @keyup.enter.native="submit"
              >{{ $t('singin') }}</v-btn>
            </v-card-actions>
            <v-snackbar
              v-model="snackbar"
              color="error"
              multi-line
              top
              :timeout="6000"
            >
              {{text}}
              <v-btn
                dark
                flat
                @click="snackbar = false"
              >关闭</v-btn>
            </v-snackbar>
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
import ls from '@/utils/localStorage';

export default {
  data: () => ({
    username: '',
    password: '',
    token: null,
    rememberMe: false,
    dialog: false,
    reserrors: {},
    snackbar: false,
    text: '',
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
            this.reserrors = {};
            if (this.rememberMe) ls.setItem('token', res.access_token);
            this.$store.commit('setToken', res.access_token);
            this.dialog = true;
            api.info().then(data => {
              this.$store.dispatch('singIn', data.data);
            });
            api.userMenu().then(Menu => {
              this.$store.commit('setMenu', Menu);
            })
          }).catch(error => {
            if (error.status === 422) {
              this.reserrors = error.data.errors;
            }
            if (error.status === 401) {
              this.snackbar = true;
              this.text = error.data.message;

            }
          })


        }
      })
    }
  }
}
</script>
