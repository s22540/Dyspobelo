import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Change Password": "Change Password",
            "Language": "Language",
            "More Settings": "More Settings",
            "Dark Mode": "Dark Mode",
            "User": "User",
            "Logout": "Logout",
            "Current Password": "Current Password",
            "New Password": "New Password",
            "Confirm New Password": "Confirm New Password",
            "Submit": "Submit"
        }
    },
    pl: {
        translation: {
            "Change Password": "Zmieñ has³o",
            "Language": "Jêzyk",
            "More Settings": "Wiêcej ustawieñ",
            "Dark Mode": "Czarny tryb",
            "User": "U¿ytkownik",
            "Logout": "Wyloguj",
            "Current Password": "Obecne has³o",
            "New Password": "Nowe has³o",
            "Confirm New Password": "PotwierdŸ nowe has³o",
            "Submit": "ZatwierdŸ"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
