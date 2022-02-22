import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type PostEmailBody = Pick<
  Mail.Options,
  "from" | "replyTo" | "subject" | "text"
>;

export type PostEmailData = SMTPTransport.SentMessageInfo;

type ExtendedPostRequest = {
  body: PostEmailBody;
};

type ExtendedPostResponse = {
  json: (body: PostEmailData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedPostResponse>>();

handler.post<ExtendedPostRequest, ExtendedPostResponse>(
  async ({ body }, res) => {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      port: 465,
      secure: true,
      service: "gmail",
    });
    const { from, replyTo, subject, text } = body as PostEmailBody;
    const info = await transporter.sendMail({
      from,
      replyTo,
      subject,
      text,
      to: process.env.NODEMAILER_AUTH_USER,
    });

    res.status(200);
    res.json(info);
    res.end();
  }
);

export default handler;
