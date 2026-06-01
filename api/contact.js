import nodemailer from "nodemailer";

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || process.env.SMTP_TO || process.env.SMTP_USER;
  const fromAddress = process.env.SMTP_FROM || process.env.EMAIL_FROM || process.env.SMTP_USER;
  const fromName = process.env.SMTP_FROM_NAME || process.env.EMAIL_FROM_NAME;
  const from = fromName ? `${fromName} <${fromAddress}>` : fromAddress;

  if (!host || !user || !pass || !to || !from) {
    return null;
  }

  return {
    from,
    host,
    pass,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    to,
    user,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const config = getSmtpConfig();
  if (!config) {
    return res.status(500).json({ error: "SMTP is not configured" });
  }

  const { attachment, customerEmail, message, name } = req.body || {};
  const cleanName = String(name || "").trim();
  const cleanEmail = String(customerEmail || "").trim();
  const cleanMessage = String(message || "").trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: "Customer email is invalid" });
  }

  const attachments = [];
  if (attachment?.content && attachment?.name) {
    const buffer = Buffer.from(String(attachment.content), "base64");
    if (buffer.byteLength > MAX_ATTACHMENT_BYTES) {
      return res.status(400).json({ error: "Attachment must be 4MB or smaller" });
    }

    attachments.push({
      content: buffer,
      contentType: attachment.type || "application/octet-stream",
      filename: String(attachment.name).replace(/[^\w.\- ()]/g, "_"),
    });
  }

  const transporter = nodemailer.createTransport({
    auth: {
      pass: config.pass,
      user: config.user,
    },
    host: config.host,
    port: config.port,
    secure: config.secure,
  });

  await transporter.sendMail({
    attachments,
    from: config.from,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#202124">
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>What they want:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br />")}</p>
      </div>
    `,
    replyTo: cleanEmail,
    subject: `Portfolio contact from ${cleanName}`,
    text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nWhat they want:\n${cleanMessage}`,
    to: config.to,
  });

  return res.status(200).json({ ok: true });
}
