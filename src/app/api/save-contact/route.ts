// 请将此文件的全部内容替换为您项目中的 src/app/api/save-contact/route.ts

import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const contactData = await request.json();
    const { name, phone, email, service, country, state } = contactData;

    // 1. 基本的数据验证
    if (!name || !phone || !email || !service || !country || !state) {
      return NextResponse.json({ message: '缺少必填字段' }, { status: 400 });
    }

    // 2. 为这条记录添加一个唯一ID和提交时间
    const newContact = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      ...contactData
    };

    // 3. 使用 lpush 将新联系人信息推入名为 'contacts' 的列表顶部
    // 这样可以永久地、安全地保存数据
    await kv.lpush('contacts', newContact);

    return NextResponse.json({ message: '客户信息已成功保存' }, { status: 200 });

  } catch (error) {
    console.error('API 路由错误:', error);
    const errorMessage = error instanceof Error ? error.message : '发生未知错误';
    return NextResponse.json({ message: '服务器内部错误，保存信息失败', error: errorMessage }, { status: 500 });
  }
}
