<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-sans antialiased text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <!-- En-tête -->
    <header class="bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex flex-col">
            <h1 class="font-display text-xl sm:text-2xl font-bold text-primary tracking-wide">
              Textes Juridiques OHADA
            </h1>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light">
              Recherche dans les Actes Uniformes
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="w-full max-w-7xl mx-auto py-8">
      <!-- Barre de recherche -->
      <div class="bg-white dark:bg-surface-dark p-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-3 mb-8 w-full">
        <div class="relative flex-grow">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <!-- <span class="material-icons-outlined text-gray-400 text-xl">search</span> -->
          </div>
          <input 
            v-model="searchQuery"
            class="block w-full pl-10 pr-3 py-3 border-none rounded-lg bg-gray-50 dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:ring-1 focus:ring-primary sm:text-sm transition-colors" 
            placeholder="Rechercher par mot-clé, article, ou contenu..."
            type="search"
            @input="handleSearch"
          />
        </div>
        <button 
          class="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-highlight-dark transition-colors text-sm font-medium"
          @click="toggleFilters"
        >
          <span class="material-icons-outlined text-lg"></span>
          Filtres
        </button>
      </div>

      <!-- Résultats -->
      <div class="mb-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {{ filteredTexts.length }} textes trouvés
        </p>
      </div>

      <!-- Liste des textes -->
      <div class="space-y-4">
        <article 
          v-for="(text, index) in filteredTexts" 
          :key="index"
          class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:border-primary/50 dark:hover:border-primary/50 transition-colors cursor-pointer group"
          @click="selectText(text)"
        >
          <div class="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/5 dark:bg-primary/10 mb-4">
            <span class="text-xs font-bold text-primary tracking-wide uppercase">
              {{ text.category }}
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors">
            {{ text.title }}
          </h2>
          <p class="text-sm font-semibold text-primary mb-3">
            {{ text.reference }}
          </p>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            {{ text.content }}
          </p>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

const texts = [
  {
    id: 1,
    category: 'Droit Commercial Général',
    title: 'Définition du commerçant',
    reference: 'Article 2 - Acte Uniforme sur le Droit Commercial Général',
    content: 'Sont commerçants ceux qui accomplissent des actes de commerce et en font leur profession habituelle.'
  },
  {
    id: 2,
    category: 'Droit Commercial Général',
    title: 'Actes de commerce par nature',
    reference: 'Article 3 - Acte Uniforme sur le Droit Commercial Général',
    content: 'L\'acte de commerce par nature est celui par lequel une personne s\'entremet dans la circulation des biens qu\'elle produit ou achète ou par lequel elle fournit des prestations de service avec l\'intention d\'en tirer un profit pécuniaire.'
  },
  {
    id: 3,
    category: 'Droit Commercial Général',
    title: 'Prescription quinquennale',
    reference: 'Article 16 - Acte Uniforme sur le Droit Commercial Général',
    content: 'Les obligations nées à l\'occasion de leur commerce entre commerçants, ou entre commerçants et non-commerçants, se prescrivent par cinq ans si elles ne sont pas soumises à des prescriptions plus courtes.'
  }
];

const filteredTexts = computed(() => {
  if (!searchQuery.value) return texts;
  const query = searchQuery.value.toLowerCase();
  return texts.filter(text => 
    text.title.toLowerCase().includes(query) ||
    text.content.toLowerCase().includes(query) ||
    text.reference.toLowerCase().includes(query) ||
    text.category.toLowerCase().includes(query)
  );
});

const handleSearch = () => {
  // Logique de recherche déjà gérée par le computed filteredTexts
};

const toggleFilters = () => {
  // Implémentez la logique d'affichage des filtres
  console.log('Afficher/Masquer les filtres');
};

const selectText = (text) => {
  // Navigation vers la vue détaillée du texte
  console.log('Sélection du texte:', text);
};
</script>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
</style>

<!-- Configuration Tailwind -->
<script>
// La configuration Tailwind devrait être dans tailwind.config.js
// Cette configuration est conservée ici pour référence
// Configuration Tailwind (à déplacer dans tailwind.config.js)
// Pour référence : cette configuration définit les couleurs et polices personnalisées

// Forcer le mode sombre au chargement
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('dark');
}
</script>