# Frecuencia Diaria — agente de noticias diario

Boletín diario de noticias (Mundo / Economía / Política / Tecnología) que se
publica de dos formas, ambas con URL estable, sobrescritas cada día:

1. **Artifact visual**, se puede escuchar en voz alta desde el navegador
   (usa la Web Speech API, `speechSynthesis`, sin dependencias externas):
   https://claude.ai/code/artifact/4c1e97c8-f152-49c4-b3af-1e2e8b874333
2. **`noticias-hoy.md`**, texto plano puro (sin JS) para que lo lean
   herramientas externas, vía la URL raw de GitHub:
   https://raw.githubusercontent.com/JuaniOrbez/RenderBroker/claude/daily-news-summary-agent-yai11v/noticias-hoy.md

- **Horario:** todos los días a las 9:00 (Argentina, UTC-3) — `0 12 * * *` UTC.
- **Cómo se genera:** una Routine (trigger programado) dispara en esta sesión
  de Claude Code, que busca las noticias del día con WebSearch, arma un
  resumen breve por categoría, republica el Artifact (mismo link) y
  sobrescribe + commitea + pushea `noticias-hoy.md` a este mismo branch.
  También manda una notificación push avisando que el boletín está listo,
  con ambos links.

> La URL raw depende del branch (`claude/daily-news-summary-agent-yai11v`).
> Si este branch se mergea a `main` y se borra, hay que actualizar la
> Routine para que pushee a `main` en su lugar — avisar a Claude si eso pasa.

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
    { id: "politica", label: "Política", items: [...] },
    { id: "tecnologia", label: "Tecnología", items: [...] }
  ],
  sources: [{ name, url }, ...]
};
```

Cada firma de la Routine reescribe ese objeto con las noticias reales del
día, vuelve a publicar el archivo con la herramienta Artifact (pasando la
misma URL para no crear un link nuevo) y genera el mismo contenido como
Markdown para sobrescribir `noticias-hoy.md`.

## Cambiar el horario o el contenido

- Horario: actualizar el `cron_expression` de la Routine "Frecuencia Diaria".
- Diseño: editar `template.html` y volver a publicarlo una vez; la Routine
  seguirá usando esa versión como base.
