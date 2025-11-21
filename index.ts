import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-subscription", async (req, res) => {
  const { fullName, email, phone } = req.body;
  const recieverEmail = "franciscoorozco@atenasconsultores.com";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Suscripción VM" <${process.env.SMTP_USER}>`,
    to: `${recieverEmail}`,
    subject: "Nueva solicitud de suscripción",
    html: `
  <body style="margin:0;padding:0;background-color:#0D1117;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D1117;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#161B22;border-radius:12px;border:1px solid #30363d;padding:32px;color:#c9d1d9;">
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <div style="text-align:center;">
                  <div style="display:inline-flex;justify-content:center;align-items:center;gap:8px;margin-bottom:8px;">
                    <span style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">
                      ATENAS
                    </span>
                    <span style="font-size:24px;font-weight:300;color:#9ca3af;letter-spacing:0.05em;">
                      VM
                    </span>
                  </div>
                  <p style="color:#8b949e;font-size:14px;">Solicitud de Suscripción - Visor de Mercado Atenas</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2 style="color:#c9d1d9;font-size:20px;margin-bottom:16px;">📥 Nuevo registro recibido</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:16px;">
                  <tr>
                    <td style="padding:8px 0;"><strong>👤 Nombre:</strong></td>
                    <td style="padding:8px 0;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>📧 Correo:</strong></td>
                    <td style="padding:8px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>📱 Teléfono:</strong></td>
                    <td style="padding:8px 0;">${phone}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:32px;text-align:center;">
                <p style="font-size:12px;color:#8b949e;">© 2025 Atenas Grupo Consultor. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`,
  };

  try {
    transporter.verify((error, success) => {
      if (error) {
        console.error("Error de conexión SMTP:", error);
      } else {
        console.log("Conexión SMTP exitosa");
      }
    });
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ message: "Error al enviar correo" });
  }
});

app.post("/api/send-comment", async (req, res) => {
  const { fullName, email, comments } = req.body;
  const recieverEmail = "franciscoorozco@atenasconsultores.com";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Suscripción VM" <${process.env.SMTP_USER}>`,
    to: `${recieverEmail}`,
    subject: `Nuevo comentario de ${fullName}`,
    html: `
  <body style="margin:0;padding:0;background-color:#0D1117;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D1117;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#161B22;border-radius:12px;border:1px solid #30363d;padding:32px;color:#c9d1d9;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <div style="text-align:center;">
                  <div style="display:inline-flex;justify-content:center;align-items:center;gap:8px;margin-bottom:8px;">
                    <span style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">
                      ATENAS
                    </span>
                    <span style="font-size:24px;font-weight:300;color:#9ca3af;letter-spacing:0.05em;">
                      VM
                    </span>
                  </div>
                  <p style="color:#8b949e;font-size:14px;margin:0;">Nuevo comentario de ${fullName}</p>
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td>
                <h2 style="color:#c9d1d9;font-size:20px;margin-bottom:16px;">📥 Nuevo comentario recibido</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:16px;line-height:1.5;">
                  <tr>
                    <td style="padding:8px 0;width:150px;"><strong>👤 Nombre:</strong></td>
                    <td style="padding:8px 0;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>📧 Correo:</strong></td>
                    <td style="padding:8px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;vertical-align:top;"><strong>💬 Comentarios:</strong></td>
                    <td style="padding:8px 0;">
                      <div style="background-color:#21262d;border-radius:8px;padding:12px;color:#f0f6fc;font-size:14px;">
                        ${comments}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:32px;text-align:center;">
                <p style="font-size:12px;color:#8b949e;margin:0;">
                  © 2025 Atenas Grupo Consultor. Todos los derechos reservados.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  `,
  };

  try {
    transporter.verify((error, success) => {
      if (error) {
        console.error("Error de conexión SMTP:", error);
      } else {
        console.log("Conexión SMTP exitosa");
      }
    });
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ message: "Error al enviar correo" });
  }
});

app.listen(3001, () => {
  console.log("MailApp corriendo en http://localhost:3001");
});
