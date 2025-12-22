<template>
    <div>
        <!-- Navigation - toujours visible -->
        <nav class="w-full border-b border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-6 py-5 fixed top-0 left-0 z-50">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
            <div class="bg-primary/20 p-1 rounded-lg flex items-center justify-center h-10 w-10 border border-primary/30">
                <span class="material-icons-round text-primary text-xl">balance</span>
            </div>
            <div class="flex flex-col">
                <h1 class="font-serif font-bold text-lg text-primary leading-tight tracking-wide">Juris-OHADA</h1>
                <span class="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Assistant juridique OHADA &amp; Droit Ivoirien</span>
            </div>
            </div>
            
            <!-- Menu desktop -->
            <div class="hidden md:flex items-center gap-4">
            <a @click="router.navigate('home')" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer">
                <span class="material-icons-round text-lg">home</span>
                Accueil
            </a>
            <a @click="router.navigate('textes')" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer">
                <span class="material-icons-round text-lg">menu_book</span>
                Textes
            </a>
            <a @click="router.navigate('comparateur')" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700" href="#">
                <span class="material-icons-round text-lg">compare_arrows</span>
                Comparateur
            </a>
            <a class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700 group" href="#">
                <span class="material-icons-round text-lg group-hover:text-primary transition-colors">login</span>
                Connexion
            </a>
            <button @click="toggleTheme" class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'">
                <span v-if="isDark" class="material-icons-round">light_mode</span>
                <span v-else class="material-icons-round">dark_mode</span>
            </button>
            </div>
            
            <!-- Menu mobile -->
            <div class="md:hidden flex items-center gap-2">
            <button @click="toggleTheme" class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'">
                <span v-if="isDark" class="material-icons-round">light_mode</span>
                <span v-else class="material-icons-round">dark_mode</span>
            </button>
            <button @click="toggleMobileMenu" class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span class="material-icons-round">menu</span>
            </button>
            </div>
        </div>
        
        <!-- Menu mobile déroulant -->
        <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <div class="px-6 py-4 space-y-2">
            <a @click="router.navigate('home'); closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <span class="material-icons-round text-lg">home</span>
                Accueil
            </a>
            <a @click="router.navigate('textes'); closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <span class="material-icons-round text-lg">menu_book</span>
                Textes
            </a>
            <a @click="router.navigate('comparateur'); closeMobileMenu()" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <span class="material-icons-round text-lg">compare_arrows</span>
                Comparateur
            </a>
            <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <span class="material-icons-round text-lg">login</span>
                Connexion
            </a>
            </div>
        </div>
        </nav>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: "AppNavigation",
    props: {
        router: {
            type: Object,
            required: true
        }
    },
    setup() {
        const isDark = ref(document.documentElement.classList.contains('dark'));
        const isMobileMenuOpen = ref(false);
        
        // Fonction pour basculer le thème
        const toggleTheme = () => {
            // Utiliser la fonction globale définie dans theme.js
            const newIsDark = window.toggleTheme();
            isDark.value = newIsDark;
            return newIsDark;
        };
        
        // Fonction pour basculer le menu mobile
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        };
        
        // Fonction pour fermer le menu mobile
        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
        };
        
        // Mettre à jour l'état local si le thème change ailleurs
        const updateFromTheme = () => {
            isDark.value = document.documentElement.classList.contains('dark');
        };
        
        // Écouter les changements de thème
        onMounted(() => {
            // Mettre à jour l'état initial
            updateFromTheme();
            
            // Créer un observateur pour détecter les changements de classe sur l'élément html
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        updateFromTheme();
                    }
                });
            });
            
            // Observer les changements de classe sur l'élément html
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
            
            // Nettoyer l'observateur lors du démontage du composant
            return () => observer.disconnect();
        });

        return {
            isDark,
            isMobileMenuOpen,
            toggleTheme,
            toggleMobileMenu,
            closeMobileMenu
        };
    }
}
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0F1219;
}
::-webkit-scrollbar-thumb {
  background: #2D333F; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3D4554; 
}
</style>
