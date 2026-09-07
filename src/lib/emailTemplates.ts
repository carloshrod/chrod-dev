// Branded HTML for the notification emails Resend sends to the site owner
// (src/pages/api/send-contact-email.ts). Kept table-based with inline styles
// only, since email clients don't support flexbox/grid or external CSS.

const ACCENT = "#D52C33";
const SURFACE = "#101010";
const SURFACE_ALT = "#0d0d0d";
const BORDER = "#222222";
const LOGO_URL = "https://chrod.dev/chrod-logo.png";

export const escapeHtml = (val: string): string =>
  val.replace(
    /[&<>"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[ch]!,
  );

const nl2br = (val: string): string => escapeHtml(val).replace(/\n/g, "<br />");

interface DetailField {
  label: string;
  value: string;
}

interface EmailTemplateOptions {
  /** Short label shown in the header pill, e.g. "New contact message". */
  eyebrow: string;
  /** Main heading below the pill. */
  heading: string;
  fromName: string;
  fromEmail: string;
  /** Short label/value rows rendered as a details table (phone, budget…). */
  fields?: DetailField[];
  /** Longer free-text content (the message/textarea), rendered as a block. */
  message?: string;
}

function pill(text: string): string {
  return `<span style="display:inline-block; padding:5px 12px; border-radius:999px; background-color:rgba(213,44,51,0.12); border:1px solid rgba(213,44,51,0.35); color:${ACCENT}; font-size:11px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; white-space:nowrap;">${escapeHtml(text)}</span>`;
}

function layout(eyebrow: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CHRod</title>
  </head>
  <body style="margin:0; padding:32px 16px; background-color:transparent; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background-color:${SURFACE}; border:1px solid ${BORDER}; border-radius:16px; overflow:hidden;">
            <tr>
              <td style="background-color:${SURFACE_ALT}; padding:16px 28px; border-bottom:1px solid ${BORDER};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      <img src="${LOGO_URL}" alt="CHRod" height="28" style="display:block; height:28px; width:auto; border:0;" />
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      ${pill(eyebrow)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px; background-color:${SURFACE_ALT}; border-top:1px solid ${BORDER};">
                <p style="margin:0; font-size:12px; color:#64748b;">
                  Sent automatically from a form on
                  <a href="https://chrod.dev" style="color:#94a3b8; text-decoration:underline;">chrod.dev</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailsTable(fields: DetailField[]): string {
  const rows = fields
    .map(
      (field) => `
              <tr>
                <td style="padding:10px 14px; border-bottom:1px solid ${BORDER}; font-size:13px; color:#64748b; width:35%; vertical-align:top;">
                  ${escapeHtml(field.label)}
                </td>
                <td style="padding:10px 14px; border-bottom:1px solid ${BORDER}; font-size:14px; color:#e2e8f0; vertical-align:top;">
                  ${escapeHtml(field.value || "-")}
                </td>
              </tr>`,
    )
    .join("");

  return `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${SURFACE_ALT}; border:1px solid ${BORDER}; border-radius:10px; margin-top:20px; overflow:hidden;">
              ${rows}
            </table>`;
}

export function renderNotificationEmailHtml({
  eyebrow,
  heading,
  fromName,
  fromEmail,
  fields,
  message,
}: EmailTemplateOptions): string {
  const body = `
                <h1 style="margin:0 0 4px; font-size:20px; line-height:1.4; color:#f1f5f9; font-weight:700;">
                  ${escapeHtml(heading)}
                </h1>
                <p style="margin:0 0 4px; font-size:14px; color:#94a3b8;">
                  From <span style="color:#e2e8f0; font-weight:600;">${escapeHtml(fromName)}</span>
                  &lt;${escapeHtml(fromEmail)}&gt;
                </p>
                ${fields && fields.length > 0 ? detailsTable(fields) : ""}
                ${
                  message
                    ? `<div style="margin-top:20px; padding:16px; background-color:${SURFACE_ALT}; border:1px solid ${BORDER}; border-radius:10px; font-size:14px; line-height:1.6; color:#cbd5e1; white-space:pre-wrap;">${nl2br(message)}</div>`
                    : ""
                }`;

  return layout(eyebrow, body);
}

export function renderNotificationEmailText({
  eyebrow,
  heading,
  fromName,
  fromEmail,
  fields,
  message,
}: EmailTemplateOptions): string {
  const lines = [eyebrow, heading, "", `From: ${fromName} <${fromEmail}>`];
  if (fields && fields.length > 0) {
    lines.push("");
    fields.forEach((f) => lines.push(`${f.label}: ${f.value || "-"}`));
  }
  if (message) {
    lines.push("", message);
  }
  return lines.join("\n");
}
