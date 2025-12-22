// src/theme.js
export function initTheme() {
  const html = document.documentElement;
  
  // Vérifier si le thème est déjà défini dans le localStorage
  const hasSavedTheme = localStorage.getItem('darkMode') !== null;
  
  // Déterminer le thème initial - Forcer le mode clair par défaut
  let isDark = false;
  
  if (hasSavedTheme) {
    // Utiliser la valeur sauvegardée, mais forcer false si non définie
    isDark = localStorage.getItem('darkMode') === 'true';
  }
  
  // Toujours sauvegarder la préférence actuelle
  localStorage.setItem('darkMode', isDark);

  // Appliquer le thème
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Exposer la fonction de basculement
  window.toggleTheme = function() {
    const newIsDark = !html.classList.contains('dark');
    html.classList.toggle('dark', newIsDark);
    localStorage.setItem('darkMode', newIsDark);
    console.log('Thème changé:', newIsDark ? 'sombre' : 'clair');
    return newIsDark;
  };

  console.log('Thème initialisé. Mode sombre:', isDark);
  return isDark;
}