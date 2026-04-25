import { NextResponse } from "next/server";
import { Resend } from "resend";

const LOGO_URL = "https://res.cloudinary.com/dh7njjjwf/image/upload/v1777104960/logo-castennio-fondo-transparente-icono-negro_j4f1p7.png";
const SITE_URL = "https://castennio.com";

const serviceLabels: Record<string, string> = {
  "web-new": "Pagina web desde cero",
  "redesign": "Rediseño de sitio existente",
  "migration": "Migracion a tecnologia moderna",
  "integrations": "Integraciones",
  "other": "Otro",
};

function getAdminEmailTemplate(name: string, email: string, service: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: linear-gradient(180deg, #14151a 0%, #0f1015 100%); border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <img src="${LOGO_URL}" alt="Castennio" width="50" height="50" style="margin-bottom: 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Nuevo mensaje de contacto</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.5); font-size: 14px;">Recibido desde el formulario web</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px 40px;">

              <!-- Info Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nombre</span>
                          <p style="margin: 5px 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.06);">
                          <span style="color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span>
                          <p style="margin: 5px 0 0;"><a href="mailto:${email}" style="color: #3b82f6; font-size: 16px; text-decoration: none;">${email}</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid rgba(255,255,255,0.06);">
                          <span style="color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Servicio</span>
                          <p style="margin: 5px 0 0; color: #8b5cf6; font-size: 16px; font-weight: 500;">${serviceLabels[service] || service}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1); padding: 20px;">
                <span style="color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</span>
                <p style="margin: 10px 0 0; color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 50px;">Responder a ${name}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">Este mensaje fue enviado desde <a href="${SITE_URL}" style="color: rgba(255,255,255,0.5); text-decoration: none;">castennio.com</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getClientEmailTemplate(name: string, service: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: linear-gradient(180deg, #14151a 0%, #0f1015 100%); border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding: 50px 40px 40px; text-align: center;">
              <img src="${LOGO_URL}" alt="Castennio" width="60" height="60" style="margin-bottom: 25px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Recibimos tu mensaje</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin: 0 0 20px; color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.7;">
                Hola <strong style="color: #ffffff;">${name}</strong>,
              </p>
              <p style="margin: 0 0 20px; color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.7;">
                Gracias por contactarnos. Hemos recibido tu consulta sobre <strong style="color: #8b5cf6;">${serviceLabels[service] || service}</strong> y te responderemos en menos de 24 horas.
              </p>
              <p style="margin: 0 0 30px; color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.7;">
                Mientras tanto, si tienes alguna pregunta urgente, puedes escribirnos directamente por WhatsApp.
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/51998162677" style="display: inline-block; padding: 16px 36px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 50px;">Escribir por WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);"></div>
            </td>
          </tr>

          <!-- What's next -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Que sigue</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 15px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background: rgba(59, 130, 246, 0.1); border-radius: 50%; text-align: center; line-height: 28px; color: #3b82f6; font-size: 12px; font-weight: 600;">1</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 500;">Revisamos tu mensaje</p>
                          <p style="margin: 5px 0 0; color: rgba(255,255,255,0.5); font-size: 13px;">Analizamos tu proyecto y necesidades</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background: rgba(139, 92, 246, 0.1); border-radius: 50%; text-align: center; line-height: 28px; color: #8b5cf6; font-size: 12px; font-weight: 600;">2</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 500;">Te contactamos</p>
                          <p style="margin: 5px 0 0; color: rgba(255,255,255,0.5); font-size: 13px;">En menos de 24 horas habiles</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background: rgba(34, 197, 94, 0.1); border-radius: 50%; text-align: center; line-height: 28px; color: #22c55e; font-size: 12px; font-weight: 600;">3</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 500;">Propuesta personalizada</p>
                          <p style="margin: 5px 0 0; color: rgba(255,255,255,0.5); font-size: 13px;">Con precio fijo y fechas claras</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background: rgba(0,0,0,0.2); border-radius: 0 0 16px 16px;">
              <img src="${LOGO_URL}" alt="Castennio" width="30" height="30" style="margin-bottom: 15px; opacity: 0.6;">
              <p style="margin: 0 0 10px; color: rgba(255,255,255,0.4); font-size: 13px;">Transformamos ideas en experiencias digitales</p>
              <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">
                <a href="${SITE_URL}" style="color: rgba(255,255,255,0.4); text-decoration: none;">castennio.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY no configurada");
      return NextResponse.json(
        { error: "Servicio de email no configurado" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Enviar email al admin
    await resend.emails.send({
      from: "Castennio Web <no-reply@castennio.com>",
      to: process.env.CONTACT_EMAIL || "castennio@gmail.com",
      replyTo: email,
      subject: `Nuevo contacto: ${serviceLabels[service] || service}`,
      html: getAdminEmailTemplate(name, email, service, message),
    });

    // Enviar email de confirmacion al cliente
    await resend.emails.send({
      from: "Castennio <no-reply@castennio.com>",
      to: email,
      subject: "Recibimos tu mensaje - Castennio",
      html: getClientEmailTemplate(name, service),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
