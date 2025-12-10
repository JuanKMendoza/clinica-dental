# 🦷 CONSULTORIO DENTAL INTELIGENTE

> Sitio web profesional para consultorio odontológico desarrollado por **Kitsune Creative Labs**

## 🚀 Características Principales

✅ **Sistema de agendamiento de citas online**  
✅ **Catálogo completo de servicios dentales**  
✅ **Galería antes/después de tratamientos**  
✅ **Blog educativo con SEO optimizado**  
✅ **WhatsApp Business integrado**  
✅ **Formularios inteligentes**  
✅ **Google Maps + horarios**  
✅ **Precios transparentes**  
✅ **100% responsive (móvil, tablet, desktop)**  
✅ **SEO local optimizado**  
✅ **Velocidad optimizada (Astro + Tailwind)**

---

## 📂 Estructura del Proyecto

```
proyecto-kitsune/
├── public/              # Archivos estáticos (imágenes, favicon)
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── WhatsAppButton.astro
│   ├── data/            # Datos estructurados
│   │   ├── services.ts  # Servicios dentales
│   │   ├── testimonials.ts
│   │   └── faqs.ts
│   ├── layouts/         # Plantillas base
│   │   └── Layout.astro
│   ├── pages/           # Páginas del sitio
│   │   ├── index.astro          # Homepage
│   │   ├── agendar-cita.astro   # Agendamiento
│   │   ├── servicios.astro      # Catálogo servicios
│   │   ├── galeria.astro        # Antes/Después
│   │   ├── contacto.astro       # Contacto + Mapa
│   │   ├── nosotros.astro       # Sobre la clínica
│   │   └── blog/                # Artículos blog
│   └── styles/
│       └── global.css
├── astro.config.mjs     # Configuración Astro
├── tailwind.config.mjs  # Configuración Tailwind
├── package.json
└── README.md
```

---

## ⚙️ Instalación y Uso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio se abrirá en: **http://localhost:4321**

### 3. Compilar para producción

```bash
npm run build
```

### 4. Previsualizar versión de producción

```bash
npm run preview
```

---

## 🎨 Personalización

### Cambiar información de contacto

Edita estos archivos:

- **Teléfono/WhatsApp:** `src/components/WhatsAppButton.astro` y `src/components/Footer.astro`
- **Dirección:** `src/components/Footer.astro` y `src/pages/contacto.astro`
- **Email:** `src/components/Footer.astro`
- **Redes sociales:** `src/components/Footer.astro`

### Modificar servicios

Edita: `src/data/services.ts`

```typescript
export const services = [
  {
    id: "limpieza",
    name: "Limpieza Dental",
    description: "Profilaxis completa...",
    price: 80000,
    // ... más campos
  },
  // Agrega más servicios aquí
];
```

### Cambiar testimonios

Edita: `src/data/testimonials.ts`

### Actualizar preguntas frecuentes

Edita: `src/data/faqs.ts`

---

## 📝 Agregar nuevo artículo de blog

1. Crea un archivo en `src/pages/blog/nombre-del-articulo.astro`
2. Agrega el artículo a la lista en `src/pages/blog/index.astro`

Ejemplo:

```astro
---
import Layout from "../../layouts/Layout.astro";
---

<Layout
  title="Título del Artículo"
  description="Descripción breve para SEO"
>
  <!-- Contenido del artículo aquí -->
</Layout>
```

---

## 🔧 Integraciones Necesarias

### Formulario de contacto

El formulario en `/agendar-cita` está configurado para usar **Formspree**.

1. Crea cuenta gratis en https://formspree.io
2. Obtén tu `FORM_ID`
3. Reemplaza en `src/pages/agendar-cita.astro`:

```astro
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

### Google Maps

Para agregar el mapa real:

1. Obtén API Key de Google Maps
2. Reemplaza el placeholder en `src/pages/contacto.astro`

### Google Analytics

Agrega en `src/layouts/Layout.astro` antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎯 SEO Optimizado

El sitio incluye:

- ✅ Meta tags completos (title, description)
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Schema.org markup (LocalBusiness, Dentist)
- ✅ Sitemap automático
- ✅ URLs amigables
- ✅ Headings jerárquicos (H1, H2, H3)
- ✅ Alt text en imágenes
- ✅ Velocidad optimizada

### Generar sitemap

Astro genera automáticamente el sitemap. Para verificar:

```
https://tudominio.com/sitemap-index.xml
```

---

## 📱 Páginas Incluidas

1. **Homepage** (`/`) - Página principal con CTA, servicios destacados, testimonios
2. **Servicios** (`/servicios`) - Catálogo completo con precios
3. **Agendar Cita** (`/agendar-cita`) - Formulario inteligente de agendamiento
4. **Galería** (`/galeria`) - Casos antes/después
5. **Contacto** (`/contacto`) - Mapa, horarios, FAQs
6. **Nosotros** (`/nosotros`) - Historia, equipo, valores
7. **Blog** (`/blog`) - Artículos educativos SEO

---

## 🚀 Despliegue

### Opción 1: Netlify (Recomendado)

1. Conecta tu repositorio GitHub
2. Netlify detecta Astro automáticamente
3. Deploy en 1 click

### Opción 2: Vercel

```bash
npm install -g vercel
vercel deploy
```

### Opción 3: Hosting tradicional

```bash
npm run build
```

Sube la carpeta `dist/` a tu servidor via FTP.

---

## 💡 Tips de Optimización

### Imágenes

- Usa formatos modernos (WebP)
- Comprime imágenes antes de subirlas
- Usa lazy loading

### Performance

- El sitio ya está optimizado con Astro (zero JS por defecto)
- Tailwind CSS purga clases no usadas automáticamente
- Tiempo de carga < 2 segundos

### SEO Local

1. Crea perfil de Google My Business
2. Consigue reseñas de pacientes
3. Usa palabras clave locales ("dentista Bogotá", "odontólogo cerca de mí")

---

## 📞 Soporte

Desarrollado por **Kitsune Creative Labs**

- 📧 Email: info@kitsunelabs.com
- 💬 WhatsApp: +57 310 227 8592
- 🌐 Web: https://kitsunelabs.com

---

## 📄 Licencia

Proyecto propietario de Kitsune Creative Labs.  
Todos los derechos reservados © 2025

---

## 🎉 ¡Listo para Usar!

El sitio está **100% funcional** y listo para personalizarse con la información de tu consultorio dental.

### Checklist de personalización:

- [ ] Cambiar nombre de la clínica en todos los archivos
- [ ] Actualizar teléfono y WhatsApp
- [ ] Modificar dirección y horarios
- [ ] Personalizar servicios y precios
- [ ] Agregar fotos reales (antes/después, equipo, instalaciones)
- [ ] Configurar Formspree para el formulario
- [ ] Agregar Google Maps
- [ ] Configurar dominio personalizado
- [ ] Activar Google Analytics
- [ ] Crear cuenta Google My Business

¡Éxito con tu consultorio digital! 🦷✨
