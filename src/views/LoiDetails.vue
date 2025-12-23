<template>
  <div class="w-full">
    <!-- En-tête avec bouton retour -->
    <div class="mb-6 flex items-center gap-4">
      <button 
        @click="router.goBack()"
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
      >
        <span class="material-icons-round text-lg">arrow_back</span>
        Retour
      </button>
      <div class="flex-grow"></div>
    </div>

    <!-- Contenu principal -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-6 rounded-xl text-center">
      <span class="material-icons-outlined text-4xl mb-2 block">error_outline</span>
      {{ error }}
    </div>

    <div v-else-if="law" class="space-y-8">
      <!-- En-tête de la loi -->
      <header class="bg-white dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10">
          <span class="material-icons-round text-8xl text-primary">balance</span>
        </div>
        <div class="relative z-10">
          <div class="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/5 dark:bg-primary/10 mb-4">
            <span class="text-xs font-bold text-primary tracking-wide uppercase">
              {{ law.categorie || 'Texte de loi' }}
            </span>
          </div>
          <h1 class="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {{ law.name || law.nom || 'Titre non disponible' }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {{ law.description || law.contenu || '' }}
          </p>
        </div>
      </header>

      <!-- Liste des articles -->
      <div class="space-y-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span class="material-icons-round text-primary">article</span>
          Articles et dispositions
        </h2>

        <div v-if="law.articles && law.articles.length > 0" class="grid gap-6">
          <div 
            v-for="(article, index) in law.articles" 
            :key="article.id || index"
            class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-lg font-serif font-bold text-gray-900 dark:text-gray-100 mb-3 border-l-4 border-primary pl-3">
              {{ article.name || article.reference || `Article ${index + 1}` }}
            </h3>
            <div class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p class="whitespace-pre-line leading-relaxed">{{ article.description || article.texte }}</p>
            </div>
          </div>
        </div>

        <div v-else class="bg-gray-50 dark:bg-surface-dark/50 border border-gray-200 dark:border-gray-800 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400">
          <p>Aucun article disponible pour ce texte.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from '../router';

const router = useRouter();
const law = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  const lawId = router.currentParams.value.id;
  
  if (!lawId) {
    error.value = "Identifiant de la loi manquant.";
    isLoading.value = false;
    return;
  }

  try {
    // Note: Adaptation de l'URL selon la structure de l'API supposée
    const response = await fetch(`https://aicha.gams-pro.com/api/lois/${lawId}`);
    
    if (!response.ok) {
      throw new Error('Impossible de récupérer les détails de la loi.');
    }

    const data = await response.json();
    console.log('Détails loi reçus:', data);
    
    // Adaptation des données selon la réponse
    law.value = data.data || data;
    console.log('Loi adaptée:', law.value.articles);

  } catch (err) {
    console.error('Erreur:', err);
    error.value = "Erreur lors du chargement de la loi.";
    
    // Fallback pour la démo si l'API échoue (pour ne pas bloquer l'interface)
    // À retirer en production si non souhaité
    if (!law.value) {
       // Simulation de données pour tester l'interface
       law.value = {
         id: lawId,
         titre: 'Exemple de Loi (Mode Démo)',
         categorie: 'Droit OHADA',
         description: 'Ceci est une donnée de démonstration car l\'API n\'a pas répondu correctement.',
         articles: [
           { id: 1, titre: 'Article 1', contenu: 'Contenu de l\'article 1...' },
           { id: 2, titre: 'Article 2', contenu: 'Contenu de l\'article 2...' }
         ]
       };
    }
  } finally {
    isLoading.value = false;
  }
});
</script>
