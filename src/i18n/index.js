import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  fallbackLocale: 'en',
  silentTranslationWarn: true, // 关闭警告
  messages: {
    'zh_CN': require('../lang/zh'), // 中文语言包
    en: require('@/lang/en') // 英文语言包
  }
})

export default i18n
