# Landing Migrazione Nuovo E-commerce B2B (Officine) — Documento Progetto

> Scopo: landing page **informativa + urgente** per clienti già attivi sul vecchio e-commerce, con **raccolta email** per richiedere l’attivazione del nuovo e-commerce (solo UI, **senza backend**).

---

## 1) Contesto e obiettivo

### Target
- Officine meccaniche (B2B)
- Clienti già attivi sul vecchio e-commerce
- Utilizzo prevalente **mobile**

### Obiettivo della landing
1. Informare: “Stiamo migrando al nuovo e-commerce”
2. Urgenza: “Il vecchio verrà dismesso entro fine anno / tra pochi giorni”
3. Azione: “Inserisci email per richiedere l’attivazione del nuovo e-commerce”

### Cosa NON fa (esplicito)
- Nessun backend
- Nessun invio email automatico
- Nessuna integrazione esterna
- Nessuna autenticazione

> Nota: l’invio e le automazioni post-raccolta email saranno gestiti da te con sistemi interni.

---

## 2) Idea / Concept (come impostarla)

### Posizionamento
Non è “un sito che vende”.  
È un **avviso operativo** + attivazione guidata per non perdere l’accesso.

### Linee guida UX (mobile-first)
- Una sola pagina, un solo obiettivo
- **CTA unica** (email) sempre visibile (sticky su mobile)
- Animazioni leggere e funzionali (ingresso sezioni, highlight CTA, feedback form)
- Testo super chiaro: poche righe per sezione

### Design system (palette)
```css
:root {
  --bg-main: #0f1521;
  --bg-card: #1b2536;
  --accent-primary: #f43f5e;
  --btn-secondary: #375a7f;
  --text-main: #ffffff;
  --text-muted: #9ca3af;
}
```

---

## 3) Struttura della landing (1 pagina)

### 1) Hero (above the fold)
- Titolo forte + urgenza
- Sottotitolo informativo
- Badge “attivazione obbligatoria”
- CTA primaria verso il form email

### 2) Blocco urgenza (alert)
- “Se non attivi rischi di restare senza accesso”

### 3) Sezione “Cosa cambia”
- 1 paragrafo massimo: strumento di lavoro, non restyling

### 4) Funzionalità (cards/sezioni)
- Ricerca per targa
- Ricerca per telaio (VIN)
- Multicarrello
- Integrazione magazzini
- Specifiche tecniche vettura
- Piani di manutenzione + tempi per preventivo

### 5) Promo lancio
- 3 mesi promo
- cashback 3%
- premi contrattuali fino a 300€

### 6) CTA finale con form email (focus assoluto)
- input email + bottone
- validazione UI
- success message (solo frontend)

### 7) Footer minimal
- “riservato alle officine clienti”
- contatto commerciale (testo)

---

## 4) Implementation Plan (solo frontend / landing)

### Scope
**Solo UI**: layout, animazioni, ottimizzazione mobile, form email con stati.

### Stack consigliato (scegli tu)
- HTML + Tailwind (super veloce)
- oppure React/Next + Tailwind
- Animazioni: CSS oppure Framer Motion

### Stati UI da implementare
- Default
- Focus input
- Validazione email (error)
- Submit loading (simulato)
- Submit success (messaggio conferma)

### Performance / Mobile
- Lighthouse target: ≥ 90 (mobile)
- CTA sticky bottom su mobile
- Asset leggeri (WebP/AVIF)
- Lazy load sezioni sotto fold
- Niente librerie “pesanti” inutili

### Deliverable
- Landing page responsive
- Animazioni funzionanti
- Form email lato UI (senza invio)
- Codice pulito e riutilizzabile
- Struttura componenti (se usi React/Next)

---

## 5) Task list (da dare al tuo CLI / IDE)

### EPIC 1 — Setup progetto
- [ ] Inizializza progetto (HTML oppure React/Next)
- [ ] Setup Tailwind + variabili tema (palette)
- [ ] Crea struttura base: layout + sezioni placeholder

**Output:** pagina statica visibile e responsive

### EPIC 2 — Layout & componenti
- [ ] Hero + alert urgenza
- [ ] Sezione “Cosa cambia”
- [ ] Sezione funzionalità (6 cards)
- [ ] Promo lancio (card highlight)
- [ ] Sezione CTA finale con form email
- [ ] Footer minimal

**Output:** UI completa senza animazioni

### EPIC 3 — Animazioni & micro-interazioni
- [ ] Animazioni ingresso sezioni on scroll (leggere)
- [ ] CTA pulse/glow “soft”
- [ ] Hover/focus input + button states
- [ ] Success state con micro-animazione

**Output:** UI “viva” e moderna

### EPIC 4 — Form email (frontend only)
- [ ] Validazione email (regex semplice)
- [ ] Gestione errori (messaggio chiaro)
- [ ] Loading simulato (es. 800ms)
- [ ] Success message persistente
- [ ] Reset opzionale (opzionale: “invia un’altra email”)

**Output:** CTA form completata lato UI

### EPIC 5 — Ottimizzazione finale
- [ ] Test mobile (iOS/Android sizes)
- [ ] Compressione immagini + lazy load
- [ ] Audit Lighthouse
- [ ] Fix CLS (layout shifts) e font loading

**Output:** build pronta da pubblicare

---

## 6) COPY ESATTO (incollabile)

> Questo è il testo definitivo per la landing. Puoi usarlo 1:1.

### HERO — ABOVE THE FOLD

**Titolo**  
Il nuovo e-commerce è attivo.  
Il vecchio sta per essere dismesso.

**Sottotitolo**  
Stiamo migrando tutti i clienti verso il nuovo sistema.  
Entro fine anno il vecchio e-commerce non sarà più accessibile.

**Badge / evidenza**  
ATTIVAZIONE OBBLIGATORIA PER CONTINUARE A ORDINARE

**CTA primaria**  
Inserisci la tua email per attivare il nuovo e-commerce

---

### BLOCCO URGENZA (alert)

**Titolo**  
⚠️ Attenzione: azione richiesta

**Testo**  
Se non attivi il nuovo e-commerce rischi di rimanere senza accesso ai servizi di ordine online, disponibilità e dati tecnici.  
L’attivazione è semplice, ma va richiesta ora.

---

### SEZIONE — COSA CAMBIA

**Titolo**  
Un e-commerce pensato per lavorare meglio in officina

**Testo**  
Il nuovo sistema non è un semplice restyling.  
È uno strumento progettato per ridurre errori, risparmiare tempo e lavorare in modo più preciso ogni giorno.

---

### FUNZIONALITÀ (cards)

**Ricerca per targa**  
Trova i ricambi corretti partendo direttamente dalla targa del veicolo.

**Ricerca per telaio (VIN)**  
Massima precisione nella selezione dei ricambi, anche sui modelli più complessi.

**Multicarrello**  
Gestisci più clienti contemporaneamente senza confusione al banco.

**Integrazione magazzini**  
Disponibilità aggiornate su più magazzini, in modo semplice e immediato.

**Specifiche tecniche del veicolo**  
Consulta lubrificanti corretti, gas refrigerante, coppie di serraggio e dati tecnici utili all’intervento.

**Piani di manutenzione integrati**  
Procedure guidate e tempi di lavorazione per creare preventivi completi e professionali.

---

### SEZIONE PROMO LANCIO

**Titolo**  
Promo di attivazione riservata ai clienti attuali

**Testo**  
Con l’attivazione del nuovo e-commerce ottieni:

- 3 mesi di promo lancio  
- Cashback 3% sugli acquisti  
- Premi fino a 300€ da spendere in ricambi o attrezzature

La promo è valida solo in fase di migrazione.

---

### CTA FINALE — FORM EMAIL

**Titolo**  
Attiva ora il nuovo e-commerce

**Sottotitolo**  
Inserisci l’email con cui operi abitualmente.  
Ti invieremo le istruzioni per completare l’attivazione.

**Placeholder input**  
nome@officina.it

**Pulsante**  
Richiedi attivazione

---

### MESSAGGIO POST SUBMIT (SUCCESS)

Email ricevuta correttamente.  
A breve riceverai le istruzioni per accedere al nuovo e-commerce e impostare la password.

---

### FOOTER

Servizio riservato alle officine clienti.  
Per informazioni contatta il tuo referente commerciale.

---

## 7) Nota operativa (extra)
- Se vuoi aumentare conversione: CTA sticky + ripeti micro-CTA anche sotto il blocco urgenza.
- Se vuoi ridurre errori: aggiungi suggerimento “Usa l’email che usi per gli ordini / fatture”.

