import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import pl from './pl'

const savedLang = localStorage.getItem('stem-lang')
const browserLang = navigator.language.startsWith('pl') ? 'pl' : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },
    lng: savedLang ?? browserLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n

export type Lang = 'en' | 'pl'

export function setLanguage(lang: Lang) {
  void i18n.changeLanguage(lang)
  localStorage.setItem('stem-lang', lang)
}
