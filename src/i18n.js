import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    //   // learn more: https://github.com/i18next/i18next-browser-languageDetector
    //   .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    description: {
                        part1: 'Edit <1>src/App.js</1> and save to reload.',
                        part2: 'Learn React'
                    },
                    outlined: 'Outlined',
                    counter_one: 'Changed language just once',
                    counter_other: 'Changed language already {{count}} times'
                }
            },
            ar: {
                translation: {
                    description: {
                        part1: 'src/App.jsوحفظه لإعادة التحميل.',
                        part2: 'تعلم React'
                    },
                    outlined: 'مطلق',
                    counter_zero: 'لم يتم تغيير اللغة بعد',
                    counter_one: 'تم تغيير اللغة مرة واحدة فقط',
                    counter_two: 'تم تغيير اللغة مرتين',
                    counter_few: 'تم تغيير اللغة {{count}} مرات',
                    counter_many: 'تم تغيير اللغة {{count}} مرة',
                    counter_other: 'تم تغيير اللغة {{count}} مرات'
                }
            }

        }
    });

export default i18n;