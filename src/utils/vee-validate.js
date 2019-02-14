import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'
import i18n from '@/i18n'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import en from 'vee-validate/dist/locale/en'

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN: zh_CN,
    en: en
  }
})

// 自定义validate
const Dictionary = {
  zh_CN: {
    messages: {
      required: field => '请输入' + field
    },
    attributes: {
      username: '账号',
      phone: '手机号',
      password: '密码'
    }
  }
}

/*自定义方法 */
Validator.extend('phone', {
  getMessage: field => '手机格式不正确',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})

// 自定义validate error 信息
Validator.localize(Dictionary)
