/* ====== CONFIGURACIÓN RÁPIDA ====== */
const ACCESS_CODE = "DESPEDIDA14"; // Cambia aquí el código de acceso
const STORAGE_KEY = "despedida_lista_v1";
/* ================================== */

const NIVEL_RANK = { tierno: 0, divertido: 1, atrevido: 2 };
const NIVEL_LABEL = { tierno: "🌸 Tierno", divertido: "🎉 Divertido", atrevido: "💋 Atrevido" };
const LUGAR_LABEL = { casa: "En casa", restaurante: "Restaurante o bar", viaje: "Fin de semana fuera" };

/* ---------- Almacenamiento seguro (la app funciona aunque no haya storage) ---------- */
function defaultState() {
  return {
    unlocked: false, config: null, starred: null, swaps: {}, fiesta: false, tab: "plan",
    quiz: { sel: [], ans: {}, teams: ["Equipo Novia", "Equipo Novio"], awards: {}, pos: 0 },
    checks: {}, shop: {},
    invite: { tpl: 0 },
    ruleta: { tipo: "reto", nivel: null, used: {} }
  };
}
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { return defaultState(); }
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(S)); } catch (e) { /* sin storage: seguimos en memoria */ }
}
let S = load();

/* ---------- Utilidades ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function names(s) {
  const c = S.config || {};
  return String(s)
    .replace(/\{novia\}/g, c.novia || "la novia")
    .replace(/\{novio\}/g, c.novio || "el novio")
    .replace(/\{n\}/g, c.n || 10);
}
const P = s => esc(names(s)); // texto personalizado y seguro para HTML
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fechaLarga(f) {
  if (!f) return "";
  try {
    const d = new Date(f + "T12:00:00");
    return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
  } catch (e) { return f; }
}
function fechaCorta(d) {
  try { return d.toLocaleDateString("es-MX", { day: "numeric", month: "short" }); } catch (e) { return ""; }
}
function horaTxt(h) {
  if (!h) return "";
  const [H, M] = h.split(":").map(Number);
  const ampm = H >= 12 ? "p. m." : "a. m.";
  const h12 = ((H + 11) % 12) + 1;
  return `${h12}:${String(M).padStart(2, "0")} ${ampm}`;
}
function addMin(h, m) {
  const [H, M] = (h || "19:00").split(":").map(Number);
  const t = (H * 60 + M + m) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
const gameById = id => JUEGOS.find(g => g.id === id);
const fitsNivel = g => g.niveles.includes(S.config.nivel);
const fitsLugar = g => g.lugares.includes(S.config.lugar);

/* ---------- Plan (itinerario) ---------- */
const PLANTILLAS = {
  2: [["bienvenida", 15], ["rompehielo", 15], ["quiz", 25], ["comida", 25], ["novio", 15], ["ruleta", 15], ["recuerdo", 10]],
  3: [["bienvenida", 15], ["rompehielo", 15], ["quiz", 25], ["comida", 30], ["mimica", 20], ["novio", 15], ["equipo", 20], ["ruleta", 20], ["recuerdo", 20]],
  4: [["bienvenida", 15], ["rompehielo", 20], ["quiz", 25], ["comida", 35], ["mimica", 20], ["novio", 15], ["equipo", 25], ["baile", 20], ["novia", 15], ["ruleta", 20], ["recuerdo", 15], ["cierre", 15]]
};
const FIJOS = {
  bienvenida: { t: "Llegada y bienvenida", d: "Recibe a las invitadas, pon música y entrega las pinzas de «La palabra prohibida»: el juego corre toda la noche.", game: "palabra" },
  quiz: { t: "El gran quiz de la novia", d: "Pregunta por pregunta en pantalla grande, con marcador por equipos.", game: "quiz", open: "quiz" },
  ruleta: { t: "Ruleta de retos y prendas", d: "Pasen el celular de mano en mano. Cualquier reto se puede pasar, sin castigo.", open: "ruleta" },
  baile: { t: "Música, baile y fotos", d: "Pausa para bailar, comer algo dulce y tomarse fotos (solo quien quiera salir)." },
  cierre: { t: "Cierre de la noche", d: "Anuncien a la ganadora de «La palabra prohibida», entreguen los recuerdos a {novia} y organicen el regreso seguro de todas." }
};
const COMIDA = {
  casa: { t: "Botanas y cena", d: "Momento para comer y platicar. Ideal para leer frases de «¿Quién lo dijo?» en la mesa." },
  restaurante: { t: "Ordenar y cenar", d: "Mientras llega la comida, jueguen algo de mesa como «¿Quién lo dijo?» o «Ramo exprés»." },
  viaje: { t: "Cena de la noche principal", d: "Cena juntas en el hospedaje o salgan a cenar; el resto del plan funciona en cualquier lugar." }
};
const SLOT_TITULO = { rompehielo: "Rompehielos", mimica: "Mímica y adivinanzas", novio: "El novio a distancia", equipo: "Reto en equipo", recuerdo: "Recuerdo para la novia", novia: "¿Quién conoce más a la novia?" };

function candidatos(cat) {
  const lista = JUEGOS.filter(g => g.cat === cat && g.id !== "quiz" && g.id !== "palabra" && fitsNivel(g) && fitsLugar(g));
  // En Atrevido van primero los juegos exclusivos de ese nivel
  if (S.config.nivel !== "tierno") lista.sort((a, b) => a.niveles.length - b.niveles.length);
  return lista;
}
function buildPlan() {
  const c = S.config;
  const slots = PLANTILLAS[c.duracion] || PLANTILLAS[3];
  const usados = new Set(["quiz", "palabra"]);
  let min = 0;
  return slots.map(([tipo, dur], i) => {
    const item = { i, tipo, dur, hora: addMin(c.hora, min) };
    min += dur;
    if (tipo === "comida") Object.assign(item, COMIDA[c.lugar]);
    else if (FIJOS[tipo]) Object.assign(item, FIJOS[tipo]);
    else {
      const cands = candidatos(tipo === "novia" ? "novia" : tipo);
      let g = S.swaps[i] && gameById(S.swaps[i]);
      if (!g || usados.has(g.id) || !cands.includes(g)) g = cands.find(x => !usados.has(x.id)) || cands[0];
      if (g) {
        usados.add(g.id);
        Object.assign(item, { t: g.nombre, d: g.resumen, game: g.id, cat: SLOT_TITULO[tipo], swappable: cands.length > 1 });
      } else Object.assign(item, { t: SLOT_TITULO[tipo], d: "Tiempo libre para platicar." });
    }
    return item;
  });
}
function planGames() { return buildPlan().map(s => s.game).filter(Boolean); }
function starred() { return S.starred || planGames(); }

/* ---------- Pantallas ---------- */
function show() {
  $("#gate").hidden = S.unlocked;
  $("#setup").hidden = !S.unlocked || !!S.config;
  $("#main").hidden = !S.unlocked || !S.config;
  document.body.classList.toggle("fiesta", !!S.fiesta);
  $("#partyToggle").setAttribute("aria-pressed", S.fiesta ? "true" : "false");
  if (S.unlocked && !S.config) fillSetup();
  if (S.unlocked && S.config) renderTab();
}

/* Acceso */
$("#gateForm").addEventListener("submit", e => {
  e.preventDefault();
  const v = $("#code").value.trim().toUpperCase().replace(/\s+/g, "");
  if (v === ACCESS_CODE.toUpperCase()) { S.unlocked = true; save(); show(); window.scrollTo(0, 0); }
  else $("#gateError").hidden = false;
});

/* Configuración */
let draft = {};
function fillSetup() {
  const c = S.config || {};
  $("#fNovia").value = c.novia || "";
  $("#fNovio").value = c.novio || "";
  $("#fFecha").value = c.fecha || "";
  $("#fHora").value = c.hora || "19:00";
  $("#fN").value = c.n || 10;
  draft = { nivel: c.nivel || "divertido", lugar: c.lugar || "casa", duracion: String(c.duracion || 3) };
  $$(".choices").forEach(group => {
    const name = group.dataset.name;
    $$("button", group).forEach(b => b.classList.toggle("on", b.dataset.v === draft[name]));
  });
}
$$(".choices").forEach(group => {
  group.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    draft[group.dataset.name] = b.dataset.v;
    $$("button", group).forEach(x => x.classList.toggle("on", x === b));
  });
});
$("#setupForm").addEventListener("submit", e => {
  e.preventDefault();
  const prev = S.config;
  S.config = {
    novia: $("#fNovia").value.trim(), novio: $("#fNovio").value.trim(),
    fecha: $("#fFecha").value, hora: $("#fHora").value || "19:00",
    n: Math.max(2, Math.min(80, parseInt($("#fN").value, 10) || 10)),
    nivel: draft.nivel, lugar: draft.lugar, duracion: parseInt(draft.duracion, 10)
  };
  if (!prev || prev.nivel !== S.config.nivel || prev.lugar !== S.config.lugar || prev.duracion !== S.config.duracion) {
    S.swaps = {}; S.starred = null;
  }
  S.ruleta.nivel = null;
  S.tab = "plan"; save(); show(); window.scrollTo(0, 0);
});
function editSetup() { $("#main").hidden = true; $("#setup").hidden = false; fillSetup(); window.scrollTo(0, 0); }

/* Tabs */
$$(".tabs button").forEach(b => b.addEventListener("click", () => { S.tab = b.dataset.tab; save(); renderTab(); window.scrollTo(0, 0); }));
$("#partyToggle").addEventListener("click", () => {
  S.fiesta = !S.fiesta; save(); show();
  toast(S.fiesta ? "Modo fiesta: texto grande para mostrar al grupo" : "Modo normal");
});

function renderTab() {
  $$(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === S.tab));
  const v = $("#view");
  const r = { plan: renderPlan, juegos: renderJuegos, quiz: renderQuiz, ruleta: renderRuleta, invitar: renderInvitar, listas: renderListas }[S.tab] || renderPlan;
  r(v);
}

/* ---------- PLAN ---------- */
function renderPlan(v) {
  const c = S.config, plan = buildPlan();
  const fin = addMin(c.hora, c.duracion * 60);
  v.innerHTML = `
    <div class="hero">
      <h1>La despedida de ${esc(c.novia)}</h1>
      <p>${c.fecha ? esc(fechaLarga(c.fecha)) + " · " : ""}${esc(horaTxt(c.hora))} a ${esc(horaTxt(fin))}</p>
      <div class="tags"><span class="tag">${NIVEL_LABEL[c.nivel]}</span><span class="tag">${LUGAR_LABEL[c.lugar]}</span><span class="tag">${c.duracion} horas</span><span class="tag">${c.n} invitadas</span></div>
    </div>
    <div class="section-title"><h2 class="h2">Tu plan hora por hora</h2><button class="btn btn-ghost btn-sm" id="editCfg">Editar datos</button></div>
    <ol class="timeline">
      ${plan.map(s => `
        <li class="tl-item">
          <div class="tl-time">${esc(s.hora)}</div>
          <div class="tl-body">
            ${s.cat ? `<span class="tag dark">${esc(s.cat)}</span>` : ""}
            <h3>${P(s.t)}</h3>
            <p>${P(s.d)}</p>
            <p><small>⏱️ ${s.dur} min</small></p>
            <div class="tl-actions">
              ${s.open === "quiz" ? `<button class="btn btn-primary btn-sm" data-go="quiz">Preparar el quiz</button>` : ""}
              ${s.open === "ruleta" ? `<button class="btn btn-primary btn-sm" data-go="ruleta">Abrir ruleta</button>` : ""}
              ${s.game && s.game !== "quiz" ? `<button class="btn btn-lila btn-sm" data-see="${s.game}">Ver instrucciones</button>` : ""}
              ${s.swappable ? `<button class="btn btn-ghost btn-sm" data-swap="${s.i}">Cambiar juego</button>` : ""}
            </div>
          </div>
        </li>`).join("")}
    </ol>
    ${c.lugar === "viaje" ? `<div class="note"><b>🧳 Para el fin de semana:</b> este plan es para la noche principal. Al día siguiente, hagan un brunch tranquilo y aprovechen para «Cápsula del tiempo» o «Telaraña de cariño», y dejen la tarde libre para descansar o pasear.</div>` : ""}
    <div class="note">💡 <b>Regla de oro:</b> ${esc(c.novia)} decide hasta dónde llega la noche. Cualquier reto se puede pasar, sin castigo, y nadie tiene que beber para jugar.</div>
    <p class="muted" style="margin-top:18px"><button class="btn btn-ghost btn-sm" id="resetAll">Empezar una fiesta nueva</button></p>
  `;
  $("#editCfg").onclick = editSetup;
  $("#resetAll").onclick = () => {
    if (!confirm("¿Borrar esta fiesta y empezar de cero? Se pierden las respuestas del quiz y los checklists.")) return;
    S = Object.assign(defaultState(), { unlocked: true }); save(); show();
  };
  $$("[data-go]", v).forEach(b => b.onclick = () => { S.tab = b.dataset.go; save(); renderTab(); window.scrollTo(0, 0); });
  $$("[data-see]", v).forEach(b => b.onclick = () => { openGame = b.dataset.see; gameFilter = "todos"; S.tab = "juegos"; save(); renderTab(); });
  $$("[data-swap]", v).forEach(b => b.onclick = () => {
    const i = +b.dataset.swap, slot = plan[i];
    const cands = candidatos(slot.tipo);
    const enUso = new Set(plan.filter(p => p.i !== i).map(p => p.game));
    const libres = cands.filter(g => !enUso.has(g.id));
    const idx = libres.findIndex(g => g.id === slot.game);
    const next = libres[(idx + 1) % libres.length];
    if (!next || next.id === slot.game) { toast("No hay otro juego de este tipo para tu configuración"); return; }
    S.swaps[i] = next.id;
    if (S.starred) S.starred = S.starred.filter(id => id !== slot.game).concat(next.id);
    save(); renderPlan(v); toast("Juego cambiado: " + names(next.nombre));
  });
}

/* ---------- JUEGOS ---------- */
let gameFilter = "fiesta", openGame = null;
function renderJuegos(v) {
  const st = new Set(starred());
  const filtros = [["fiesta", "Para tu fiesta"], ["elegidos", "⭐ Elegidos"], ["todos", "Los 25"]].concat(Object.entries(CATEGORIAS));
  let lista = JUEGOS;
  if (gameFilter === "fiesta") lista = JUEGOS.filter(g => fitsNivel(g) && fitsLugar(g));
  else if (gameFilter === "elegidos") lista = JUEGOS.filter(g => st.has(g.id));
  else if (CATEGORIAS[gameFilter]) lista = JUEGOS.filter(g => g.cat === gameFilter);
  v.innerHTML = `
    <h1 class="h1">Juegos</h1>
    <p class="muted">Marca con ⭐ los que vas a usar: así se arma tu lista de compras. Ya marcamos los de tu plan.</p>
    <div class="filter">${filtros.map(([k, l]) => `<button class="chip" aria-pressed="${k === gameFilter}" data-f="${k}">${esc(l)}</button>`).join("")}</div>
    ${lista.length ? "" : `<p class="muted">Todavía no tienes juegos en esta lista.</p>`}
    ${lista.map(g => {
      const ok = fitsNivel(g) && fitsLugar(g);
      return `
      <details class="game" id="g-${g.id}" ${openGame === g.id ? "open" : ""}>
        <summary>
          <span class="emo">${g.emoji}</span>
          <span><h3>${P(g.nombre)}</h3><span class="meta">${esc(CATEGORIAS[g.cat])} · ${g.duracion} min · ${esc(g.personas)}</span></span>
          <button class="star ${st.has(g.id) ? "on" : ""}" data-star="${g.id}" aria-label="Marcar como elegido">⭐</button>
        </summary>
        <div class="game-body">
          ${ok ? "" : `<p><span class="tag rosa">No recomendado para tu ${fitsNivel(g) ? "lugar" : "nivel"}</span></p>`}
          <p>${P(g.resumen)}</p>
          <div class="facts">
            <div class="fact"><b>Personas</b>${esc(g.personas)}</div>
            <div class="fact"><b>Duración</b>${g.duracion} min</div>
            <div class="fact" style="grid-column: span 2"><b>Materiales</b>${P(g.materiales.join(", "))}</div>
          </div>
          <b>Cómo se juega</b>
          <ol>${g.pasos.map(p => `<li>${P(p)}</li>`).join("")}</ol>
          ${g.id === "quiz" ? `<button class="btn btn-primary btn-sm" data-go="quiz">Ir al quiz</button>` : ""}
        </div>
      </details>`;
    }).join("")}
  `;
  $$("[data-f]", v).forEach(b => b.onclick = () => { gameFilter = b.dataset.f; openGame = null; renderJuegos(v); });
  $$("[data-star]", v).forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const s = new Set(starred()), id = b.dataset.star;
    s.has(id) ? s.delete(id) : s.add(id);
    S.starred = Array.from(s); save();
    b.classList.toggle("on", s.has(id));
  });
  $$("[data-go]", v).forEach(b => b.onclick = () => { S.tab = "quiz"; save(); renderTab(); });
  if (openGame) { const el = $("#g-" + openGame); if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }
}

/* ---------- QUIZ ---------- */
function preguntasDisponibles() {
  return PREGUNTAS.filter(p => NIVEL_RANK[p.nivel] <= NIVEL_RANK[S.config.nivel]);
}
function renderQuiz(v) {
  const Q = S.quiz, disp = preguntasDisponibles();
  Q.sel = Q.sel.filter(id => disp.some(p => p.id === id));
  v.innerHTML = `
    <h1 class="h1">¿Cuánto conoces a la novia?</h1>
    <p class="muted">Elige de 10 a 15 preguntas y escribe la respuesta correcta antes de la fiesta. En la fiesta, la app las muestra una por una en pantalla completa.</p>
    <div class="card" style="padding:16px; margin-bottom:14px">
      <b>Equipos</b>
      <label for="nTeams" style="margin-top:8px">Número de equipos</label>
      <select id="nTeams">${[2, 3, 4].map(n => `<option ${Q.teams.length === n ? "selected" : ""}>${n}</option>`).join("")}</select>
      <div class="teams" style="margin-top:10px">${Q.teams.map((t, i) => `<input data-team="${i}" value="${esc(t)}" maxlength="20" aria-label="Nombre del equipo ${i + 1}">`).join("")}</div>
    </div>
    <div class="section-title"><h2 class="h2">Banco de preguntas (${disp.length})</h2><span class="counter" id="qCount"></span></div>
    ${S.config.nivel !== "atrevido" ? `<p class="muted"><small>Hay preguntas más pícaras disponibles en el nivel Atrevido.</small></p>` : ""}
    <div id="qList">
      ${disp.map(p => {
        const on = Q.sel.includes(p.id);
        return `<div class="q-item ${on ? "sel" : ""}" data-qi="${p.id}">
          <input type="checkbox" ${on ? "checked" : ""} data-qc="${p.id}" aria-label="Elegir pregunta">
          <div><div class="q">${P(p.q)} ${p.nivel === "atrevido" ? `<span class="tag rosa">pícara</span>` : ""}</div>
          ${on ? `<input type="text" data-qa="${p.id}" placeholder="Respuesta correcta" value="${esc(Q.ans[p.id] || "")}" maxlength="120">` : ""}</div>
        </div>`;
      }).join("")}
    </div>
    <div class="sticky-cta"><button class="btn btn-primary btn-block" id="startQuiz" style="margin:0">▶ Empezar quiz en pantalla completa</button></div>
    <button class="btn btn-ghost btn-sm" id="resetScores">Reiniciar marcador</button>
  `;
  const count = () => {
    const n = Q.sel.length;
    $("#qCount").textContent = `${n} elegidas ${n < 10 ? "(mínimo 10)" : n > 15 ? "(máximo 15)" : "✓"}`;
  };
  count();
  $("#nTeams").onchange = e => {
    const n = +e.target.value;
    const base = ["Equipo Novia", "Equipo Novio", "Equipo Dorado", "Equipo Lila"];
    Q.teams = Array.from({ length: n }, (_, i) => Q.teams[i] || base[i]);
    Q.awards = {}; save(); renderQuiz(v);
  };
  $$("[data-team]", v).forEach(inp => inp.oninput = () => { Q.teams[+inp.dataset.team] = inp.value.trim() || `Equipo ${+inp.dataset.team + 1}`; save(); });
  $$("[data-qc]", v).forEach(cb => cb.onchange = () => {
    const id = +cb.dataset.qc;
    if (cb.checked) {
      if (Q.sel.length >= 15) { cb.checked = false; toast("Máximo 15 preguntas"); return; }
      Q.sel.push(id);
    } else Q.sel = Q.sel.filter(x => x !== id);
    save();
    const y = window.scrollY; renderQuiz(v); window.scrollTo(0, y);
    if (cb.checked) { const inp = $(`[data-qa="${id}"]`); if (inp) inp.focus({ preventScroll: true }); }
  });
  $$("[data-qa]", v).forEach(inp => inp.oninput = () => { Q.ans[inp.dataset.qa] = inp.value; save(); });
  $("#resetScores").onclick = () => { Q.awards = {}; Q.pos = 0; save(); toast("Marcador en cero"); };
  $("#startQuiz").onclick = () => {
    if (Q.sel.length < 10) { toast(`Elige al menos 10 preguntas (llevas ${Q.sel.length})`); return; }
    const sinResp = Q.sel.filter(id => !(Q.ans[id] || "").trim()).length;
    if (sinResp && !confirm(`Hay ${sinResp} preguntas sin respuesta escrita. En esas, ${S.config.novia} será la jueza. ¿Empezar igual?`)) return;
    if (Q.pos >= Q.sel.length) Q.pos = 0;
    openStage(); quizStage(false);
  };
}
function scores() {
  const Q = S.quiz, sc = Q.teams.map(() => 0);
  Object.entries(Q.awards).forEach(([qid, arr]) => { if (Q.sel.includes(+qid)) arr.forEach(t => { if (sc[t] != null) sc[t]++; }); });
  return sc;
}
function quizStage(revealed) {
  const Q = S.quiz, st = $("#stage");
  if (Q.pos >= Q.sel.length) return quizFinal();
  const p = PREGUNTAS.find(x => x.id === Q.sel[Q.pos]);
  const sc = scores(), aw = Q.awards[p.id] || [];
  const ans = (Q.ans[p.id] || "").trim();
  st.innerHTML = `
    <div class="stage-top"><span class="pill">Pregunta ${Q.pos + 1} de ${Q.sel.length}</span><button class="stage-close" data-close>✕ Salir</button></div>
    <div class="stage-center">
      <div class="stage-label">¿Cuánto conoces a la novia?</div>
      <div class="stage-text">${P(p.q)}</div>
      ${revealed ? `<div class="stage-answer">${ans ? esc(ans) : `Que decida ${esc(S.config.novia)} 👑`}</div>` : ""}
    </div>
    <div class="stage-bottom">
      ${revealed ? `<div class="skip-note">Toca el equipo que acertó (puede ser más de uno):</div>
        <div class="score-row">${Q.teams.map((t, i) => `<button class="score-btn" data-aw="${i}" style="${aw.includes(i) ? "background:rgba(233,185,73,.45);border-color:#E9B949" : ""}">${esc(t)}<b>${sc[i]}</b></button>`).join("")}</div>
        <button class="btn btn-primary" data-next>${Q.pos + 1 < Q.sel.length ? "Siguiente pregunta →" : "Ver resultados 🏆"}</button>`
      : `<div class="score-row">${Q.teams.map((t, i) => `<div class="score-btn">${esc(t)}<b>${sc[i]}</b></div>`).join("")}</div>
        <button class="btn btn-gold" data-reveal>Revelar respuesta</button>`}
      ${Q.pos > 0 ? `<button class="btn btn-ghost" data-prev>← Anterior</button>` : ""}
    </div>`;
  $("[data-close]", st).onclick = closeStage;
  const rv = $("[data-reveal]", st); if (rv) rv.onclick = () => quizStage(true);
  const nx = $("[data-next]", st); if (nx) nx.onclick = () => { Q.pos++; save(); quizStage(false); };
  const pv = $("[data-prev]", st); if (pv) pv.onclick = () => { Q.pos--; save(); quizStage(false); };
  $$("[data-aw]", st).forEach(b => b.onclick = () => {
    const t = +b.dataset.aw, cur = new Set(Q.awards[p.id] || []);
    cur.has(t) ? cur.delete(t) : cur.add(t);
    Q.awards[p.id] = Array.from(cur); save(); quizStage(true);
  });
}
function quizFinal() {
  const Q = S.quiz, st = $("#stage"), sc = scores();
  const max = Math.max(...sc), ganadores = Q.teams.filter((_, i) => sc[i] === max);
  st.innerHTML = `
    <div class="stage-top"><span class="pill">Resultados</span><button class="stage-close" data-close>✕ Salir</button></div>
    <div class="stage-center">
      <div style="font-size:64px">🏆</div>
      <div class="stage-label">${ganadores.length > 1 ? "¡Empate!" : "Equipo ganador"}</div>
      <div class="stage-text">${esc(ganadores.join(" y "))}</div>
      <div class="score-row" style="width:100%;max-width:600px">${Q.teams.map((t, i) => `<div class="score-btn">${esc(t)}<b>${sc[i]}</b></div>`).join("")}</div>
    </div>
    <div class="stage-bottom">
      <button class="btn btn-gold" data-again>Jugar otra vez (marcador en cero)</button>
      <button class="btn btn-ghost" data-close>Volver</button>
    </div>`;
  $$("[data-close]", st).forEach(b => b.onclick = () => { Q.pos = 0; save(); closeStage(); });
  $("[data-again]", st).onclick = () => { Q.awards = {}; Q.pos = 0; save(); quizStage(false); };
}

/* ---------- RULETA ---------- */
function renderRuleta(v) {
  const nivel = S.ruleta.nivel || S.config.nivel;
  const R = RULETA[nivel];
  v.innerHTML = `
    <h1 class="h1">Ruleta de retos y prendas</h1>
    <p class="muted">Abre la ruleta en pantalla completa y pasen el celular de mano en mano. <b>Retos</b> para cumplir; <b>prendas</b> para quien pierde un juego.</p>
    <div class="card" style="padding:16px">
      <b>Nivel de la ruleta</b>
      <p class="muted" style="margin:4px 0 10px"><small>Tu fiesta es nivel ${NIVEL_LABEL[S.config.nivel]}. Si llega la abuelita, cámbialo aquí en un segundo.</small></p>
      <div class="level-pick">${Object.keys(RULETA).map(k => `<button class="chip" aria-pressed="${k === nivel}" data-lv="${k}">${NIVEL_LABEL[k]}</button>`).join("")}</div>
      <p style="margin:12px 0 0"><span class="tag oro">${R.retos.length} retos</span> <span class="tag dark">${R.prendas.length} prendas</span> <span class="tag rosa">${R.retos.length + R.prendas.length} en total</span></p>
    </div>
    <button class="btn btn-primary btn-block" id="openWheel">🎡 Abrir ruleta en pantalla completa</button>
    <div class="note">✋ <b>Botón «Pasar» siempre visible:</b> cualquiera puede pasar un reto o una prenda sin castigo. Ningún reto pide beber, tocar a desconocidos ni grabar a nadie sin permiso.</div>
  `;
  $$("[data-lv]", v).forEach(b => b.onclick = () => { S.ruleta.nivel = b.dataset.lv; save(); renderRuleta(v); });
  $("#openWheel").onclick = () => { openStage(); ruletaStage(null); };
}
let wheelDeg = 0;
function draw(tipo) {
  const nivel = S.ruleta.nivel || S.config.nivel;
  const t = tipo === "sorpresa" ? (Math.random() < 0.7 ? "retos" : "prendas") : (tipo === "prenda" ? "prendas" : "retos");
  const pool = RULETA[nivel][t];
  const key = nivel + ":" + t;
  let used = S.ruleta.used[key] || [];
  if (used.length >= pool.length) used = [];
  const libres = pool.map((_, i) => i).filter(i => !used.includes(i));
  const pick = libres[Math.floor(Math.random() * libres.length)];
  used.push(pick); S.ruleta.used[key] = used; save();
  return { t, text: pool[pick] };
}
function ruletaStage(result) {
  const st = $("#stage"), tipo = S.ruleta.tipo;
  const nivel = S.ruleta.nivel || S.config.nivel;
  st.innerHTML = `
    <div class="stage-top"><span class="pill">${NIVEL_LABEL[nivel]}</span><button class="stage-close" data-close>✕ Salir</button></div>
    <div class="type-pick" style="margin-top:12px">
      ${[["reto", "Reto"], ["prenda", "Prenda"], ["sorpresa", "Sorpresa"]].map(([k, l]) => `<button data-tp="${k}" class="${k === tipo ? "on" : ""}">${l}</button>`).join("")}
    </div>
    <div class="stage-center">
      <div class="wheel-wrap"><div class="wheel" id="wheel" style="transform:rotate(${wheelDeg}deg)"></div></div>
      <div id="wheelOut">${result ? `<div class="stage-label">${result.t === "retos" ? "Tu reto" : "Tu prenda"}</div><div class="stage-text">${P(result.text)}</div>` : `<div class="stage-text" style="font-size:clamp(22px,6vw,40px)">Toca «Girar» y pasa el celular 🎉</div>`}</div>
    </div>
    <div class="stage-bottom">
      <button class="btn btn-gold" data-spin>🎡 Girar</button>
      <button class="btn btn-ghost" data-pass>Pasar ⏭️ (sin castigo)</button>
    </div>`;
  $("[data-close]", st).onclick = closeStage;
  $$("[data-tp]", st).forEach(b => b.onclick = () => { S.ruleta.tipo = b.dataset.tp; save(); ruletaStage(null); });
  const spin = () => {
    const res = draw(S.ruleta.tipo);
    wheelDeg += 720 + Math.floor(Math.random() * 360);
    const w = $("#wheel"); w.style.transform = `rotate(${wheelDeg}deg)`;
    $("#wheelOut").innerHTML = `<div class="stage-text" style="opacity:.6">…</div>`;
    $$("[data-spin],[data-pass]", st).forEach(b => b.disabled = true);
    setTimeout(() => ruletaStage(res), 1300);
  };
  $("[data-spin]", st).onclick = spin;
  $("[data-pass]", st).onclick = spin;
}

/* Stage */
function openStage() {
  const st = $("#stage"); st.hidden = false; document.body.style.overflow = "hidden";
  try { if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); } catch (e) {}
}
function closeStage() {
  $("#stage").hidden = true; document.body.style.overflow = "";
  try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch (e) {}
  renderTab();
}
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#stage").hidden) closeStage(); });

/* ---------- INVITACIÓN ---------- */
const TPLS = [
  { n: "Confeti", sw: "linear-gradient(135deg,#FFF8F1,#FFE3EC)" },
  { n: "Elegante", sw: "linear-gradient(135deg,#9B6BD6,#4B2A6E)" },
  { n: "Fiesta", sw: "linear-gradient(135deg,#E8457C,#F27BA0)" }
];
function invDefaults() {
  const c = S.config, I = S.invite;
  return {
    tpl: I.tpl || 0,
    titulo: I.titulo != null ? I.titulo : `Despedida de soltera de ${c.novia}`,
    fecha: I.fecha != null ? I.fecha : (c.fecha ? fechaLarga(c.fecha) : ""),
    hora: I.hora != null ? I.hora : horaTxt(c.hora),
    lugar: I.lugar || "",
    dress: I.dress || "",
    msg: I.msg != null ? I.msg : "Confirma tu asistencia en el grupo 💌"
  };
}
function renderInvitar(v) {
  const I = invDefaults();
  v.innerHTML = `
    <h1 class="h1">Invitación lista para WhatsApp</h1>
    <p class="muted">Elige un diseño, llena los datos y descarga la imagen para mandarla al grupo.</p>
    <div class="tpl-pick">${TPLS.map((t, i) => `<button data-tpl="${i}" class="${i === I.tpl ? "on" : ""}"><i style="background:${t.sw}"></i>${t.n}</button>`).join("")}</div>
    <label for="iTit">Título</label><input id="iTit" data-k="titulo" maxlength="60" value="${esc(I.titulo)}">
    <div class="row2">
      <div><label for="iFec">Fecha</label><input id="iFec" data-k="fecha" maxlength="40" value="${esc(I.fecha)}" placeholder="sábado 15 de noviembre"></div>
      <div><label for="iHor">Hora</label><input id="iHor" data-k="hora" maxlength="20" value="${esc(I.hora)}"></div>
    </div>
    <label for="iLug">Lugar</label><input id="iLug" data-k="lugar" maxlength="70" value="${esc(I.lugar)}" placeholder="Casa de Mariana, Col. Roma">
    <label for="iDre">Dress code</label><input id="iDre" data-k="dress" maxlength="50" value="${esc(I.dress)}" placeholder="Todas de rosa, la novia de blanco">
    <label for="iMsg">Mensaje final</label><input id="iMsg" data-k="msg" maxlength="70" value="${esc(I.msg)}">
    <div class="preview-wrap">
      <canvas id="invCanvas" width="1080" height="1350" aria-label="Vista previa de la invitación"></canvas>
      <div class="btn-row">
        <button class="btn btn-primary" id="dlPng">⬇️ Descargar PNG</button>
        <button class="btn btn-lila" id="shPng" hidden>📲 Compartir</button>
        <button class="btn btn-ghost" id="cpTxt">Copiar texto</button>
      </div>
    </div>`;
  const redraw = () => drawInvite($("#invCanvas"), invDefaults());
  $$("[data-tpl]", v).forEach(b => b.onclick = () => { S.invite.tpl = +b.dataset.tpl; save(); $$("[data-tpl]", v).forEach(x => x.classList.toggle("on", x === b)); redraw(); });
  $$("[data-k]", v).forEach(inp => inp.oninput = () => { S.invite[inp.dataset.k] = inp.value; save(); redraw(); });
  const fileName = () => "invitacion-despedida-" + (S.config.novia || "novia").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-") + ".png";
  $("#dlPng").onclick = () => {
    const cv = $("#invCanvas");
    const go = url => { const a = document.createElement("a"); a.href = url; a.download = fileName(); document.body.appendChild(a); a.click(); a.remove(); };
    try {
      if (cv.toBlob) cv.toBlob(b => { const u = URL.createObjectURL(b); go(u); setTimeout(() => URL.revokeObjectURL(u), 4000); }, "image/png");
      else go(cv.toDataURL("image/png"));
      toast("Imagen descargada. ¡Mándala al grupo!");
    } catch (e) { toast("No se pudo descargar. Mantén presionada la imagen para guardarla."); }
  };
  const sh = $("#shPng");
  try {
    if (navigator.canShare && navigator.canShare({ files: [new File([""], "a.png", { type: "image/png" })] })) {
      sh.hidden = false;
      sh.onclick = () => $("#invCanvas").toBlob(b => {
        navigator.share({ files: [new File([b], fileName(), { type: "image/png" })], text: invTexto() }).catch(() => {});
      }, "image/png");
    }
  } catch (e) {}
  $("#cpTxt").onclick = () => copiar(invTexto(), "Texto copiado. Pégalo en WhatsApp.");
  redraw();
  if (document.fonts && document.fonts.load) {
    Promise.all(["700 60px Fredoka", "600 40px Inter", "60px Pacifico", "400 40px Inter"].map(f => document.fonts.load(f).catch(() => {}))).then(redraw);
  }
}
function invTexto() {
  const I = invDefaults();
  return [`✨ ${I.titulo} ✨`, I.fecha && `📅 ${I.fecha}`, I.hora && `⏰ ${I.hora}`, I.lugar && `📍 ${I.lugar}`, I.dress && `👗 Dress code: ${I.dress}`, I.msg].filter(Boolean).join("\n");
}
function copiar(txt, okMsg) {
  const fallback = () => {
    const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast(okMsg); } catch (e) { toast("No se pudo copiar"); }
    ta.remove();
  };
  try { navigator.clipboard.writeText(txt).then(() => toast(okMsg), fallback); } catch (e) { fallback(); }
}
function wrap(ctx, text, maxW) {
  const words = String(text).split(/\s+/), lines = []; let line = "";
  words.forEach(w => {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test;
  });
  if (line) lines.push(line);
  return lines;
}
function fitText(ctx, text, font, size, maxW, maxLines) {
  let s = size, lines;
  do { ctx.font = font.replace("{s}", s); lines = wrap(ctx, text, maxW); s -= 4; } while (lines.length > maxLines && s > 30);
  return { lines, size: s + 4 };
}
function seeded(seed) { return () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
function drawInvite(cv, I) {
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height, tpl = I.tpl;
  const rnd = seeded(7);
  ctx.clearRect(0, 0, W, H);
  ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
  let ink = "#2E1F33", accent = "#E8457C", soft = "#9B6BD6";

  if (tpl === 0) {
    ctx.fillStyle = "#FFF8F1"; ctx.fillRect(0, 0, W, H);
    const cols = ["#E8457C", "#9B6BD6", "#E9B949", "#F7A8C2"];
    for (let i = 0; i < 520; i++) {
      const x = rnd() * W, y = rnd() * H;
      if (x > 95 && x < W - 95 && y > 95 && y < H - 95) continue;
      ctx.save(); ctx.translate(x, y); ctx.rotate(rnd() * Math.PI); ctx.fillStyle = cols[i % 4];
      if (i % 3 === 0) { ctx.beginPath(); ctx.arc(0, 0, 6 + rnd() * 8, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-12, -5, 24, 10);
      ctx.restore();
    }
    ctx.strokeStyle = "#E9B949"; ctx.lineWidth = 6; roundRect(ctx, 80, 80, W - 160, H - 160, 40); ctx.stroke();
  } else if (tpl === 1) {
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#9B6BD6"); g.addColorStop(1, "#3D2159");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#E9B949"; ctx.lineWidth = 5; roundRect(ctx, 60, 60, W - 120, H - 120, 20); ctx.stroke();
    ctx.lineWidth = 2; roundRect(ctx, 80, 80, W - 160, H - 160, 14); ctx.stroke();
    for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(233,185,73,${0.3 + rnd() * 0.6})`; ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, 2 + rnd() * 4, 0, Math.PI * 2); ctx.fill(); }
    ink = "#FFFFFF"; accent = "#E9B949"; soft = "#F5E6FF";
  } else {
    ctx.fillStyle = "#E8457C"; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = "#fff";
    for (let x = -H; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 45, 0); ctx.lineTo(x + 45 + H, H); ctx.lineTo(x + H, H); ctx.fill(); }
    ctx.restore();
    for (let i = 0; i < 26; i++) star(ctx, rnd() * W, rnd() * H, 10 + rnd() * 16, "#E9B949");
    ctx.fillStyle = "#FFF8F1"; roundRect(ctx, 90, 150, W - 180, H - 300, 44); ctx.fill();
    ctx.strokeStyle = "#E9B949"; ctx.lineWidth = 6; ctx.stroke();
  }

  // Texto: se ajusta el tamaño (k) para que todo quepa dentro del marco y queda centrado
  const area = tpl === 2 ? { top: 200, bottom: H - 200, w: W - 300 } : { top: 130, bottom: H - 130, w: W - 300 };
  const label = soft === "#F5E6FF" ? "#E9B949" : "#9B6BD6";
  const rows = [["FECHA", I.fecha], ["HORA", I.hora], ["LUGAR", I.lugar], ["DRESS CODE", I.dress]].filter(r => r[1]);
  const titleFont = tpl === 1 ? "{s}px Pacifico, cursive" : "700 {s}px Fredoka, sans-serif";
  const msgFont = s => tpl === 1 ? `${s}px Pacifico, cursive` : `600 ${s}px Fredoka, sans-serif`;
  const layout = (k, y0, paint) => {
    let y = y0;
    const text = (t, font, color, size) => { y += size; if (paint) { ctx.font = font; ctx.fillStyle = color; ctx.fillText(t, W / 2, y); } y += size * 0.25; };
    text("ESTÁS INVITADA", `600 ${Math.round(32 * k)}px Inter, sans-serif`, accent, 32 * k);
    y += 24 * k;
    const ft = fitText(ctx, I.titulo || "Despedida de soltera", titleFont, Math.round((tpl === 1 ? 92 : 100) * k), area.w, 3);
    ft.lines.forEach(l => text(l, titleFont.replace("{s}", ft.size), tpl === 1 ? "#FFFFFF" : "#E8457C", ft.size));
    y += 34 * k;
    if (paint) { ctx.fillStyle = "#E9B949"; ctx.fillRect(W / 2 - 120, y, 240, 6); star(ctx, W / 2, y + 3, 18, "#E9B949"); }
    y += 50 * k;
    rows.forEach(([lab, val]) => {
      text(lab, `700 ${Math.round(26 * k)}px Inter, sans-serif`, label, 26 * k);
      y += 4 * k;
      ctx.font = `600 ${Math.round(42 * k)}px Inter, sans-serif`;
      wrap(ctx, val, area.w).slice(0, 2).forEach(l => text(l, `600 ${Math.round(42 * k)}px Inter, sans-serif`, ink, 42 * k));
      y += 26 * k;
    });
    if (I.msg) {
      y += 14 * k;
      ctx.font = msgFont(Math.round(40 * k));
      wrap(ctx, I.msg, area.w).slice(0, 2).forEach(l => text(l, msgFont(Math.round(40 * k)), accent, 40 * k));
    }
    return y - y0;
  };
  const maxH = area.bottom - area.top;
  let k = 1.25, h = layout(k, 0, false);
  while (h > maxH && k > 0.5) { k -= 0.05; h = layout(k, 0, false); }
  layout(k, area.top + (maxH - h) / 2, true);
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function star(ctx, cx, cy, r, color) {
  ctx.save(); ctx.fillStyle = color; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill(); ctx.restore();
}

/* ---------- LISTAS ---------- */
function comprasLista() {
  const base = (COMPRAS_BASE[S.config.lugar] || []).map(names);
  const deJuegos = [];
  starred().forEach(id => { const g = gameById(id); if (g) g.compras.forEach(c => deJuegos.push({ c: names(c), g: names(g.nombre) })); });
  const vistos = new Map();
  deJuegos.forEach(({ c, g }) => { if (!vistos.has(c)) vistos.set(c, []); vistos.get(c).push(g); });
  return { base, juegos: Array.from(vistos.entries()) };
}
function renderListas(v) {
  const c = S.config;
  const fecha = c.fecha ? new Date(c.fecha + "T12:00:00") : null;
  const total = CHECKLIST.reduce((n, g) => n + g.items.length, 0);
  const hechos = Object.keys(S.checks).filter(k => S.checks[k]).length;
  const compras = comprasLista();
  v.innerHTML = `
    <h1 class="h1">Checklist</h1>
    <div class="progress"><i style="width:${Math.round(hechos / total * 100)}%"></i></div>
    <p class="muted"><small>${hechos} de ${total} tareas listas</small></p>
    ${CHECKLIST.map((g, gi) => {
      let cuando = "";
      if (fecha) { const d = new Date(fecha); d.setDate(d.getDate() - g.dias); cuando = g.dias ? "antes del " + fechaCorta(d) : fechaCorta(d); }
      return `<div class="check-group"><h3>${esc(g.grupo)} ${cuando ? `<small>${esc(cuando)}</small>` : ""}</h3>
        ${g.items.map((it, ii) => { const k = gi + "-" + ii; return `<label class="check"><input type="checkbox" data-ck="${k}" ${S.checks[k] ? "checked" : ""}><span>${P(it)}</span></label>`; }).join("")}
      </div>`;
    }).join("")}
    <div class="section-title"><h2 class="h2">Lista de compras</h2><button class="btn btn-ghost btn-sm" id="cpShop">Copiar lista</button></div>
    <p class="muted"><small>Se arma con los juegos marcados con ⭐ en «Juegos» (${starred().length} elegidos).</small></p>
    <div class="check-group"><h3>Básicos para ${esc(LUGAR_LABEL[c.lugar].toLowerCase())}</h3>
      ${compras.base.map(it => `<label class="check"><input type="checkbox" data-sh="${esc(it)}" ${S.shop[it] ? "checked" : ""}><span>${esc(it)}</span></label>`).join("")}
    </div>
    <div class="check-group"><h3>Para tus juegos</h3>
      ${compras.juegos.length ? compras.juegos.map(([it, gs]) => `<label class="check"><input type="checkbox" data-sh="${esc(it)}" ${S.shop[it] ? "checked" : ""}><span>${esc(it)}<br><small>${esc(gs.join(" · "))}</small></span></label>`).join("") : `<p class="muted">Tus juegos elegidos no necesitan compras. 🎉</p>`}
    </div>
  `;
  $$("[data-ck]", v).forEach(cb => cb.onchange = () => { S.checks[cb.dataset.ck] = cb.checked; save(); const y = window.scrollY; renderListas(v); window.scrollTo(0, y); });
  $$("[data-sh]", v).forEach(cb => cb.onchange = () => { S.shop[cb.dataset.sh] = cb.checked; save(); });
  $("#cpShop").onclick = () => {
    const txt = "🛍️ Compras para la despedida de " + c.novia + "\n" + compras.base.concat(compras.juegos.map(x => x[0])).map(x => (S.shop[x] ? "✅ " : "▫️ ") + x).join("\n");
    copiar(txt, "Lista copiada. Pégala en WhatsApp.");
  };
}

/* ---------- Inicio ---------- */
show();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}
