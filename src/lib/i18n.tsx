import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "en" | "ar";

type Ctx = {
  language: Lang;
  setLanguage: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>("en");

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
    tag: "Trusted Iraqi Contractor",
    title: "Building Iraq’s Future",
    titleAccent: "with Confidence & Expertise",
    subtitle:
      "NURDAR Al Faisal for General Contracting delivers high-quality civil, infrastructure, and electrical projects with professionalism, integrity, and technical excellence.",
    viewProjects: "View Projects",
    contactUs: "Contact Us",
  },

    about: {
    header: "About Company",
    subHeader:
      "Learn about our history, our leadership, and our vision for the future of construction in Iraq.",
    leadership: "Leadership",
    mdMessage: "Message from the Managing Director",
    companyDetails: "Company Details",
    vision: "Our Vision",
    objectives: "Our Objectives",
    values: "Our Values",
  },

  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "حول",
      services: "الخدمات",
      projects: "المشاريع",
      contact: "تواصل",
    },
    hero: {
    tag: "شريك عراقي موثوق",
    title: "نبني مستقبل العراق",
    titleAccent: "بثقة وخبرة",
    subtitle:
      "شركة نوردار الفيصل للمقاولات العامة تقدم مشاريع إنشائية وبنى تحتية وكهربائية عالية الجودة وفق أعلى المعايير المهنية والفنية.",
    viewProjects: "مشاريعنا",
    contactUs: "تواصل معنا",
  },

    about: {
    header: "حول الشركة",
    subHeader:
      "تعرف على تاريخنا وقيادتنا ورؤيتنا لمستقبل البناء والتنمية في العراق.",
    leadership: "القيادة",
    mdMessage: "رسالة المدير المفوض",
    companyDetails: "بيانات الشركة",
    vision: "رؤيتنا",
    objectives: "أهدافنا",
    values: "قيمنا",
  },

  },
} as const;
