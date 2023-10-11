export const i18n = {
    defaultLocale: 'en',
    locales: ['zh', 'en'],
    show_locales: {
        "zh": "简体中文",
        "en": "English",
    }
} as const

export type Locale = (typeof i18n)['locales'][number]