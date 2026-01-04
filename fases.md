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

///////////
📝 Resumen Ejecutivo: Hito Fase 2 Finalizado
Hemos completado la transformación del sistema de una "Agenda Simple" a un CRM Clínico Multi-tenant. Aquí está el registro de lo logrado para tu historial:
Núcleo de Datos (Backend):
Normalización de la BD: Creación de tablas patients y clinical_records.
Cerebro Central (create.ts): Endpoint unificado que maneja la lógica de negocio (Crear Paciente + Cita + Email) de forma atómica y segura usando SERVICE_ROLE_KEY.
Seguridad: RLS (Row Level Security) ajustado para permitir operaciones críticas sin exponer datos entre clínicas.
Gestión de Pacientes (Frontend Admin):
Directorio: Búsqueda instantánea, paginación client-side y exportación a Excel normalizada (UTF-8).
Historia Clínica ([id].astro):
Timeline visual de evoluciones.
CRUD Completo de notas (Crear con tipo/doctor, Editar, Borrar).
Gestión de Alergias crítica.
Quick Actions: Agendamiento rápido y gestión de citas (Editar/Borrar) sin salir del perfil.
UX Móvil: Pestañas (Tabs) con scroll horizontal y layouts adaptables.


////
29 Diciembre 2025

🧱 Estado actual de tu sistema (muy bueno)

En este momento tu arquitectura ya tiene:

✔️ Auth de Supabase
✔️ RLS activado
✔️ Multitenancy por business_id
✔️ Auditoría clínica
✔️ Protección por sesión
✔️ Motor clínico bloqueado por estado aprobado

Esto es seguridad de producto, que es más importante que el captcha al inicio.

El captcha es perímetro, se pone justo antes de salir a público.

🗓️ Roadmap correcto para tu caso
Ahora

Enfócate en:

Flujo clínico completo

Estabilidad

UX

Auditoría y versionado

Marketing y demo

Cuando compres el dominio

En ese mismo día:

Configuras dominio en Netlify

Configuras dominio en Supabase

Configuras Turnstile con ese dominio

Pegas claves en Supabase

Pruebas login

Listo

Eso es una tarea de 20–30 minutos cuando tengas dominio.


Se sigue con la fase 3.2:

🧬 Y ahora sí… lo grande

Con esto listo, pasamos al último bloque fuerte de esta fase:

Versionado del odontograma por plan aprobado

Esto nos permite:

Mantener historia legal del estado bucal

Asociar cada plan aprobado con el odontograma exacto

Poder ver:

“Este plan se aprobó con este estado bucal”

🧭 Próximo paso del roadmap

Paso siguiente:

🧬 1️⃣ Congelar odontograma al aprobar plan
🧬 2️⃣ Guardar versión en nueva tabla
🧬 3️⃣ Visualizar versiones por fecha


02/01/2026

---

# 📚 Documentación Técnica: Módulo Financiero y de Pagos (Fase 5)

**Estado:** Completado (100%)
**Ubicación Principal:** `src/components/patient/PaymentsPanel.astro` integrando en `src/pages/admin/pacientes/[id].astro`.

## 1. Arquitectura de Base de Datos
Se implementó una estructura relacional robusta en Supabase para manejar transacciones monetarias.

*   **Tabla:** `public.payments`
*   **Columnas Clave:**
    *   `id`: UUID único.
    *   `amount`: Numeric (Permite positivos para ingresos y negativos para devoluciones).
    *   `payment_method`: Texto (Efectivo, Transferencia, Tarjeta, QR).
    *   `reference`: Texto (Nro de comprobante/recibo).
    *   `notes`: Texto (Observaciones del pago).
    *   `registered_by`: UUID (Traza de auditoría del usuario que registró).
*   **Seguridad (RLS):**
    *   Política unificada `payments_policy_unified`: Aislamiento estricto por `business_id` vinculado al perfil del usuario.
    *   Restricciones: Se eliminó el `CHECK (amount > 0)` para permitir reembolsos contables (valores negativos).

## 2. Lógica Contable (El "Libro Mayor")
El sistema no almacena un "saldo final" estático, sino que lo calcula en tiempo real basándose en eventos (Event Sourcing simplificado), garantizando integridad de datos.

*   **Unificación de Transacciones:**
    *   **Cargos (+):** Provienen de `treatment_plans` con estado `approved` o `completed`. Usan el `estimated_cost` como valor de deuda.
    *   **Abonos (-):** Provienen de la tabla `payments`.
*   **Cálculo de Saldo (Running Balance):**
    *   Se ordenan todos los eventos cronológicamente.
    *   Se calcula el saldo línea por línea: `Saldo Anterior + Cargo - Abono = Nuevo Saldo`.
*   **Corte por Fechas (Server-Side):**
    *   Al filtrar por fecha, el sistema calcula un `initialBalance` sumando todas las transacciones previas a la fecha de inicio seleccionada.

## 3. Funcionalidades del Frontend (UI/UX)

### A. Dashboard Financiero
*   **KPIs en tiempo real:**
    *   **Valor Tratamiento:** Suma total de lo aprobado.
    *   **Total Abonado:** Suma total de ingresos.
    *   **Saldo Actual:** Indicador visual inteligente (Rojo si hay deuda, Verde si está Paz y Salvo o tiene Saldo a Favor).

### B. Gestión de Pagos
*   **Registrar Ingreso:** Modal interactivo (SweetAlert2) con validación de montos y selectores de método de pago.
*   **Reembolsos (Refunds):**
    *   Botón condicional: Solo aparece si el paciente tiene **Saldo a Favor**.
    *   Lógica: Inserta un registro negativo en la base de datos para anular el saldo a favor sin borrar el historial de ingresos previos.

### C. Sistema de Filtros Híbrido
*   **Filtro de Fecha (Server-Side):**
    *   Usa parámetros URL (`?start=...&end=...`).
    *   Recarga la página para recalcular matemáticamente el "Saldo Anterior" y mostrar el estado de cuenta exacto de ese periodo.
*   **Filtro de Texto (Client-Side):**
    *   Búsqueda instantánea por Descripción, Referencia o Nota sin recargar la página.

## 4. Motor de Reportes e Impresión
Se implementó una solución de impresión profesional ("Pixel-Perfect") sin librerías externas pesadas.

*   **Tecnología:** `Iframe` aislado generado dinámicamente con JavaScript.
*   **Características:**
    *   **Limpieza:** Ignora el sidebar, menús y colores de la app. Imprime solo el documento.
    *   **Estilos Inyectados:** Usa Tailwind vía CDN dentro del iframe para garantizar diseño idéntico al ver en pantalla.
    *   **Formato Legal:** Incluye cabecera con datos de la clínica (Logo, NIT, Dirección), datos del paciente y tabla detallada de movimientos.
    *   **Respeto de Filtros:** Lo que se ve en la tabla filtrada es exactamente lo que se imprime.

---

### ✅ Conclusión
El módulo cumple con los estándares de un SaaS clínico: permite trazabilidad total del dinero, maneja escenarios complejos (devoluciones, abonos parciales) y genera la documentación física necesaria para el paciente.