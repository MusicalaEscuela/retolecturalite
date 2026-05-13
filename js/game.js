// =========================================================
// Reto Musicala Lite · js/game.js
// Lógica completa del mini juego de teoría musical.
// =========================================================

import { escapeHtml, getWhatsappUrl } from './app.js';
import { CONFIG as DEFAULT_CONFIG } from './config.js';
import { QUESTIONS } from './questions.js';
import { getResultByScore } from './results.js';

const state = {
  config: null,
  questions: QUESTIONS,
  currentIndex: 0,
  score: 0,
  hasAnswered: false,
  tutorialStep: 1,
  totalTutorialSteps: 4
};

export function initGame(CONFIG) {
  state.config = CONFIG || DEFAULT_CONFIG;

  setupStartButtons();
  setupTutorialButtons();
  setupNextButton();
  setupResetButtons();

  updateTotals();
  showScreen('intro');
}

function setupStartButtons() {
  document.querySelectorAll('[data-start-game]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      startGame();
    });
  });
}

function setupTutorialButtons() {
  document.querySelectorAll('[data-go-tutorial]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      showScreen('tutorial');
      showTutorialStep(1);
      scrollToGame();
    });
  });

  const nextButton = document.querySelector('[data-tutorial-next]');
  const prevButton = document.querySelector('[data-tutorial-prev]');

  nextButton?.addEventListener('click', () => {
    if (state.tutorialStep < state.totalTutorialSteps) {
      showTutorialStep(state.tutorialStep + 1);
      return;
    }

    startGame();
  });

  prevButton?.addEventListener('click', () => {
    if (state.tutorialStep > 1) {
      showTutorialStep(state.tutorialStep - 1);
    }
  });
}

function setupNextButton() {
  document.querySelector('[data-next-question]')?.addEventListener('click', () => {
    if (!state.hasAnswered) return;

    if (isLastQuestion()) {
      finishGame();
      return;
    }

    state.currentIndex += 1;
    renderQuestion();
  });
}

function setupResetButtons() {
  document.querySelectorAll('[data-reset-game]').forEach((button) => {
    button.addEventListener('click', resetGame);
  });
}

function showTutorialStep(step) {
  const normalizedStep = Math.min(Math.max(step, 1), state.totalTutorialSteps);

  resetTutorialLines();
  renderTutorialDots();

  document.querySelectorAll('[data-tutorial-step]').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.tutorialStep === String(normalizedStep));
  });

  document.querySelectorAll('.tutorial-dot').forEach((dot) => {
    dot.classList.toggle('is-active', Number(dot.dataset.step) === normalizedStep);
  });

  const prevButton = document.querySelector('[data-tutorial-prev]');
  const nextButton = document.querySelector('[data-tutorial-next]');
  const isFinalStep = normalizedStep === state.totalTutorialSteps;

  if (prevButton) {
    prevButton.hidden = normalizedStep === 1 || isFinalStep;
  }

  if (nextButton) {
    nextButton.style.display = isFinalStep ? 'none' : '';
  }

  state.tutorialStep = normalizedStep;

  if (normalizedStep === 1) {
    animateTutorialLines();
  }
}

function renderTutorialDots() {
  const container = document.querySelector('[data-tutorial-dots]');

  if (!container || container.children.length > 0) return;

  container.innerHTML = Array.from({ length: state.totalTutorialSteps }, (_, index) => {
    const step = index + 1;
    return `<span class="tutorial-dot" data-step="${step}" aria-hidden="true"></span>`;
  }).join('');
}

function animateTutorialLines() {
  const delays = [0, 200, 400, 600, 800];

  [1, 2, 3, 4, 5].forEach((n, index) => {
    window.setTimeout(() => {
      const line = document.querySelector(`[data-line="${n}"]`);
      const label = document.querySelector(`[data-label="${n}"]`);

      if (line) {
        line.style.transition = 'opacity 300ms ease';
        line.style.opacity = '1';
      }

      if (label) {
        label.style.transition = 'opacity 300ms ease 150ms';
        label.style.opacity = '1';
      }
    }, delays[index]);
  });
}

function resetTutorialLines() {
  document.querySelectorAll('[data-line], [data-label]').forEach((element) => {
    element.style.transition = '';
    element.style.opacity = '0';
  });
}

function startGame() {
  state.questions = shuffleQuestions(QUESTIONS);
  state.currentIndex = 0;
  state.score = 0;
  state.hasAnswered = false;

  showScreen('question');
  renderQuestion();
  scrollToGame();
}

function resetGame() {
  state.currentIndex = 0;
  state.score = 0;
  state.hasAnswered = false;

  updateScore();
  updateTotals();
  resetFeedback();
  resetProgress();
  clearOptions();
  clearStaffSvg();
  showScreen('intro');
  scrollToGame();
}

function shuffleQuestions(questions) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function renderQuestion() {
  const question = getCurrentQuestion();

  if (!question) {
    finishGame();
    return;
  }

  state.hasAnswered = false;

  updateCounter();
  updateScore();
  updateProgress();
  renderStaffNote(question);
  updateNoteColor('normal');
  renderOptions(question);
  resetFeedback();
  updateNextButton();
}

function getCurrentQuestion() {
  return state.questions[state.currentIndex] || null;
}

function renderStaffNote(question) {
  const svg = document.querySelector('[data-staff-svg]');
  const questionTitle = document.querySelector('[data-question-title]');
  const questionPosition = document.querySelector('[data-question-position]');

  if (questionTitle) {
    questionTitle.textContent = question.question || '¿Qué nota aparece en el pentagrama?';
  }

  if (questionPosition) {
    questionPosition.textContent = question.position || '';
    questionPosition.hidden = !question.position;
  }

  if (!svg) return;

  const noteY = 135 - (question.staffPos * 10);
  const noteX = 300;
  const stemUp = question.staffPos < 4;
  const stemX = stemUp ? noteX + 11 : noteX - 11;
  const stemY2 = stemUp ? noteY - 58 : noteY + 58;
  const fill = '#3b0764';
  const musicFont = `'Segoe UI Symbol','Apple Symbols','Noto Music',FreeSerif,serif`;

  svg.innerHTML = `
    <line x1="82" y1="135" x2="510" y2="135" stroke="#2a1f3d" stroke-width="2"/>
    <line x1="82" y1="115" x2="510" y2="115" stroke="#2a1f3d" stroke-width="2"/>
    <line x1="82" y1="95" x2="510" y2="95" stroke="#2a1f3d" stroke-width="2"/>
    <line x1="82" y1="75" x2="510" y2="75" stroke="#2a1f3d" stroke-width="2"/>
    <line x1="82" y1="55" x2="510" y2="55" stroke="#2a1f3d" stroke-width="2"/>

    <text x="86" y="130" font-size="106"
          font-family="${musicFont}"
          fill="#3b0764">&#x1D11E;</text>

    <ellipse cx="${noteX}" cy="${noteY}"
             rx="13" ry="9"
             transform="rotate(-15 ${noteX} ${noteY})"
             fill="${fill}"
             id="game-note-head"/>
    <line x1="${stemX}" y1="${noteY}"
          x2="${stemX}" y2="${stemY2}"
          stroke="${fill}" stroke-width="2.5"
          id="game-note-stem"/>
  `;

  const head = svg.querySelector('#game-note-head');
  const stem = svg.querySelector('#game-note-stem');

  [head, stem].forEach((element) => {
    if (!element) return;

    element.style.opacity = '0';
    element.style.transition = 'opacity 200ms ease';
    window.requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  });
}

function updateNoteColor(status) {
  const colors = {
    correct: '#16a34a',
    wrong: '#dc2626',
    normal: '#3b0764'
  };
  const fill = colors[status] || colors.normal;
  const head = document.querySelector('#game-note-head');
  const stem = document.querySelector('#game-note-stem');

  if (head) {
    head.setAttribute('fill', fill);
  }

  if (stem) {
    stem.setAttribute('stroke', fill);
  }
}

function renderOptions(question) {
  const optionsContainer = document.querySelector('[data-options]');

  if (!optionsContainer) return;

  const options = Array.isArray(question.options)
    ? question.options
    : ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

  optionsContainer.innerHTML = options.map((option) => {
    return `
      <button class="option-button" type="button" data-option="${escapeHtml(option)}">
        ${escapeHtml(option)}
      </button>
    `;
  }).join('');

  optionsContainer.querySelectorAll('[data-option]').forEach((button) => {
    button.addEventListener('click', () => {
      handleAnswer(button.dataset.option);
    });
  });
}

function handleAnswer(selected) {
  if (state.hasAnswered) return;

  const question = getCurrentQuestion();

  if (!question) return;

  const isCorrect = selected === question.correct;

  if (isCorrect) {
    state.score += 1;
  }

  state.hasAnswered = true;

  updateNoteColor(isCorrect ? 'correct' : 'wrong');
  updateScore();
  markOptions(selected, question.correct);
  showFeedback(isCorrect, question);
  enableNext();
}

function markOptions(selected, correct) {
  document.querySelectorAll('[data-option]').forEach((button) => {
    const option = button.dataset.option;

    button.disabled = true;

    if (option === correct) {
      button.classList.add('is-correct');
    }

    if (option === selected && option !== correct) {
      button.classList.add('is-wrong');
    }
  });
}

function showFeedback(isCorrect, question) {
  const feedbackBox = document.querySelector('[data-feedback]');

  if (!feedbackBox) return;

  feedbackBox.classList.remove('is-success', 'is-error');
  feedbackBox.classList.add(isCorrect ? 'is-success' : 'is-error');

  feedbackBox.textContent = isCorrect
    ? `¡Exacto! 🎵 ${question.explanation || ''}`
    : `Era ${question.correct}. ${question.explanation || ''}`;
}

function finishGame() {
  const result = getResultByScore(state.score);
  const whatsappLink = document.querySelector('[data-link-whatsapp]');
  const musibotLink = document.querySelector('[data-link-musibot]');
  const websiteLink = document.querySelector('[data-link-website]');

  setText('[data-result-emoji]', result.emoji || '✨');
  setText('[data-result-badge]', result.badge || 'Resultado final');
  setText('[data-result-title]', result.title || 'Explorador Musical');
  setText('[data-final-score]', state.score);
  setText('[data-final-total]', state.questions.length);
  setText('[data-result-description]', result.description || '');

  if (whatsappLink) {
    whatsappLink.href = getWhatsappUrl(result.whatsappMessage);
  }

  if (musibotLink) {
    musibotLink.href = state.config.musibotUrl;
  }

  if (websiteLink) {
    websiteLink.href = state.config.websiteUrl;
  }

  showScreen('result');
}

function showScreen(name) {
  document.querySelectorAll('[data-screen]').forEach((screen) => {
    screen.classList.toggle('is-active', screen.dataset.screen === name);
  });
}

function updateCounter() {
  setText('[data-current-question]', state.currentIndex + 1);
  updateTotals();
}

function updateTotals() {
  setText('[data-total-questions]', state.questions.length);
  setText('[data-total-score]', state.questions.length);
}

function updateScore() {
  setText('[data-score]', state.score);
}

function updateProgress() {
  const progressBar = document.querySelector('[data-progress-bar]');
  const progressContainer = progressBar?.parentElement;
  const total = state.questions.length || 1;
  const current = state.currentIndex + 1;

  if (progressBar) {
    progressBar.style.width = `${(current / total) * 100}%`;
  }

  if (progressContainer) {
    progressContainer.setAttribute('aria-valuenow', String(current));
    progressContainer.setAttribute('aria-valuemax', String(total));
  }
}

function resetProgress() {
  const progressBar = document.querySelector('[data-progress-bar]');
  const progressContainer = progressBar?.parentElement;

  if (progressBar) {
    progressBar.style.width = '0%';
  }

  if (progressContainer) {
    progressContainer.setAttribute('aria-valuenow', '0');
    progressContainer.setAttribute('aria-valuemax', String(state.questions.length));
  }
}

function updateNextButton() {
  const nextButton = document.querySelector('[data-next-question]');

  if (!nextButton) return;

  nextButton.disabled = true;
  nextButton.textContent = isLastQuestion() ? 'Ver resultado' : 'Siguiente';
}

function enableNext() {
  const nextButton = document.querySelector('[data-next-question]');

  if (nextButton) {
    nextButton.disabled = false;
  }
}

function resetFeedback() {
  const feedbackBox = document.querySelector('[data-feedback]');

  if (!feedbackBox) return;

  feedbackBox.classList.remove('is-success', 'is-error');
  feedbackBox.textContent = 'Elige una respuesta para continuar.';
}

function clearOptions() {
  const optionsContainer = document.querySelector('[data-options]');

  if (optionsContainer) {
    optionsContainer.innerHTML = '';
  }
}

function clearStaffSvg() {
  const svg = document.querySelector('[data-staff-svg]');

  if (svg) {
    svg.innerHTML = '';
  }
}

function isLastQuestion() {
  return state.currentIndex >= state.questions.length - 1;
}

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = String(value);
  }
}

function scrollToGame() {
  document.querySelector('#reto')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
