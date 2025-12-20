Antiguo try Slug.astro

try {
        const formData = new FormData(form);
        const dentistVal = formData.get("dentist_id");
        const dentistId = dentistVal ? dentistVal : null;

        // 1. Obtener nombre del servicio para el correo
        const selectedServiceOption = serviceSelect.options[serviceSelect.selectedIndex];
        const serviceNameClean = selectedServiceOption ? selectedServiceOption.text.split(' - $')[0] : "Consulta General"; 
        
        // 2. Obtener nombre del doctor seleccionado para el correo
        const selectedDentistOption = dentistSelect.options[dentistSelect.selectedIndex];
        const doctorNameClean = (dentistVal && selectedDentistOption) ? selectedDentistOption.text : "Especialista Asignado";
        
        //Direccion
        const businessAddress = logicData?.dataset.businessAddress || '';

        // DATOS DE LA CITA
        const appointmentData = {
          business_id: businessId,
          service_id: formData.get("service_id"),
          dentist_id: dentistId,
          customer_name: formData.get("name"),
          customer_email: formData.get("email"),
          customer_phone: formData.get("phone"),
          appointment_date: formData.get("date"),
          appointment_time: formData.get("time"),
          status: "pending",
          patient_age: formData.get("age") ? parseInt(formData.get("age") as string) : null,
          patient_doc: formData.get("document"),
          is_first_visit: formData.get("first_visit") === "si",
          consultation_reason: formData.get("reason"),
          marketing_source: formData.get("source") || "Web Directa",
          notes: "",
        };

        // 3. GUARDAR EN BD
        const { data, error } = await supabase
          .from("appointments")
          .insert([appointmentData])
          .select();

        if (error) throw error;

        // 4. 🔥 ENVIAR CORREO (Llamada al Backend con TODOS los datos de marca)
        fetch("/api/send-booking-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Datos del Paciente
            patientName: formData.get("name"),
            patientEmail: formData.get("email"),
            date: formData.get("date"),
            time: formData.get("time"),
            serviceName: serviceNameClean,
            doctorName: doctorNameClean,
            
            // Datos de la Clínica (Branding)
            businessName: document.title.replace('Agendar Cita - ', ''),
            brandColor: getComputedStyle(document.body).getPropertyValue('--color-brand'), // Leemos el color del CSS!
            logoUrl: "{business.logo_url}", // Astro inyectará la URL del logo aquí
            businessAddress: businessAddress  // Astro inyectará la dirección aquí
          }),
        }).catch(err => console.error("Error enviando email:", err));

        // ÉXITO
        formMessage.className = "block p-6 rounded-lg bg-green-50 border-2 border-green-200 text-center mt-6 animate-fade-in";
        formMessage.innerHTML = `
          <svg class="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-xl font-bold text-green-900 mb-2">¡Cita agendada exitosamente!</h3>
          <p class="text-green-800">Tu cita ha sido registrada para el <strong>${formData.get("date")}</strong> a las <strong>${formData.get("time")}</strong></p>
          <p class="text-sm text-green-700 mt-4">Te hemos enviado un correo de confirmación. 📧</p>
          <div class="mt-6">
            <button onclick="window.location.reload()" class="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors">
              Agendar otra cita
            </button>
          </div>
        `;
        
        form.reset();
        Array.from(form.children).forEach((child) => {
            if (child.id !== 'form-message') (child as HTMLElement).style.display = 'none';
        });
        
        formMessage.classList.remove('hidden');
        formMessage.scrollIntoView({ behavior: "smooth", block: "center" });

      } catch (error: any) {
        console.error("Error:", error);
        formMessage.className = "block p-6 rounded-lg bg-red-50 border-2 border-red-200 text-center mt-6";
        formMessage.innerHTML = `
          <h3 class="text-xl font-bold text-red-900 mb-2">Hubo un error al agendar</h3>
          <p class="text-red-800 mb-4">${error.message || "Por favor intenta de nuevo o contáctanos por WhatsApp."}</p>
        `;
        formMessage.classList.remove('hidden');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }


Antiguo resend, previa logica a create.ts para slug.astro

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