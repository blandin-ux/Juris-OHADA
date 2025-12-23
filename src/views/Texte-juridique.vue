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
      <div class="mb-4" v-if="!isLoading && !error">
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {{ filteredTexts.length }} textes trouvés
        </p>
      </div>

      <!-- Chargement -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-6 rounded-xl text-center mb-8">
        <span class="material-icons-outlined text-4xl mb-2 block">error_outline</span>
        {{ error }}
      </div>

      <!-- Liste des textes -->
      <div v-else class="space-y-4">
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from '../router';

const router = useRouter();
const searchQuery = ref('');
const texts = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://aicha.gams-pro.com/api/lois');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données');
    }
    const data = await response.json();
    console.log('Données reçues:', data);
    
    // Adaptation des données selon la structure reçue
    // On suppose que l'API retourne un tableau d'objets
    if (Array.isArray(data)) {
      texts.value = data.map(item => ({
        id: item.id,
        category: item.categorie || 'Texte de loi',
        title: item.name || item.nom || 'Sans titre',
        reference: item.reference || '',
        content: item.contenu || item.description || 'Aucun contenu disponible'
      }));
    } else if (data.data && Array.isArray(data.data)) {
      // Cas où les données sont dans une propriété 'data' (pagination par exemple)
      texts.value = data.data.map(item => ({
        id: item.id,
        category: item.categorie || 'Texte de loi',
        title: item.titre || item.nom || 'Sans titre',
        reference: item.reference || '',
        content: item.contenu || item.description || 'Aucun contenu disponible'
      }));
    } else {
      console.warn('Structure de données inattendue');
      texts.value = [];
    }
  } catch (err) {
    console.error('Erreur API:', err);
    error.value = "Impossible de charger les textes juridiques.";
    
    // Fallback aux données de démonstration si l'API échoue (pour le développement)
    texts.value = [
      {
        id: 1,
        category: 'Droit Commercial Général',
        title: 'Définition du commerçant',
        reference: 'Article 2 - Acte Uniforme sur le Droit Commercial Général',
        content: 'Sont commerçants ceux qui accomplissent des actes de commerce et en font leur profession habituelle.'
      },
     
    ];
  } finally {
    isLoading.value = false;
  }
});

const filteredTexts = computed(() => {
  if (!searchQuery.value) return texts.value;
  const query = searchQuery.value.toLowerCase();
  return texts.value.filter(text => 
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
  router.navigate('loiDetails', { id: text.id });
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