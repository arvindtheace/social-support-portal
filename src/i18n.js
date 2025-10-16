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
                    step1: 'Personal Information',
                    step2: 'Family & Financial Info',
                    step3: 'Situation Descriptions',
                    next: 'Next',
                    back: 'Back',
                    skip: 'Skip',
                    finish: 'Finish'
                }
            },
            ar: {
                translation: {
                    step1: 'معلومات شخصية',
                    step2: 'المعلومات العائلية والمالية',
                    step3: 'وصف الموقف',
                    next: "التالي",
                    back: "السابق",
                    skip: "تخطي",
                    finish: "إنهاء",
                    "Personal Information": "معلومات شخصية",
                    Name: "اسم",
                    "National ID": "الهوية الوطنية",
                    "Date of Birth": "تاريخ الميلاد",
                    "Gender": "جنس",
                    "Address": "عنوان",
                    "City": "مدينة",
                    "State": "ولاية",
                    "Country": "دولة",
                    "Phone": "هاتف",
                    "Email": "بريد إلكتروني",
                    "is required": "مطلوب",
                    "Male": "ذكر",
                    "Female": "أنثى",
                    "Other": "آحرون",
                    "Phone must be 10 digits": "يجب أن يكون الهاتف مكونًا من 10 أرقام",
                    "Enter a valid email": "أدخل بريدًا إلكترونيًا صالحًا",
                    "Marital Status": "الحالة الاجتماعية",
                    "Single": "أعزب",
                    "Married": "متزوج",
                    "Divorced": "مُطلّق",
                    "Widowed": "أرمل",
                    "Dependents": "المعالين",
                    "Employment Status": "الحالة الوظيفية",
                    "Employed": "موظف",
                    "Unemployed": "غير موظف",
                    "Self-Employed": "العاملون لحسابهم الخاص",
                    "Student": "طالب",
                    "Monthly Income": "الدخل الشهري",
                    "Housing Status": "حالة السكن",
                    "Owned": "مملوكة",
                    "Rented": "مستأجرة",
                    "Living with Family": "العيش مع العائلة",
                    "Other": "آخر",
                    "Enter a valid amount": "أدخل مبلغًا صالحًا",
                    "Must be a number": "يجب أن يكون رقم",
                }
            }

        }
    });

export default i18n;