# Baby Shower de Elián Marcelo · Invitación web

Invitación animada e interactiva, lista para publicar y compartir por WhatsApp.

## Qué incluye

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La invitación completa (diseño, animaciones, fuentes y códigos QR van dentro del archivo). |
| `evento.ics` | Archivo de calendario para iPhone, Outlook y otros calendarios. |
| `og-image.jpg` | Imagen de vista previa que WhatsApp muestra al compartir el enlace (1200 × 630). |
| `Invitacion-Elian-Marcelo.pdf` | Versión PDF complementaria con botones y enlaces que se pueden tocar. |
| `src/`, `fonts/`, `package.json` | Código fuente, por si quieres modificar y volver a generar (opcional). |

## 1. Configura el número de WhatsApp para las confirmaciones (opcional)

Abre `index.html` con cualquier editor de texto, busca `whatsappNumber: ""` y escribe el número entre las comillas:
código de país + número, solo dígitos. Ejemplo para México: `whatsappNumber: "524441234567"`.

Si lo dejas vacío, el botón **💚 Confirmar mi asistencia** ofrece copiar el mensaje o abrir WhatsApp para elegir el contacto.

## 2. Publícala gratis en internet (elige una opción)

### Opción A · Netlify Drop (la más fácil, unos 2 minutos)
1. Entra a <https://app.netlify.com/drop> y crea una cuenta gratuita (sirve con Google o GitHub).
2. Arrastra la carpeta `baby-shower-elian` completa (descomprimida) a la página.
3. Netlify te da un enlace como `https://nombre-aleatorio.netlify.app`. En *Site configuration → Change site name* puedes cambiarlo, por ejemplo a `babyshower-elian`.

### Opción B · GitHub Pages
1. Crea un repositorio público nuevo en GitHub, por ejemplo `babyshower-elian`.
2. Pulsa *Add file → Upload files* y sube `index.html`, `evento.ics` y `og-image.jpg` (y el PDF si quieres).
3. Ve a *Settings → Pages*, en *Branch* elige `main` y la carpeta `/ (root)` y pulsa *Save*.
4. En uno o dos minutos tendrás un enlace como `https://TU-USUARIO.github.io/babyshower-elian/`.

### Opción C · Cloudflare Pages
1. En <https://dash.cloudflare.com> ve a *Workers & Pages → Create → Pages → Upload assets*.
2. Ponle un nombre al proyecto, sube la carpeta y pulsa *Deploy*. Obtendrás un enlace como `https://babyshower-elian.pages.dev`.

## 3. Activa la imagen de vista previa de WhatsApp (recomendado)

WhatsApp necesita la dirección completa de la imagen. Ya con el enlace definitivo, abre `index.html`, busca esta línea:

```html
<meta property="og:image" content="og-image.jpg">
```

y pon la dirección completa, por ejemplo:

```html
<meta property="og:image" content="https://babyshower-elian.netlify.app/og-image.jpg">
```

Guarda el archivo y vuelve a subirlo. (Si usas el código fuente: `SITE_URL=https://tu-enlace/ npm run build`.)

## 4. Comparte el enlace con tus invitados

1. Abre el enlace en tu celular para comprobar que todo funciona.
2. En WhatsApp, pega el enlace en el chat. Espera unos segundos a que aparezca la vista previa con Tom y luego envíalo.
3. Mensaje sugerido:

   > ¡Hola! 💚 Con mucha ilusión te invitamos al Baby Shower de Elián Marcelo. Abre tu invitación aquí: https://tu-enlace
4. Para muchos contactos usa una *lista de difusión* de WhatsApp (Chats → ⋮ → Nueva difusión) o compártelo en el grupo de la familia.
5. Si alguien no puede abrir enlaces, envíale el PDF `Invitacion-Elian-Marcelo.pdf`: también tiene botones que se pueden tocar.

> Consejo: si cambias la imagen después de haber compartido el enlace, WhatsApp puede seguir mostrando la vista previa anterior durante un tiempo.

## Datos del evento (verificados)

- **Fecha:** sábado 28 de noviembre de 2026
- **Hora:** 3:00 p. m. (no se fijó hora de finalización)
- **Lugar:** Salón La Candelaria, Carretera a Matehuala #9902, Soledad de Graciano Sánchez, San Luis Potosí, México
- **Amazon:** https://www.amazon.com.mx/baby-reg/felipe-robledo-enero-2027-sanluispotosi/1IVRNCMB5WUXX?ref_=cm_sw_r_apann_dp_J8EFERJZDVHEWV6DS5D6&language=en-US
- **Liverpool:** https://mesaderegalos.liverpool.com.mx/milistaderegalos/60069407

## Para quien edite el código (opcional)

```bash
npm install
npm run build   # genera index.html, evento.ics, og-image.jpg y el PDF
npm run check   # comprueba enlaces, QR, intro omitible y accesibilidad básica
```

Tom y todas las ilustraciones son dibujos vectoriales (SVG) hechos a mano en capas: ojos, párpados, brazo, cola y cabeza se animan por separado.
Los sonidos se sintetizan en el navegador (no hay archivos de audio) y solo suenan si el invitado los activa.
Fuentes: Fredoka y Dancing Script (SIL Open Font License), incluidas dentro de `index.html`.
Los códigos QR se generan con la biblioteca `qrcode` y se verifican decodificándolos con `jsQR`.
