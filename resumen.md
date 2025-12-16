📂 Resumen Técnico de Migración: Proyecto SaaS Clínica Dental
Este proyecto es un sistema de gestión de citas médicas (SaaS) actualmente funcional, desplegado en Netlify y conectado a Supabase.
1. 🛠 Stack Tecnológico Exacto
Framework: Astro v5.x (Configurado en modo SSR / Server).
Lenguaje: TypeScript / JavaScript (ES6+).
Estilos: TailwindCSS v3.x.
Backend / Base de Datos: Supabase (PostgreSQL + Auth + RLS).
Infraestructura: Netlify (con adaptador @astrojs/netlify).
Librerías Clave:
@supabase/supabase-js: Cliente de base de datos.
sweetalert2: Para modales y alertas nativas de la UI.
@astrojs/netlify: Adaptador para Serverless functions.
2. 🗂 Estructura de Directorios Actual
code
Text
/
├── astro.config.mjs        # Configurado con output: 'server' y adapter: netlify()
├── tailwind.config.mjs     # Configuración estándar
├── package.json
├── .env                    # Variables: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
├── src/
│   ├── lib/
│   │   └── supabase.ts     # Cliente de Supabase (singleton)
│   ├── layouts/
│   │   └── Layout.astro    # Plantilla base (HTML, Head, Meta)
│   ├── pages/
│   │   ├── index.astro     # Landing page (Home)
│   │   ├── agendar-cita.astro  # Formulario público inteligente (Lógica Cliente/Servidor)
│   │   └── admin/
│   │       ├── login.astro     # Autenticación + Puente de Cookies
│   │       └── dashboard.astro # Panel principal (Gestión, Filtros, Excel, Seguridad)
3. 📄 Descripción de Archivos Clave
src/pages/admin/dashboard.astro (El Cerebro)
Backend (Frontmatter):
Verifica sesión leyendo cookies (sb-access-token).
Obtiene datos relacionales: appointments + services + dentists.
Frontend (UI):
Diseño Híbrido: Muestra una Tabla en Desktop y Tarjetas (Cards) en Móvil.
Badges: Colores semánticos para estados (Pendiente=Amarillo, Confirmada=Azul, etc.).
Lógica (Script):
SweetAlert2: Gestiona confirmaciones de acciones (Confirmar, Cancelar, Completar, Restaurar, Editar, Ver Ficha).
Filtros: Lógica JS pura para filtrar por Fecha, Estado, Dentista y Búsqueda de texto.
Excel: Exportación compatible con Latam (UTF-8 BOM + separador ;), extrayendo datos de atributos data-dataset.
src/pages/agendar-cita.astro (Formulario Público)
Backend: Carga lista de Servicios y Dentistas activos desde Supabase.
Frontend:
Filtrado en Cascada: Al elegir un servicio, el select de Dentistas filtra solo a los profesionales que realizan ese servicio (basado en relación N:N).
Validación: Visual (bordes rojos) y regex para emails.
Normalización: Guarda datos en columnas específicas (patient_age, marketing_source, etc.) en lugar de un campo de texto genérico.
src/pages/admin/login.astro
Maneja el inicio de sesión con Supabase Auth.
Crítico: Al loguearse, guarda el token en document.cookie para que el servidor (Astro SSR) pueda leer la sesión en la siguiente navegación.
4. 🎨 Reglas de Estilo y UX
TailwindCSS: Uso exclusivo de clases utilitarias.
Iconografía: Heroicons (SVG inline).
Feedback Visual:
Botón de WhatsApp oficial (#25D366).
Estados reversibles (Deshacer completado, Restaurar cancelado).
Validación de formularios con mensajes de error hidden/block.
5. 🛢 Esquema de Base de Datos (Supabase)
Tablas normalizadas con RLS (Row Level Security) activo:
appointments: Citas. Columnas nuevas: patient_age, patient_doc, is_first_visit, consultation_reason, marketing_source, dentist_id, service_id.
services: Catálogo de precios y duración.
dentists: Lista de profesionales.
dentist_services: Tabla intermedia (Qué dentista hace qué servicio).
businesses: Datos de la clínica (Multi-tenancy preparado).
6. 🚦 Estado Actual
✅ Login/Logout: Funciona con persistencia de sesión.
✅ Agendamiento: Formulario público guarda datos relacionales correctamente.
✅ Dashboard: CRUD completo de citas, visualización móvil perfecta.
✅ Reportes: Exportación a Excel funcional con todos los datos demográficos.
7. 🔜 Próximos Pasos (Roadmap)
Calendario Visual: Implementar vista de calendario (semana/mes) para detectar huecos libres visualmente.
Módulo de Configuración: Interfaz UI para que el admin cree servicios y dentistas sin tocar la base de datos.
Notificaciones: Integrar envío de correos (Resend) o WhatsApp API al confirmar citas.


----------------------

Hola. Voy a continuar el desarrollo de un proyecto SaaS de Clínica Dental existente.
Para este chat, actuarás como mi Arquitecto de Software Senior y Desarrollador Principal. Necesito que interiorices el estado actual del proyecto y las reglas estrictas de desarrollo antes de escribir una sola línea de código.
Aquí tienes la BIBLIA DEL PROYECTO. Léela detenidamente:
PARTE 1: MANIFIESTO Y REGLAS (Estrictas)
📂 MANIFIESTO DE MIGRACIÓN: SISTEMA SAAS CLÍNICA DENTAL
Actúa como un Arquitecto de Software Senior y Desarrollador Fullstack experto. Voy a continuar el desarrollo de un sistema SaaS de agendamiento de citas médicas. A continuación, te presento las Reglas del Sistema que rigen este proyecto. Debes seguirlas estrictamente para mantener la consistencia, seguridad y calidad.
🛠 Stack Tecnológico (Estricto)
Framework: Astro v5.x (Configurado en modo SSR output: 'server').
Lenguaje: TypeScript / JavaScript (ES6+).
Estilos: TailwindCSS v3.x (Uso exclusivo de clases utilitarias, sin CSS global externo).
Backend / DB: Supabase (PostgreSQL). Usamos:
Auth (Email/Password).
Database (Tablas relacionales: appointments, services, dentists, dentist_services, businesses).
RLS (Row Level Security) ACTIVO y obligatorio.
Infraestructura: Netlify (Adaptador @astrojs/netlify).
Librerías Clave:
sweetalert2: Para todos los modales y confirmaciones (No usar window.confirm).
@supabase/supabase-js.
🏛️ Arquitectura y Patrones Críticos
Autenticación Híbrida ("Puente de Cookies"):
Cliente (login.astro): Autentica con Supabase y guarda el token manualmente en document.cookie (sb-access-token).
Servidor (dashboard.astro): Lee la cookie en el Frontmatter y reconstruye la sesión con supabase.auth.setSession para poder hacer consultas SSR seguras.
Seguridad de Datos:
Nunca confiar en la validación del cliente solamente.
La base de datos tiene políticas RLS estrictas (authenticated para admin, anon solo INSERT).
Normalización de Datos:
No guardar JSONs complejos en una celda de texto. Usar columnas explícitas (patient_age, marketing_source, dentist_id).
🎨 Reglas de Estilo y UX/UI (Nivel Premium)
Estética: El diseño debe verse "SaaS Premium", no "sitio básico".
Uso de sombras suaves (shadow-sm, shadow-lg).
Bordes redondeados (rounded-xl, rounded-2xl).
Colores semánticos: Amarillo (Pendiente), Azul (Confirmada), Verde (Completada/Éxito), Rojo (Cancelada/Error).
Iconografía: PROHIBIDO usar Emojis para acciones o estados. Usar siempre SVG inline (Heroicons).
Responsive:
Diseño Híbrido Obligatorio: Tabla para Desktop (hidden md:table) y Tarjetas (Cards) para Móvil (block md:hidden).
Los botones en móvil deben ser fáciles de tocar (Full width).
Interacciones:
WhatsApp: Usar siempre el color de marca oficial (#25D366) y el logo SVG correcto.
Feedback: Usar SweetAlert2 para confirmar acciones destructivas o guardar cambios.
📂 Estructura de Archivos
code
Text
/
├── astro.config.mjs        # SSR + Netlify Adapter
├── .env                    # PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
├── src/
│   ├── lib/
│   │   └── supabase.ts     # Cliente Singleton
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML
│   ├── pages/
│   │   ├── index.astro     # Landing
│   │   ├── agendar-cita.astro  # Formulario Público (Lógica Cliente/Servidor mixta)
│   │   └── admin/
│   │       ├── login.astro     # Auth Cliente
│   │       └── dashboard.astro # Panel Admin (SSR, Lógica pesada)
✍️ Convenciones de Código
JavaScript en Cliente: Usar <script> plano al final del archivo Astro.
Manejo de DOM: Usar document.getElementById con Type Casting defensivo (as HTMLInputElement) o Optional Chaining (?.).
Selectores Dinámicos: Al llenar <select> desde BD, usar lógica de inyección de datos mediante atributos data- en un div oculto (#logic-data) para pasar datos complejos del Servidor al Cliente.
Manejo de Errores: try/catch en todas las llamadas asíncronas con feedback visual al usuario (no solo console.log).
⚠️ Preferencias Personales (Instrucciones para la IA)
Código Completo: Cuando pida una corrección, dame el archivo completo corregido. No me des parches o bloques sueltos ("cambia esto por esto"), prefiero copiar y pegar todo para evitar errores de integración.
No Romper Funcionalidad: Antes de sugerir una mejora, asegúrate de que no elimine características existentes (como validaciones, estilos visuales o lógica de negocio anterior).
Enfoque Comercial: Prioriza soluciones que hagan el producto "vendible" (estética profesional, flujos de usuario sin fricción).
Estado Actual: El sistema está funcional. El dashboard permite gestionar citas, filtrar por múltiples criterios, exportar a Excel (formato Latam) y editar citas mediante modales. El formulario público es dinámico y carga servicios/dentistas desde la BD.
Siguiente Tarea: (Aquí escribirás lo que quieres hacer en el nuevo chat).
PARTE 2: CONTEXTO ACTUAL Y ARCHIVOS
📂 Resumen Técnico de Migración: Proyecto SaaS Clínica Dental
Este proyecto es un sistema de gestión de citas médicas (SaaS) actualmente funcional, desplegado en Netlify y conectado a Supabase.
🛠 Stack Tecnológico Exacto
Framework: Astro v5.x (Configurado en modo SSR / Server).
Lenguaje: TypeScript / JavaScript (ES6+).
Estilos: TailwindCSS v3.x.
Backend / Base de Datos: Supabase (PostgreSQL + Auth + RLS).
Infraestructura: Netlify (con adaptador @astrojs/netlify).
Librerías Clave:
@supabase/supabase-js: Cliente de base de datos.
sweetalert2: Para modales y alertas nativas de la UI.
@astrojs/netlify: Adaptador para Serverless functions.
🗂 Estructura de Directorios Actual
code
Text
/
├── astro.config.mjs        # Configurado con output: 'server' y adapter: netlify()
├── tailwind.config.mjs     # Configuración estándar
├── package.json
├── .env                    # Variables: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
├── src/
│   ├── lib/
│   │   └── supabase.ts     # Cliente de Supabase (singleton)
│   ├── layouts/
│   │   └── Layout.astro    # Plantilla base (HTML, Head, Meta)
│   ├── pages/
│   │   ├── index.astro     # Landing page (Home)
│   │   ├── agendar-cita.astro  # Formulario público inteligente (Lógica Cliente/Servidor)
│   │   └── admin/
│   │       ├── login.astro     # Autenticación + Puente de Cookies
│   │       └── dashboard.astro # Panel principal (Gestión, Filtros, Excel, Seguridad)
📄 Descripción de Archivos Clave
src/pages/admin/dashboard.astro (El Cerebro)
Backend (Frontmatter):
Verifica sesión leyendo cookies (sb-access-token).
Obtiene datos relacionales: appointments + services + dentists.
Frontend (UI):
Diseño Híbrido: Muestra una Tabla en Desktop y Tarjetas (Cards) en Móvil.
Badges: Colores semánticos para estados (Pendiente=Amarillo, Confirmada=Azul, etc.).
Lógica (Script):
SweetAlert2: Gestiona confirmaciones de acciones (Confirmar, Cancelar, Completar, Restaurar, Editar, Ver Ficha).
Filtros: Lógica JS pura para filtrar por Fecha, Estado, Dentista y Búsqueda de texto.
Excel: Exportación compatible con Latam (UTF-8 BOM + separador ;), extrayendo datos de atributos data-dataset.
src/pages/agendar-cita.astro (Formulario Público)
Backend: Carga lista de Servicios y Dentistas activos desde Supabase.
Frontend:
Filtrado en Cascada: Al elegir un servicio, el select de Dentistas filtra solo a los profesionales que realizan ese servicio (basado en relación N:N).
Validación: Visual (bordes rojos) y regex para emails.
Normalización: Guarda datos en columnas específicas (patient_age, marketing_source, etc.) en lugar de un campo de texto genérico.
src/pages/admin/login.astro
Maneja el inicio de sesión con Supabase Auth.
Crítico: Al loguearse, guarda el token en document.cookie para que el servidor (Astro SSR) pueda leer la sesión en la siguiente navegación.
🎨 Reglas de Estilo y UX
TailwindCSS: Uso exclusivo de clases utilitarias.
Iconografía: Heroicons (SVG inline).
Feedback Visual:
Botón de WhatsApp oficial (#25D366).
Estados reversibles (Deshacer completado, Restaurar cancelado).
Validación de formularios con mensajes de error hidden/block.
🛢 Esquema de Base de Datos (Supabase)
Tablas normalizadas con RLS (Row Level Security) activo:
appointments: Citas. Columnas nuevas: patient_age, patient_doc, is_first_visit, consultation_reason, marketing_source, dentist_id, service_id.
services: Catálogo de precios y duración.
dentists: Lista de profesionales.
dentist_services: Tabla intermedia (Qué dentista hace qué servicio).
businesses: Datos de la clínica (Multi-tenancy preparado).
🚦 Estado Actual
✅ Login/Logout: Funciona con persistencia de sesión.
✅ Agendamiento: Formulario público guarda datos relacionales correctamente.
✅ Dashboard: CRUD completo de citas, visualización móvil perfecta.
✅ Reportes: Exportación a Excel funcional con todos los datos demográficos.
🔜 Próximos Pasos (Roadmap)
Calendario Visual: Implementar vista de calendario (semana/mes) para detectar huecos libres visualmente.
Módulo de Configuración: Interfaz UI para que el admin cree servicios y dentistas sin tocar la base de datos.
Notificaciones: Integrar envío de correos (Resend) o WhatsApp API al confirmar citas.
INSTRUCCIONES PARA ESTA RESPUESTA:
Analiza la arquitectura híbrida de Astro + Supabase y el "Puente de Cookies". Confírmame que entiendes por qué lo hacemos así (para no romper el SSR).

ESQUEMA DE BASE DE DATOS (Supabase):
created_at (timestamptz)
updated_at (timestamptz)
dentist_id (uuid)
patient_age (int4)
patient_doc (text)
is_first_visit (bool)
consultation_reason (text)
marketing_source (text)"
"TABLA: business_hours
id (uuid, obligatorio)
business_id (uuid)
day_of_week (int4, obligatorio)
open_time (time, obligatorio)
close_time (time, obligatorio)
is_open (bool)"
"TABLA: businesses
id (uuid, obligatorio)
name (text, obligatorio)
type (text, obligatorio)
email (text, obligatorio)
phone (text)
address (text)
description (text)
created_at (timestamptz)"
"TABLA: dentist_schedules
id (uuid, obligatorio)
dentist_id (uuid)
day_of_week (int4)
start_time (time, obligatorio)
end_time (time, obligatorio)
is_active (bool)
created_at (timestamp)"
"TABLA: dentist_services
id (uuid, obligatorio)
dentist_id (uuid)
service_id (uuid)
created_at (timestamp)"
"TABLA: dentists
id (uuid, obligatorio)
business_id (uuid)
name (text, obligatorio)
specialty (text)
email (text)
phone (text)
is_active (bool)
created_at (timestamptz)"
"TABLA: services
id (uuid, obligatorio)
business_id (uuid)
name (text, obligatorio)
description (text)
duration (int4, obligatorio)
price (numeric)
is_active (bool)
created_at (timestamptz)"

No generes código nuevo todavía.
Solo responde: "Contexto recibido. Arquitectura híbrida y reglas de estilo entendidas. Estoy listo. ¿En qué módulo trabajamos hoy?"