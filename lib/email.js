import { Resend } from 'resend';

let client = null;
function getClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export async function sendEmail({ to, subject, html, replyTo }) {
  const c = getClient();
  if (!c) {
    console.log('[email] Resend not configured. Skipping. To:', to, 'Subject:', subject);
    return { skipped: true };
  }
  try {
    const from = process.env.RESEND_FROM_EMAIL || 'Connect Dharwad <onboarding@resend.dev>';
    const res = await c.emails.send({ from, to, subject, html, ...(replyTo && { replyTo }) });
    return { ok: true, id: res?.data?.id };
  } catch (e) {
    console.error('[email] failed:', e.message);
    return { ok: false, error: e.message };
  }
}

export function contactAdminTemplate(data) {
  return `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:auto;padding:24px;">
      <h2 style="color:#8CC63F">New ${data.subject || 'Contact'} Submission</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#666">Name</td><td>${data.name}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td>${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding:6px 0;color:#666">Phone</td><td>${data.phone}</td></tr>` : ''}
        ${data.subject ? `<tr><td style="padding:6px 0;color:#666">Subject</td><td>${data.subject}</td></tr>` : ''}
        ${data.program ? `<tr><td style="padding:6px 0;color:#666">Program</td><td>${data.program}</td></tr>` : ''}
        ${data.position ? `<tr><td style="padding:6px 0;color:#666">Position</td><td>${data.position}</td></tr>` : ''}
      </table>
      <div style="margin-top:16px;padding:16px;background:#F7F9FA;border-radius:12px">
        <div style="color:#666;font-size:12px;margin-bottom:6px">Message</div>
        <div>${(data.message || data.coverLetter || '').replace(/\n/g, '<br/>') || '<em>(no message)</em>'}</div>
      </div>
    </div>
  `;
}

export function userAckTemplate({ name, type = 'message' }) {
  return `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:auto;padding:24px;">
      <h2 style="color:#8CC63F">Thanks for reaching out, ${name}!</h2>
      <p>We received your ${type} and our team will get back to you within 24 hours.</p>
      <p style="margin-top:24px;color:#666;font-size:13px">— Connect Dharwad Team</p>
    </div>
  `;
}
