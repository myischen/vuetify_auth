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
                  :error-messages="reserrors.username?reserrors.username:
                  errors.collect('username')"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.lazy="type"
                  name="type"
                  :label="$t('Mobile number or email')"
                  :rules="typeRules"
                  :data-vv-as="$t('Mobile number or email')"
                  v-validate="'required'"
                  :error-messages="reserrors.type?reserrors.type:
                  errors.collect('type')"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  name="password"
                  :label="$t('password')"
                  type="password"
                  v-validate="'required'"
                  :error-messages="reserrors.password?reserrors.password:errors.collect('password')"
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
                      type="text"
                      data-vv-validate-on="change"
                      v-validate="'required'"
                      :error-messages="reserrors.verification_code?reserrors.verification_code:errors.collect('verification_code')"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex shrink>
                    <v-btn
                      small
                      color="primary"
                      @click="sedcode"
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
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-text>
            <v-layout
              align-center
              justify-center
            >
              <v-flex
                xs12
                sm6
                grow
              >
                <v-text-field
                  v-model="captcha_code"
                  name="captcha_code"
                  :label="$t('Verification code')"
                  type="text"
                  :rules="captchaCodeRules"
                  :error-messages="messages"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs10
                sm6
                shrink
              >
                <v-img
                  :src="images"
                  @click="getCaptchaCode"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="checkcode"
            >
              确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>
    
<script>
import * as api from '@/api/user'
export default {
  data () {
    return {
      username: '',
      type: '',
      captcha_key: '',
      captcha_code: '',
      verification_key: '',
      verification_code: '',
      Codeshow: false,
      password: '',
      reserrors: {},
      dialog: false,
      images: '',
      messages: '',
      captchaCodeRules: [
        v => !!v || this.$i18n.t('must') + this.$i18n.t('Verification code'),
      ],
      typeRules: [
        v => {
          const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          const phone = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
          if (!(phone.test(v)) && !(email.test(v))) {
            return this.$i18n.t('Mobile number or email') + this.$i18n.t('not true');
          } else if ((phone.test(v)) && !(email.test(v))) {
            this.Codeshow = true;
            return false;
          } else if (!(phone.test(v)) && (email.test(v))) {
            this.Codeshow = false;
            return false;
          } else {
            return false;
          }
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
          let params
          if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.type))) {
            params = {
              username: this.username,
              password: this.password,
              phone: this.type,
              verification_key: this.verification_key,
              verification_code: this.verification_code

            }
          } else {
            params = {
              username: this.username,
              password: this.password,
              email: this.type
            }
          }

          api.singup(params).then(res => {
            this.$store.commit('updateToken', res.meta.access_token);
            this.$store.commit('singIn', res);
          }).catch(error => {
            if (error.status === 422) {
              const resdata = error.data.errors;
              this.reserrors = resdata;
              if (resdata.email) {
                this.reserrors.type = resdata.email;
              } else {
                this.reserrors.type = resdata.phone;
              }
            }
            if (error.status === 401) {
              this.reserrors = {};
              this.reserrors.verification_code = error.data.message;
            }
          })
        }
      })
    },
    getCaptchaCode () {
      api.captchas({ phone: this.type }).then(res => {
        this.dialog = true
        this.captcha_key = res.captcha_key;
        this.images = res.captcha_image_content;
      }).catch(error => {
        this.reserrors = error.data.errors;
        this.reserrors.type = error.data.errors.phone;
      })
    },
    sedcode () {
      this.getCaptchaCode()
    },
    checkcode () {
      api.Codes({ captcha_key: this.captcha_key, captcha_code: this.captcha_code }).then(res => {
        this.verification_key = res.key;
        this.captcha_key = '';
        this.captcha_code = '';
        this.dialog = false;
      }).catch(error => {
        this.messages = error.data.message !== '' ? error.data.message : error.data.errors.captcha_code;
        this.getCaptchaCode();
      })
    }
  }
}
</script>
