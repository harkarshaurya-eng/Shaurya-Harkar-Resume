const sectionDefinitions = [
  { id: "overview", label: "Overview", title: "Profile Snapshot", command: "cat profile.md" },
  { id: "experience", label: "Experience", title: "Experience Log", command: "tail experience.log" },
  { id: "skills", label: "Skills", title: "Skills Matrix", command: "ls stack/" },
  { id: "projects", label: "Projects", title: "Projects", command: "open projects/" },
  { id: "education", label: "Education", title: "Education Archive", command: "cat education.txt" },
  { id: "hobbies", label: "Hobbies", title: "Personal Hobbies", command: "cat hobbies.txt" },
  { id: "contact", label: "Contact", title: "Contact Endpoint", command: "ping collaborators" },
  { id: "terminal", label: "Terminal", title: "Interactive Terminal", command: "bash ./resume-terminal.sh" }
];

const counterNamespace = "shaurya-harkar-resume-terminal";
const counterStoragePrefix = "resume-terminal-counter:";
const counterConfig = {
  like: {
    key: "profile-like",
    label: "like"
  },
  love: {
    key: "profile-love",
    label: "love"
  },
  hired: {
    key: "want-hired",
    label: "hire"
  }
};

const byId = (id) => document.getElementById(id);

const elements = {
  bootLog: byId("boot-log"),
  terminalLabel: byId("terminal-label"),
  heroName: byId("hero-name"),
  heroTitle: byId("hero-title"),
  heroTagline: byId("hero-tagline"),
  heroBio: byId("hero-bio"),
  heroLocation: byId("hero-location"),
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
  "loading command handlers...",
  "launch complete"
];
const assetVersion = "20260331-6";

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

  if (contact.email) {
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

function renderHobbies(data) {
  const items = (data.hobbies || [])
    .map(
      (item) => `
        <article class="mini-panel hobby-panel">
          <p class="mini-title">Interest</p>
          <h3 class="hobby-title">${escapeHtml(item.name)}</h3>
          <p class="copy-block">${escapeHtml(item.detail)}</p>
          ${item.note ? `<p class="hobby-note">${escapeHtml(item.note)}</p>` : ""}
        </article>
      `
    )
    .join("");

  return `<div class="hobbies-grid">${items}</div>`;
}

function renderContact(data) {
  const contactItems = [
    data.contact.email
      ? `<li><a class="contact-link" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a></li>`
      : "",
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
    <article class="mini-panel">
      <p class="mini-title">Reach Out</p>
      <ul class="contact-list">${contactItems}</ul>
    </article>
  `;
}

function renderTerminal() {
  return `
    <div class="section-body">
      <article class="mini-panel terminal-console">
        <div class="terminal-output" id="command-output" aria-live="polite"></div>

        <form class="command-form" id="command-form">
          <label class="command-label" for="command-input">$</label>
          <input
            class="command-input"
            id="command-input"
            name="command"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="whoami"
          />
        </form>
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
    hobbies: renderHobbies(data),
    contact: renderContact(data),
    terminal: renderTerminal(data)
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

function getLocalCount(key) {
  return Number(window.localStorage.getItem(`${counterStoragePrefix}${key}`) || "0");
}

function setLocalCount(key, value) {
  window.localStorage.setItem(`${counterStoragePrefix}${key}`, String(value));
}

async function readRemoteCount(key) {
  const response = await fetch(`https://api.counterapi.dev/v1/${counterNamespace}/${key}/`, {
    cache: "no-store"
  });

  if (response.status === 404) {
    return 0;
  }

  if (!response.ok) {
    throw new Error(`Counter read failed with status ${response.status}`);
  }

  const payload = await response.json();
  return Number(payload.count || 0);
}

async function incrementRemoteCount(key) {
  const response = await fetch(`https://api.counterapi.dev/v1/${counterNamespace}/${key}/up`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Counter increment failed with status ${response.status}`);
  }

  const payload = await response.json();
  return Number(payload.count || 0);
}

async function getCounterValue(key) {
  try {
    const value = await readRemoteCount(key);
    setLocalCount(key, value);
    return { value, source: "live" };
  } catch (error) {
    return { value: getLocalCount(key), source: "local" };
  }
}

async function incrementCounterValue(key) {
  try {
    const value = await incrementRemoteCount(key);
    setLocalCount(key, value);
    return { value, source: "live" };
  } catch (error) {
    const value = getLocalCount(key) + 1;
    setLocalCount(key, value);
    return { value, source: "local" };
  }
}

function addOutputLine(output, content, tone = "default") {
  const line = document.createElement("p");
  line.className = `output-line output-line-${tone}`;
  line.innerHTML = content;
  output.append(line);
  output.scrollTop = output.scrollHeight;
}

function buildGmailComposeUrl(email) {
  const subject = "Glad to Connect With You";
  const body = [
    "Hello Shaurya,",
    "",
    "It’s a pleasure connecting with you. I’ve had the opportunity to review your profile and was genuinely impressed by your work and experience.",
    "",
    "I would be glad to connect further and explore potential opportunities where your skills could be a great fit.",
    "",
    "Looking forward to hearing from you.",
    "",
    "Best regards,",
    "[Your Name]"
  ].join("\n");

  const params = new URLSearchParams({
    authuser: email,
    view: "cm",
    fs: "1",
    to: email,
    su: subject,
    body
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function formatInlineList(items = []) {
  return items.map((item) => `<span class="output-inline">${escapeHtml(item)}</span>`).join("  ");
}

function resolveCommand(command) {
  const normalized = command.trim().toLowerCase().replace(/\s+/g, " ");

  if (!normalized) {
    return null;
  }

  if (normalized === "help") {
    return { type: "help" };
  }

  if (normalized === "clear") {
    return { type: "clear" };
  }

  if (normalized === "whoami") {
    return { type: "whoami" };
  }

  if (normalized === "pwd") {
    return { type: "pwd" };
  }

  if (normalized === "ls" || normalized === "ls -la" || normalized === "ls -l") {
    return { type: "ls-root" };
  }

  if (normalized === "ls projects" || normalized === "ls projects/") {
    return { type: "ls-projects" };
  }

  if (normalized === "cat intro.txt") {
    return { type: "cat-intro" };
  }

  if (normalized === "cat hobbies.txt") {
    return { type: "cat-hobbies" };
  }

  if (normalized === "cat contact.txt") {
    return { type: "cat-contact" };
  }

  if (normalized === "cat reactions.log") {
    return { type: "cat-reactions" };
  }

  if (
    normalized === "open mailto" ||
    normalized === "open mailto:" ||
    normalized === "open mailto:shaurya" ||
    normalized === "open contact"
  ) {
    return { type: "contact" };
  }

  const reactionMatch = normalized.match(/^echo (like|love|hire|hired) >> reactions\.log$/);
  if (reactionMatch) {
    const action = reactionMatch[1] === "hire" ? "hired" : reactionMatch[1];
    return { type: "count", action };
  }

  return null;
}

async function initializeTerminal(data) {
  const output = byId("command-output");
  const form = byId("command-form");
  const input = byId("command-input");

  async function runCommand(rawCommand) {
    const command = rawCommand.trim();

    if (!command) {
      return;
    }

    addOutputLine(output, `$ ${escapeHtml(command)}`, "command");
    const resolved = resolveCommand(command);

    if (!resolved) {
      addOutputLine(
        output,
        `Command not found. Type <span class="output-inline">help</span> to inspect supported commands.`,
        "error"
      );
      return;
    }

    if (resolved.type === "clear") {
      output.innerHTML = "";
      return;
    }

    if (resolved.type === "help") {
      addOutputLine(output, "Available commands:", "system");
      addOutputLine(output, `<span class="output-inline">whoami</span>  <span class="output-inline">pwd</span>  <span class="output-inline">ls</span>  <span class="output-inline">ls projects/</span>`, "system");
      addOutputLine(output, `<span class="output-inline">cat intro.txt</span>  <span class="output-inline">cat hobbies.txt</span>  <span class="output-inline">cat contact.txt</span>  <span class="output-inline">cat reactions.log</span>`, "system");
      addOutputLine(output, `<span class="output-inline">echo like >> reactions.log</span>  <span class="output-inline">echo love >> reactions.log</span>  <span class="output-inline">echo hire >> reactions.log</span>`, "system");
      addOutputLine(output, `<span class="output-inline">open mailto:shaurya</span>  <span class="output-inline">clear</span>`, "system");
      return;
    }

    if (resolved.type === "whoami") {
      addOutputLine(output, `<span class="output-inline">${escapeHtml(data.about.name)}</span>`, "success");
      addOutputLine(output, escapeHtml(data.about.title), "system");
      return;
    }

    if (resolved.type === "pwd") {
      addOutputLine(output, `<span class="output-inline">/home/shaurya/resume-terminal</span>`, "system");
      return;
    }

    if (resolved.type === "ls-root") {
      addOutputLine(
        output,
        formatInlineList(["intro.txt", "projects/", "hobbies.txt", "contact.txt", "reactions.log"]),
        "system"
      );
      return;
    }

    if (resolved.type === "ls-projects") {
      addOutputLine(
        output,
        formatInlineList((data.projects || []).map((project) => project.name)),
        "system"
      );
      return;
    }

    if (resolved.type === "cat-intro") {
      addOutputLine(output, `<span class="output-inline">${escapeHtml(data.about.title)}</span>`, "success");
      addOutputLine(output, escapeHtml(data.about.tagline || ""), "system");
      addOutputLine(output, escapeHtml(data.about.bio), "system");
      return;
    }

    if (resolved.type === "cat-hobbies") {
      (data.hobbies || []).forEach((hobby) => {
        addOutputLine(
          output,
          `<span class="output-inline">${escapeHtml(hobby.name)}</span>: ${escapeHtml(hobby.note || hobby.detail || "")}`,
          "system"
        );
      });
      return;
    }

    if (resolved.type === "cat-contact") {
      addOutputLine(output, `email: <span class="output-inline">${escapeHtml(data.contact.email || "")}</span>`, "system");
      addOutputLine(output, `github: <span class="output-inline">${escapeHtml(data.contact.github || "")}</span>`, "system");
      addOutputLine(output, `linkedin: <span class="output-inline">${escapeHtml(data.contact.linkedin || "")}</span>`, "system");
      return;
    }

    if (resolved.type === "cat-reactions") {
      const results = await Promise.all(
        Object.entries(counterConfig).map(async ([name, config]) => {
          const result = await getCounterValue(config.key);
          return `${name}=${result.value} [${result.source}]`;
        })
      );
      addOutputLine(output, results.map((item) => `<span class="output-inline">${escapeHtml(item)}</span>`).join("  "), "system");
      return;
    }

    if (resolved.type === "count") {
      const config = counterConfig[resolved.action];
      const result = await incrementCounterValue(config.key);
      addOutputLine(
        output,
        `reactions.log updated: <span class="output-inline">${escapeHtml(config.label)}</span> count is now <span class="output-inline">${result.value}</span> <span class="output-meta">[${result.source}]</span>`,
        "success"
      );
      return;
    }

    if (resolved.type === "contact") {
      const gmailUrl = buildGmailComposeUrl(data.contact.email || "harkarshaurya@gmail.com");
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
      addOutputLine(
        output,
        `Opening Gmail compose for <span class="output-inline">${escapeHtml(data.contact.email || "harkarshaurya@gmail.com")}</span>.`,
        "success"
      );
      addOutputLine(
        output,
        `Prefilled subject: <span class="output-inline">Glad to Connect With You</span>`,
        "system"
      );
      return;
    }
  }

  addOutputLine(
    output,
    `Last login: <span class="output-inline">${escapeHtml(data.metadata.last_updated || "2026-03-31")}</span> on <span class="output-inline">resume-terminal</span>`,
    "system"
  );
  addOutputLine(output, `Type <span class="output-inline">help</span> to inspect available commands.`, "system");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runCommand(input.value);
    form.reset();
    input.focus();
  });
}

function renderApp(data) {
  applyHero(data);
  createStats(data.stats || []);
  createActions(data.contact || {});
  createNav();
  buildSections(data);
  setupNavigation();
  initializeTerminal(data);
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
