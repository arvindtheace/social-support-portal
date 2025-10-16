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
                    step1: "Personal Information",
                    step2: "Family & Financial Information",
                    step3: "Situation Description",
                    next: "Next",
                    back: "Back",
                    skip: "Skip",
                    finish: "Finish",
                    "Personal Information": "Personal Information",
                    "Name": "Name",
                    "National ID": "National ID",
                    "Date of Birth": "Date of Birth",
                    "Gender": "Gender",
                    "Address": "Address",
                    "City": "City",
                    "State": "State",
                    "Country": "Country",
                    "Phone": "Phone",
                    "Email": "Email",
                    "is required": "is required",
                    "Male": "Male",
                    "Female": "Female",
                    "Other": "Other",
                    "Phone must be 10 digits": "Phone must be 10 digits",
                    "Enter a valid email": "Enter a valid email",
                    "Marital Status": "Marital Status",
                    "Single": "Single",
                    "Married": "Married",
                    "Divorced": "Divorced",
                    "Widowed": "Widowed",
                    "Dependents": "Dependents",
                    "Employment Status": "Employment Status",
                    "Employed": "Employed",
                    "Unemployed": "Unemployed",
                    "Self-Employed": "Self-Employed",
                    "Student": "Student",
                    "Monthly Income": "Monthly Income",
                    "Housing Status": "Housing Status",
                    "Owned": "Owned",
                    "Rented": "Rented",
                    "Living with Family": "Living with Family",
                    "Enter a valid amount": "Enter a valid amount",
                    "Must be a number": "Must be a number",
                    "Employment & Financial Details": "Employment & Financial Details",
                    "Situation Description": "Situation Description",
                    "Current Financial Situation": "Current Financial Situation",
                    "Help me to write": "Help me to write",
                    "Employment Circumstances": "Employment Circumstances",
                    "Reason for Applying": "Reason for Applying"
                }
            },
            ar: {
                translation: {
                    step1: 'المعلومات الشخصية',
                    step2: 'المعلومات العائلية والمالية',
                    step3: 'وصف الحالة',
                    next: "التالي",
                    back: "السابق",
                    skip: "تخطي",
                    finish: "إنهاء",
                    "Personal Information": "المعلومات الشخصية",
                    "Name": "الاسم",
                    "National ID": "الهوية الوطنية",
                    "Date of Birth": "تاريخ الميلاد",
                    "Gender": "الجنس",
                    "Address": "العنوان",
                    "City": "المدينة",
                    "State": "الولاية",
                    "Country": "الدولة",
                    "Phone": "الهاتف",
                    "Email": "البريد الإلكتروني",
                    "is required": "مطلوب",
                    "Male": "ذكر",
                    "Female": "أنثى",
                    "Other": "آخر",
                    "Phone must be 10 digits": "يجب أن يتكون رقم الهاتف من 10 أرقام",
                    "Enter a valid email": "أدخل بريدًا إلكترونيًا صالحًا",
                    "Marital Status": "الحالة الاجتماعية",
                    "Single": "أعزب",
                    "Married": "متزوج",
                    "Divorced": "مطلق",
                    "Widowed": "أرمل",
                    "Dependents": "المعالون",
                    "Employment Status": "الحالة الوظيفية",
                    "Employed": "موظف",
                    "Unemployed": "عاطل عن العمل",
                    "Self-Employed": "يعمل لحسابه الخاص",
                    "Student": "طالب",
                    "Monthly Income": "الدخل الشهري",
                    "Housing Status": "حالة السكن",
                    "Owned": "مملوك",
                    "Rented": "مستأجر",
                    "Living with Family": "العيش مع العائلة",
                    "Other": "آخر",
                    "Enter a valid amount": "أدخل مبلغًا صالحًا",
                    "Must be a number": "يجب أن يكون رقمًا",
                    "Employment & Financial Details": "تفاصيل التوظيف والمالية",
                    "Situation Description": "وصف الحالة",
                    "Current Financial Situation": "الوضع المالي الحالي",
                    "Help me to write": "ساعدني في الكتابة",
                    "Employment Circumstances": "ظروف العمل",
                    "Reason for Applying": "سبب التقديم"

                }
            }

        }
    });

export default i18n;