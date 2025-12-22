<template>
  <div class="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 font-sans min-h-screen flex flex-col transition-colors duration-300">
    
    <AppNavigation :router="router"/>

    <!-- Contenu principal avec routage -->
    <main class="flex-grow flex flex-col items-center justify-start px-4 py-8 w-full max-w-4xl mx-auto pb-24 pt-24">
      <!-- Page d'accueil -->
      <div v-if="router.currentRoute.value === 'home'">
        <div class="text-center mb-6 mt-2">
          <div class="inline-flex items-start justify-center p-4 bg-primary rounded-2xl shadow-glow mb-4 transform hover:scale-105 transition-transform duration-300">
            <span class="material-icons-round text-surface-dark text-5xl">balance</span>
          </div>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Juris-OHADA</h2>
          <p class="text-gray-600 dark:text-gray-400 text-base md:text-sm max-w-2xl mx-auto leading-relaxed">
            Votre assistant juridique expert en droit des affaires OHADA et droit ivoirien.<br class="hidden md:block"/>
            Posez vos questions et recevez des analyses structurées et sourcées.
          </p>
        </div>
        <div class="w-full max-w-3xl space-y-4 mb-8">
          <h3 class="text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-500 font-semibold mb-6">Questions fréquentes</h3>
          <button class="w-full group bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-5 rounded-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 text-left flex items-start gap-4 shadow-sm hover:shadow-md">
            <div class="flex-shrink-0 mt-1 h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span class="material-icons-round text-primary text-xl">domain</span>
            </div>
            <div>
              <h4 class="font-serif font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 group-hover:text-primary transition-colors">Création de société</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Quelles sont les étapes pour créer une SARL en Côte d'Ivoire selon le droit OHADA ?</p>
            </div>
          </button>
          <button class="w-full group bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-5 rounded-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 text-left flex items-start gap-4 shadow-sm hover:shadow-md">
            <div class="flex-shrink-0 mt-1 h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span class="material-icons-round text-primary text-xl">description</span>
            </div>
            <div>
              <h4 class="font-serif font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 group-hover:text-primary transition-colors">Recouvrement de créances</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Quelles sont les procédures simplifiées de recouvrement de créances en droit OHADA ?</p>
            </div>
          </button>
          <button class="w-full group bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-5 rounded-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 text-left flex items-start gap-4 shadow-sm hover:shadow-md">
            <div class="flex-shrink-0 mt-1 h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span class="material-icons-round text-primary text-xl">gavel</span>
            </div>
            <div>
              <h4 class="font-serif font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 group-hover:text-primary transition-colors">Sûretés</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Quels sont les types de sûretés mobilières prévus par l'Acte Uniforme sur les Sûretés ?</p>
            </div>
          </button>
        </div>
        <button class="w-full max-w-3xl flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 font-semibold text-sm mb-12 group">
          <span class="material-icons-round text-lg group-hover:scale-110 transition-transform">search</span>
          Rechercher dans les textes juridiques OHADA
        </button>
        <div class="w-full max-w-3xl bg-gray-50 dark:bg-surface-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-20">
          <div class="flex gap-3">
            <span class="material-icons-round text-primary text-sm mt-0.5">warning</span>
            <p class="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
              <strong class="text-gray-700 dark:text-gray-200">Clause de responsabilité :</strong> 
              Cet assistant fournit des informations juridiques à titre informatif et éducatif uniquement. Les réponses ne constituent pas un conseil juridique et ne créent pas de relation avocat-client. Une consultation auprès d'un professionnel du droit qualifié est recommandée avant de prendre toute décision juridique.
            </p>
          </div>
        </div>
      </div>

      <!-- Page Textes Juridiques -->
      <div v-if="router.currentRoute.value === 'textes'" class="w-full">
        <TexteJuridique />
      </div>

      <!-- Page Comparateur -->
      <div v-if="router.currentRoute.value === 'comparateur'" class="w-full">
        <AppComparateur />
      </div>

    </main>

    <!-- Footer - uniquement sur la page principale -->
    <footer v-if="router.currentRoute.value === 'home'" class="sticky bottom-0 w-full px-4 z-50 bg-background-light dark:bg-background-dark pb-4">
      <div class="max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-surface-border rounded-t-2xl shadow-2xl p-3 md:p-4 backdrop-blur-lg">
        <div class="relative flex items-end gap-2">
          <textarea 
            ref="textareaRef"
            @input="adjustHeight"
            class="w-full bg-gray-100 dark:bg-[#1C212C] border-0 rounded-xl px-4 py-3 text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:ring-1 focus:ring-primary/50 resize-none overflow-hidden" 
            placeholder="Posez votre question juridique..." 
            rows="1" 
            style="min-height: 48px;"
          ></textarea>
          <button class="flex-shrink-0 h-12 w-12 bg-primary hover:bg-primary-hover text-surface-dark rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-primary/20">
            <span class="material-icons-round transform -rotate-45 relative left-0.5 top-0.5">send</span>
          </button>
        </div>
        <div class="text-center mt-3">
          <p class="text-[10px] text-gray-400 dark:text-gray-600">
            Juris-OHADA fournit des informations juridiques à titre indicatif uniquement. Consultez un professionnel.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from './router.js';
import AppNavigation from './components/AppNavigation.vue';
import TexteJuridique from './views/Texte-juridique.vue'
import AppComparateur from './views/AppComparateur.vue';
import { useDark } from '@vueuse/core';

const router = useRouter();
const textareaRef = ref(null);
const isDark = useDark();

// S'assurer que la classe est appliquée sur l'élément HTML
onMounted(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// Surveiller les changements de thème
watch(isDark, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const adjustHeight = () => {
  const textarea = textareaRef.value;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    if (textarea.value === '') {
      textarea.style.height = '48px';
    }
  }
};
</script>