import VueI18n from "vue-i18n";
import { ru } from "@/lang/ru";
import { en } from "@/lang/en";
import Vue from "vue";

Vue.use(VueI18n);

const messages = {
    en,
    ru
};


export const i18n = new VueI18n({
    locale: 'ru',
    messages,
});