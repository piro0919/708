import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// 改行を許すとメールヘッダーへ別の行を差し込まれる。1行で済む欄では弾く。
const singleLine = /^[^\r\n]*$/;
const schema = z.object({
  budget: z.number().finite().min(0).max(1_000_000_000_000),
  companyName: z.string().trim().max(100).regex(singleLine).optional(),
  deadline: z.coerce.date(),
  email: z.string().trim().email().max(254),
  name: z.string().trim().min(1).max(100).regex(singleLine),
  subject: z.string().trim().min(1).max(200).regex(singleLine),
  text: z.string().trim().min(1).max(5000),
  // 人の目には見えない囮の欄。ボットだけが埋める。
  website: z.string().optional(),
});

export type PostEmailBody = z.input<typeof schema>;

export type PostEmailData = { ok: boolean };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostEmailData>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { budget, companyName, deadline, email, name, subject, text, website } =
    parsed.data;

  // 囮の欄が埋まっていたら送らずに成功を装う。ボットに弾いたことを悟らせない。
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      port: 465,
      secure: true,
      service: "gmail",
    });

    await transporter.verify();

    await transporter.sendMail({
      replyTo: {
        address: email,
        name: [name, companyName].filter((v) => !!v).join(" - "),
      },
      subject: `【7:08 オフィシャルサイト】${subject}`,
      text: `${text}\n\n予算：${budget.toLocaleString()}円\n納期：${dayjs(
        deadline,
      ).format("YYYY年MM月DD日")}`,
      to: process.env.NODEMAILER_AUTH_USER,
    });
  } catch (error) {
    console.error("Failed to send the contact email", error);

    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
