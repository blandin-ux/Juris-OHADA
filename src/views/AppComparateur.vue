<template>
  <div class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans min-h-screen transition-colors duration-200">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-10">
      <!-- En-tête -->
      <div class="text-center mb-12">
        <h1 class="flex items-center justify-center gap-3 text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
          <span class="material-icons-outlined text-3xl md:text-4xl"></span>
          Comparateur de textes
        </h1>
        <p class="text-text-muted-light dark:text-text-muted-dark text-base md:text-lg">
          Sélectionnez deux textes juridiques pour les comparer côte à côte
        </p>
      </div>

      <!-- Zone de comparaison -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Colonne Texte 1 -->
        <div class="flex flex-col">
          <h2 class="text-primary font-bold text-lg mb-4">Texte 1</h2>
          <div class="space-y-3 mb-6">
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="material-icons-outlined text-gray-400 group-focus-within:text-primary">search</span>
              </div>
              <input 
                v-model="searchText1"
                class="block w-full pl-10 pr-3 py-3 rounded-lg border-none bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100 ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary placeholder-gray-500 transition-shadow text-sm" 
                placeholder="Rechercher un texte..." 
                type="text"
              />
            </div>
            <div class="relative">
              <select 
                v-model="selectedDomain1"
                class="block w-full pl-4 pr-10 py-3 rounded-lg border-none bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100 ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer"
              >
                <option value="">Tous les domaines</option>
                <option value="commercial">Droit Commercial</option>
                <option value="civil">Droit Civil</option>
                <option value="penal">Droit Pénal</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <span class="material-icons-outlined">expand_more</span>
              </div>
            </div>
          </div>
          
          <!-- Liste des textes pour Texte 1 -->
          <div class="space-y-4">
            <div 
              v-for="text in filteredTexts1" 
              :key="text.id"
              @click="selectText1(text)"
              :class="['group p-5 rounded-xl bg-surface-light dark:bg-surface-dark border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md', 
                       selectedText1?.id === text.id ? 'border-primary' : 'border-border-light dark:border-border-dark hover:border-primary/50']"
            >
              <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 mb-3">
                {{ text.category }}
              </span>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                {{ text.title }}
              </h3>
              <p class="text-sm text-text-muted-light dark:text-text-muted-dark font-light">
                {{ text.reference }}
              </p>
            </div>
          </div>
        </div>

        <!-- Colonne Texte 2 -->
        <div class="flex flex-col">
          <h2 class="text-primary font-bold text-lg mb-4">Texte 2</h2>
          <div class="space-y-3 mb-6">
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="material-icons-outlined text-gray-400 group-focus-within:text-primary">search</span>
              </div>
              <input 
                v-model="searchText2"
                class="block w-full pl-10 pr-3 py-3 rounded-lg border-none bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100 ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary placeholder-gray-500 transition-shadow text-sm" 
                placeholder="Rechercher un texte..." 
                type="text"
              />
            </div>
            <div class="relative">
              <select 
                v-model="selectedDomain2"
                class="block w-full pl-4 pr-10 py-3 rounded-lg border-none bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100 ring-1 ring-border-light dark:ring-border-dark focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer"
              >
                <option value="">Tous les domaines</option>
                <option value="commercial">Droit Commercial</option>
                <option value="civil">Droit Civil</option>
                <option value="penal">Droit Pénal</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <span class="material-icons-outlined">expand_more</span>
              </div>
            </div>
          </div>
          
          <!-- Liste des textes pour Texte 2 -->
          <div class="space-y-4">
            <div 
              v-for="text in filteredTexts2" 
              :key="text.id"
              @click="selectText2(text)"
              :class="['group p-5 rounded-xl bg-surface-light dark:bg-surface-dark border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md', 
                       selectedText2?.id === text.id ? 'border-primary' : 'border-border-light dark:border-border-dark hover:border-primary/50']"
            >
              <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 mb-3">
                {{ text.category }}
              </span>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                {{ text.title }}
              </h3>
              <p class="text-sm text-text-muted-light dark:text-text-muted-dark font-light">
                {{ text.reference }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton de comparaison -->
      <div class="mt-12 text-center" v-if="selectedText1 && selectedText2">
        <button 
          @click="compareTexts"
          class="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
        >
          <span class="material-icons-outlined mr-2">compare</span>
          Comparer les textes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppComparateur",
  data() {
    return {
      searchText1: '',
      searchText2: '',
      selectedDomain1: '',
      selectedDomain2: '',
      selectedText1: null,
      selectedText2: null,
      texts: [
        { id: 1, category: 'Droit Commercial Général', title: 'Définition du commerçant', reference: 'Article 2 - Acte Uniforme sur le Droit Commercial Général' },
        { id: 2, category: 'Droit Commercial Général', title: 'Actes de commerce par nature', reference: 'Article 3 - Acte Uniforme sur le Droit Commercial Général' },
        { id: 3, category: 'Droit Commercial Général', title: 'Prescription quinquennale', reference: 'Article 16 - Acte Uniforme sur le Droit Commercial Général' },
        { id: 4, category: 'Droit Civil', title: 'Obligations contractuelles', reference: 'Article 1103 - Code Civil' },
        { id: 5, category: 'Droit Pénal', title: 'Définition du crime', reference: 'Article 1 - Code Pénal' }
      ]
    }
  },
  computed: {
    filteredTexts1() {
      return this.texts.filter(text => 
        (this.selectedDomain1 === '' || text.category.toLowerCase().includes(this.selectedDomain1)) &&
        text.title.toLowerCase().includes(this.searchText1.toLowerCase())
      )
    },
    filteredTexts2() {
      return this.texts.filter(text => 
        (this.selectedDomain2 === '' || text.category.toLowerCase().includes(this.selectedDomain2)) &&
        text.title.toLowerCase().includes(this.searchText2.toLowerCase())
      )
    }
  },
  methods: {
    selectText1(text) {
      this.selectedText1 = text
    },
    selectText2(text) {
      this.selectedText2 = text
    },
    compareTexts() {
      if (this.selectedText1 && this.selectedText2) {
        alert(`Comparaison entre:\n${this.selectedText1.title}\net\n${this.selectedText2.title}`)
      }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #2d3748; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #4a5568; 
}
</style>