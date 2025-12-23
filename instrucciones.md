📘 PARTE 1: Manual de Operaciones (Roadmap de Venta y Activación)
Este es el paso a paso que tú (o tu equipo de soporte) deben seguir cada vez que cierren una venta con una nueva clínica.

🏁 PASO 0: Requisitos Previos
Tener acceso al panel de Supabase.

Tener el Logo de la Clínica (en formato PNG/SVG, preferiblemente fondo transparente) subido a algún lugar (puede ser un Bucket de Supabase Storage o Cloudinary) para obtener su URL pública.

Saber el Color Corporativo (Código Hexadecimal, ej: #25D366).

🚀 PASO 1: Crear el Negocio (En Supabase)

Entra a tu Table Editor en Supabase, tabla businesses e inserta una nueva fila:

name: "Clínica Dental Sonrisas"
slug: clinica-sonrisas (Este será su link: tudominio.com/u/clinica-sonrisas). Debe ser único.
primary_color: #1E40AF (El color de su marca).
logo_url: https://.../logo.png
phone: 3001234567 (Para el botón de WhatsApp).
address: "Calle 123 #45-67, Bogotá".
Guarda y copia el ID (UUID) que se generó (ej: a0eebc99-9c0b...).

👤 PASO 2: Crear el Usuario Admin (El Doctor)

Ve al menú Authentication en Supabase -> Users -> Add User.
Email: doctor@sonrisas.com
Password: Una temporal segura (ej: Dental2025*).
Crear Usuario.
Copia el User UID que se generó.

🔗 PASO 3: Vincular Usuario al Negocio (El paso crítico)
Nota: Actualmente, en tu código validamos el business_id a través de la relación de datos. Para que el doctor vea SU clínica, necesitamos asignarle permiso.
(Como aún no hemos creado una tabla intermedia user_permissions en esta fase, el método actual implícito es que cuando creas el primer servicio o doctor, lo asignas a ese business_id. Pero para el MVP, tú manualmente gestionas esto).
Para la Fase 2 (Historia Clínica), crearemos la tabla profiles para vincular auth.uid con business_id automáticamente.
Por ahora (Fase 1), asegúrate de que cuando entregues el software, tú entres con la cuenta del doctor y crees el primer "Servicio" y "Doctor" en la pestaña Configuración. El sistema tomará el ID automáticamente si lo configuramos en el futuro login.

📦 PASO 4: Entrega al Cliente (El correo de bienvenida)

Envía un correo o WhatsApp al cliente con esto:

¡Bienvenido a DentalApp! 🦷
Su sistema de agendamiento ya está configurado con su marca.

🔹 Su Panel Administrativo: tudominio.com/admin/login
Usuario: doctor@sonrisas.com
Contraseña: Dental2025*

🔹 Su Link de Agendamiento (Para poner en Instagram/Facebook):
tudominio.com/u/clinica-sonrisas
http://localhost:4321/u/demo-clinica

Le recomendamos entrar al Panel y configurar sus Servicios y Doctores en la pestaña "Configuración".

🗺️ ROADMAP DEL DUEÑO (Tu Guía de Venta y Configuración)
Esto es lo que debes hacer cuando consigas un cliente (Clínica "Sonrisas Felices"):
1. Onboarding Técnico (Tú como Super Admin):
Entras a tu base de datos Supabase (Tabla businesses).
Creas una fila nueva:
name: "Clínica Sonrisas Felices"
slug: "sonrisas-felices" (Este será su link: tudominio.com/u/sonrisas-felices)
primary_color: "#E11D48" (Su color de marca).
logo_url: Link a su logo en tu storage bucket.
Copias el id (UUID) que se generó.
2. Creación de Usuario (Admin de la Clínica):
En Supabase Auth, creas usuario admin@sonrisas.com.
CRÍTICO: Debes vincular este usuario al business_id que acabas de crear. (Actualmente esto lo haríamos manualmente en una tabla profiles o users_business si la tuviéramos, o asignando metadata al usuario).
Nota: En nuestra arquitectura actual simplificada, el business_id se infiere o se selecciona. Para producción real, necesitaremos crear la tabla user_profiles con business_id para que el login sepa a qué clínica pertenece el doctor.
3. Entrega al Cliente:
Link Público: "Doctor, ponga este link en su Instagram: dentalapp.com/u/sonrisas-felices".
Credenciales: "Su acceso administrativo es en dentalapp.com/admin/login con este correo y clave".
4. Configuración Inicial del Cliente:
El cliente entra, va a "Configuración" (Fase futura) y crea sus servicios ("Limpieza $50") y sus doctores ("Dr. Juan").