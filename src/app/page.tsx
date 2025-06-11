"use client";

// 注意：为了在不同环境中都能预览，我们继续使用标准的 <img> 标签。
// 在您的实际 Next.js 项目中，可以根据需要换回 <Image> 组件以获得更好的性能优化。
import React, { useState, useEffect, useMemo, forwardRef, useRef, memo, useCallback, SVGProps, HTMLAttributes, ButtonHTMLAttributes, ImgHTMLAttributes, ElementType } from 'react';
import { motion, animate, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, Firestore } from "firebase/firestore";


// --- 1. 工具函数 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 2. 原有页面图标组件 ---
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.12l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
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

const LinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" />
  </svg>
);
LinkIcon.displayName = "LinkIcon";

// --- START: 悬浮按钮组件所需的所有代码 ---

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

const services = ["医疗健康", "留学教育", "企业服务", "商务咨询", "视野拓展"];
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
    { name: "日本 +81", code: "+81", regex: /^[7-9]0\d{8}$/, states: ["北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"] },
    { name: "韩国 +82", code: "+82", regex: /^10\d{8}$/, states: ["首尔", "釜山", "大邱", "仁川", "光州", "大田", "蔚山", "世宗", "京畿道", "江原道", "忠清北道", "忠清南道", "全罗北道", "全罗南道", "庆尚北道", "庆尚南道", "济州特别自治道"] },
    { name: "新加坡 +65", code: "+65", regex: /^[689]\d{7}$/, states: ["Singapore"] },
    { name: "马来西亚 +60", code: "+60", regex: /^1\d{8,9}$/, states: ["Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya"] },
    { name: "泰国 +66", code: "+66", regex: /^[689]\d{8}$/, states: ["Bangkok", "Chiang Mai", "Phuket", "Chon Buri", "Krabi", "Surat Thani"] },
    { name: "越南 +84", code: "+84", regex: /^[35789]\d{8}$/, states: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho", "Hai Phong"] },
    { name: "菲律宾 +63", code: "+63", regex: /^9\d{9}$/, states: ["Metro Manila", "Calabarzon", "Central Luzon", "Central Visayas"] },
    { name: "印度尼西亚 +62", code: "+62", regex: /^8\d{8,11}$/, states: ["Jakarta", "West Java", "East Java", "Central Java", "Bali"] }
];


const InfoCollectorModal = ({ isOpen, onClose, onInfoSubmit, db }: { isOpen: boolean; onClose: () => void; onInfoSubmit: () => void; db: Firestore | null }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmailProvider, setSelectedEmailProvider] = useState('');
    const [selectedCountryName, setSelectedCountryName] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [statesForCountry, setStatesForCountry] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    if (!db) return null;

    const handleCountryChange = (countryName: string) => {
        setSelectedCountryName(countryName);
        const countryData = countryCodes.find(c => c.name === countryName);
        setStatesForCountry(countryData ? countryData.states : []);
        setSelectedState('');
    };

    const validateForm = () => {
        if (!name || !phone || !email || !selectedService || !selectedEmailProvider || !selectedCountryName || !selectedState) {
            setError("请填写所有字段。");
            return false;
        }
        
        const provider = emailProviders.find(p => p.name === selectedEmailProvider);
        if (provider && provider.domain && !email.toLowerCase().endsWith(provider.domain)) {
            setError(`邮箱地址必须是 ${provider.name}。`);
            return false;
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
        
        try {
            await addDoc(collection(db, "contacts"), {
                name,
                phone: `${country.code} ${phone}`,
                email,
                service: selectedService,
                country: country.name.split(' ')[0],
                state: selectedState,
                submittedAt: new Date()
            });
            onInfoSubmit();
        } catch (err) {
            setError("信息提交失败，请稍后再试。");
            console.error("Error adding document: ", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                    <FloatingButtonXIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">请留下您的联系方式</h2>
                <p className="text-center text-gray-500 mb-6">提交后即可访问内容。</p>
                
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">{error}</p>}
                
                <div className="space-y-4">
                    <input type="text" placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option value="" disabled>请选择服务领域</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="flex gap-2">
                        <select value={selectedEmailProvider} onChange={(e) => setSelectedEmailProvider(e.target.value)} className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="" disabled>请选择邮箱服务商</option>
                            {emailProviders.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                        </select>
                        <input type="email" placeholder="邮箱地址" value={email} onChange={(e) => setEmail(e.target.value)} className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex gap-2">
                         <select value={selectedCountryName} onChange={(e) => handleCountryChange(e.target.value)} className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="" disabled>请选择国家/地区</option>
                            {countryCodes.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                         <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountryName} className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100">
                            <option value="" disabled>请选择省/州</option>
                            {statesForCountry.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                    </div>
                    <input type="tel" placeholder="手机号" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
        FloatingButtonBookText
    };

    return (
        <div className="flex flex-col items-center p-4 text-gray-800 max-h-80 overflow-y-auto">
            {items.map(item => {
                const IconComponent = iconMap[item.icon] || FloatingButtonBookOpenTextIcon;
                return (
                    <div key={item.name} onClick={() => onItemClick(item.href)} className="flex w-[95%] cursor-pointer items-center gap-4 rounded-2xl p-3 duration-300 hover:bg-gray-100">
                        <IconComponent className={cn("h-14 w-14 shrink-0 rounded-xl p-3.5", item.bg, item.fg)} />
                        <div className="flex w-full flex-col items-start">
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <span className="block shrink-0 rounded-lg border border-gray-300 py-1 px-2 text-sm text-gray-500">
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
    const containerAnimate = activeAction
      ? { width: activeAction.dimensions.width, height: activeAction.dimensions.height + BUTTON_BAR_HEIGHT }
      : { width: 410, height: BUTTON_BAR_HEIGHT };
    const transition = { type: "spring", stiffness: 400, damping: 35 };

    return (
      <div ref={ref} className="relative" onMouseLeave={() => setActiveIndex(null)} {...props}>
        <motion.div
          className="flex flex-col overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border border-gray-200/80"
          animate={containerAnimate}
          transition={transition}
          initial={{ width: 410, height: BUTTON_BAR_HEIGHT }}
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
          <div className="flex flex-shrink-0 items-center justify-center gap-2 px-2 border-t border-gray-200/80" style={{ height: `${BUTTON_BAR_HEIGHT}px` }}>
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={action.id} onMouseEnter={() => setActiveIndex(index)} className="flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-gray-700 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900">
                  <Icon className="size-6" />
                  <span className="font-bold">{action.label}</span>
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
    const [db, setDb] = useState<Firestore | null>(null);
    const [linkData, setLinkData] = useState<{ [key: string]: LinkDataItem[] }>({ apps: [], components: [], notes: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [targetLink, setTargetLink] = useState('');

    useEffect(() => {
        const initFirebase = async () => {
            const firebaseConfig = {
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
              messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
            };

            if (firebaseConfig.apiKey) {
                try {
                    const app = initializeApp(firebaseConfig);
                    const firestoreDb = getFirestore(app);
                    setDb(firestoreDb);

                    const querySnapshot = await getDocs(collection(firestoreDb, "link_categories"));
                    const fetchedData: { [key: string]: LinkDataItem[] } = { apps: [], components: [], notes: [] };
                    querySnapshot.forEach((doc) => {
                        fetchedData[doc.id] = doc.data().links as LinkDataItem[] || [];
                    });
                    setLinkData(fetchedData);
                    
                } catch (e) {
                    console.error("Firebase initialization or data fetching error:", e);
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.error("Firebase config is missing. Please set up your Vercel Environment Variables.");
                setIsLoading(false);
            }
        };
        
        initFirebase();
    }, []);

    const handleItemClick = useCallback((href: string) => {
        setTargetLink(href);
        setModalOpen(true);
    }, []);
    
    const handleInfoSubmit = useCallback(() => {
        setModalOpen(false);
        if (targetLink) {
            window.open(targetLink, '_blank', 'noopener,noreferrer');
            setTargetLink('');
        }
    }, [targetLink]);
    
    const actions: FloatingActionButtonItem[] = [
        { id: "apps", label: "企业服务", icon: FloatingButtonAlbumIcon, content: <PopupContent items={linkData.apps || []} onItemClick={handleItemClick} />, dimensions: { width: 500, height: 350 } },
        { id: "components", label: "留学教育", icon: FloatingButtonCodeXml, content: <PopupContent items={linkData.components || []} onItemClick={handleItemClick} />, dimensions: { width: 500, height: 350 } },
        { id: "notes", label: "医疗健康", icon: FloatingButtonBookText, content: <PopupContent items={linkData.notes || []} onItemClick={handleItemClick} />, dimensions: { width: 500, height: 350 } },
    ];

    if (isLoading) {
        return <div className="fixed bottom-8 right-8 z-50 text-xs text-gray-500">加载悬浮窗...</div>;
    }
    
    if (!db) return null;

    return (
        <>
            <InfoCollectorModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onInfoSubmit={handleInfoSubmit}
                db={db}
            />
            <div className="fixed bottom-8 right-8 z-50">
                <DynamicActionBar actions={actions} />
            </div>
        </>
    );
};
FloatingButtonWrapper.displayName = "FloatingButtonWrapper";


const CustomLinkAndQrHoverButton = ({ imageUrl, onClickUrl }: { imageUrl: string; onClickUrl: string; }) => {
  const [hovered, setHovered] = useState(false);
  const [iconHasError, setIconHasError] = useState(false);

  const iconUrl = useMemo(() => {
    try {
      const domain = new URL(onClickUrl).hostname;
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    } catch { 
      console.error("Invalid URL for favicon:", onClickUrl);
      return '';
    }
  }, [onClickUrl]);

  useEffect(() => {
    setIconHasError(false);
  }, [iconUrl]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
      >
        {iconHasError || !iconUrl ? (
          <LinkIcon className="h-5 w-5" />
        ) : (
          <img
            src={iconUrl}
            alt={onClickUrl && new URL(onClickUrl).hostname ? `${new URL(onClickUrl).hostname} icon` : 'Link icon'}
            width={20}
            height={20}
            className="rounded-sm"
            onError={() => setIconHasError(true)}
          />
        )}
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
    <div className={cn("fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-6", className)}>
      <div className="flex items-center gap-3 bg-white/50 border border-gray-200 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
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
              className={cn("relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors", "text-black/60 hover:text-black", isActive && "text-black")}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden"><Icon size={18} strokeWidth={2.5} /></span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-black/5 rounded-full -z-10"
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
  const titles = useMemo(() => ["医疗健康", "商务咨询", "企业服务", "视野拓展", "留学教育"],[]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full text-black bg-white">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-16 lg:py-24 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl tracking-tighter text-center font-regular flex flex-col items-center">
              <span className="text-black whitespace-nowrap">不止梳理万象，更与您共创未来</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 pt-4 md:pt-6 h-20 items-center">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-black text-5xl md:text-6xl"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={ titleNumber === index ? { y: 0, opacity: 1 } : { y: titleNumber > index ? -150 : 150, opacity: 0 }}
                  >{title}</motion.span>
                ))}
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-600 max-w-4xl text-center">
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
      title: "秘书与合规",
      description: "委任经验丰富的法定秘书，处理所有向ACRA（会计与企业管制局）的年度申报与合规事宜，确保您的企业运营完全合法合规。",
      isLarge: true,
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "银行开户协助",
      description: "凭借广泛的银行合作网络，专业指导并协助您高效开设企业银行账户。",
      isLarge: false,
      imageUrl: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "准证办理",
      description: "为您的外籍高管与专业人才，精准办理就业准证（EP）与S准证（SP）。",
      isLarge: false,
      imageUrl: "https://images.unsplash.com/photo-1628182478318-64ab62372545?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "注册新加坡公司",
      description: "为您快速、合规地完成新加坡私人有限公司的注册流程，为您的亚洲业务奠定坚实的法律基础。",
      isLarge: true,
      imageUrl: "https://images.unsplash.com/photo-1525625293386-668f4238d312?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ];

  return (
    <div className="w-full py-16 lg:py-24 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Apex</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left text-black whitespace-nowrap">
                企业服务 (Corporate Services)
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-gray-600 text-left">
                我们提供一站式企业后台支持，让您专注于核心业务。服务覆盖公司注册、秘书、会计税务及工作准证申请等企业运营全周期。我们以高效严谨的服务，确保您的企业合规运营，成为您最可靠的业务后盾。
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
                <div className="relative z-10 p-6 flex justify-between flex-col h-full">
                    <UserIcon className="w-8 h-8 stroke-1 text-white" />
                    <div className="flex flex-col">
                      <h3 className="text-xl tracking-tight text-white font-semibold">{feature.title}</h3>
                      <p className="text-gray-200 max-w-xs text-base">
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
            title: "留学规划与申请",
            description: "资深顾问团队通过深度背景评估与数据分析，为申请人精准定位院校，并策略性打造全套申请文书及面试辅导，全面提升世界名校的录取竞争力。",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            icon: BrainCog,
            title: "教育成长陪伴",
            description: "提供长期、个性化的导师服务，通过建立成长档案与引导实践，系统性培养学生的批判性思维、领导力与全球胜任力，规划并陪伴其全方位成长。",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            icon: Brain,
            title: "落地安顿与学术支持",
            description: "提供从生活安顿到学业规划的一站式海外服务，涵盖住宿、课程辅导及低龄监护，确保学生无缝衔接、快速融入全新的学习与生活环境。",
            image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

    useEffect(() => {
        const activeFeatureElement = featureRefs.current[currentFeature];
        const container = containerRef.current;
        if (activeFeatureElement && container) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = activeFeatureElement.getBoundingClientRect();
            if (container.scrollLeft !== undefined) {
                container.scrollTo({
                    left: activeFeatureElement.offsetLeft - (containerRect.width - elementRect.width) / 2,
                    behavior: "smooth",
                });
            }
        }
    }, [currentFeature]);

    const handleFeatureClick = (index: number) => {
        setCurrentFeature(index);
    };

    return (
        <div className="min-h-screen py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className={`text-${primaryColor}-500 font-semibold text-sm uppercase tracking-wider`}>
                        Apex
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">
                        留学教育 (Study Abroad Education)
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">
                    <div ref={containerRef} className="lg:space-y-8 md:space-x-6 lg:space-x-0 overflow-x-auto overflow-hidden no-scrollbar lg:overflow-visible flex lg:flex-col flex-row order-1 pb-4 scroll-smooth">
                        {sampleFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            const isActive = currentFeature === index;
                            return (
                                <div key={feature.id} ref={(el) => { if (el) featureRefs.current[index] = el; }} className="relative cursor-pointer flex-shrink-0" onClick={() => handleFeatureClick(index)}>
                                    <div className={cn("flex lg:flex-row flex-col items-start space-x-4 p-3 max-w-sm md:max-w-sm lg:max-w-2xl transition-all duration-300", isActive ? "bg-gray-100 shadow-xl rounded-xl border border-gray-200" : "")}>
                                        <div className={cn("p-3 hidden md:block rounded-full transition-all duration-300", isActive ? `bg-${primaryColor}-500 text-white` : `bg-gray-200 text-${primaryColor}-500`)}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={cn("text-lg md:mt-4 lg:mt-0 font-semibold mb-2 transition-colors duration-300 text-black")}>
                                                {feature.title}
                                            </h3>
                                            <p className={cn("transition-colors duration-300 text-sm text-gray-600")}>
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
                    <div className="relative order-1 max-w-lg mx-auto lg:order-2 h-full">
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
          <div>
            <Badge>Apex</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-black">
              医疗健康 (Medical Health)
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-500">
              我们利用新加坡顶级的医疗资源，为海内外客户提供无缝对接的尊享健康服务。通过与顶尖医院的紧密合作，为您预约权威专家、安排深度体检，并提供全程陪同翻译，让您和家人高效悦享世界一流的医疗保障。
            </p>
          </div>
          <div className="pt-12 w-full">
            <div
              className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
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
                src="https://www.twblocks.com/_next/image?url=%2Ffeature8.png&w=3840&q=75" alt="处理后效果" width={1920} height={1080}
                className="absolute left-0 top-0 z-10 w-full h-full object-cover aspect-video rounded-2xl select-none border"
                style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }} draggable={false}
              />
              <img
                src="https://www.twblocks.com/_next/image?url=%2Fdarkmode-feature8.png&w=3840&q=75" alt="处理前原图" width={1920} height={1080}
                className="absolute left-0 top-0 w-full h-full object-cover aspect-video rounded-2xl select-none border" draggable={false}
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
              <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-600">
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
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">我们的核心优势</h2>
            <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
              <GridItem area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]" icon={<Box className="h-4 w-4" />} title="以正确的方式做事" description="我们的所有服务都以合规和专业为基础，确保您的业务安全稳健。" />
              <GridItem area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]" icon={<SettingsIcon className="h-4 w-4" />} title="最顶尖的AI辅助工具" description="我们利用最先进的人工智能技术，为您提供高效、精准的解决方案。" />
              <GridItem area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]" icon={<Lock className="h-4 w-4" />} title="您的数据，绝对安全" description="我们采用银行级的安全措施，确保您的数据和隐私得到最高级别的保护。" />
              <GridItem area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]" icon={<Sparkles className="h-4 w-4" />} title="持续创新，追求卓越" description="我们的团队不断探索新技术，致力于为您提供超越期待的卓越服务。" />
              <GridItem area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]" icon={<Search className="h-4 w-4" />} title="深度洞察，抢占先机" description="我们为您提供深入的市场分析和前瞻性的战略建议，助您在竞争中脱颖而出。" />
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

const StickyScroll = ({ content, contentClassName, }: { content: { title: string; description: string; content?: React.ReactNode; }[]; contentClassName?: string; }) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref, offset: ["start start", "end start"], });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) { return index; }
        return acc;
      }, 0 );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["rgb(255, 255, 255)"];
  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div animate={{ backgroundColor: backgroundColors[0], }} className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10" ref={ref} style={{ backgroundColor: 'white' }}>
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2 initial={{ opacity: 0, }} animate={{ opacity: activeCard === index ? 1 : 0.3, }} className="text-2xl font-bold text-black">
                {item.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, }} animate={{ opacity: activeCard === index ? 1 : 0.3, }} className="text-lg text-gray-800 max-w-sm mt-10">
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
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
  { title: "协同编辑", description: "与您的团队、客户和利益相关者实时协作。共同处理文档、分享想法并迅速做出决策。通过我们的平台，您可以简化工作流程并提高生产力。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/FFD700/000000?text=协同编辑" alt="协同编辑图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "实时更改", description: "查看实时发生的变化。通过我们的平台，您可以实时跟踪每一次修改。不再混淆项目的最新版本。告别版本控制的混乱，拥抱实时更新的简单性。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/FFA07A/000000?text=实时更改" alt="实时更改图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "版本控制", description: "体验实时更新，再也不用担心版本控制。我们的平台确保您始终使用项目的最新版本，无需不断手动更新。保持同步，团队协作，工作流程不中断。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/ADD8E6/000000?text=版本控制" alt="版本控制图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "内容丰富", description: "我们提供丰富的内容和功能，满足您的各种需求。无论您是需要文档管理、项目协作还是数据分析，我们的平台都能为您提供一站式解决方案。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/90EE90/000000?text=内容丰富" alt="内容丰富图片" width={600} height={400} className="h-full w-full object-cover rounded-md"/></div>),},
];

function Component30() {
  return (
    <div className="p-10" style={{ backgroundColor: 'white' }}>
      <StickyScroll content={stickyScrollContent} />
    </div>
  );
}
Component30.displayName = "Component30";


function Feature() {
  return (
    <div className="w-full py-16 lg:py-24 bg-white text-black">
      <div className="container mx-auto">
        <div className="flex gap-4 py-16 lg:py-24 flex-col items-start">
          <div><Badge>Platform</Badge></div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">Something new!</h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-800">Managing a small business today is already tough.</p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><p>Easy to use</p><p className="text-gray-700 text-sm">We&apos;ve made it easy to use and understand.</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><p>Fast and reliable</p><p className="text-gray-700 text-sm">We&apos;ve made it fast and reliable.</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><p>Beautiful and modern</p><p className="text-gray-700 text-sm">We&apos;ve made it beautiful and modern.</p></div></div>
              <div className="flex flex-row gap-6 w-full items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><p>Easy to use</p><p className="text-gray-700 text-sm">We&apos;ve made it easy to use and understand.</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><p>Fast and reliable</p><p className="text-gray-700 text-sm">We&apos;ve made it fast and reliable.</p></div></div>
              <div className="flex flex-row gap-6 items-start"><CheckIcon className="w-4 h-4 mt-2 text-primary" /><div className="flex flex-col gap-1"><p>Beautiful and modern</p><p className="text-gray-700 text-sm">We&apos;ve made it beautiful and modern.</p></div></div>
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
    <CardComponent {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})} className={cn( "flex flex-col rounded-lg border", "bg-white", "p-4 text-start sm:p-6", "hover:bg-gray-50", "max-w-[320px] sm:max-w-[320px]", "transition-colors duration-300", "border-gray-200", className )}>
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
  { author: { name: "Emma Thompson", handle: "@emmaai", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" }, text: "这个 AI 平台彻底改变了我们处理数据分析的方式。速度和准确性都是前所未有的。", href: "#" },
  { author: { name: "David Park", handle: "@davidtech", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }, text: "API 集成完美无瑕。自从实施这个解决方案以来，我们的开发时间减少了 60%。", href: "#" },
  { author: { name: "Sofia Rodriguez", handle: "@sofiaml", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" }, text: "终于有了一个真正理解上下文的 AI 工具！自然语言处理的准确性令人印象深刻。" },
  { author: { name: "Michael Chen", handle: "@mchen_dev", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" }, text: "出色的客户支持和详尽的文档。我们的团队在几小时内就上手并开始运行了。" }
];

function ComponentTestimonialsMarquee() {
  return (
    <section className={cn("bg-white text-gray-900", "py-16 lg:py-24")}>
      <MarqueeStyles />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-black">
            全球开发者信赖
          </h2>
          <p className="text-md max-w-[600px] font-medium text-gray-600 sm:text-xl">
            加入成千上万的开发者行列，使用我们的 AI 平台构建未来
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
      href: "https://www.apex-elite-service.com/",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.apex-elite-service.com/"
    },
    {
      href: "https://www.twitter.com",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.twitter.com"
    },
    {
      href: "https://www.instagram.com",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.instagram.com"
    },
    {
      href: "https://www.linkedin.com",
      qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.linkedin.com"
    },
  ];

  return (
    <footer className="relative w-full border-t bg-white text-black">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">保持联系</h2>
            <p className="mb-4 text-gray-600">
              扫描下方二维码，关注我们获取最新动态。
            </p>
            <div className="flex h-32 w-32 items-center justify-center rounded-md bg-gray-100">
               <img
                src="https://placehold.co/128x128/e2e8f0/334155?text=QR+Code" 
                alt="二维码占位符"
                width={128}
                height={128}
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">快速链接</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors text-gray-600 hover:text-black">首页</a>
              <a href="#" className="block transition-colors text-gray-600 hover:text-black">关于我们</a>
              <a href="#" className="block transition-colors text-gray-600 hover:text-black">服务</a>
              <a href="#" className="block transition-colors text-gray-600 hover:text-black">产品</a>
              <a href="#" className="block transition-colors text-gray-600 hover:text-black">联系我们</a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">联系我们</h3>
            <address className="space-y-2 text-sm not-italic text-gray-600">
              <p>创新大街123号</p>
              <p>科技城, TC 12345</p>
              <p>电话: (123) 456-7890</p>
              <p>邮箱: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">关注我们</h3>
            <div className="mb-6 flex space-x-4">
              {socialButtons.map(({ href, qrUrl }) => (
                <CustomLinkAndQrHoverButton key={href} imageUrl={qrUrl} onClickUrl={href} />
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

// --- 主 App 组件 (最终整合版) ---
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
            <div id="home" ref={sectionRefs.home}><ComponentOne /></div>
            <ComponentTwo />
            <div id="about" ref={sectionRefs.about}><ComponentSix /></div>
            <ComponentEight />
            <ComponentTwentyMedicalHealth />
            <div id="services" ref={sectionRefs.services}><ComponentTen /></div>
            <Component30 />
            <FeatureDemoComponent />
            <div id="contact" ref={sectionRefs.contact}><ComponentTestimonialsMarquee /></div>
          </main>
          <FooterWithQRCode />
          
          <FloatingButtonWrapper />
        </div>
    );
}
