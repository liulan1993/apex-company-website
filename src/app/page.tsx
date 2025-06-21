"use client";

// 注意：为了在不同环境中都能预览，我们继续使用标准的 <img> 标签。
// 在您的实际 Next.js 项目中，可以根据需要换回 <Image> 组件以获得更好的性能优化。
import React, { useState, useEffect, useMemo, forwardRef, useRef, memo, useCallback, SVGProps, HTMLAttributes, ButtonHTMLAttributes, ImgHTMLAttributes, ElementType } from 'react';
import { motion, animate, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- 1. 工具函数 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 2. 原有页面图标组件 (无改动) ---
const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
HomeIcon.displayName = "HomeIcon";

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
UserIcon.displayName = "UserIcon";

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.12l.15.08a2 2 0 0 0 .73 2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
SettingsIcon.displayName = "SettingsIcon";

const MailIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
MailIcon.displayName = "MailIcon";

const BrainCog = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4.5 4.5 0 0 1 4.5 4.5c0 1.06-.38 2.04-.98 2.85"/><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.06.38 2.04.98 2.85"/><path d="M12 13.5a4.5 4.5 0 0 1 4.5-4.5c1.06 0 2.04.38 2.85.98"/><path d="M12 13.5a4.5 4.5 0 0 0-4.5-4.5c-1.06 0-2.04.38-2.85.98"/><path d="M3.03 16.5a4.5 4.5 0 0 0 6.42.04"/><path d="M14.55 16.54a4.5 4.5 0 0 0 6.42-.04"/><circle cx="12" cy="12" r=".5"/><path d="M21.97 16.5a4.5 4.5 0 0 1-6.42.04"/><path d="M9.45 16.54a4.5 4.5 0 0 1-6.42-.04"/><path d="M12 13.5V22"/><path d="M12 2v2.5"/><path d="M19.14 4.86 17.5 6.5"/><path d="m4.86 19.14 1.64-1.64"/><path d="m19.14 19.14-1.64-1.64"/><path d="m4.86 4.86 1.64 1.64"/>
    </svg>
);
BrainCog.displayName = "BrainCog";

const Brain = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08A2.5 2.5 0 0 1 5 13.5V8c0-1.9.83-3.63 2.16-4.84A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08A2.5 2.5 0 0 0 19 13.5V8c0-1.9-.83-3.63-2.16-4.84A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
);
Brain.displayName = "Brain";

const Box = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
Box.displayName = "Box";

const Lock = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
Lock.displayName = "Lock";

const Sparkles = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);
Sparkles.displayName = "Sparkles";

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
Search.displayName = "Search";

const GripVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);
GripVertical.displayName = "GripVertical";

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
CheckIcon.displayName = "CheckIcon";

const ZhihuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.253 17.532H24V24h-3.747v-4.144h-2.115v4.144H14.4V11.91l7.06-7.06h-5.466V0H24v6.864l-6.864 6.864h3.117v3.804zm-12.427-4.14L3.72 17.532H0V24h3.72v-4.143h2.115V24h3.746V11.91L2.523 4.85h5.466V0H0v6.864l6.864 6.864H3.72v3.664h4.106v-4.14z"></path>
  </svg>
);
ZhihuIcon.displayName = "ZhihuIcon";

const WeiboIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.29 8.95c.29-.63.44-1.3.44-1.97 0-2.28-1.85-4.13-4.13-4.13-1.03 0-2.02.39-2.77.95-.53.42-1.12.8-1.92.8-.79 0-1.39-.38-1.92-.8C9.24 3.23 8.25 2.84 7.22 2.84c-2.28 0-4.13 1.85-4.13 4.14 0 .67.15 1.34.44 1.97C2.17 11.12 1 12.83 1 14.67c0 1.85 1.36 3.4 3.14 3.86.29.63.44 1.3.44 1.97 0 2.28 1.85 4.13 4.13 4.13 1.03 0 2.02-.39 2.77-.95.53-.42 1.12.8 1.92-.8.79 0 1.39.38 1.92.8.75.56 1.74.95 2.77.95 2.28 0 4.13-1.85 4.13-4.13 0-.67-.15-1.34-.44-1.97 1.78-.46 3.14-2.01 3.14-3.86 0-1.84-1.17-3.55-2.71-4.72zM15.1 17.88c-1.3.8-2.92.8-4.2 0-1.33-.82-2.1-2.12-2.1-3.53 0-1.42.77-2.72 2.1-3.54 1.28-.8 2.9-.8 4.2 0 1.33.82 2.1 2.12 2.1 3.54 0 1.41-.77 2.7-2.1 3.53z"></path>
  </svg>
);
WeiboIcon.displayName = "WeiboIcon";

const DouyinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.44 3.48a6.38 6.38 0 0 1 4.54 4.54h-3.03a3.35 3.35 0 0 0-3.35-3.35V3.48zm-5.01 0v11.77a3.1 3.1 0 0 1-3.09 3.09c-1.72 0-3.1-1.39-3.1-3.1s1.38-3.1 3.1-3.1c.2 0 .38.02.56.06V8.18A6.13 6.13 0 0 1 8.24 2c.2 0 .4.01.6.03l.06-2.03A9.2 9.2 0 0 0 3.1 3.1a9.2 9.2 0 0 0 9.2 9.2V3.48z"></path>
  </svg>
);
DouyinIcon.displayName = "DouyinIcon";

const BilibiliIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.25 11.25c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25.56 1.25 1.25 1.25 1.25-.56 1.25-1.25zM22 6.5H2v11h20v-11zM11 14H9v3H7.5v-3H5.5V8.5h4V6h1.5v2.5h4V14H13v-1.5h-2V14zm5-2.75c0-.69-.56-1.25-1.25-1.25S13.5 10.56 13.5 11.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25zM21.5 4H2.5C2.22 4 2 4.22 2 4.5v.5H22v-.5c0-.28-.22-.5-.5-.5zM2.5 19h19c.28 0 .5-.22.5-.5v-.5H2v.5c0 .28.22.5.5.5z"></path>
  </svg>
);
BilibiliIcon.displayName = "BilibiliIcon";

const LinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" />
  </svg>
);
LinkIcon.displayName = "LinkIcon";

// --- START: 悬浮按钮组件 (无改动) ---

const createFloatingButtonIcon = (svgContent: string) => {
  const IconComponent = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      {...props}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  ));
  IconComponent.displayName = `FloatingButtonIcon`;
  return IconComponent;
};

const FloatingButtonCodeXml = createFloatingButtonIcon('<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>');
const FloatingButtonBookText = createFloatingButtonIcon('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/>');
const FloatingButtonAlbumIcon = createFloatingButtonIcon('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8v8l-4-3-4 3V7z"/>');
const FloatingButtonBookOpenTextIcon = createFloatingButtonIcon('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="M6 8h2"/><path d="M6 12h2"/><path d="M16 8h2"/><path d="M16 12h2"/>');
const FloatingButtonXIcon = createFloatingButtonIcon('<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>');
const FloatingButtonUsers = createFloatingButtonIcon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>');
const FloatingButtonMessageSquare = createFloatingButtonIcon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
const FloatingButtonLinkIcon = createFloatingButtonIcon('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71"/>');

const services = ["企业落地", "准证申请", "战略发展", "子女教育", "溯源体检", "健康管理"];
const emailProviders = [
    { name: "Google 邮箱", domain: "@gmail.com" },
    { name: "Outlook 邮箱", domain: "@outlook.com" },
    { name: "QQ 邮箱", domain: "@qq.com" },
    { name: "网易163 邮箱", domain: "@163.com" },
    { name: "雅虎邮箱", domain: "@yahoo.com" },
    { name: "其他邮箱", domain: null }
];

const countryCodes = [
    { name: "中国 +86", code: "+86", regex: /^1[3-9]\d{9}$/, states: ["北京", "上海", "天津", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾", "内蒙古", "广西", "西藏", "宁夏", "新疆", "香港", "澳门"] },
    { name: "美国 +1", code: "+1", regex: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/, states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] },
    { name: "加拿大 +1", code: "+1", regex: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/, states: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"] },
    { name: "英国 +44", code: "+44", regex: /^7\d{9}$/, states: ["England", "Scotland", "Wales", "Northern Ireland"] },
    { name: "澳大利亚 +61", code: "+61", regex: /^4\d{8}$/, states: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Australian Capital Territory", "Northern Territory"] },
    { name: "德国 +49", code: "+49", regex: /^1[5-7]\d{8,9}$/, states: ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"] },
    { name: "法国 +33", code: "+33", regex: /^[67]\d{8}$/, states: ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"] },
    { name: "意大利 +39", code: "+39", regex: /^3\d{8,9}$/, states: ["Abruzzo", "Aosta Valley", "Apulia", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Sardinia", "Sicily", "Trentino-Alto Adige/Südtirol", "Tuscany", "Umbria", "Veneto"] },
    { name: "西班牙 +34", code: "+34", regex: /^[67]\d{8}$/, states: ["Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands", "Cantabria", "Castile and León", "Castilla-La Mancha", "Catalonia", "Extremadura", "Galicia", "La Rioja", "Community of Madrid", "Region of Murcia", "Navarre", "Valencian Community"] },
    { name: "乌克兰 +380", code: "+380", regex: /^(39|50|63|66|67|68|9[1-9])\d{7}$/, states: ["Cherkasy Oblast", "Chernihiv Oblast", "Chernivtsi Oblast", "Dnipropetrovsk Oblast", "Donetsk Oblast", "Ivano-Frankivsk Oblast", "Kharkiv Oblast", "Kherson Oblast", "Khmelnytskyi Oblast", "Kyiv Oblast", "Kirovohrad Oblast", "Luhansk Oblast", "Lviv Oblast", "Mykolaiv Oblast", "Odessa Oblast", "Poltava Oblast", "Rivne Oblast", "Sumy Oblast", "Ternopil Oblast", "Vinnytsia Oblast", "Volyn Oblast", "Zakarpattia Oblast", "Zaporizhzhia Oblast", "Zhytomyr Oblast", "Kyiv City"] },
    { name: "波兰 +48", code: "+48", regex: /^[4-8]\d{8}$/, states: ["Greater Poland", "Kuyavian-Pomeranian", "Lesser Poland", "Łódź", "Lower Silesian", "Lublin", "Lubusz", "Masovian", "Opole", "Podkarpackie", "Podlaskie", "Pomeranian", "Silesian", "Świętokrzyskie", "Warmian-Masurian", "West Pomeranian"] },
    { name: "荷兰 +31", code: "+31", regex: /^6\d{8}$/, states: ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "North Brabant", "North Holland", "Overijssel", "Utrecht", "Zeeland", "South Holland"] },
    { name: "比利时 +32", code: "+32", regex: /^4\d{8}$/, states: ["Flemish Region (Flanders)", "Walloon Region (Wallonia)", "Brussels-Capital Region"] },
    { name: "瑞典 +46", code: "+46", regex: /^7[02369]\d{7}$/, states: ["Stockholm", "Uppsala", "Södermanland", "Östergötland", "Jönköping", "Kronoberg", "Kalmar", "Gotland", "Blekinge", "Skåne", "Halland", "Västra Götaland", "Värmland", "Örebro", "Västmanland", "Dalarna", "Gävleborg", "Västernorrland", "Jämtland", "Västerbotten", "Norrbotten"] },
    { name: "瑞士 +41", code: "+41", regex: /^7[6-9]\d{7}$/, states: ["Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg", "Geneva", "Glarus", "Grisons", "Jura", "Lucerne", "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zürich"] },
    { name: "奥地利 +43", code: "+43", regex: /^6\d{8,12}$/, states: ["Burgenland", "Carinthia", "Lower Austria", "Upper Austria", "Salzburg", "Styria", "Tyrol", "Vorarlberg", "Vienna"] },
    { name: "爱尔兰 +353", code: "+353", regex: /^8[35-9]\d{7}$/, states: ["Leinster", "Munster", "Connacht", "Ulster"] },
    { name: "葡萄牙 +351", code: "+351", regex: /^9[1-36]\d{7}$/, states: ["Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Lisbon", "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Azores", "Madeira"] },
    { name: "俄罗斯 +7", code: "+7", regex: /^9\d{9}$/, states: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don"] },
    { name: "日本 +81", code: "+81", regex: /^[7-9]0\d{8}$/, states: ["北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "爱媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"] },
    { name: "韩国 +82", code: "+82", regex: /^10\d{8}$/, states: ["首尔", "釜山", "大邱", "仁川", "光州", "大田", "蔚山", "世宗", "京畿道", "江原道", "忠清北道", "忠清南道", "全罗北道", "全罗南道", "庆尚北道", "庆尚南道", "济州特别自治道"] },
    { name: "新加坡 +65", code: "+65", regex: /^[689]\d{7}$/, states: ["Singapore"] },
    { name: "马来西亚 +60", code: "+60", regex: /^1\d{8,9}$/, states: ["Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya"] },
    { name: "泰国 +66", code: "+66", regex: /^[689]\d{8}$/, states: ["Bangkok", "Chiang Mai", "Phuket", "Chon Buri", "Krabi", "Surat Thani"] },
    { name: "越南 +84", code: "+84", regex: /^[35789]\d{8}$/, states: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho", "Hai Phong"] },
    { name: "菲律宾 +63", code: "+63", regex: /^9\d{9}$/, states: ["Metro Manila", "Calabarzon", "Central Luzon", "Central Visayas"] },
    { name: "印度尼西亚 +62", code: "+62", regex: /^8\d{8,11}$/, states: ["Jakarta", "West Java", "East Java", "Central Java", "Bali"] }
];


const InfoCollectorModal = ({ isOpen, onClose, onInfoSubmit }: { isOpen: boolean; onClose: () => void; onInfoSubmit: () => void; }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmailProvider, setSelectedEmailProvider] = useState('');
    const [selectedCountryName, setSelectedCountryName] = useState('中国 +86'); // 默认选中中国
    const [selectedState, setSelectedState] = useState('');
    const [statesForCountry, setStatesForCountry] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const countryData = countryCodes.find(c => c.name === selectedCountryName);
        setStatesForCountry(countryData ? countryData.states : []);
        setSelectedState('');
    }, [selectedCountryName]);
    

    const handleCountryChange = (countryName: string) => {
        setSelectedCountryName(countryName);
    };

    const validateForm = () => {
        if (!name || !phone || !email || !selectedService || !selectedEmailProvider || !selectedCountryName || !selectedState) {
            setError("请填写所有字段。");
            return false;
        }
        
        const provider = emailProviders.find(p => p.name === selectedEmailProvider);
        if (provider && provider.domain && !email.toLowerCase().endsWith(provider.domain)) {
             if (provider.name !== '其他邮箱') {
                setError(`邮箱地址必须是 ${provider.name}。`);
                return false;
            }
        }

        const country = countryCodes.find(c => c.name === selectedCountryName);
        if (country && !country.regex.test(phone)) {
            setError(`请输入有效的 ${country.name.split(' ')[0]} 手机号码。`);
            return false;
        }
        
        setError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        setIsLoading(true);
        const country = countryCodes.find(c => c.name === selectedCountryName);
        if (!country) {
            setError("无效的国家选择。");
            setIsLoading(false);
            return;
        }

        const contactData = {
            name,
            phone: `${country.code} ${phone}`,
            email,
            service: selectedService,
            country: country.name.split(' ')[0],
            state: selectedState,
        };
        
        try {
            const response = await fetch('/api/save-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || '网络请求失败');
            }

            localStorage.setItem('hasSubmittedInfo', 'true');
            onInfoSubmit();

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "信息提交失败，请稍后再试。";
            setError(errorMessage);
            console.error("提交错误: ", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                    <FloatingButtonXIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">请留下您的联系方式</h2>
                <p className="text-center text-gray-500 mb-6">提交后即可访问内容。</p>
                
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">{error}</p>}
                
                <div className="space-y-4">
                    <input type="text" placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                    <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black">
                        <option value="" disabled>请选择服务领域</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <select value={selectedEmailProvider} onChange={(e) => setSelectedEmailProvider(e.target.value)} className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black">
                            <option value="" disabled>请选择邮箱服务商</option>
                            {emailProviders.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                        </select>
                        <input type="email" placeholder="邮箱地址" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                         <select value={selectedCountryName} onChange={(e) => handleCountryChange(e.target.value)} className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black">
                            <option value="" disabled>请选择国家/地区</option>
                            {countryCodes.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                         <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountryName} className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100 text-black">
                            <option value="" disabled>请选择省/州</option>
                            {statesForCountry.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                    </div>

                    <input type="tel" placeholder="手机号" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                </div>
                <div className="mt-6">
                    <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-500">
                         {isLoading ? '提交中...' : '提交并访问'}
                    </button>
                </div>
            </div>
        </div>
    );
};
InfoCollectorModal.displayName = "InfoCollectorModal";


interface LinkDataItem {
    name: string;
    href: string;
    description: string;
    tag: string;
    icon: string;
    bg: string;
    fg: string;
}

const PopupContent = ({ items, onItemClick }: { items: LinkDataItem[]; onItemClick: (href: string) => void; }) => {
    const iconMap: { [key: string]: ElementType } = {
        FloatingButtonBookOpenTextIcon,
        FloatingButtonUsers,
        FloatingButtonMessageSquare,
        FloatingButtonLinkIcon,
        FloatingButtonCodeXml,
        FloatingButtonBookText,
        FloatingButtonAlbumIcon,
    };

    return (
        <div className="flex flex-col items-center p-2 sm:p-4 text-gray-800 max-h-80 overflow-y-auto">
            {items.map((item, index) => {
                const IconComponent = iconMap[item.icon] || FloatingButtonBookOpenTextIcon;
                return (
                    <div key={`${item.name}-${index}`} onClick={() => onItemClick(item.href)} className="flex w-full cursor-pointer items-center gap-3 rounded-2xl p-2 md:p-3 duration-300 hover:bg-gray-100">
                        <IconComponent className={cn("h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl p-3 md:p-3.5", item.bg, item.fg)} />
                        <div className="flex w-full flex-col items-start">
                            <p className="font-bold text-gray-800 text-sm md:text-base">{item.name}</p>
                            <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                        </div>
                        <span className="hidden sm:block shrink-0 rounded-lg border border-gray-300 py-1 px-2 text-xs md:text-sm text-gray-500">
                            {item.tag}
                        </span>
                    </div>
                )
            })}
        </div>
    );
};
PopupContent.displayName = "PopupContent";


interface FloatingActionButtonItem {
  id: string;
  label: string;
  icon: ElementType;
  content: React.ReactNode;
  dimensions: {
    width: number;
    height: number;
  };
}
const DynamicActionBar = forwardRef<HTMLDivElement, { actions: FloatingActionButtonItem[] }>(
  ({ actions, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const activeAction = activeIndex !== null ? actions[activeIndex] : null;
    const BUTTON_BAR_HEIGHT = 56;
    
    const buttonBarWidth = useMemo(() => {
        if (typeof document === 'undefined') return 410;
        const totalWidth = actions.reduce((acc, action) => {
            const span = document.createElement('span');
            span.style.font = 'bold 1rem sans-serif';
            span.style.visibility = 'hidden';
            span.style.position = 'absolute';
            span.innerText = action.label;
            document.body.appendChild(span);
            const textWidth = span.offsetWidth;
            document.body.removeChild(span);
            return acc + 24 + 8 + textWidth + 32 + 8;
        }, 16);
        return Math.max(totalWidth, 410);
    }, [actions]);

    const containerAnimate = activeAction
      ? { width: activeAction.dimensions.width, height: activeAction.dimensions.height + BUTTON_BAR_HEIGHT }
      : { width: buttonBarWidth, height: BUTTON_BAR_HEIGHT };
    
    const transition = { type: "spring", stiffness: 400, damping: 35 };

    return (
      <div ref={ref} className="relative" onMouseLeave={() => setActiveIndex(null)} {...props}>
        <motion.div
          className="flex flex-col overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border border-gray-200/80 max-w-full"
          animate={containerAnimate}
          transition={transition}
          initial={{ width: "auto", height: BUTTON_BAR_HEIGHT }}
        >
          <div className="flex-grow overflow-hidden">
            <AnimatePresence>
              {activeAction && (
                <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
                  {activeAction.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-shrink-0 items-center justify-center gap-1 sm:gap-2 px-1 sm:px-2 border-t border-gray-200/80" style={{ height: `${BUTTON_BAR_HEIGHT}px` }}>
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={action.id} onMouseEnter={() => setActiveIndex(index)} className="flex items-center justify-center gap-2 rounded-2xl py-2 px-2 sm:py-3 sm:px-4 text-gray-700 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900 whitespace-nowrap">
                  <Icon className="size-5 sm:size-6 shrink-0" />
                  <span className="font-bold text-sm sm:text-base">{action.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }
);
DynamicActionBar.displayName = "DynamicActionBar";


const FloatingButtonWrapper = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [targetLink, setTargetLink] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('hasSubmittedInfo') === 'true') {
            setHasSubmitted(true);
        }
    }, []);

    const staticLinkData: { [key: string]: LinkDataItem[] } = useMemo(() => ({
        apps: [
            { name: "从“年度锁定ˮ到“⽆缝陪伴ˮ", href: "https://mp.weixin.qq.com/s/pkhiZGKfimltF3aZ-boSbA", description: "您必须看懂的三层“服务价值”", tag: "欢迎", icon: "FloatingButtonAlbumIcon", bg: "bg-blue-100", fg: "text-blue-600" },
            { name: "Apex Elite Service", href: "https://mp.weixin.qq.com/s/Iw0kbUprjGqYUminA-5Czw", description: "我们不止梳理万象，更与您共创未来", tag: "介绍", icon: "FloatingButtonAlbumIcon", bg: "bg-blue-100", fg: "text-blue-600" },
            { name: "Apex文章", href: "https://sara.apex-elite-service.com/", description: "适用于各类企业的响应式官网模板", tag: "模板", icon: "FloatingButtonAlbumIcon", bg: "bg-blue-100", fg: "text-blue-600" },
            { name: "Apex文章", href: "https://info.apex-elite-service.com/", description: "功能完善的电商后台管理系统", tag: "系统", icon: "FloatingButtonAlbumIcon", bg: "bg-blue-100", fg: "text-blue-600" },
        ],
        components: [
            { name: "汇率", href: "https://hl.apex-elite-service.com/", description: "实时最新汇率计算", tag: "货币", icon: "FloatingButtonCodeXml", bg: "bg-yellow-100", fg: "text-yellow-600" },
            { name: "个税计算器", href: "https://jsq.apex-elite-service.com/", description: "AI抓取个税信息", tag: "计算", icon: "FloatingButtonLinkIcon", bg: "bg-orange-100", fg: "text-orange-600" },
            { name: "专属AI", href: "https://ai.apex-elite-service.com/", description: "满血版DeepSeek，支持联网，为您提供帮助", tag: "AI", icon: "FloatingButtonLinkIcon", bg: "bg-orange-100", fg: "text-orange-600" },
        ],
        notes: [
            { name: "问卷调查", href: "https://wenjuan.apex-elite-service.com/", description: "我们希望对您有一个深度的了解", tag: "调查", icon: "FloatingButtonBookText", bg: "bg-red-100", fg: "text-red-600" },
            { name: "资料上传", href: "https://zl.apex-elite-service.com/", description: "资料提交可以帮您与我们进行高效的服务", tag: "核验", icon: "FloatingButtonMessageSquare", bg: "bg-teal-100", fg: "text-teal-600" },
            { name: "客户反馈", href: "https://listen.apex-elite-service.com/", description: "感谢您的所有意见都有助于我们成长", tag: "倾听", icon: "FloatingButtonBookOpenTextIcon", bg: "bg-purple-100", fg: "text-purple-600" },
        ]
    }), []);

    const handleItemClick = useCallback((href: string) => {
        if (hasSubmitted) {
            window.open(href, '_blank', 'noopener,noreferrer');
        } else {
            setTargetLink(href);
            setModalOpen(true);
        }
    }, [hasSubmitted]);
    
    const handleInfoSubmit = useCallback(() => {
        setModalOpen(false);
        setHasSubmitted(true);
        if (targetLink) {
            window.open(targetLink, '_blank', 'noopener,noreferrer');
            setTargetLink('');
        }
    }, [targetLink]);
    
    const actions: FloatingActionButtonItem[] = useMemo(() => [
        { id: "apps", label: "商业洞察", icon: FloatingButtonAlbumIcon, content: <PopupContent items={staticLinkData.apps} onItemClick={handleItemClick} />, dimensions: { width: 500, height: 300 } },
        { id: "components", label: "AI赋能", icon: FloatingButtonCodeXml, content: <PopupContent items={staticLinkData.components} onItemClick={handleItemClick} />, dimensions: { width: 500, height: 300 } },
        { id: "notes", label: "客户支持", icon: FloatingButtonBookText, content: <PopupContent items={staticLinkData.notes} onItemClick={handleItemClick} />, dimensions: { width: 500, height: 300 } },
    ], [staticLinkData, handleItemClick]);

    return (
        <>
            <InfoCollectorModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onInfoSubmit={handleInfoSubmit}
            />
            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-[calc(100%-2rem)] sm:w-auto">
                <DynamicActionBar actions={actions} />
            </div>
        </>
    );
};
FloatingButtonWrapper.displayName = "FloatingButtonWrapper";


// --- 页脚图标按钮 (无改动) ---
const CustomLinkAndQrHoverButton = ({ imageUrl, onClickUrl, Icon }: { imageUrl: string; onClickUrl: string; Icon: ElementType; }) => {
  const [hovered, setHovered] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => !isTouchDevice && setHovered(false)}
      onClick={() => isTouchDevice && setHovered(h => !h)}
    >
      <a
        href={onClickUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open link and show QR code"
        className="
          relative rounded-full w-10 h-10
          bg-gray-900
          border-2 border-gray-700
          shadow-[0_0_10px_3px_rgba(0,0,0,0.3)]
          flex items-center justify-center
          text-gray-200
          hover:bg-gray-700
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
          cursor-pointer
          select-none
        "
        onClick={(e) => { if(isTouchDevice) e.preventDefault(); }}
      >
        <Icon className="h-5 w-5" />
      </a>

      <div
        className={`
          absolute left-1/2 bottom-full mb-3
          w-40 h-40
          -translate-x-1/2
          rounded-2xl
          bg-gradient-to-tr from-gray-900 to-black
          border border-gray-700
          shadow-[0_0_25px_5px_rgba(0,0,0,0.25)]
          flex items-center justify-center
          p-2
          transform origin-bottom
          transition-all duration-300 ease-in-out
          ${hovered ? "opacity-100 scale-100 visible" : "opacity-0 scale-75 invisible pointer-events-none"}
        `}
      >
        <img
            src={imageUrl} 
            alt="QR Code" 
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
CustomLinkAndQrHoverButton.displayName = "CustomLinkAndQrHoverButton";


const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-black",
        secondary: "bg-gray-100 text-black hover:bg-gray-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
});
Button.displayName = "Button";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
Badge.displayName = "Badge";

interface NavItem {
    name: string;
    id: string;
    icon: ElementType;
}

function NavBar({ items, activeTab, onNavItemClick, className }: { items: NavItem[], activeTab: string, onNavItemClick: (id: SectionId) => void, className?: string }) {
  return (
    <div className={cn("fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4 w-full px-4 sm:w-auto sm:px-0", className)}>
      <div className="flex w-full sm:w-auto items-center justify-center gap-1 bg-white/50 border border-gray-200 backdrop-blur-lg p-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavItemClick(item.id as SectionId);
              }}
              className={cn(
                  "relative flex flex-1 cursor-pointer items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:flex-none",
                  "text-black/60 hover:text-black",
                  isActive ? "text-black" : ""
              )}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden"><Icon className="h-5 w-5" strokeWidth={2.5} /></span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 bg-black/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-t-full">
                    <div className="absolute w-12 h-6 bg-black/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-black/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-black/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
NavBar.displayName = "NavBar";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    }));
    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full text-black" viewBox="0 0 696 316" fill="none">
                <title>Apex</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={0.5 + path.id * 0.03}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0]}}
                        transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear"}}
                    />
                ))}
            </svg>
        </div>
    );
}
FloatingPaths.displayName = "FloatingPaths";


function ComponentOne({ title = "Apex" }: { title?: string }) {
    const words = title.split(" ");
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0"><FloatingPaths position={1} /><FloatingPaths position={-1} /></div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: wordIndex * 0.1 + letterIndex * 0.03, type: "spring", stiffness: 150, damping: 25 }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700"
                                    >{letter}</motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </motion.div>
            </div>
        </div>
    );
}
ComponentOne.displayName = "ComponentOne";

function ComponentTwo() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["企业落地", "准证申请", "战略发展", "子女教育", "溯源体检", "健康管理"], []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2500); 
    return () => clearInterval(intervalId);
  }, [titles.length]);

  return (
    <div className="w-full text-black bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-balance">不止梳理万象，更与您共创未来</span>
              <div className="relative mt-4 flex h-14 w-full items-center justify-center overflow-hidden text-center sm:h-16 md:h-20">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed tracking-tight text-gray-600 sm:text-lg md:text-xl">
              Apex是一家总部位于新加坡的综合性专业服务机构。我们深刻理解全球高净值人士与出海企业所面临的机遇与挑战，矢志成为您在新加坡的首席合作伙伴，提供从商业顶层设计、子女教育规划到主动式健康管理的无缝衔接解决方案。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
ComponentTwo.displayName = "ComponentTwo";


function ComponentSix() {
  const features = [
    {
      title: "公司注册",
      description: "提供一站式的公司注册“创始包”，涵盖战略架构、银行开户与主动式秘书服务，为您稳固事业的第一步。",
      isLarge: true,
      imageUrl: "https://cdn.apex-elite-service.com/wangzhantupian/gongsi.jpg",
    },
    {
      title: "准证申请",
      description: "为创始人、高管及家人量身定制整体准证方案（EP、DP等），通过深度评估与战略规划，极大化成功率，提供核心身份保障。",
      isLarge: false,
      imageUrl: "https://cdn.apex-elite-service.com/wangzhantupian/zhunzheng.jpg",
    },
    {
      title: "财务税务合规",
      description: "提供专业的年度财税申报、财税合规与规划服务，我们不仅确保您的企业稳健合规，更助力您充分享受新加坡的政策优势。",
      isLarge: false,
      imageUrl: "https://cdn.apex-elite-service.com/wangzhantupian/caishui.jpg",
    },
    {
      title: "人力资源支持",
      description: "提供从核心人才招聘、名义雇主（EOR）到跨境薪酬合规的一站式人力资源解决方案，助您在新加坡高效、合规地组建并管理顶尖团队。",
      isLarge: true,
      imageUrl: "https://cdn.apex-elite-service.com/wangzhantupian/WechatIMG2460.jpg",
    }
  ];

  return (
    <div className="w-full py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black text-left">
                企业服务 (Corporate Services)
              </h2>
              <p className="text-base sm:text-xl font-medium text-gray-600 max-w-xl lg:max-w-lg text-left">
                我们深知，在新加坡设立公司，是您全球战略的关键一步，而非一次简单的流程代办。Apex提供的，是从顶层视角出发，为您的商业大厦搭建最稳固、合规且具前瞻性的战略基石，并为后续的持续运营保驾护航。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-md aspect-square overflow-hidden",
                  feature.isLarge && "lg:col-span-2 lg:aspect-auto"
                )}
              >
                <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 p-4 md:p-6 flex justify-between flex-col h-full">
                    <UserIcon className="w-8 h-8 stroke-1 text-white" />
                    <div className="flex flex-col">
                      <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-base sm:text-xl font-medium text-gray-200 max-w-xs">
                        {feature.description}
                      </p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
ComponentSix.displayName = "ComponentSix";

interface FeatureItem {
    id: number;
    icon: ElementType;
    title: string;
    description: string;
    image: string;
}
function ComponentEight() {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [progress, setProgress] = useState(0);
    const sampleFeatures: FeatureItem[] = useMemo(() => [
        {
            id: 1,
            icon: BrainCog,
            title: "教育路径规划(Education Pathway Design)",
            description: "我们提供超越择校咨询的长期教育路径规划。通过深度评估家庭理念与孩子特质，为您量身定制从当前到世界名校的清晰成长路线图。",
            image: "https://cdn.apex-elite-service.com/wangzhantupian/111.jpg",
        },
        {
            id: 2,
            icon: BrainCog,
            title: "学校申请支持(School Application Support)",
            description: "我们提供精准、高效的全流程申请支持，关注的不仅是文书与面试技巧，更是如何将您孩子最独特的闪光点呈现给招生官，赢得理想的录取通知。",
            image: "https://cdn.apex-elite-service.com/wangzhantupian/222.jpg",
        },
        {
            id: 3,
            icon: Brain,
            title: "长期成长陪伴(Long-term Growth Companion)",
            description: "我们提供超越申请的长期陪伴服务。作为您与学校间的沟通桥梁，我们协助处理从家长会到升学指导的各项事务，确保孩子无缝融入并持续进步。",
            image: "https://cdn.apex-elite-service.com/wangzhantupian/333.jpg",
        },
    ],[]);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | undefined>(undefined);

    const primaryColor = "sky";
    const progressGradientLight = "bg-gradient-to-r from-sky-400 to-sky-500";

    useEffect(() => {
        const startProgress = () => {
            clearInterval(intervalRef.current);
            setProgress(0);
            intervalRef.current = window.setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(intervalRef.current);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
        };
        startProgress();
        return () => clearInterval(intervalRef.current);
    }, [currentFeature]);

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => {
                setCurrentFeature((prev) => (prev + 1) % sampleFeatures.length);
            }, 300);
        }
    }, [progress, sampleFeatures.length]);

    const handleFeatureClick = (index: number) => {
        setCurrentFeature(index);
    };

    return (
        <div className="min-h-screen py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className={`text-${primaryColor}-500 font-semibold text-sm uppercase tracking-wider`}>
                        Apex
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-4 mb-6">
                        留学教育 (Study Abroad Education)
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">
                    <div className="relative order-1 lg:order-2 max-w-lg mx-auto h-full">
                        <motion.div key={currentFeature} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5, ease: "easeOut" }} className="relative w-full aspect-video">
                            <img
                                className="rounded-2xl border border-gray-100 shadow-lg object-cover w-full h-full"
                                src={sampleFeatures[currentFeature].image}
                                alt={sampleFeatures[currentFeature].title}
                                width={600}
                                height={400}
                            />
                        </motion.div>
                    </div>
                    <div ref={containerRef} className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
                        {sampleFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            const isActive = currentFeature === index;
                            return (
                                <div key={feature.id} ref={(el) => { if (el) featureRefs.current[index] = el; }} className="relative cursor-pointer" onClick={() => handleFeatureClick(index)}>
                                    <div className={cn(
                                        "flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 w-full",
                                        isActive ? "bg-gray-100 shadow-lg border border-gray-200" : "border border-transparent"
                                    )}>
                                        <div className={cn("p-3 block rounded-full transition-all duration-300", isActive ? `bg-${primaryColor}-500 text-white` : `bg-gray-200 text-${primaryColor}-500`)}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="pt-0.5 text-lg leading-tight font-semibold font-sans tracking-tight md:text-2xl md:leading-[1.875rem] text-balance text-gray-900">
                                                {feature.title}
                                            </h3>
                                            <p className={cn("transition-colors duration-300 text-base sm:text-xl font-medium text-gray-600")}>
                                                {feature.description}
                                            </p>
                                            <div className="mt-4 bg-gray-200 rounded-sm h-1 overflow-hidden">
                                                {isActive && (
                                                    <motion.div
                                                        className={`h-full ${progressGradientLight}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        transition={{ duration: 0.1, ease: "linear" }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
ComponentEight.displayName = "ComponentEight";


function ComponentTwentyMedicalHealth() {
  const [inset, setInset] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;
    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ('clientX' in e) {
      x = e.clientX - rect.left;
    }
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setInset(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              健康管理 (Health Management)
            </h2>
            <p className="text-base sm:text-xl font-medium text-gray-600 max-w-xl lg:max-w-xl">
              我们相信，您的健康，是承载事业版图与人生品质的终极资产。Apex传承始于“生命管理”的独特基因，我们不提供诊疗，而是作为您最值得信赖的健康战略家与医疗资源导航员，致力于将您对健康的“未知”与“被动”，转化为“已知”与“主动”。
            </p>
          </div>
          <div className="pt-12 w-full">
            <div
              className="relative w-full overflow-hidden rounded-2xl select-none aspect-[4/3] sm:aspect-video"
              onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
              onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}
              onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}
            >
              <div className="bg-white h-full w-1 absolute z-20 top-0 -ml-0.5 select-none" style={{ left: `${inset}%` }}>
                <div className="bg-white rounded-full hover:scale-110 transition-all w-8 h-8 select-none -translate-y-1/2 absolute top-1/2 -ml-4 z-30 cursor-ew-resize flex justify-center items-center shadow-lg border">
                  <GripVertical className="h-5 w-5 text-gray-500 select-none" />
                </div>
              </div>
              <img
                src="https://cdn.apex-elite-service.com/wangzhantupian/1.png" alt="处理后效果" width={1920} height={1080}
                className="absolute left-0 top-0 z-10 w-full h-full object-cover rounded-2xl select-none border"
                style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }} draggable={false}
              />
              <img
                src="https://cdn.apex-elite-service.com/wangzhantupian/2.png" alt="处理前原图" width={1920} height={1080}
                className="absolute left-0 top-0 w-full h-full object-cover rounded-2xl select-none border" draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ComponentTwentyMedicalHealth.displayName = "ComponentTwentyMedicalHealth";


interface GlowingEffectProps {
    blur?: number; inactiveZone?: number; proximity?: number; spread?: number;
    variant?: "default" | "white"; glow?: boolean; className?: string;
    disabled?: boolean; movementDuration?: number; borderWidth?: number;
}
const GlowingEffect = memo(
  ({
    blur = 0, inactiveZone = 0.7, proximity = 0, spread = 20, variant = "default",
    glow = false, className, movementDuration = 2, borderWidth = 1, disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback((e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;
          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;
          if (e) lastPosition.current = { x: mouseX, y: mouseY };
          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }
          const isActive = mouseX > left - proximity && mouseX < left + width + proximity &&
                           mouseY > top - proximity && mouseY < top + height + proximity;
          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;
          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;
          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => element.style.setProperty("--start", String(value)),
          });
        });
      }, [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div className={cn("pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity", glow && "opacity-100", variant === "white" && "border-white", disabled && "!block")}/>
        <div ref={containerRef} style={{ "--blur": `${blur}px`, "--spread": spread, "--start": "0", "--active": "0", "--glowingeffect-border-width": `${borderWidth}px`, "--repeating-conic-gradient-times": "5", "--gradient": `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%), radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%), radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%), repeating-conic-gradient(from 236.84deg at 50% 50%, #dd7bbb 0%, #d79f1e calc(25% / var(--repeating-conic-gradient-times)), #5a922c calc(50% / var(--repeating-conic-gradient-times)), #4c7894 calc(75% / var(--repeating-conic-gradient-times)), #dd7bbb calc(100% / var(--repeating-conic-gradient-times)))`} as React.CSSProperties} className={cn("pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity", glow && "opacity-100", blur > 0 && "blur-[var(--blur)] ", className, disabled && "!hidden")}>
          <div className={cn("glow rounded-[inherit]", 'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]', "after:[border:var(--glowingeffect-border-width)_solid_transparent]", "after:[background:var(--gradient)] after:[background-attachment:fixed]", "after:opacity-[var(--active)] after:transition-opacity after:duration-300", "after:[mask-clip:padding-box,border-box]", "after:[mask-composite:intersect]", "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]")}/>
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

interface GridItemProps { area: string; icon: React.ReactNode; title: string; description: React.ReactNode; }
const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-200 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-gray-200 bg-white p-6 shadow-sm md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-gray-200 bg-gray-50 p-2 text-gray-800">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-gray-900">
                {title}
              </h3>
              <h2 className="text-base sm:text-xl font-medium text-gray-600">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
GridItem.displayName = "GridItem";

function ComponentTen() {
  return (
    <div className="bg-white text-black w-full py-16 lg:py-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black text-center mb-12">Apex五大核心优势</h2>
            <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
              <GridItem area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]" icon={<Box className="h-4 w-4" />} title="信赖承诺，坚实保障" description="我们承诺以高效、透明的方案，全程护航您的新加坡之旅，使命必达。" />
              <GridItem area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]" icon={<SettingsIcon className="h-4 w-4" />} title="中新双核，无缝衔接" description="植根新加坡，兼具中国基因。中新团队双语服务，沟通无碍，执行高效。" />
              <GridItem area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]" icon={<Lock className="h-4 w-4" />} title="AI赋能，专家护航" description="AI引擎保障流程效率与透明，资深专家为个性化难题提供战略解决方案。" />
              <GridItem area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]" icon={<Sparkles className="h-4 w-4" />} title="一站整合，首席合伙" description="覆盖商业、教育到健康的一站式服务，Apex是您唯一的首席合伙人。" />
              <GridItem area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]" icon={<Search className="h-4 w-4" />} title="健康基石，生命护航" description="链接稀缺医疗资源，深谙中新体系，为您的家庭健康构筑坚实护城河。" />
            </ul>
        </div>
    </div>
  );
}
ComponentTen.displayName = "ComponentTen";


const linearGradients = [
    "linear-gradient(to bottom right, rgb(6, 182, 212), rgb(16, 185, 129))",
    "linear-gradient(to bottom right, rgb(236, 72, 153), rgb(99, 102, 241))",
    "linear-gradient(to bottom right, rgb(249, 115, 22), rgb(234, 179, 8))",
    "linear-gradient(to bottom right, rgb(100, 116, 139), rgb(148, 163, 184))",
];

const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const verticalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 桌面端逻辑 (垂直滚动)
  const { scrollYProgress } = useScroll({
    container: verticalScrollRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  // 移动端逻辑 (Intersection Observer for highlighting)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return;
    
    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
                setActiveCard(cardIndex);
                break; 
            }
        }
      },
      {
        root: scrollContainer,
        rootMargin: "0px -40% 0px -40%", 
        threshold: 0,
      }
    );

    const currentCardRefs = cardRefs.current;
    currentCardRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCardRefs.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [content.length]);

  // 【BUG修复】在移动端视图加载时，此 effect 会将第一个卡片滚动到其水平滚动容器的中心，
  // 而不是触发整个页面的垂直滚动。此前的实现中，`scrollIntoView` 错误地导致了页面跳转。
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const scrollContainer = horizontalScrollRef.current;
      const firstCard = cardRefs.current[0];

      if (scrollContainer && firstCard) {
        // 使用 setTimeout 确保浏览器已经完成布局和绘制
        setTimeout(() => {
          // 计算使卡片居中所需的滚动位置
          const scrollLeft = firstCard.offsetLeft - (scrollContainer.offsetWidth / 2) + (firstCard.offsetWidth / 2);
          
          // 直接操作容器的滚动位置，避免影响页面其他部分
          scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'auto', // 使用 'auto' 以避免在加载时出现平滑滚动动画
          });
        }, 100);
      }
    }
    // 空依赖数组确保此 effect 仅在组件挂载时运行一次
  }, []);

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div 
        animate={{ backgroundColor: 'white' }} 
        className="flex flex-col lg:flex-row lg:h-[30rem] lg:justify-center relative lg:space-x-10 rounded-md p-2 sm:p-4 lg:p-10 lg:overflow-y-auto" 
        ref={verticalScrollRef}>
      <div className="relative flex items-start px-4">
        <div 
            ref={horizontalScrollRef} 
            className="w-full flex flex-row lg:flex-col gap-8 lg:gap-0 overflow-x-auto lg:overflow-x-visible no-scrollbar 
                       scroll-smooth snap-x snap-mandatory lg:snap-none">
          
          <div className="w-[calc(50%-8rem)] sm:w-[calc(50%-10rem)] flex-shrink-0 lg:hidden" />

          {content.map((item, index) => (
            <div 
                key={item.title + index} 
                ref={(el) => { cardRefs.current[index] = el; }}
                data-index={index}
                className="my-0 lg:my-20 w-64 sm:w-80 lg:w-full flex-shrink-0 snap-center">
              <motion.h2 
                initial={{ opacity: 0 }} 
                animate={{ opacity: activeCard === index ? 1 : 0.3 }} 
                className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-gray-900 transition-opacity duration-300">
                {item.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: activeCard === index ? 1 : 0.3 }} 
                className="text-base sm:text-xl font-medium text-gray-600 max-w-sm mt-4 lg:mt-10 transition-opacity duration-300">
                {item.description}
              </motion.p>
            </div>
          ))}
          
          <div className="w-[calc(50%-8rem)] sm:w-[calc(50%-10rem)] flex-shrink-0 lg:hidden" />

          <div className="h-40 hidden lg:block" />
        </div>
      </div>
      <div style={{ background: backgroundGradient }} className={cn("hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden", contentClassName)}>
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
StickyScroll.displayName = "StickyScroll";

const stickyScrollContent = [
  { title: "首席伙伴", description: "我们凭借在中新两地的实体团队，真正实现了服务的无缝衔接。无论您身在国内还是已在新加坡，都能随时与我们的本地成员当面沟通，确保服务“不掉线”。作为您长期的首席合伙人，为您节省巨大的时间与沟通成本。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://cdn.apex-elite-service.com/wangzhantupian/hezuohuoban.jpg" alt="首席伙伴图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "安心保障", description: "我们郑重承诺：24小时内回复，紧急事务2小时内响应。所有价格透明，无隐形消费。您将拥有一位专属项目合伙人，全程为您负责。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://cdn.apex-elite-service.com/wangzhantupian/anxinbaozhang.jpg" alt="安心保障图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "服务流程 ", description: "我们的合作始于深度保密的咨询，以全面理解您的需求。随后，专家团队将为您量身定制方案，在执行中协调所有细节，并随时汇报进展。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://cdn.apex-elite-service.com/wangzhantupian/fuwuliucheng.jpg" alt="服务流程图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "即刻启程", description: "纸上得来终觉浅，绝知此事要躬行。立即联系我们，开启一次专属的战略性探讨，让我们为您在新加坡的成功保驾护航。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://cdn.apex-elite-service.com/wangzhantupian/jikeqicheng.jpg" alt="即刻启程图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
];

function Component30() {
  return (
    <div className="p-4 md:p-10" style={{ backgroundColor: 'white' }}>
      <StickyScroll content={stickyScrollContent} />
    </div>
  );
}
Component30.displayName = "Component30";


function Feature() {
  return (
    <div className="w-full py-16 lg:py-24 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 py-12 lg:py-24 flex-col items-start">
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">为您而来，不止于此</h2>
            <p className="text-base sm:text-xl font-medium text-gray-600 max-w-xl lg:max-w-xl">我们深知您在新加坡的每一步都至关重要。</p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><h3 className="text-xl font-semibold text-gray-900">企业落地</h3><p className="text-base sm:text-xl font-medium text-gray-600">让公司设立和运营变得简单。</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><h3 className="text-xl font-semibold text-gray-900">子女教育</h3><p className="text-base sm:text-xl font-medium text-gray-600">为您的孩子规划最优方案。</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><h3 className="text-xl font-semibold text-gray-900">核心准证</h3><p className="text-base sm:text-xl font-medium text-gray-600">高效处理您团队的工作准证。</p></div></div>
              <div className="flex flex-row gap-6 w-full items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><h3 className="text-xl font-semibold text-gray-900">溯源健检</h3><p className="text-base sm:text-xl font-medium text-gray-600">探寻健康本源，不止于表面。</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><h3 className="text-xl font-semibold text-gray-900">战略发展</h3><p className="text-base sm:text-xl font-medium text-gray-600">链接本地资源助您快速发展。</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><h3 className="text-xl font-semibold text-gray-900">健康管理</h3><p className="text-base sm:text-xl font-medium text-gray-600">链接全科与专科名医网络。</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Feature.displayName = "Feature";


function FeatureDemoComponent() {
  return (
    <div className="block"><Feature /></div>
  );
}
FeatureDemoComponent.displayName = "FeatureDemoComponent";


const MarqueeStyles = () => (
  <style>{`
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-100% - var(--gap))); }
    }
    .animate-marquee {
      animation: marquee var(--duration) linear infinite;
    }
    .group:hover .animate-marquee {
      animation-play-state: paused;
    }
  `}</style>
);

const TestimonialAvatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
TestimonialAvatar.displayName = "TestimonialAvatar";

const TestimonialAvatarImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(({ className, ...props }, ref) => (
    <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} alt={props.alt || ""} />
));
TestimonialAvatarImage.displayName = "TestimonialAvatarImage";


function TestimonialCard({ author, text, href, className }: {author: {name:string; handle:string; avatar:string;}; text:string; href?:string; className?: string}) {
  const CardComponent = href ? 'a' : 'div';
  return (
    <CardComponent {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})} 
    className={cn( "flex flex-col rounded-lg border", "bg-white", "p-4 text-start sm:p-6", "hover:bg-gray-50", "w-[80vw] max-w-[300px] sm:w-auto sm:max-w-[320px]", "transition-colors duration-300", "border-gray-200", "flex-shrink-0", className )}>
      <div className="flex items-center gap-3">
        <TestimonialAvatar>
          <TestimonialAvatarImage src={author.avatar} alt={author.name} width={40} height={40} />
        </TestimonialAvatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-gray-900">{author.name}</h3>
          <p className="text-sm text-gray-500">{author.handle}</p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-gray-600">{text}</p>
    </CardComponent>
  );
}

const testimonialsData = [
  { author: { name: "星辰大海", handle: "追梦赤子心。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1544005313-94ddf0286df2.jpg" }, text: "感谢Apex帮孩子申请到了新加坡的国际学校，从择校到办准证，全程服务特别贴心，效率超高！" },
  { author: { name: "蓝色气泡", handle: "行胜于言。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1549351512-c5e12b11e283.jpg" }, text: "通过Apex在新加坡注册公司，流程比我想象的快多了。顾问非常专业，解答了我所有关于企业落地的疑问。" },
  { author: { name: "月亮不打烊", handle: "人间值得。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1552058544-f2b08422138a.jpg" }, text: "Apex的税务代理服务简直是创业公司的救星，账目清晰，申报及时，再也不用为税务问题烦恼了。" },
  { author: { name: "夏天的风", handle: "一切皆有可能。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1554151228-14d9def656e4.jpg" }, text: "我的EP准证是找Apex办的，材料准备得非常充分，顾问老师经验老道，面试指导也很给力，一次就过了！" },
  { author: { name: "一颗柠檬", handle: "活在当下。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1560250097-0b93528c311a.jpg" }, text: "Apex的健康管理服务太棒了！从预约高端体检到报告解读，都有专人负责，让我对自己的健康状况了如指掌。" },
  { author: { name: "快乐小狗", handle: "慢慢来比较快。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1438761681033-6461ffad8d80.jpg" }, text: "公司发展遇到瓶颈，Apex的战略发展咨询服务给我们提供了全新的思路和市场分析，非常有价值。" },
  { author: { name: "云朵有点甜", handle: "但行好事。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1488161628813-04466f872be2.jpg" }, text: "家人来新加坡需要就医，通过Apex联系了顶尖的医疗资源，全程陪同翻译，让人在异国他乡感到非常温暖。" },
  { author: { name: "奔跑的蜗牛", handle: "成为更好的自己。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1494790108377-be9c29b29330.jpg" }, text: "我们公司的税务和核心员工的准证申请都全权委托给了Apex，非常省心，团队专业可靠，是企业出海新加坡的好伙伴。" },
  { author: { name: "芝士就是力量", handle: "永远年轻。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1502823403499-6ccfcf4fb453.jpg" }, text: "年度体检选的Apex推荐的机构，环境好服务优，预约流程也比自己弄方便多了。" },
  { author: { name: "数字漫游者", handle: "永远热泪盈眶。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1506794778202-cad84cf45f1d.jpg" }, text: "选择Apex是我做过最正确的决定之一，无论是公司业务还是个人健康管理，都提供了无微不至的专业服务。" },
  { author: { name: "深海的派大星", handle: "专注且坚定。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1507003211169-0a1dd7228f2d.jpg" }, text: "孩子的小学留学办得非常顺利，Apex的顾问老师全程跟进，让我们家长特别放心。" },
  { author: { name: "打代码的文艺青年", handle: "简单且快乐。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1517841905240-472988babdf9.jpg" }, text: "公司注册和银行开户，Apex一条龙服务，速度快，效率高，收费也透明合理。" },
  { author: { name: "暴躁的土豆", handle: "持续进化。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1519085360753-af0119f7cbe7.jpg" }, text: "在Apex的战略发展建议下，我们公司成功开拓了新的市场，业绩增长显著。" },
  { author: { name: "迷路的星星", handle: "保持好奇。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1520466809213-7b9a56adcd45.jpg" }, text: "孩子拿到了NTU的offer，离不开Apex留学团队的努力，从选专业到文书都给了很多专业意见。" },
  { author: { name: "一个有趣的灵魂", handle: "日拱一卒。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1521119989659-a83eee488004.jpg" }, text: "我们外籍高管的准证申请都是委托Apex处理的，每次都很顺利，省去了我们HR很多精力。" },
  { author: { name: "骑着扫帚的少女", handle: "知行合一。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1531123414780-f74242c2b052.jpg" }, text: "Apex安排的体检套餐很全面，价格也比自己去预约要优惠，服务很满意。" },
  { author: { name: "熬夜冠军", handle: "心有猛虎。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1534528741775-53994a69daeb.jpg" }, text: "Apex的服务生态很完善，从公司注册到个人健康管理，能满足多方面的需求，值得长期合作。" },
  { author: { name: "人间观察员", handle: "细嗅蔷薇。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1539571696357-5a69c17a67c6.jpg" }, text: "孩子申请中学，Apex的顾问老师对新加坡的教育体系了如指掌，给的建议非常中肯。" },
  { author: { name: "故事收藏家", handle: "乐观积极。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1580489944761-15a19d654956.jpg" }, text: "Apex帮我们处理复杂的跨境税务问题，他们的专业能力让我们非常放心。" },
  { author: { name: "梦想派送员", handle: "凡事发生皆好事。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1599566150163-29194dcaad36.jpg" }, text: "从公司选址到装修建议，Apex的企业落地服务真是做到了极致，考虑得比我们还周到。" },
  { author: { name: "今天有点困", handle: "不负韶华。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1618641986557-1ecd230959aa.jpg" }, text: "通过Apex申请EntrePass成功了！他们的方案设计和材料准备都非常专业，大大提高了成功率。" },
  { author: { name: "会飞的猪", handle: "自在如风。", avatar: "https://cdn.apex-elite-service.com/wangzhantupian/photo-1570295999919-56ceb5ecca61.jpg" }, text: "Apex的战略咨询不仅是纸上谈兵，还协助我们对接资源，帮助我们把规划落到了实处。" }
];

function ComponentTestimonialsMarquee() {
  return (
    <section className={cn("bg-white text-gray-900", "py-16 lg:py-24")}>
      <MarqueeStyles />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8 text-center">
          <h2 className="max-w-[720px] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
            全部伙伴们的信赖
          </h2>
          <p className="text-md max-w-[600px] font-medium text-gray-600 sm:text-xl">
            我们不会辜负您的信任，Apex将始终是您在新加坡的首席合伙人。
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex w-full overflow-hidden p-2" style={{'--gap': '1rem', '--duration': '40s'} as React.CSSProperties}>
            <div className="flex shrink-0 animate-marquee justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]">
                {testimonialsData.map((testimonial, i) => ( <TestimonialCard key={`marquee-1-${i}`} {...testimonial} /> ))}
            </div>
            <div className="flex shrink-0 animate-marquee justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]" aria-hidden="true">
                {testimonialsData.map((testimonial, i) => ( <TestimonialCard key={`marquee-2-${i}`} {...testimonial} /> ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white sm:block" />
        </div>
      </div>
    </section>
  );
}
ComponentTestimonialsMarquee.displayName = "ComponentTestimonialsMarquee";


function FooterWithQRCode() {
  
  const socialButtons = [
    {
      href: "https://www.xiaohongshu.com/user/profile/6624755f00000000030303c2?xsec_token=YBu0J314MzsA9PGMJZLZmcLRL3wiuAfNIZeudNRhtPvCk=&xsec_source=app_share&xhsshare=WeixinSession&appuid=6624755f00000000030303c2&apptime=1750082613&share_id=b4da624f466a4aeabb6e1e79662f092d&tab=note&subTab=note",
      qrUrl: "https://cdn.apex-elite-service.com/wangzhantupian/xiaohongshu.png",
      Icon: ZhihuIcon,
    },
    {
      href: "https://weibo.com/",
      qrUrl: "https://cdn.apex-elite-service.com/wangzhantupian/sara.png",
      Icon: WeiboIcon,
    },
    {
      href: "https://www.douyin.com/",
      qrUrl: "https://cdn.apex-elite-service.com/wangzhantupian/mengchen.png",
      Icon: DouyinIcon,
    },
    {
      href: "https://www.bilibili.com/",
      qrUrl: "https://cdn.apex-elite-service.com/wangzhantupian/wenjing.png",
      Icon: BilibiliIcon,
    },
  ];

  return (
    <footer className="relative w-full border-t bg-white text-black">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 md:py-12">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative md:col-span-2 lg:col-span-1">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">保持联系</h2>
            <p className="mb-4 text-base sm:text-xl font-medium text-gray-600">
              扫描公众号获取最新动态
            </p>
            <div className="flex h-32 w-32 items-center justify-center rounded-md bg-gray-100">
               <img
                src="https://cdn.apex-elite-service.com/wangzhantupian/gongzhonghao.png" 
                alt="二维码占位符"
                width={128}
                height={128}
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">快速链接</h3>
            <nav className="space-y-2 text-base sm:text-xl font-medium">
              <a href="#" className="block transition-colors text-gray-600 hover:text-black">返回首页</a>
              <a href="https://www.moe.gov.sg/" target="_blank" rel="noopener noreferrer" className="block transition-colors text-gray-600 hover:text-black">新加坡教育部</a>
              <a href="https://www.mom.gov.sg/" target="_blank" rel="noopener noreferrer" className="block transition-colors text-gray-600 hover:text-black">新加坡人力资源部</a>
              <a href="https://www.hpb.gov.sg/" target="_blank" rel="noopener noreferrer" className="block transition-colors text-gray-600 hover:text-black">新加坡健康促进局</a>
              <a href="https://www.iras.gov.sg/" target="_blank" rel="noopener noreferrer" className="block transition-colors text-gray-600 hover:text-black">新加坡税务局</a>
            </nav>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">联系我们</h3>
            <address className="space-y-2 text-base sm:text-xl font-medium not-italic text-gray-600">
                <p>创始人信箱：</p>
                <p>我们珍视每一个真诚的声音。</p>
                <p>欢迎您将最关心的问题或建议，直接发送到创始人信箱。</p>
                <p>founder@apex-elite-service.com</p>
                <p>非常感谢您对我们的关注与支持！</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">关注我们</h3>
            <div className="mb-6 flex space-x-4">
              {socialButtons.map(({ href, qrUrl, Icon }) => (
                <CustomLinkAndQrHoverButton key={href} imageUrl={qrUrl} onClickUrl={href} Icon={Icon} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-4 text-center md:flex-row">
          <p className="text-sm text-gray-600">
            © 2024 Apex. 版权所有.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors text-gray-600 hover:text-black">隐私政策</a>
            <a href="#" className="transition-colors text-gray-600 hover:text-black">服务条款</a>
            <a href="#" className="transition-colors text-gray-600 hover:text-black">Cookie 设置</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
FooterWithQRCode.displayName = "FooterWithQRCode";


type SectionId = 'home' | 'about' | 'services' | 'contact';

// --- 主 App 组件 (无改动) ---
export default function ApexPage() {
    const [activeTab, setActiveTab] = useState<SectionId>('home');

    const navItems: NavItem[] = [
        { name: "主页", id: "home", icon: HomeIcon },
        { name: "关于", id: "about", icon: UserIcon },
        { name: "服务", id: "services", icon: SettingsIcon },
        { name: "联系", id: "contact", icon: MailIcon },
    ];

    const sectionRefs = useMemo(() => ({
      home: React.createRef<HTMLDivElement>(),
      about: React.createRef<HTMLDivElement>(),
      services: React.createRef<HTMLDivElement>(),
      contact: React.createRef<HTMLDivElement>(),
    }), []);

    const handleNavItemClick = (id: SectionId) => {
        setActiveTab(id);
        sectionRefs[id]?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id as SectionId);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const refs = Object.values(sectionRefs);
        refs.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
             refs.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [sectionRefs]);

    return (
        <div className="bg-white">
          <NavBar items={navItems} activeTab={activeTab} onNavItemClick={handleNavItemClick} />
          <main>
            <div id="home" ref={sectionRefs.home} className="min-h-screen"><ComponentOne /></div>
            <ComponentTwo />
            <div id="about" ref={sectionRefs.about} className="scroll-mt-20"><ComponentSix /></div>
            <ComponentEight />
            <ComponentTwentyMedicalHealth />
            <div id="services" ref={sectionRefs.services} className="scroll-mt-20"><ComponentTen /></div>
            <Component30 />
            <FeatureDemoComponent />
            <div id="contact" ref={sectionRefs.contact} className="scroll-mt-20"><ComponentTestimonialsMarquee /></div>
          </main>
          <FooterWithQRCode />
          
          <FloatingButtonWrapper />
        </div>
    );
}
