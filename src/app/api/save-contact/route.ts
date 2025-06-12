import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  // --- 安全与部署提示 ---
  // 在 Vercel 这样的无服务器 (Serverless) 环境中，文件系统是临时的（ephemeral）且通常是只读的。
  // 这意味着通过这种方式写入文件，数据会在下次部署或服务器实例重启后丢失，不能作为可靠的数据持久化方案。
  // 此代码主要用于本地开发环境的演示。
  // 对于生产环境，强烈建议您将文件写入逻辑替换为更专业的服务，例如：
  // 1. 将数据保存到数据库 (如 PlanetScale, Neon, Vercel aows KV 等)。
  // 2. 通过邮件服务 (如 Resend, Nodemailer) 将信息作为邮件发送给自己。
  // 3. 调用第三方表单服务 (如 Tally, Formspree)。

  try {
    const body = await request.json();
    const { name, phone, email, service, country, state } = body;

    // 基本的数据验证
    if (!name || !phone || !email || !service || !country || !state) {
      return NextResponse.json({ message: '缺少必填字段' }, { status: 400 });
    }

    const dataString = `
-------------------------
新的客户信息:
提交时间: ${new Date().toISOString()}
姓名: ${name}
电话: ${phone}
邮箱: ${email}
咨询服务: ${service}
国家/地区: ${country}
省/州: ${state}
-------------------------\n
`;

    // 按照您指定的路径构建文件路径（相对于项目根目录）
    const filePath = path.join(process.cwd(), 'src', 'compenents', 'kehuziliap.txt');

    // 确保 'src/compenents' 目录存在
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // 将数据追加到文件中
    await fs.appendFile(filePath, dataString);

    return NextResponse.json({ message: '客户信息保存成功' }, { status: 200 });
  } catch (error) {
    console.error('API 路由错误:', error);
    const errorMessage = error instanceof Error ? error.message : '发生未知错误';
    return NextResponse.json({ message: '保存客户信息失败', error: errorMessage }, { status: 500 });
  }
}

*/
// ===================================================================================