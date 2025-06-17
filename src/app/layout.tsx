import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO优化 START ---
// 这里设置了全站的元数据模板和默认值
export const metadata: Metadata = {
  // title.template 会为子页面的标题自动添加后缀，保持品牌统一性
  // 例如，关于页面的标题会显示为 “关于我们 | Apex - 新加坡一站式服务首席伙伴”
  title: {
    template: '%s | Apex - 新加坡一站式服务首席伙伴',
    default: 'Apex | 新加坡一站式企业、教育与健康管理服务', // 这是网站的默认标题，主要用于首页
  },
  // 这是全站的默认描述，如果某个页面没有单独设置description，就会使用这个
  description: 'Apex 是一家总部位于新加坡的综合性专业服务机构，为高净值人士与出海企业提供从商业顶层设计、子女教育规划到主动式健康管理的无缝衔接解决方案。',
};
// --- SEO优化 END ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 将语言设置为中文，这对SEO有帮助
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
