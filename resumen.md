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