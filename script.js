const education = [
['2026 — PRESENT','M.Sc. Honours Chemistry','University of Hyderabad','Currently pursuing.'],
['2026','M.Sc. Chemistry — former student','MANIT Bhopal',''],
['2023 — 2026','B.Sc. Honours Chemistry','Guru Ghasidas Vishwavidyalaya, Bilaspur','CGPA: 8.2 / 10.0'],
['2022','Class XII','Khalsa Public School, Dongargarh','CBSE / State Board · 93.4%'],
['2020','Class X','Khalsa Public School, Dongargarh','CBSE / State Board · 90.4%']
];
const experience = [
['MAY 2025 — JUN 2025','Research Intern','CSIR CIMFR · Bilaspur, India',['Prepared and processed samples for routine chemical analysis using documented SOPs.','Maintained raw data sheets, sample labels, logbooks, and analytical records to support traceability and reproducibility.','Assisted in calibration verification and followed laboratory safety, chemical handling, waste disposal, and HSE procedures.']],
['AUG 2023 — MAY 2026','Undergraduate Laboratory Trainee','Department of Chemistry Laboratory · Guru Ghasidas Vishwavidyalaya',['Performed quantitative and qualitative experiments with emphasis on accurate measurements, solution standardization, repeatability, and systematic observation.']]
];
const skills = [
['Analytical chemistry','Acid–base, redox, and conductometric titration; gravimetric analysis; UV–Vis spectroscopy; pH analysis; basic chromatography; quantitative and qualitative analysis.'],
['Sample preparation & measurement','Reagent and standard solution preparation, dilution protocols, blank correction, calibration curves, quantitative estimation, and repeat measurements.'],
['Instrumentation','UV–Vis spectrophotometer, analytical balance, pH meter, centrifuge, muffle furnace, and basic chromatographic systems.'],
['Laboratory practices','SOP adherence, GLP, raw data traceability, sample identification, logbook maintenance, calibration verification, and result reproducibility.'],
['Safety & compliance','HSE practices, chemical handling, laboratory waste disposal, and awareness of ISO/IEC 17025 and ISO 9001.'],
['Laboratory data systems','LIMS basics, structured analytical records, and result documentation.']
];
document.querySelector('#education-list').innerHTML = education.map(([date,title,place,detail]) => `<article><span class="timeline-date">${date}</span><h4>${title}</h4><p>${place}</p>${detail ? `<p>${detail}</p>` : ''}</article>`).join('');
document.querySelector('#experience-list').innerHTML = experience.map(([date,title,place,items]) => `<article><span class="timeline-date">${date}</span><h4>${title}</h4><p>${place}</p><ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul></article>`).join('');
document.querySelector('#skills-list').innerHTML = skills.map(([title,detail])=>`<article><h4>${title}</h4><p>${detail}</p></article>`).join('');
const blogPosts = [...document.querySelectorAll('.blog-post[data-slug]')];
const blogGrid = document.querySelector('#blog-grid');
const blogReader = document.querySelector('#blog-reader');
blogPosts.forEach(post => {
 const card = document.createElement('a');
 card.className = 'blog-card';
 card.href = `#blog/${post.dataset.slug}`;
 const image = post.querySelector('.blog-cover').cloneNode(true);
 const content = document.createElement('div');
 content.className = 'blog-card-content';
 content.append(post.querySelector('.blog-meta').cloneNode(true));
 const title = document.createElement('h3');
 title.textContent = post.querySelector('h3').textContent;
 const excerpt = document.createElement('p');
 excerpt.textContent = post.dataset.excerpt;
 const read = document.createElement('span');
 read.className = 'blog-card-read';
 read.textContent = 'Read the story ↗';
 content.append(title, excerpt, read);
 card.append(image, content);
 blogGrid.append(card);
});
function showPage(route, scroll = false) {
 const [section, slug] = route.split('/');
 let name = section;
 if (!['about','resume','service','blog'].includes(name)) name = 'about';
 document.querySelectorAll('.page').forEach(page => {page.hidden = page.id !== name; page.classList.toggle('active',page.id === name);});
 document.querySelectorAll('.nav-link').forEach(button => {const active = button.dataset.page === name;button.classList.toggle('active',active);if(active) button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
 const post = name === 'blog' ? blogPosts.find(item => item.dataset.slug === slug) : undefined;
 blogGrid.hidden = Boolean(post);
 blogReader.hidden = !post;
 blogPosts.forEach(item => { item.hidden = item !== post; });
 document.querySelector('#blog > .eyebrow').hidden = Boolean(post);
 document.querySelector('#blog-title').hidden = Boolean(post);
 document.querySelector('#blog > .intro').hidden = Boolean(post);
 document.title = post ? `${post.querySelector('h3').textContent} — Ashneet Kaur Bhatia` : 'Ashneet Kaur Bhatia — Chemistry & Research';
 if (scroll && name === 'blog') {
  const target = post ? post.querySelector('h3') : document.querySelector('#blog-title');
  target.setAttribute('tabindex', '-1');
  target.focus({preventScroll:true});
  document.querySelector('.main-panel').scrollIntoView({behavior:'instant',block:'start'});
 }
 if (scroll && name !== 'blog' && window.innerWidth <= 760) document.querySelector('.main-panel').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
}
document.querySelectorAll('.nav-link').forEach(button=>button.addEventListener('click',()=>{location.hash=button.dataset.page;}));
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1),true));
showPage(location.hash.slice(1));
document.querySelector('#year').textContent = new Date().getFullYear();
const projects = {
 trace:{category:'ANALYTICAL METHODS · 2026',title:'Development and Validation of a Trace Metal Analysis Method',paragraphs:['Developed a quantitative analytical method for trace metal determination in aqueous samples using instrumental spectroscopy and standardized sample preparation procedures.','Evaluated calibration linearity, precision, recovery, blank correction, repeatability, detection limits, and measurement uncertainty to assess analytical method performance.','Applied quantitative data analysis and systematic documentation to improve the reliability and traceability of analytical results.']},
 sorption:{category:'SEPARATION SCIENCE · 2025',title:'Sorption and Separation of Metal Ions from Aqueous Systems',paragraphs:['Investigated pH, contact time, concentration, and temperature dependent sorption of metal ions using a functionalized solid sorbent.','Evaluated adsorption kinetics, equilibrium behaviour, selectivity, adsorption capacity, and regeneration using quantitative analytical measurements.','Characterized the sorbent using available spectroscopic and material characterization techniques and interpreted experimental results.']},
 corrosion:{category:'WATER & MATERIALS CHEMISTRY · 2025',title:'Water Chemistry and Corrosion Behaviour of Reactor Materials',paragraphs:['Investigated the influence of pH, chloride concentration, temperature, and dissolved species on the corrosion behaviour of carbon steel or stainless steel under controlled aqueous conditions.','Quantified corrosion behaviour using mass loss and/or electrochemical measurements and monitored changes in solution chemistry.']}
};
const dialog = document.querySelector('#project-dialog');
dialog.setAttribute('aria-labelledby','dialog-title');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const project=projects[button.dataset.project];document.querySelector('#dialog-category').textContent=project.category;document.querySelector('#dialog-title').textContent=project.title;document.querySelector('#dialog-content').innerHTML=project.paragraphs.map(text=>`<p>${text}</p>`).join('');dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});

// Appearance: remember the visitor's choice and follow the system until overridden.
const themeToggle = document.querySelector('#theme-toggle');
let themePreference;
try { themePreference = localStorage.getItem('ashneet-theme'); } catch {}
function setTheme(theme) {
 document.documentElement.dataset.theme = theme;
 const isDark = theme === 'dark';
 themeToggle.setAttribute('aria-pressed', String(isDark));
 themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
 themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
}
setTheme(document.documentElement.dataset.theme || 'light');
themeToggle.addEventListener('click', () => {
 themePreference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 setTheme(themePreference);
 try { localStorage.setItem('ashneet-theme', themePreference); } catch {}
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
 if (themePreference !== 'light' && themePreference !== 'dark') setTheme(event.matches ? 'dark' : 'light');
});
function publicUrl(value) {
 try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
const config = window.SITE_CONFIG || {};
[['scholar-link', config.googleScholarUrl, 'Google Scholar'], ['github-link', config.githubUrl, 'GitHub']].forEach(([id, value, label]) => {
 const link = document.getElementById(id);
 const url = publicUrl(value);
 if (!url) return;
 link.href = url;
 link.target = '_blank';
 link.rel = 'noopener noreferrer';
 link.removeAttribute('aria-disabled');
 link.setAttribute('aria-label', `${label} profile`);
 link.title = label;
});
const qrDialog = document.querySelector('#qr-dialog');
const homeUrl = publicUrl(config.homepageUrl);
if (homeUrl) {
 try {
  const destination = new URL(homeUrl);
  destination.hash = 'about';
  const qr = qrcode(0, 'M');
  qr.addData(destination.href);
  qr.make();
  const size = qr.getModuleCount();
  const canvas = document.createElement('canvas');
  const scale = 8, margin = 4;
  canvas.width = canvas.height = (size + margin * 2) * scale;
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';
  for (let row = 0; row < size; row++) for (let col = 0; col < size; col++) {
   if (qr.isDark(row, col)) context.fillRect((col + margin) * scale, (row + margin) * scale, scale, scale);
  }
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'QR code linking to Ashneet Kaur Bhatia’s homepage');
  const container = document.querySelector('#qr-code');
  container.append(canvas);
  container.hidden = false;
  document.querySelector('#qr-message').textContent = 'Scan this code to visit my homepage.';
  const homeLink = document.querySelector('#qr-home-link');
  homeLink.href = destination.href;
  homeLink.hidden = false;
 } catch {
  document.querySelector('#qr-message').textContent = 'The QR code could not be generated. Please use the homepage link.';
  const homeLink = document.querySelector('#qr-home-link');
  homeLink.href = homeUrl;
  homeLink.hidden = false;
 }
}
document.querySelector('#qr-toggle').addEventListener('click', () => qrDialog.showModal());
qrDialog.querySelector('.dialog-close').addEventListener('click', () => qrDialog.close());
qrDialog.addEventListener('click', event => {
 if (event.target !== qrDialog) return;
 const rect = qrDialog.getBoundingClientRect();
 if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) qrDialog.close();
});
