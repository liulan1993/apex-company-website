"use client";

import React, { useState, useEffect, useMemo, forwardRef, useRef, memo, useCallback } from 'react';
import { motion, animate } from 'framer-motion';
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMotionValueEvent, useScroll } from "framer-motion";

// --- 工具函数 ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 图标组件 (本地定义) ---
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.12l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const BrainCog = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4.5 4.5 0 0 1 4.5 4.5c0 1.06-.38 2.04-.98 2.85"/><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.06.38 2.04.98 2.85"/><path d="M12 13.5a4.5 4.5 0 0 1 4.5-4.5c1.06 0 2.04.38 2.85.98"/><path d="M12 13.5a4.5 4.5 0 0 0-4.5-4.5c-1.06 0-2.04.38-2.85.98"/><path d="M3.03 16.5a4.5 4.5 0 0 0 6.42.04"/><path d="M14.55 16.54a4.5 4.5 0 0 0 6.42-.04"/><circle cx="12" cy="12" r=".5"/><path d="M21.97 16.5a4.5 4.5 0 0 1-6.42.04"/><path d="M9.45 16.54a4.5 4.5 0 0 1-6.42-.04"/><path d="M12 13.5V22"/><path d="M12 2v2.5"/><path d="M19.14 4.86 17.5 6.5"/><path d="m4.86 19.14 1.64-1.64"/><path d="m19.14 19.14-1.64-1.64"/><path d="m4.86 4.86 1.64 1.64"/>
    </svg>
);
const Brain = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08A2.5 2.5 0 0 1 5 13.5V8c0-1.9.83-3.63 2.16-4.84A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08A2.5 2.5 0 0 0 19 13.5V8c0-1.9-.83-3.63-2.16-4.84A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
);
const Box = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const Lock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);
const Search = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const GripVertical = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// --- 通用 UI 组件 ---
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// --- 页面组件 ---
interface NavItem {
    name: string;
    id: string; 
    icon: React.ElementType;
}

function NavBar({ items, activeTab, onNavItemClick, className }: { items: NavItem[], activeTab: string, onNavItemClick: (id: string) => void, className?: string }) {
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
                onNavItemClick(item.id);
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
              <span className="text-black whitespace-nowrap">领航狮城，Apex为您规划事业与未来。</span>
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
              我们Apex是一家总部位于新加坡的综合性专业服务机构，致力于为全球高净值人士、家庭及企业，提供从商业拓展到家庭发展的无缝衔接解决方案。我们深知远赴重洋、开创未来的机遇与挑战，因此矢志成为您在新加坡最值得信赖的伙伴，为您提供一切全方位一站式服务。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

interface FeatureItem {
    id: number;
    icon: React.ElementType;
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
    const containerRef = useRef<HTMLDivElement | null>(null);
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
                    <div className="relative order-1 max-w-lg mx-auto lg:order-2">
                        <motion.div key={currentFeature} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5, ease: "easeOut" }} className="relative">
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
                src="https://www.twblocks.com/_next/image?url=%2Ffeature8.png&w=3840&q=75" alt="处理后效果" width="1920" height="1080"
                className="absolute left-0 top-0 z-10 w-full h-full object-cover aspect-video rounded-2xl select-none border"
                style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }} draggable="false"
              />
              <img
                src="https://www.twblocks.com/_next/image?url=%2Fdarkmode-feature8.png&w=3840&q=75" alt="处理前原图" width="1920" height="1080"
                className="absolute left-0 top-0 w-full h-full object-cover aspect-video rounded-2xl select-none border" draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

const stickyScrollContent = [
  { title: "协同编辑", description: "与您的团队、客户和利益相关者实时协作。共同处理文档、分享想法并迅速做出决策。通过我们的平台，您可以简化工作流程并提高生产力。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/FFD700/000000?text=协同编辑" alt="协同编辑图片" className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "实时更改", description: "查看实时发生的变化。通过我们的平台，您可以实时跟踪每一次修改。不再混淆项目的最新版本。告别版本控制的混乱，拥抱实时更新的简单性。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/FFA07A/000000?text=实时更改" alt="实时更改图片" className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "版本控制", description: "体验实时更新，再也不用担心版本控制。我们的平台确保您始终使用项目的最新版本，无需不断手动更新。保持同步，团队协作，工作流程不中断。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/ADD8E6/000000?text=版本控制" alt="版本控制图片" className="h-full w-full object-cover rounded-md"/></div>),},
  { title: "内容丰富", description: "我们提供丰富的内容和功能，满足您的各种需求。无论您是需要文档管理、项目协作还是数据分析，我们的平台都能为您提供一站式解决方案。", content: ( <div className="h-full w-full flex items-center justify-center"><img src="https://placehold.co/600x400/90EE90/000000?text=内容丰富" alt="内容丰富图片" className="h-full w-full object-cover rounded-md"/></div>),},
];

function Component30() {
  return (
    <div className="p-10" style={{ backgroundColor: 'white' }}>
      <StickyScroll content={stickyScrollContent} />
    </div>
  );
}

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

function FeatureDemoComponent() {
  return (
    <div className="block"><Feature /></div>
  );
}

// --- START: 用户评价跑马灯组件 ---
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

const TestimonialAvatar = forwardRef(({ className, ...props }: React.HTMLAttributes<HTMLDivElement>, ref) => (
  <div ref={ref as React.Ref<HTMLDivElement>} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
TestimonialAvatar.displayName = "TestimonialAvatar";

const TestimonialAvatarImage = forwardRef(({ className, src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>, ref) => (
  <img ref={ref as React.Ref<HTMLImageElement>} src={src} alt={alt} className={cn("aspect-square h-full w-full", className)} {...props} />
));
TestimonialAvatarImage.displayName = "TestimonialAvatarImage";

function TestimonialCard({ author, text, href, className }: {author: {name:string; handle:string; avatar:string;}; text:string; href?:string; className?: string}) {
  const CardComponent = href ? 'a' : 'div';
  return (
    <CardComponent {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})} className={cn( "flex flex-col rounded-lg border", "bg-white", "p-4 text-start sm:p-6", "hover:bg-gray-50", "max-w-[320px] sm:max-w-[320px]", "transition-colors duration-300", "border-gray-200", className )}>
      <div className="flex items-center gap-3">
        <TestimonialAvatar className="h-12 w-12">
          <TestimonialAvatarImage src={author.avatar} alt={author.name} />
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
// --- END: 用户评价跑马灯组件 ---

// --- START: 网站页脚组件 ---
const footerData = {
  logo: { src: "https://www.shadcnblocks.com/images/block/block-1.svg", alt: "Apex Logo", title: "Apex", url: "#", },
  tagline: "让未来，即刻发生。",
  menuItems: [
    { title: "产品", links: [ { text: "概览", url: "#" }, { text: "定价", url: "#" }, { text: "市场", url: "#" }, { text: "特性", url: "#" }, { text: "集成", url: "#" }, ], },
    { title: "公司", links: [ { text: "关于我们", url: "#" }, { text: "团队", url: "#" }, { text: "博客", url: "#" }, { text: "招聘", url: "#" }, { text: "联系我们", url: "#" }, { text: "隐私", url: "#" }, ], },
    { title: "资源", links: [ { text: "帮助中心", url: "#" }, { text: "销售", url: "#" }, { text: "广告", url: "#" }, ], },
    { title: "社交媒体", links: [ { text: "Twitter", url: "#" }, { text: "Instagram", url: "#" }, { text: "LinkedIn", url: "#" }, ], },
  ],
  copyright: "© 2024 Apex. 保留所有权利。",
  bottomLinks: [ { text: "条款与条件", url: "#" }, { text: "隐私政策", url: "#" }, ],
};

const SiteFooter = ({ logo, tagline, menuItems, copyright, bottomLinks, }: typeof footerData) => {
  return (
    <section className="py-16 sm:py-24 bg-white text-black">
      <div className="container mx-auto px-4">
        <footer className="border-t border-gray-200 pt-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <a href={logo.url}>
                  <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10" />
                </a>
                <p className="text-xl font-semibold text-black">{logo.title}</p>
              </div>
              <p className="mt-4 font-bold text-gray-800">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-black">{section.title}</h3>
                <ul className="space-y-4 text-gray-600">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-blue-600 transition-colors">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-gray-200 pt-8 text-sm font-medium text-gray-600 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-blue-600 transition-colors">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};
// --- END: 网站页脚组件 ---

type SectionId = 'home' | 'about' | 'services' | 'contact';

// --- 主 App 组件 ---
export default function ApexPage() {
    const [activeTab, setActiveTab] = useState<SectionId>('home');

    const navItems: NavItem[] = [
        { name: "主页", id: "home", icon: HomeIcon },
        { name: "关于", id: "about", icon: UserIcon },
        { name: "服务", id: "services", icon: SettingsIcon },
        { name: "联系", id: "contact", icon: MailIcon },
    ];
    
    // [修正] 使用 Record 类型来创建 refs 对象，以解决 TypeScript 类型问题
    const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement>> = {
      home: useRef<HTMLDivElement>(null),
      about: useRef<HTMLDivElement>(null),
      services: useRef<HTMLDivElement>(null),
      contact: useRef<HTMLDivElement>(null),
    };

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
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id as SectionId);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white">
          <NavBar items={navItems} activeTab={activeTab} onNavItemClick={handleNavItemClick} />
          <div id="home" ref={sectionRefs.home}><ComponentOne /></div>
          <ComponentTwo />
          <div id="about" ref={sectionRefs.about}><ComponentSix /></div>
          <ComponentEight />
          <ComponentTwentyMedicalHealth />
          <div id="services" ref={sectionRefs.services}><ComponentTen /></div>
          <Component30 /> 
          <FeatureDemoComponent />
          <div id="contact" ref={sectionRefs.contact}><ComponentTestimonialsMarquee /></div>
          <SiteFooter {...footerData} />
        </div>
    )
}
