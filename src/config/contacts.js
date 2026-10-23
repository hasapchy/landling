// Единый источник контактных данных компании.
// Меняешь тут — обновляется везде, где используется.
// Адрес сюда не входит — он на разных языках разный, поэтому хранится
// в переводах (ru.json/en.json/tm.json → contactModal.address).

export const CONTACTS = {
    instagram: 'https://www.instagram.com/lebizli_tehnologiya_merkezi', // впиши реальную ссылку
    telegram: 'https://t.me/ltmdigital_dev',
    linkedin: 'https://www.linkedin.com/company/ltm-studio/', // впиши реальную ссылку

    phone: '+993 12 75 37 13',
    phoneHref: 'tel:+99312753713',

    phone2: '+993 61 00 97 92',
    phone2Href: 'tel:+99361009792',

    // офис на карте: 37°57'23.6"N 58°25'34.8"E
    mapLat: 37.956556,
    mapLng: 58.426333,
    mapHref: 'https://www.google.com/maps?q=37.956556,58.426333',
    mapEmbed: 'https://maps.google.com/maps?q=37.956556,58.426333&z=16&hl=ru&output=embed',

    email: 'info@ltm.studio',
    emailHref: 'mailto:info@ltm.studio',

    // мобильное приложение: пока '#' — кнопки показывают «Скоро».
    // Когда будут реальные ссылки на магазины — впиши их сюда, и кнопки заработают везде.
    appStore: 'https://apps.apple.com/tm/app/hasapp/id6768267016?l=ru',
    googlePlay: 'https://play.google.com/store/apps/details?id=studio.ltm.hasap&pcampaignid=web_share',
}