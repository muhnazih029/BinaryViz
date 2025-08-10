// Tailwind CSS configuration for BinaryViz project
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
};

// Function to toggle dark mode based on localStorage or system preference
(function () {
  const isDarkMode =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', isDarkMode);
})();

// Icon definitions for the application
const icons = {
  back: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>`,
  next: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>`,
  play: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 5.561v12.878a.5.5 0 00.74.429l10.814-6.439a.5.5 0 000-.858L7.74 5.132a.5.5 0 00-.74.429z"></path></svg>`,
  pause: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5 5.5a1 1 0 00-1 1v11a1 1 0 002 0v-11a1 1 0 00-1-1zm7 0a1 1 0 00-1 1v11a1 1 0 002 0v-11a1 1 0 00-1-1z"></path></svg>`,
};
