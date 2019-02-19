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
              <v-toolbar-title>{{$t('singup')}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  name="username"
                  :label="$t('name')"
                  :data-vv-as="$t('name')"
                  type="text"
                  v-validate="'required'"
                  :error-messages="
                  errors.collect('username')"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.lazy="type"
                  name="type"
                  :label="$t('Mobile number or email')"
                  :rules="typeRules"
                  v-validate="'required'"
                  :error-messages="
                  errors.collect('type')"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  name="password"
                  :label="$t('password')"
                  type="password"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  required
                ></v-text-field>
                <v-layout
                  row
                  v-if="Codeshow"
                >
                  <v-flex grow>
                    <v-text-field
                      v-model="verification_code"
                      name="verification_code"
                      :label="$t('Verification code')"
                      data-vv-validate-on="change"
                      v-validate="'required'"
                      :error-messages="errors.collect('verification_code')"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex shrink>
                    <v-btn
                      small
                      color="primary"
                    >seedcode</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="submit"
              >{{ $t('singup') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      type: '',
      typeError: '',
      verification_code: '',
      Codeshow: false,
      password: '',
      typeRules: [
        v => {
          const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
          const phone = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/
          if (!(phone.test(v)) && !(email.test(v))) {
            return this.$i18n.t('Mobile number or email') + '不正确' // '手机号或邮箱不正确';
          } else if ((phone.test(v)) && !(email.test(v))) {
            this.Codeshow = true
            return false
          } else if (!(phone.test(v)) && (email.test(v))) {
            this.Codeshow = false
            return false
          } else {
            return false
          }
        }
      ]

    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) { }
      })
    }

  }
}
</script>
