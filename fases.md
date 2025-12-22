//////

Color predeterminado: 2563eb
001427 Gris

git
Fases experimentales
git checkout -b 
git checkout -b experiment/historia-clinica

//-Query resumen de tablas-//
SELECT
'TABLA: ' || table_name || E'\n' ||
string_agg(
'- ' || column_name || ' (' || udt_name ||
CASE WHEN is_nullable = 'NO' THEN ', obligatorio' ELSE '' END ||
')',
E'\n' ORDER BY ordinal_position
) as estructura_para_ia
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name;

/////

Fase dos

Terminamos fase de agendamiento, se envia correo resend tanto desde slug como desde el dash agendar citas 20/12/2025 se realizo en la rama git checkout -b experiment/resend-emails
la cual el 20/12 se valida ok y se hace merge con main, se elimina luego del merge el archivo send-booking.ts que queda de respaldo en el .md pastcode, seguimos con la siguiente fase:

📂 MASTER PROMPT: CONTINUACIÓN DESARROLLO (SaaS DentalApp V2 - Fase 2: Historia Clínica)
ROL: Actúa como Senior Software Architect & Lead Fullstack Developer.
CONTEXTO: Estamos desarrollando "DentalApp" (SaaS Multi-tenant para clínicas dentales).
ESTADO ACTUAL: Fase 1 (Agenda) terminada al 100%. Fase 2 (Base de datos Pacientes) iniciada y normalizada.

1. 🏗️ STACK TECNOLÓGICO (ESTRICTO)
Core: Astro v5.x (SSR output: 'server').
Infra: Netlify (Adapter @astrojs/netlify).
Base de Datos: Supabase (PostgreSQL).
Seguridad:
- RLS (Row Level Security) ACTIVO y OBLIGATORIO en todas las tablas (aislamiento por `business_id`).
- Backend as Gatekeeper: Usamos `SERVICE_ROLE_KEY` solo en endpoints de API (`src/pages/api/*`) para lógica compleja (crear paciente/cita unificado), pero filtrando siempre manualmente por `business_id` en el código.
Estilos: TailwindCSS v3.x + Variables CSS (--color-brand) para marca blanca dinámica.
Librerías: SweetAlert2, FullCalendar v6 (Custom Material Design), Resend (Emails).

2. 🗄️ ARQUITECTURA DE DATOS (ACTUALIZADA)
- `businesses`: Configuración del tenant.
- `patients`: (NUEVA) Tabla maestra de pacientes. Campos: id, business_id, full_name, document_id (clave búsqueda), email, phone, etc.
- `appointments`: Vinculada a patients via `patient_id`.
- `services`, `dentists`: Tablas auxiliares.

3. 🗺️ ARCHIVOS CLAVE (CRÍTICOS)
- `src/pages/api/appointments/create.ts`: **CEREBRO CENTRAL**. Endpoint único que recibe datos, busca/crea paciente, crea cita y envía email con Resend. (Usa Service Role Key).
- `src/pages/admin/citas.astro`: Panel de gestión.
    - Calendario FullCalendar v6 altamente personalizado (Material Design).
    - Lógica Móvil: CSS Grid Stack y Date Picker nativo con posicionamiento dinámico JS (No tocar lógica `customButtons` sin revisar el fix de race-condition).
    - Usa `fetch('/api/appointments/create')` para agendar.
- `src/pages/u/[slug].astro`: Booking público. Conectado al mismo endpoint central.

4. 🧪 ESTADO DE EMAIL (RESEND)
- Modo Sandbox Activo.
- En `create.ts`, el destinatario está hardcoded a mi correo personal (para pruebas). Recordar cambiar a `customer_email` en producción.

5. 🎯 OBJETIVO DE LA SIGUIENTE SESIÓN (FASE 2 - CONTINUACIÓN)
Desarrollar la interfaz de **Historia Clínica**.
- Crear vista: `src/pages/admin/pacientes/index.astro` (Listado de pacientes con buscador server-side o híbrido).
- Crear vista detalle: `src/pages/admin/pacientes/[id].astro`.
- Implementar tablas para: `clinical_records` (evoluciones/notas) y `patient_attachments` (archivos).
- Conectar el botón "Ver Ficha" del calendario a la nueva vista de detalle del paciente.

Instrucción: Confirma que has cargado la arquitectura actualizada, especialmente el uso del endpoint unificado `create.ts` y la estructura de la tabla `patients`.