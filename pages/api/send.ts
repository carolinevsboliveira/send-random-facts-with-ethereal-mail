import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import path from "path";
import { promises } from "fs";
import handlebars from "handlebars";

type MailVariables = {
  name: string;
  lastName: string;
  randomEmail: string;
};

const factFetcher = async () => {
  const API_KEY = process.env.API_KEY as string;
  try {
    const fact = await fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    const factResponse = await fact.json();
    return factResponse[0].fact;
  } catch {
    throw new Response("Something went wrong with your request.");
  }
};
const mailTemplate = async (
  { name, lastName, randomEmail }: MailVariables,
  fact: string
) => {
  const templatePath = path.join(
    process.cwd(),
    "/src/templates/mail.template.hbs"
  );

  const templateFile = await promises.readFile(templatePath, {
    encoding: "utf-8",
  });

  const parseTemplate = handlebars.compile(templateFile);

  return parseTemplate({ name, lastName, randomEmail, fact });
};
const setupNodemailer = async ({
  name,
  lastName,
  randomEmail,
}: MailVariables) => {
  const fact = await factFetcher();
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const message = await transporter.sendMail({
    from: "randomfacts@random.com",
    to: randomEmail,
    subject: "Here's your random fact",
    html: await mailTemplate({ name, lastName, randomEmail }, fact),
  });

  return nodemailer.getTestMessageUrl(message);
};

export default async function emailSender(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, lastName, randomEmail } = JSON.parse(req.body);
    const emailSended = await setupNodemailer({ name, lastName, randomEmail });

    res.status(200).json(emailSended);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something when wrong with your request." });
  }
}
