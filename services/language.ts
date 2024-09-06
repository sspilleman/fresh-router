export type Language =
    | "albanian"
    | "arabic"
    | "auto detect"
    | "azerbaijani"
    | "bengali"
    | "brazilian"
    | "bulgarian"
    | "catalan"
    | "chinese (traditional)"
    | "chinese"
    | "czech"
    | "danish"
    | "dutch"
    | "english"
    | "esperanto"
    | "esperanto"
    | "estonian"
    | "finnish"
    | "french"
    | "galician"
    | "german"
    | "greek"
    | "guarani"
    | "hebrew"
    | "hindi"
    | "hungarian"
    | "icelandic"
    | "indonesian"
    | "irish"
    | "italian"
    | "japanese"
    | "korean"
    | "latvian"
    | "lithuanian"
    | "malay"
    | "nepali"
    | "norwegian"
    | "norwegian"
    | "persian"
    | "polish"
    | "portuguese"
    | "romanian"
    | "russian"
    | "slovak"
    | "slovenian"
    | "spanish"
    | "swedish"
    | "swiss"
    | "tagalog"
    | "thai"
    | "turkish"
    | "ukrainian";

export const languages_thesaurus: { language: Language; file: string }[] = [
    { language: "arabic", file: "th_ar" },
    { language: "brazilian", file: "th_pt_BR" },
    { language: "bulgarian", file: "th_bg_BG_v2" },
    { language: "catalan", file: "th_ca_ES_v3" },
    { language: "czech", file: "thes_cs_CZ" },
    { language: "danish", file: "th_da_DK" },
    { language: "english", file: "th_en_US_v2" },
    { language: "esperanto", file: "th_eo" },
    { language: "french", file: "thes_fr" },
    { language: "galician", file: "thesaurus_gl" },
    { language: "german", file: "th_de_DE_v2" },
    { language: "guarani", file: "th_gug_PY" },
    { language: "hungarian", file: "th_hu_HU_v2" },
    { language: "icelandic", file: "th_is" },
    { language: "indonesian", file: "th_id_ID_v2" },
    { language: "italian", file: "th_it_IT_v2" },
    { language: "latvian", file: "th_lv_LV_v2" },
    { language: "nepali", file: "th_ne_NP_v2" },
    { language: "norwegian", file: "th_nb_NO_v2" },
    { language: "norwegian", file: "th_nn_NO_v2" },
    { language: "polish", file: "th_pl_PL_v2" },
    { language: "portuguese", file: "th_pt_PT" },
    { language: "romanian", file: "th_ro_RO_v2" },
    { language: "russian", file: "th_ru_RU_M_aot_and_v2" },
    { language: "slovak", file: "th_sk_SK_v2" },
    { language: "slovenian", file: "th_sl_SI_v2" },
    { language: "spanish", file: "th_es_v2" },
    { language: "swedish", file: "th_sv_SE" },
    { language: "swiss", file: "th_de_CH_v2" },
    { language: "thai", file: "th_th_TH_v2" },
    { language: "ukrainian", file: "th_uk_UA" },
];

export const languages_translate: { language: Language; code: string }[] = [
    { language: "albanian", code: "sq" },
    { language: "arabic", code: "ar" },
    { language: "auto detect", code: "auto" },
    { language: "azerbaijani", code: "az" },
    { language: "bengali", code: "bn" },
    { language: "bulgarian", code: "bg" },
    { language: "catalan", code: "ca" },
    { language: "chinese (traditional)", code: "zt" },
    { language: "chinese", code: "zh" },
    { language: "czech", code: "cs" },
    { language: "danish", code: "da" },
    { language: "dutch", code: "nl" },
    { language: "english", code: "en" },
    { language: "esperanto", code: "eo" },
    { language: "estonian", code: "et" },
    { language: "finnish", code: "fi" },
    { language: "french", code: "fr" },
    { language: "german", code: "de" },
    { language: "greek", code: "el" },
    { language: "hebrew", code: "he" },
    { language: "hindi", code: "hi" },
    { language: "hungarian", code: "hu" },
    { language: "indonesian", code: "id" },
    { language: "irish", code: "ga" },
    { language: "italian", code: "it" },
    { language: "japanese", code: "ja" },
    { language: "korean", code: "ko" },
    { language: "latvian", code: "lv" },
    { language: "lithuanian", code: "lt" },
    { language: "malay", code: "ms" },
    { language: "norwegian", code: "nb" },
    { language: "persian", code: "fa" },
    { language: "polish", code: "pl" },
    { language: "portuguese", code: "pt" },
    { language: "romanian", code: "ro" },
    { language: "russian", code: "ru" },
    { language: "slovak", code: "sk" },
    { language: "slovenian", code: "sl" },
    { language: "spanish", code: "es" },
    { language: "swedish", code: "sv" },
    { language: "tagalog", code: "tl" },
    { language: "thai", code: "th" },
    { language: "turkish", code: "tr" },
    { language: "ukrainian", code: "uk" },
];

export interface TranslateResponse {
    [language: string]: string;
}

export const thesaurusFile = (language: Language) =>
    languages_thesaurus.find((t) => t.language === language)?.file;

export const translateLanguage = (language: Language) =>
    languages_translate.find((l) => l.language === language)?.code as string;

export const translateCode = (code: string) =>
    languages_translate.find((l) => l.code === code)?.language as Language;

const url = "http://beast:5000/translate";

export const translate = async (source: string, target: string, q: string) => {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ q, source, target, format: "text" }),
        headers: { "Content-Type": "application/json" },
    });
    const { translatedText }: { translatedText: string } = await res.json();
    return translatedText;
};

