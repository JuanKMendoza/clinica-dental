# ⚡ QUICK START - ¡Empieza en 5 Minutos!

## 🎯 OBJETIVO

Ver tu sitio funcionando en tu computadora en **menos de 5 minutos**.

---

## ✅ PASO 1: Verificar Node.js (30 segundos)

Abre tu terminal (CMD o PowerShell en Windows) y escribe:

```bash
node --version
```

**¿Viste un número como v18.x.x o v20.x.x?**
- ✅ **SÍ** → Continúa al Paso 2
- ❌ **NO** → Descarga e instala Node.js desde https://nodejs.org/ (5 minutos extra)

---

## ✅ PASO 2: Navegar a la carpeta (15 segundos)

En la terminal, escribe:

```bash
cd "C:\Users\RYZEN5\Desktop\proyecto kitsune"
```

Presiona Enter.

---

## ✅ PASO 3: Instalar dependencias (2 minutos)

Escribe en la terminal:

```bash
npm install
```

Presiona Enter y espera. Verás muchas líneas de texto. Es normal.

⏳ **Tiempo:** 1-2 minutos dependiendo de tu internet.

---

## ✅ PASO 4: Iniciar el servidor (15 segundos)

Escribe:

```bash
npm run dev
```

Verás algo como:

```
🚀 astro v5.0.0 started in 500ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

---

## ✅ PASO 5: Abrir en navegador (10 segundos)

**Opción A:** Ctrl + Click en el link `http://localhost:4321/`

**Opción B:** Abre tu navegador y escribe:
```
http://localhost:4321
```

---

## 🎉 ¡LISTO!

Deberías ver tu sitio funcionando con:
- ✅ Menú de navegación
- ✅ Hero section azul
- ✅ Servicios
- ✅ Testimonios
- ✅ Footer completo
- ✅ Botón flotante de WhatsApp

---

## 🔥 PRÓXIMOS PASOS (Opcional - 10 minutos)

### 1. Cambiar el teléfono (2 minutos)

Abre en tu editor de código:
```
src/components/Navbar.astro
```

Busca la línea 47 y cambia:
```astro
<a href="tel:+573102278592">
  📞 310 227 8592  ← CAMBIA ESTE NÚMERO
</a>
```

Guarda el archivo. El navegador se actualizará automáticamente.

---

### 2. Cambiar un precio (2 minutos)

Abre:
```
src/data/services-simple.ts
```

Busca la línea 14 y cambia:
```typescript
price: 80000,  ← CAMBIA ESTE PRECIO
```

Guarda. Verás el cambio en el sitio instantáneamente.

---

### 3. Ver otra página (1 minuto)

En tu navegador, visita:
- `http://localhost:4321/servicios` - Ver todos los servicios
- `http://localhost:4321/agendar-cita` - Ver formulario
- `http://localhost:4321/contacto` - Ver contacto
- `http://localhost:4321/galeria` - Ver antes/después
- `http://localhost:4321/blog` - Ver blog

---

## 🛑 DETENER EL SERVIDOR

Cuando quieras cerrar el sitio:

En la terminal, presiona:
```
Ctrl + C
```

Para volver a iniciarlo:
```
npm run dev
```

---

## ❓ PROBLEMAS COMUNES

### Error: "npm: command not found"
**Solución:** Instala Node.js desde https://nodejs.org/

### Error: "Cannot find module"
**Solución:**
```bash
rm -rf node_modules
npm install
```

### El sitio no carga
**Solución:**
1. Cierra el servidor (Ctrl + C)
2. Vuelve a ejecutar: `npm run dev`

### Puerto 4321 en uso
**Solución:** El sitio abrirá en otro puerto automáticamente. Mira el número en la terminal.

---

## 📚 SIGUIENTE LECTURA

Una vez que viste tu sitio funcionando, lee:

1. **INSTALACION.md** - Guía completa de configuración
2. **CHECKLIST.md** - Lista de tareas para personalizar
3. **EXPLICACION.md** - Entiende cómo funciona todo

---

## 💡 COMANDOS ÚTILES

```bash
# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar versión de producción
npm run preview

# Limpiar todo y reinstalar
rm -rf node_modules
npm install
```

---

## 🎯 RESUMEN DE 5 MINUTOS

```
1. node --version          (Verificar Node.js)
2. cd "ruta del proyecto"  (Navegar)
3. npm install            (Instalar - 2 min)
4. npm run dev            (Iniciar servidor)
5. Abrir localhost:4321   (Ver sitio)
```

**Total:** 3-5 minutos ✅

---

## 🚀 ¿Y AHORA QUÉ?

### Hoy:
- ✅ Familiarízate con el sitio
- ✅ Navega todas las páginas
- ✅ Lee la documentación

### Esta semana:
- ✅ Cambia información de contacto
- ✅ Actualiza precios
- ✅ Agrega tus fotos

### Este mes:
- ✅ Configura integraciones
- ✅ Publica el sitio
- ✅ Empieza marketing

---

## 📞 ¿NECESITAS AYUDA?

**Kitsune Creative Labs**
- 📧 info@kitsunelabs.com
- 💬 +57 310 227 8592
- 📖 Lee INSTALACION.md para más detalles

---

**¡Disfruta tu nuevo sitio web!** 🦷✨

*Desarrollado por Kitsune Creative Labs* 🦊
