import { ref, computed } from 'vue'

// État du routeur simple
const currentRoute = ref('home')
const currentParams = ref({})
const history = ref([])

// Routes disponibles
const routes = {
  home: 'App',
  textes: 'TexteJuridique',
  comparateur: 'AppComparateur',
  loiDetails: 'LoiDetails'
}


// Fonction de navigation
const navigate = (routeName, params = {}) => {
  if (routes[routeName]) {
    history.value.push({ name: currentRoute.value, params: { ...currentParams.value } })
    currentRoute.value = routeName
    currentParams.value = params
    // Faire défiler vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Fonction pour revenir en arrière
const goBack = () => {
  if (history.value.length > 0) {
    const previous = history.value.pop()
    if (typeof previous === 'object' && previous.name) {
      currentRoute.value = previous.name
      currentParams.value = previous.params || {}
    } else {
      currentRoute.value = previous
      currentParams.value = {}
    }
  }
}

// Hook pour utiliser le routeur
export function useRouter() {
  return {
    currentRoute: computed(() => currentRoute.value),
    currentParams: computed(() => currentParams.value),
    navigate,
    goBack,
    routes
  }
}
