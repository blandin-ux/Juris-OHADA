import { createApp } from 'vue'
import App from './App.vue'
import { initTheme } from './theme'

// Initialiser le thème avant de monter l'application
initTheme();

createApp(App).mount('#app')