const sectionDefinitions = [
  { id: "overview", label: "Overview", title: "Profile Snapshot", command: "cat profile.md" },
  { id: "experience", label: "Experience", title: "Experience Log", command: "tail experience.log" },
  { id: "skills", label: "Skills", title: "Skills Matrix", command: "ls stack/" },
  { id: "projects", label: "Projects", title: "Selected Projects", command: "open case-studies/" },
  { id: "education", label: "Education", title: "Education Archive", command: "cat education.txt" },
  { id: "contact", label: "Contact", title: "Contact Endpoint", command: "ping collaborators" }
];

const byId = (id) => document.getElementById(id);

const elements = {
  bootLog: byId("boot-log"),
  terminalLabel: byId("terminal-label"),
  heroName: byId("hero-name"),
  heroTitle: byId("hero-title"),
  heroTagline: byId("hero-tagline"),
  heroBio: byId("hero-bio"),
  heroLocation: byId("hero-location"),
  heroAvailability: byId("hero-availability"),
  heroUpdated: byId("hero-updated"),
  statsGrid: byId("stats-grid"),
  heroActions: byId("hero-actions"),
  navList: byId("nav-list"),
  sectionStack: byId("section-stack"),
  terminalScroll: byId("terminal-scroll")
};

document.body.classList.add("is-booting");

const bootLines = [
  "booting terminal shell...",
  "mounting profile assets...",
  "reading resume dataset...",
  "rendering interface panes...",
  "launch complete"
];
const assetVersion = "20260330-3";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createStats(stats = []) {
  elements.statsGrid.innerHTML = stats
    .map(
      (item) => `
        <article class="stat-card">
          <p class="stat-label">${escapeHtml(item.label)}</p>
          <p class="stat-value">${escapeHtml(item.value)}</p>
        </article>
      `
    )
    .join("");
}

function createActions(contact = {}) {
  const actions = [];

  if (contact.github) {
    actions.push({
      label: "GitHub",
      href: contact.github
    });
  }

  if (contact.linkedin) {
    actions.push({
      label: "LinkedIn",
      href: contact.linkedin
    });
  }

  if (contact.email && !contact.email.endsWith("@example.com")) {
    actions.push({
      label: "Email",
      href: `mailto:${contact.email}`
    });
  }

  elements.heroActions.innerHTML = actions
    .map(
      (action) => `<a class="action-link" href="${escapeHtml(action.href)}" target="_blank" rel="noreferrer">${escapeHtml(action.label)}</a>`
    )
    .join("");
}

function createNav() {
  elements.navList.innerHTML = sectionDefinitions
    .map(
      (section, index) => `
        <button class="nav-button${index === 0 ? " is-active" : ""}" type="button" data-target="${section.id}">
          ${escapeHtml(section.label)}
        </button>
      `
    )
    .join("");
}

function renderOverview(data) {
  const highlights = (data.about.highlights || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return `
    <div class="section-body">
      <div class="overview-grid">
        <article class="mini-panel">
          <p class="mini-title">About</p>
          <p class="copy-block">${escapeHtml(data.about.bio)}</p>
        </article>
        <article class="mini-panel">
          <p class="mini-title">Highlights</p>
          <ul class="highlights-list">${highlights}</ul>
        </article>
      </div>
    </div>
  `;
}

function renderExperience(data) {
  const items = (data.experience || [])
    .map((item) => {
      const bullets = (item.bullets || []).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("");
      const tags = (item.stack || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

      return `
        <article class="timeline-item">
          <div class="timeline-top">
            <div>
              <h3 class="timeline-title">${escapeHtml(item.role)}</h3>
              <p class="timeline-company">${escapeHtml(item.company)}</p>
            </div>
            <p class="timeline-duration">${escapeHtml(item.duration)}</p>
          </div>
          ${item.summary ? `<p class="timeline-summary">${escapeHtml(item.summary)}</p>` : ""}
          <ul class="bullet-list">${bullets}</ul>
          ${tags ? `<div class="tag-row">${tags}</div>` : ""}
        </article>
      `;
    })
    .join("");

  return `<div class="timeline-list">${items}</div>`;
}

function renderSkills(data) {
  const groups = (data.skills || [])
    .map((group) => {
      const tags = (group.items || []).map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");

      return `
        <article class="skill-panel">
          <h3 class="skill-title">${escapeHtml(group.category)}</h3>
          <div class="tag-row">${tags}</div>
        </article>
      `;
    })
    .join("");

  return `<div class="skills-grid">${groups}</div>`;
}

function renderProjects(data) {
  const projects = (data.projects || [])
    .map((project) => {
      const tags = (project.stack || []).map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");
      const meta = [project.stars, project.forks]
        .filter(Boolean)
        .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
        .join("");

      return `
        <article class="project-card">
          <div>
            <h3 class="project-title">${escapeHtml(project.name)}</h3>
          </div>
          <p class="project-description">${escapeHtml(project.description)}</p>
          ${project.outcome ? `<p class="project-outcome">${escapeHtml(project.outcome)}</p>` : ""}
          ${meta ? `<div class="project-meta">${meta}</div>` : ""}
          ${tags ? `<div class="tag-row">${tags}</div>` : ""}
          ${project.link ? `<a class="project-link" href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">Open project</a>` : ""}
        </article>
      `;
    })
    .join("");

  return `<div class="projects-grid">${projects}</div>`;
}

function renderEducation(data) {
  const items = (data.education || [])
    .map(
      (item) => `
        <article class="education-card">
          <h3 class="education-title">${escapeHtml(item.degree)}</h3>
          <p class="education-meta">${escapeHtml(item.university)} | ${escapeHtml(item.year)}</p>
          <p class="education-details">${escapeHtml(item.details)}</p>
        </article>
      `
    )
    .join("");

  return `<div class="education-list">${items}</div>`;
}

function renderContact(data) {
  const emailIsPublic = data.contact.email && !data.contact.email.endsWith("@example.com");
  const contactItems = [
    emailIsPublic
      ? `<li><a class="contact-link" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a></li>`
      : `<li>${escapeHtml(data.contact.email || "Email available on request")}</li>`,
    data.contact.github
      ? `<li><a class="contact-link" href="${escapeHtml(data.contact.github)}" target="_blank" rel="noreferrer">${escapeHtml(data.contact.github)}</a></li>`
      : "",
    data.contact.linkedin
      ? `<li><a class="contact-link" href="${escapeHtml(data.contact.linkedin)}" target="_blank" rel="noreferrer">${escapeHtml(data.contact.linkedin)}</a></li>`
      : ""
  ]
    .filter(Boolean)
    .join("");

  return `
    <div class="contact-grid">
      <article class="mini-panel">
        <p class="mini-title">Reach Out</p>
        <ul class="contact-list">${contactItems}</ul>
      </article>
      <article class="mini-panel">
        <p class="mini-title">Collaboration</p>
        <p class="contact-note">${escapeHtml(data.contact.cta || "")}</p>
      </article>
    </div>
  `;
}

function buildSections(data) {
  const renderMap = {
    overview: renderOverview(data),
    experience: renderExperience(data),
    skills: renderSkills(data),
    projects: renderProjects(data),
    education: renderEducation(data),
    contact: renderContact(data)
  };

  elements.sectionStack.innerHTML = sectionDefinitions
    .map(
      (section, index) => `
        <section class="section-card" id="${section.id}">
          <div class="section-head">
            <div>
              <p class="section-command">${escapeHtml(section.command)}</p>
              <h2 class="section-title">${escapeHtml(section.title)}</h2>
            </div>
            <span class="section-index">0${index + 1}</span>
          </div>
          ${renderMap[section.id]}
        </section>
      `
    )
    .join("");
}

function applyHero(data) {
  elements.terminalLabel.textContent = data.metadata.terminal_label || "resume-terminal";
  elements.heroName.textContent = data.about.name;
  elements.heroTitle.textContent = data.about.title;
  elements.heroTagline.textContent = data.about.tagline || "";
  elements.heroBio.textContent = data.about.bio;
  elements.heroLocation.textContent = data.about.location || "Remote";
  elements.heroAvailability.textContent = data.about.availability || "Available";
  elements.heroUpdated.textContent = data.metadata.last_updated || "Latest";
}

function setupNavigation() {
  const buttons = [...document.querySelectorAll(".nav-button")];
  const sections = [...document.querySelectorAll(".section-card")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

      if (!visibleEntries.length) {
        return;
      }

      const activeId = visibleEntries[0].target.id;
      buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.target === activeId);
      });
    },
    {
      root: elements.terminalScroll,
      rootMargin: "-15% 0px -55% 0px",
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function renderApp(data) {
  applyHero(data);
  createStats(data.stats || []);
  createActions(data.contact || {});
  createNav();
  buildSections(data);
  setupNavigation();
}

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

async function playBootSequence(label = "resume-terminal") {
  elements.bootLog.innerHTML = "";

  for (let index = 0; index < bootLines.length; index += 1) {
    const line = document.createElement("p");
    const prefix = index === bootLines.length - 1 ? `${label}>` : ">";
    line.textContent = `${prefix} ${bootLines[index]}`;
    elements.bootLog.append(line);
    await wait(index === bootLines.length - 1 ? 320 : 180);
  }

  await wait(260);
  document.body.classList.remove("is-booting");
  document.body.classList.add("is-ready");
}

async function loadResume() {
  const bootPromise = playBootSequence("resume-terminal");

  try {
    const response = await fetch(`./data.json?v=${assetVersion}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Unable to load data: ${response.status}`);
    }

    const data = await response.json();
    renderApp(data);
    await bootPromise;
  } catch (error) {
    elements.sectionStack.innerHTML = `
      <section class="section-card">
        <div class="section-head">
          <div>
            <p class="section-command">cat error.log</p>
            <h2 class="section-title">Resume failed to load</h2>
          </div>
        </div>
        <p class="copy-block">The site could not read <code>data.json</code>. Run the project through a local server or GitHub Pages instead of opening the file directly.</p>
        <p class="copy-block">${escapeHtml(error.message)}</p>
      </section>
    `;

    await bootPromise;
  }
}

loadResume();
