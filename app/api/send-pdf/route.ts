import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const LOGO_URL = 'https://res.cloudinary.com/dh7njjjwf/image/upload/v1777104960/logo-castennio-fondo-transparente-icono-negro_j4f1p7.png';

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email no configurado' }, { status: 500 });
  }

  const { emails, pdfBase64, fileName, docType, clientName } = await req.json();

  if (!emails?.length || !pdfBase64 || !fileName) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const label = docType === 'welcome' ? 'Welcome Pack' : 'Contrato';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:linear-gradient(180deg,#14151a,#0f1015);border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
        <tr><td style="padding:40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <img src="${LOGO_URL}" alt="Castennio" width="50" height="50" style="margin-bottom:20px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:600;">${label}</h1>
          ${clientName ? `<p style="margin:10px 0 0;color:rgba(255,255,255,0.5);font-size:14px;">${clientName}</p>` : ''}
        </td></tr>
        <tr><td style="padding:30px 40px;">
          <p style="margin:0 0 20px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;">
            Adjunto encontrarás el documento <strong style="color:#a78bfa;">${label}</strong> generado por Castennio.
          </p>
          <p style="margin:0;color:rgba(255,255,255,0.4);font-size:13px;">
            Si tienes alguna consulta, no dudes en responder a este correo.
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;">
            <a href="https://castennio.com" style="color:rgba(255,255,255,0.4);text-decoration:none;">castennio.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: 'Castennio <no-reply@castennio.com>',
      to: emails,
      subject: `${label}${clientName ? ` - ${clientName}` : ''} | Castennio`,
      html,
      attachments: [{ filename: fileName, content: pdfBase64 }],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending PDF email:', error);
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }
}
