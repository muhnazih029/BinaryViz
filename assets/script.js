const dom = {
  html: document.documentElement,
  arrayInput: document.getElementById('array-input'),
  targetInput: document.getElementById('target-input'),
  randomizeBtn: document.getElementById('randomize-btn'),
  startBtn: document.getElementById('start-btn'),
  resetBtn: document.getElementById('reset-btn'),
  backBtn: document.getElementById('back-btn'),
  playPauseBtn: document.getElementById('play-pause-btn'),
  nextBtn: document.getElementById('next-btn'),
  speedSlider: document.getElementById('speed-slider'),
  speedLabel: document.getElementById('speed-label'),
  arrayContainer: document.getElementById('array-container'),
  explanationText: document.getElementById('explanation-text'),
  historyList: document.getElementById('history-list'),
  darkModeToggle: document.getElementById('dark-mode-toggle'),
  sunIcon: document.getElementById('sun-icon'),
  moonIcon: document.getElementById('moon-icon'),
  modal: {
    overlay: document.getElementById('modal-overlay'),
    box: document.getElementById('modal-box'),
    title: document.getElementById('modal-title'),
    message: document.getElementById('modal-message'),
    buttons: document.getElementById('modal-buttons'),
  },
};

const icons = {
  back: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>`,
  next: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>`,
  play: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 5.561v12.878a.5.5 0 00.74.429l10.814-6.439a.5.5 0 000-.858L7.74 5.132a.5.5 0 00-.74.429z"></path></svg>`,
  pause: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5 5.5a1 1 0 00-1 1v11a1 1 0 002 0v-11a1 1 0 00-1-1zm7 0a1 1 0 00-1 1v11a1 1 0 002 0v-11a1 1 0 00-1-1z"></path></svg>`,
};

let state = {
  steps: [],
  currentStep: -1,
  isPlaying: false,
  animationInterval: null,
  currentArray: [],
};

function init() {
  dom.backBtn.innerHTML = icons.back;
  dom.nextBtn.innerHTML = icons.next;
  setupDarkMode();
  resetApplication();
}

function resetApplication() {
  pauseAnimation();
  state.steps = [];
  state.currentStep = -1;
  generateRandomData();
  dom.explanationText.innerHTML =
    'Penjelasan setiap langkah akan muncul di sini.';
  dom.historyList.innerHTML = `<li class="text-center text-gray-500 dark:text-gray-400 p-4">Riwayat langkah akan ditampilkan di sini.</li>`;
  updateControlsState();
}

function resetSearch() {
  pauseAnimation();
  state.steps = [];
  state.currentStep = -1;
  dom.explanationText.innerHTML =
    "Proses direset. Klik 'Mulai' untuk menjalankan lagi.";
  dom.historyList.innerHTML = `<li class="text-center text-gray-500 dark:text-gray-400 p-4">Riwayat langkah akan ditampilkan di sini.</li>`;
  renderArray(state.currentArray);
  updateControlsState();
}

function renderArray(arr, stepState = {}) {
  dom.arrayContainer.innerHTML = '';
  arr.forEach((value, index) => {
    const el = document.createElement('div');
    el.textContent = value;

    const baseClasses =
      'transition-all duration-300 flex items-center justify-center font-semibold text-lg text-white rounded-lg h-16 w-16 flex-shrink-0 shadow-md';

    let dynamicClasses = 'bg-gray-400 dark:bg-gray-500';

    if (stepState.discarded?.has(index)) {
      dynamicClasses = 'bg-gray-500 dark:bg-gray-600 opacity-50 shadow-none';
    }

    if (stepState.found === -1) {
      if (index === stepState.high) dynamicClasses = 'bg-red-500';
      if (index === stepState.low) dynamicClasses = 'bg-blue-500';
    }

    if (index === stepState.mid) {
      dynamicClasses =
        'bg-orange-500 transform -translate-y-2.5 scale-110 shadow-lg';
    }

    if (stepState.found === index) {
      dynamicClasses = 'animate-bounce bg-green-500 shadow-lg';
    }

    el.className = `${baseClasses} ${dynamicClasses}`;
    dom.arrayContainer.appendChild(el);
  });
}

function renderStep(stepIndex) {
  if (stepIndex < 0 || stepIndex >= state.steps.length) return;
  const step = state.steps[stepIndex];
  renderArray(state.currentArray, step);
  dom.explanationText.innerHTML = step.explanation;
  updateHistory(stepIndex);
  updateControlsState();
}

function updateHistory(activeIndex) {
  if (activeIndex === -1 || state.steps.length === 0) {
    dom.historyList.innerHTML = `<li class="text-center text-gray-500 dark:text-gray-400 p-4">Riwayat langkah akan ditampilkan di sini.</li>`;
    return;
  }

  if (
    dom.historyList.children.length === 1 &&
    dom.historyList.querySelector('li.text-center')
  ) {
    dom.historyList.innerHTML = '';
  }

  while (dom.historyList.children.length > activeIndex) {
    dom.historyList.removeChild(dom.historyList.lastChild);
  }

  if (dom.historyList.children.length <= activeIndex) {
    const step = state.steps[activeIndex];
    const li = document.createElement('li');

    li.className =
      'flex items-start gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out animate-fadeIn';
    li.id = `history-step-${activeIndex}`;

    li.innerHTML = `
                    <span class="font-bold text-indigo-500 dark:text-indigo-400 text-right w-8 flex-shrink-0 pt-px">[${
                      activeIndex + 1
                    }]</span>
                    <div class="flex-1 text-sm text-gray-700 dark:text-gray-300">${
                      step.explanation
                    }</div>
                `;

    dom.historyList.appendChild(li);
  }

  Array.from(dom.historyList.children).forEach((child, index) => {
    child.classList.remove(
      'bg-indigo-100',
      'dark:bg-slate-600/70',
      'shadow-sm'
    );
    if (index === activeIndex) {
      child.classList.add('bg-indigo-100', 'dark:bg-slate-600/70', 'shadow-sm');
    }
  });

  dom.historyList.scrollTop = dom.historyList.scrollHeight;
}

function updateControlsState() {
  const isFinished = state.currentStep >= state.steps.length - 1;
  const hasSteps = state.steps.length > 0;
  dom.backBtn.disabled = state.currentStep <= 0;
  dom.nextBtn.disabled = !hasSteps || isFinished;
  dom.playPauseBtn.innerHTML = state.isPlaying ? icons.pause : icons.play;
  dom.playPauseBtn.disabled = !hasSteps || isFinished;
}

function generateRandomData() {
  const size = Math.floor(Math.random() * 5) + 8;
  const tempSet = new Set();
  while (tempSet.size < size) tempSet.add(Math.floor(Math.random() * 100) + 1);
  state.currentArray = Array.from(tempSet).sort((a, b) => a - b);
  dom.arrayInput.value = state.currentArray.join(', ');
  const randomTargetIndex = Math.floor(
    Math.random() * state.currentArray.length
  );
  dom.targetInput.value = state.currentArray[randomTargetIndex];
  renderArray(state.currentArray);
}

function showModal(title, message, buttons) {
  dom.modal.title.textContent = title;
  dom.modal.message.textContent = message;
  dom.modal.buttons.innerHTML = '';
  buttons.forEach((btnInfo) => {
    const button = document.createElement('button');
    button.textContent = btnInfo.text;
    button.className = btnInfo.class;
    button.onclick = () => {
      hideModal();
      if (btnInfo.action) btnInfo.action();
    };
    dom.modal.buttons.appendChild(button);
  });
  dom.modal.overlay.classList.remove('hidden');
  setTimeout(() => {
    dom.modal.overlay.classList.remove('opacity-0');
    dom.modal.box.classList.remove('scale-95');
  }, 10);
}

function hideModal() {
  dom.modal.overlay.classList.add('opacity-0');
  dom.modal.box.classList.add('scale-95');
  setTimeout(() => dom.modal.overlay.classList.add('hidden'), 300);
}

function validateAndStart() {
  const arrStr = dom.arrayInput.value.split(',').filter((s) => s.trim() !== '');
  const arr = arrStr.map((s) => parseInt(s.trim(), 10));
  const target = parseInt(dom.targetInput.value, 10);

  if (arr.some(isNaN) || arrStr.length === 0) {
    showModal(
      'Input Tidak Valid',
      'Pastikan semua data pada array adalah angka dan tidak kosong.',
      [
        {
          text: 'Mengerti',
          class: 'bg-indigo-600 text-white px-4 py-2 rounded-md',
        },
      ]
    );
    return;
  }
  if (isNaN(target)) {
    showModal(
      'Input Tidak Valid',
      'Kolom "Angka yang Dicari" harus diisi dengan angka.',
      [
        {
          text: 'Mengerti',
          class: 'bg-indigo-600 text-white px-4 py-2 rounded-md',
          action: () => dom.targetInput.focus(),
        },
      ]
    );
    return;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      showModal(
        'Data Tidak Urut',
        'Binary Search memerlukan data yang sudah terurut dari kecil ke besar.',
        [
          {
            text: 'Mengerti',
            class: 'bg-indigo-600 text-white px-4 py-2 rounded-md',
          },
        ]
      );
      return;
    }
  }

  if (!arr.includes(target)) {
    showModal(
      'Angka Tidak Ditemukan',
      `Angka ${target} tidak ada di dalam data. Tetap lanjutkan untuk melihat proses pencariannya?`,
      [
        {
          text: 'Ubah Angka',
          class: 'bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-md',
          action: () => dom.targetInput.focus(),
        },
        {
          text: 'Ya, Lanjutkan',
          class: 'bg-indigo-600 text-white px-4 py-2 rounded-md',
          action: () => executeSearch(arr, target),
        },
      ]
    );
    return;
  }

  executeSearch(arr, target);
}

function executeSearch(arr, target) {
  resetSearch();
  state.currentArray = [...arr];
  let low = 0,
    high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);

    let explanation = `<div>Fokus rentang indeks <strong>[${low}..${high}]</strong> (angka <strong>${arr[low]}</strong>..<strong>${arr[high]}</strong>).</div><div class="mt-1">Nilai tengah (mid) di indeks <strong>${mid}</strong> adalah <strong>${arr[mid]}</strong>.</div>`;

    let stepData = { low, high, mid, discarded: new Set(), found: -1 };
    if (state.steps.length > 0)
      stepData.discarded = new Set(
        state.steps[state.steps.length - 1].discarded
      );

    if (arr[mid] === target) {
      explanation += `<div class="mt-1 text-green-600 dark:text-green-400"><strong>Hasil: Ditemukan!</strong> Angka ${target} sama dengan nilai tengah.</div>`;
      stepData.found = mid;
      stepData.explanation = explanation;
      state.steps.push(stepData);
      break;
    }

    if (arr[mid] < target) {
      explanation += `<div class="mt-1"><strong>Keputusan:</strong> ${arr[mid]} < ${target}, maka area pencarian dipersempit ke kanan.</div>`;
      for (let i = low; i <= mid; i++) stepData.discarded.add(i);
      low = mid + 1;
    } else {
      explanation += `<div class="mt-1"><strong>Keputusan:</strong> ${arr[mid]} > ${target}, maka area pencarian dipersempit ke kiri.</div>`;
      for (let i = mid; i <= high; i++) stepData.discarded.add(i);
      high = mid - 1;
    }
    stepData.explanation = explanation;
    state.steps.push(stepData);
  }

  if (
    state.steps.length === 0 ||
    state.steps[state.steps.length - 1].found === -1
  ) {
    const lastDiscarded =
      state.steps.length > 0
        ? state.steps[state.steps.length - 1].discarded
        : new Set();
    state.steps.push({
      low: -1,
      high: -1,
      mid: -1,
      discarded: lastDiscarded,
      explanation: `<strong class="text-red-600 dark:text-red-400">Hasil Akhir:</strong> Pencarian selesai, angka ${target} tidak ditemukan.`,
      found: -1,
    });
  }

  if (state.steps.length > 0) {
    state.currentStep = 0;
    renderStep(state.currentStep);
    playAnimation();
  }
}

function pauseAnimation() {
  state.isPlaying = false;
  clearInterval(state.animationInterval);
  updateControlsState();
}

function playAnimation() {
  if (state.currentStep >= state.steps.length - 1) return;
  state.isPlaying = true;
  const speed = 2250 - dom.speedSlider.value;
  state.animationInterval = setInterval(() => {
    if (state.currentStep < state.steps.length - 1) {
      state.currentStep++;
      renderStep(state.currentStep);
    } else {
      pauseAnimation();
    }
  }, speed);
  updateControlsState();
}

function handlePlayPause() {
  if (state.isPlaying) {
    pauseAnimation();
  } else {
    playAnimation();
  }
}

function handleNext() {
  pauseAnimation();
  if (state.currentStep < state.steps.length - 1) {
    state.currentStep++;
    renderStep(state.currentStep);
  }
}

function handleBack() {
  pauseAnimation();
  if (state.currentStep > 0) {
    state.currentStep--;
    renderStep(state.currentStep);
  }
}

function updateSpeedLabel() {
  dom.speedLabel.textContent = 2250 - dom.speedSlider.value + ' ms';
}

function handleSpeedChange() {
  updateSpeedLabel();
  if (state.isPlaying) {
    pauseAnimation();
    playAnimation();
  }
}

function setupDarkMode() {
  const toggleButton = dom.darkModeToggle;
  const htmlEl = dom.html;
  const sunIcon = dom.sunIcon;
  const moonIcon = dom.moonIcon;

  function updateButtonIcons() {
    if (htmlEl.classList.contains('dark')) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  updateButtonIcons();

  toggleButton.addEventListener('click', () => {
    const isCurrentlyDark = htmlEl.classList.contains('dark');
    if (isCurrentlyDark) {
      htmlEl.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      htmlEl.classList.add('dark');
      localStorage.theme = 'dark';
    }
    updateButtonIcons();
  });
}

document.addEventListener('DOMContentLoaded', init);
dom.startBtn.addEventListener('click', validateAndStart);
dom.randomizeBtn.addEventListener('click', resetApplication);
dom.resetBtn.addEventListener('click', () => {
  dom.targetInput.value = '';
  resetSearch();
});
dom.nextBtn.addEventListener('click', handleNext);
dom.backBtn.addEventListener('click', handleBack);
dom.playPauseBtn.addEventListener('click', handlePlayPause);
dom.speedSlider.addEventListener('input', handleSpeedChange);
