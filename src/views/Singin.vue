<template>
  <v-app id="inspire">
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
                <v-toolbar-title>{{$t('login')}}</v-toolbar-title>
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
                >{{ $t('login') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import * as api from '@/api/user'

export default {
  data: () => ({
    username: '',
    password: '',
  }),
  methods: {
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
          const params = {
            username: this.username,
            password: this.password,
          }
          const result = api.create(params).then(res => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>