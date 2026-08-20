# Frecuencia Diaria — agente de noticias diario

Boletín diario de noticias (Mundo / Economía / Política) que se publica como
un Artifact y se puede escuchar en voz alta desde el navegador (usa la Web
Speech API, `speechSynthesis`, sin dependencias externas).

- **Link (siempre el mismo, se actualiza cada día):**
  https://claude.ai/code/artifact/4c1e97c8-f152-49c4-b3af-1e2e8b874333
- **Horario:** todos los días a las 9:00 (Argentina, UTC-3) — `0 12 * * *` UTC.
- **Cómo se genera:** una Routine (trigger programado) dispara en esta sesión
  de Claude Code, que busca las noticias del día con WebSearch, arma un
  resumen breve por categoría y republica el mismo Artifact (mismo link)
  con el contenido nuevo. También manda una notificación push avisando que
  el boletín está listo.

## `template.html`

Es la base de diseño del boletín (masthead, reproductor con controles de
voz, secciones por categoría, lista de fuentes). El único bloque que cambia
día a día es el objeto `NEWS` dentro del `<script>`:

```js
var NEWS = {
  date: "...",
  sections: [
    { id: "mundo", label: "Mundo", items: [{ headline, body }, ...] },
    { id: "economia", label: "Economía", items: [...] },
    { id: "politica", label: "Política", items: [...] }
  ],
  sources: [{ name, url }, ...]
};
```

Cada firma de la Routine reescribe ese objeto con las noticias reales del
día y vuelve a publicar el archivo con la herramienta Artifact, pasando la
misma URL para no crear un link nuevo.

## Cambiar el horario o el contenido

- Horario: actualizar el `cron_expression` de la Routine "Frecuencia Diaria".
- Diseño: editar `template.html` y volver a publicarlo una vez; la Routine
  seguirá usando esa versión como base.
