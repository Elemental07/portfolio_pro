// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== DIAGNOSTIC CONSOLE =====
class DiagnosticConsole {
  constructor() {
    this.output = document.getElementById('console-output');
    this.input = document.getElementById('console-input');
    this.history = [];
    this.historyIndex = -1;
    this.bootSequence = [
      { text: 'System wird initialisiert...', delay: prefersReducedMotion ? 0 : 100 },
      { text: 'Kernelmodule werden geladen...', delay: prefersReducedMotion ? 0 : 300 },
      { text: 'Profil wird geladen...', delay: prefersReducedMotion ? 0 : 500 },
      { text: 'Leonard Shevchenko — Bereit für neue Herausforderungen', delay: prefersReducedMotion ? 0 : 700, highlight: true },
      { text: '', delay: prefersReducedMotion ? 0 : 900 },
      { text: 'Geben Sie "help" ein für verfügbare Befehle', delay: prefersReducedMotion ? 0 : 1000, muted: true }
    ];

    this.commands = {
      help: () => this.showHelp(),
      skills: () => this.showSkills(),
      erfahrung: () => this.showExperience(),
      kontakt: () => this.showContact(),
      clear: () => this.clearOutput(),
      info: () => this.showInfo()
    };

    this.init();
  }

  init() {
    this.runBootSequence();
    this.input.addEventListener('keydown', (e) => this.handleInput(e));
    this.input.addEventListener('focus', () => {
      document.querySelector('.console').classList.add('console-focused');
    });
    this.input.addEventListener('blur', () => {
      document.querySelector('.console').classList.remove('console-focused');
    });
  }

  async runBootSequence() {
    for (const line of this.bootSequence) {
      await this.sleep(line.delay);
      if (line.text) {
        this.addLine(line.text, line.highlight ? 'highlight' : line.muted ? 'muted' : '');
      }
    }
  }

  handleInput(e) {
    if (e.key === 'Enter') {
      const command = this.input.value.trim().toLowerCase();
      if (command) {
        this.addLine(`$ ${this.input.value}`, 'command');
        this.executeCommand(command);
        this.history.push(command);
        this.historyIndex = this.history.length;
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    }
  }

  executeCommand(command) {
    if (this.commands[command]) {
      this.commands[command]();
    } else {
      this.addLine(`Befehl nicht gefunden: ${command}`, 'error');
      this.addLine('Geben Sie "help" für verfügbare Befehle ein', 'muted');
    }
  }

  showHelp() {
    const helpText = `
Verfügbare Befehle:

  help       — Diese Hilfe anzeigen
  skills     — Kompetenzen und Sprachen anzeigen
  erfahrung  — Berufserfahrung anzeigen
  kontakt    — Kontaktinformationen anzeigen
  info       — Kurzprofil anzeigen
  clear      — Konsole leeren
    `.trim();
    this.addLine(helpText, 'multiline');
  }

  showSkills() {
    const skillsText = `
Kompetenzen:
  • Technisches Verständnis
  • Problemlösungskompetenz
  • Analytisches Denken
  • Zuverlässigkeit
  • Selbstständige Arbeitsweise
  • Lernbereitschaft

Sprachen:
  • Russisch (Muttersprache)
  • Deutsch (B2)
  • Englisch (A2)
    `.trim();
    this.addLine(skillsText, 'multiline');
  }

  showExperience() {
    const expText = `
Berufserfahrung:

[06/2022] Praktikant — ATU, Landshut
  • Montage von Reifen an Pkw und Nutzfahrzeugen
  • Arbeit mit Werkzeugen und Werkstattausrüstung
  • Einhaltung von Arbeits- und Sicherheitsvorschriften

[06/2021] Praktikant — Autoteile Gektor, Landshut
  • Montage und Demontage von Rädern
  • Unterstützung bei alltäglichen Werkstattaufgaben
    `.trim();
    this.addLine(expText, 'multiline');
  }

  showContact() {
    const contactText = `
Kontakt:

  Email:    leonard.shevchenko.07@gmail.com
  Telefon:  +49 157 33784998
  Standort: Landshut, Deutschland

Offen für Praktikum oder Ausbildung im IT- und Technikbereich.
    `.trim();
    this.addLine(contactText, 'multiline');
  }

  showInfo() {
    const infoText = `
Leonard Shevchenko
IT & Technik

Motivierter und zuverlässiger Kandidat mit Interesse an IT,
Technik und Elektronik. Praktisch orientiert, schnell lernend
und selbstständig arbeitend.

Bildung: Qualifizierender Abschluss der Mittelschule (2022)
Status:  Suche Praktikum / Ausbildung
    `.trim();
    this.addLine(infoText, 'multiline');
  }

  clearOutput() {
    this.output.innerHTML = '';
  }

  addLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `console-line ${className}`;
    line.textContent = text;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ===== PROGRESS INDICATOR =====
class ProgressIndicator {
  constructor() {
    this.track = document.querySelector('.progress-track');
    this.line = document.querySelector('.progress-line');
    this.stations = document.querySelectorAll('.progress-station');
    this.sections = document.querySelectorAll('section[id]');
    this.currentSection = null;

    if (!this.track) return;

    this.init();
  }

  init() {
    // Set up Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activateSection(entry.target.id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      this.observer.observe(section);
    });

    // Update progress on scroll
    window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
    this.updateProgress();
  }

  activateSection(sectionId) {
    this.currentSection = sectionId;
    this.stations.forEach(station => {
      if (station.dataset.section === sectionId) {
        station.classList.add('active');
      } else {
        station.classList.remove('active');
      }
    });
  }

  updateProgress() {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrolled / height, 0), 1);

    if (!prefersReducedMotion) {
      this.line.style.transform = `scaleY(${progress})`;
    }

    // Mark stations as completed based on scroll progress
    this.stations.forEach((station, index) => {
      const stationProgress = (index + 1) / this.stations.length;
      if (progress >= stationProgress - 0.1) {
        station.classList.add('completed');
      } else {
        station.classList.remove('completed');
      }
    });
  }
}

// ===== MICRO-INTERACTIONS =====
class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    // Hover effects on skill items
    const skillItems = document.querySelectorAll('.skill-col li');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          item.style.transform = 'translateX(4px)';
        }
      });
      item.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
          item.style.transform = 'translateX(0)';
        }
      });
    });

    // Hover effects on experience entries
    const entries = document.querySelectorAll('.entry');
    entries.forEach(entry => {
      entry.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
          entry.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
        }
      });
      entry.addEventListener('mouseleave', () => {
        entry.style.backgroundColor = 'transparent';
      });
    });
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  new DiagnosticConsole();
  new ProgressIndicator();
  new MicroInteractions();
});
