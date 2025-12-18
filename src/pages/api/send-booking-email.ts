import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { 
      patientName, 
      patientEmail, 
      date, 
      time, 
      businessName, 
      serviceName,
      doctorName,
      // Nuevos campos opcionales para personalización
      brandColor,
      logoUrl,
      businessAddress
    } = body;

    if (!patientName) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    const dateObj = new Date(date + 'T00:00:00');
    const dateReadable = dateObj.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    // Color principal (si no llega, usa azul por defecto)
    const mainColor = brandColor || '#2563EB';

    // HTML PREMIUM MEJORADO (Basado en el que funcionaba)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          
          /* Header con Logo Opcional */
          .header { background-color: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 1px solid #f0f0f0; }
          .brand-logo { max-height: 50px; margin-bottom: 10px; }
          .brand-text { font-size: 20px; font-weight: bold; color: #111827; letter-spacing: -0.5px; }
          
          .content { padding: 40px; }
          .greeting { font-size: 24px; color: #111827; margin-bottom: 10px; font-weight: 600; }
          .subtext { color: #6b7280; font-size: 16px; line-height: 1.5; margin-bottom: 30px; }
          
          .card { background-color: #f8fafc; border-radius: 12px; padding: 25px; border: 1px solid #e2e8f0; margin-bottom: 30px; }
          .card-row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 15px; }
          .card-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
          .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 16px; color: #0f172a; font-weight: 500; margin-top: 4px; text-align: right; }
          
          .tips { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; color: #92400e; font-size: 14px; margin-bottom: 30px; }
          
          .button-container { text-align: center; }
          .button { 
            background-color: ${mainColor}; /* Color Dinámico */
            color: #ffffff; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            display: inline-block; 
            font-size: 16px; 
          }
          
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Inteligente -->
          <div class="header">
            ${logoUrl ? `<img src="${logoUrl}" alt="Logo" class="brand-logo">` : ''}
            <div class="brand-text" ${logoUrl ? 'style="margin-top:5px;"' : ''}>${businessName}</div>
          </div>

          <!-- Body -->
          <div class="content">
            <h1 class="greeting">¡Hola, ${patientName}! 👋</h1>
            <p class="subtext">Tu cita ha sido confirmada exitosamente. Aquí tienes todos los detalles:</p>

            <!-- Appointment Card -->
            <div class="card">
              <div class="card-row" style="display: block;">
                <div class="label">Tratamiento</div>
                <div class="value" style="font-size: 18px; color: ${mainColor}; font-weight: 700;">${serviceName}</div>
              </div>
              
              <div class="card-row" style="display: block;">
                <div class="label">Fecha y Hora</div>
                <div class="value" style="text-transform: capitalize;">${dateReadable}</div>
                <div class="value">a las ${time}</div>
              </div>

              <div class="card-row" style="display: block; border: none;">
                <div class="label">Especialista</div>
                <div class="value">👨‍⚕️ ${doctorName}</div>
              </div>
            </div>

            <!-- Recomendaciones -->
            <div class="tips">
              <strong>💡 Importante:</strong> Recuerda llegar 10 minutos antes. Si necesitas cancelar, avísanos con tiempo.
            </div>

            <div class="button-container">
              <!-- Link a Google Maps con la dirección del negocio -->
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress || businessName)}" target="_blank" class="button">
                📍 Ver Ubicación en Mapa
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            ${businessAddress ? `<p style="margin-bottom: 5px;">${businessAddress}</p>` : ''}
            <p>Este es un mensaje automático de ${businessName}.</p>
            <p>Powered by <strong>DentalApp</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: "Citas DentalApp <onboarding@resend.dev>",
      to: ["juanmarston1205@gmail.com"], // Sandbox Mode
      subject: `✅ Confirmada: Cita con ${doctorName}`,
      html: emailHtml,
    });

    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  }
};