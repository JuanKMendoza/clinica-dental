import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Inicializar clientes (Asegúrate de tener estas variables en tu .env)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      business_id,
      customer_name,
      customer_email,
      customer_phone,
      patient_doc,
      patient_age,
      appointment_date,
      appointment_time,
      service_id,
      dentist_id,
      consultation_reason,
      marketing_source,
      is_first_visit,
      // Datos extra para el Email (Frontend los enviará)
      business_name,
      service_name,
      dentist_name,
      brand_color,
      logo_url,
      business_address
    } = body;

    // 1. VALIDACIÓN BÁSICA
    if (!business_id || !customer_name || !appointment_date || !appointment_time) {
      return new Response(JSON.stringify({ error: "Datos incompletos" }), { status: 400 });
    }

    // 2. LÓGICA DE PACIENTE UNIFICADO (El corazón del sistema)
    let patientId = null;

    // A. Buscar si el paciente ya existe (Por Documento y Business)
    if (patient_doc) {
      const { data: existingPatient } = await supabase
        .from("patients")
        .select("id")
        .eq("business_id", business_id)
        .eq("document_id", patient_doc)
        .single();
      
      if (existingPatient) patientId = existingPatient.id;
    }

    // B. Si no existe, CREARLO
    if (!patientId) {
      const { data: newPatient, error: createError } = await supabase
        .from("patients")
        .insert([{
          business_id,
          full_name: customer_name,
          document_id: patient_doc,
          email: customer_email,
          phone: customer_phone,
          // Calculamos fecha de nacimiento aprox si hay edad, para analytics futuros
          birth_date: patient_age ? new Date(new Date().setFullYear(new Date().getFullYear() - patient_age)) : null
        }])
        .select()
        .single();

      if (createError) throw new Error(`Error creando paciente: ${createError.message}`);
      patientId = newPatient.id;
    } else {
        // C. Si existe, actualizamos email/teléfono si llegaron nuevos
        // (Opcional: puedes quitar esto si prefieres no sobrescribir datos)
        await supabase.from("patients").update({
            email: customer_email,
            phone: customer_phone
        }).eq("id", patientId);
    }

    // 3. CREAR LA CITA (Vinculada al Paciente)
    const { data: appointment, error: appError } = await supabase
      .from("appointments")
      .insert([{
        business_id,
        patient_id: patientId, // 🔥 LA CLAVE DE LA FASE 2
        customer_name, // Mantenemos redundancia por ahora (seguridad Fase 1)
        customer_email,
        customer_phone,
        patient_doc,
        patient_age,
        appointment_date,
        appointment_time,
        service_id,
        dentist_id: dentist_id || null, // Manejar "Cualquiera"
        consultation_reason,
        marketing_source,
        is_first_visit,
        status: "pending" // Por defecto pendiente
      }])
      .select()
      .single();

    if (appError) throw new Error(`Error creando cita: ${appError.message}`);

    // 4. ENVIAR CORREO (Solo si la cita se guardó)
    // Usamos tu plantilla HTML optimizada
    if (customer_email) {
        const dateObj = new Date(appointment_date + 'T00:00:00');
        const dateReadable = dateObj.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const mainColor = brand_color || '#2563EB';
        
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
              .header { background-color: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 1px solid #f0f0f0; }
              .brand-logo { max-height: 50px; margin-bottom: 10px; }
              .brand-text { font-size: 20px; font-weight: bold; color: #111827; }
              .content { padding: 40px; }
              .greeting { font-size: 24px; color: #111827; margin-bottom: 10px; font-weight: 600; }
              .subtext { color: #6b7280; font-size: 16px; line-height: 1.5; margin-bottom: 30px; }
              .card { background-color: #f8fafc; border-radius: 12px; padding: 25px; border: 1px solid #e2e8f0; margin-bottom: 30px; }
              .card-row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 15px; }
              .card-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
              .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; }
              .value { font-size: 16px; color: #0f172a; font-weight: 500; margin-top: 4px; text-align: right; }
              .tips { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; color: #92400e; font-size: 14px; margin-bottom: 30px; }
              .button-container { text-align: center; }
              .button { background-color: ${mainColor}; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; }
              .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                ${logo_url ? `<img src="${logo_url}" alt="Logo" class="brand-logo">` : ''}
                <div class="brand-text" ${logo_url ? 'style="margin-top:5px;"' : ''}>${business_name}</div>
              </div>
              <div class="content">
                <h1 class="greeting">¡Hola, ${customer_name.split(' ')[0]}! 👋</h1>
                <p class="subtext">Tu cita ha sido registrada exitosamente. Detalles:</p>
                <div class="card">
                  <div class="card-row" style="display: block;">
                    <div class="label">Tratamiento</div>
                    <div class="value" style="font-size: 18px; color: ${mainColor}; font-weight: 700;">${service_name}</div>
                  </div>
                  <div class="card-row" style="display: block;">
                    <div class="label">Fecha y Hora</div>
                    <div class="value" style="text-transform: capitalize;">${dateReadable}</div>
                    <div class="value">a las ${appointment_time}</div>
                  </div>
                  <div class="card-row" style="display: block; border: none;">
                    <div class="label">Especialista</div>
                    <div class="value">👨‍⚕️ ${dentist_name}</div>
                  </div>
                </div>
                <div class="tips"><strong>💡 Importante:</strong> Recuerda llegar 10 minutos antes.</div>
                <div class="button-container">
  <a
    href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business_address || business_name)}"
    target="_blank"
    style="
      background-color:${mainColor};
      color:#ffffff !important;
      padding:14px 28px;
      text-decoration:none;
      border-radius:8px;
      font-weight:700;
      display:inline-block;
      font-size:16px;
    "
  >
    📍 Ver Ubicación
  </a>
</div>
              </div>
              <div class="footer">
            ${business_address ? `<p style="margin-bottom: 5px;">${business_address}</p>` : ''}
            <p>Este es un mensaje automático de ${business_name}.</p>
            <p>Powered by <strong>DentalApp</strong></p>
          </div>
            </div>
          </body>
          </html>
        `;

        await resend.emails.send({
          from: "Citas DentalApp <onboarding@resend.dev>",
          // ⚠️ FIX SANDBOX: Forzamos tu correo para que Resend no bloquee el envío.
          // En producción (cuando verifiques dominio), cambias esto por [customer_email]
          to: ["juanmarston1205@gmail.com"], 
          subject: `✅ Cita Confirmada: ${service_name}`,
          html: emailHtml,
        });
    }

    return new Response(JSON.stringify({ 
        success: true, 
        message: "Cita y paciente procesados correctamente",
        id: appointment.id 
    }), { status: 200 });

  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Error interno del servidor" }), { status: 500 });
  }
};