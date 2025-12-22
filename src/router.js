import { ref, computed } from 'vue'

// État du routeur simple
const currentRoute = ref('home')
const history = ref([])

// Routes disponibles
const routes = {
  home: 'App',
  textes: 'TexteJuridique',
  comparateur: 'AppComparateur'
}


// Fonction de navigation
const navigate = (routeName) => {
  if (routes[routeName]) {
    history.value.push(currentRoute.value)
    currentRoute.value = routeName
    // Faire défiler vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Fonction pour revenir en arrière
const goBack = () => {
  if (history.value.length > 0) {
    currentRoute.value = history.value.pop()
  }
}

// Hook pour utiliser le routeur
export function useRouter() {
  return {
    currentRoute: computed(() => currentRoute.value),
    navigate,
    goBack,
    routes
  }
}
