Women Grow Up - Front-end README
Aperçu du projet
Women Grow Up est une plateforme sociale dédiée à l’autonomisation des femmes, offrant des ressources, des témoignages inspirants, et des opportunités de réseautage. Le front-end, construit avec React.js, propose une interface utilisateur dynamique, inclusive et accessible, alignée sur les valeurs de sororité, d’émancipation et de diversité. Cette section du README se concentre sur la configuration, l’architecture et le développement du front-end.
Technologies utilisées

React.js (v18.x) : Bibliothèque principale pour la construction de l’interface utilisateur.
Vite : Outil de build rapide pour un développement et un bundling optimisés.
Tailwind CSS : Framework CSS pour un design moderne, responsive et personnalisable.
React Router (v6) : Gestion de la navigation entre les pages.
Axios : Pour les requêtes API vers le back-end.
ESLint : Pour maintenir la qualité du code.
Vitest : Pour les tests unitaires.

Prérequis
Avant de commencer, assurez-vous d’avoir les outils suivants installés :

Node.js (v18 ou supérieur)
npm (v9 ou supérieur) ou yarn (optionnel)
Un éditeur de code comme Visual Studio Code

Installation

Cloner le dépôt :
git clone https://github.com/Carelle9000/Women-Grow-Upv1
cd PFR/my-frontend


Installer les dépendances :
npm install


Configurer les variables d’environnement :

Créez un fichier .env à la racine du dossier frontend en vous basant sur .env.example :VITE_API_URL=http://localhost:8000/api


Remplacez VITE_API_URL par l’URL de votre back-end (ex. Laravel).


Lancer l’application en mode développement :
npm run dev

L’application sera accessible à http://localhost:5173.

Construire pour la production :
npm run build

Les fichiers optimisés seront générés dans le dossier dist.


Structure du projet
frontend/
├── public/                     # Fichiers statiques (images, favicon)
├── src/
│   ├── assets/                # Ressources (images, fonts)
│   ├── components/            # Composants React réutilisables
│   │   ├── SectionBlog/           # Composants  de la page Blog
│   │   ├── layout/           # Composants de mise en page (DashboardLayout, Mainlayout)
│   │   └── SectionHome/          # Composants de la page Home (Testimonial, ResourceCard)
│   ├── pages/                 # Pages de l’application (Home, Resources, Profile)
│   ├── routes/                # Configuration des routes avec React Router
│   ├── API/              # Logique des appels API (Axios)
│   ├── styles/                # Fichiers CSS globaux et configuration Tailwind
│   ├── App.jsx                # Composant racine
│   ├── main.jsx               # Point d’entrée
│   └── index.css              # Styles globaux
├── .env.example               # Exemple de fichier d’environnement
├── package.json               # Dépendances et scripts
├── vite.config.js             # Configuration Vite
└── README.md                  # Ce fichier

Architecture du Front-end

Composants réutilisables : Les composants sont organisés en trois catégories :
Common : Boutons, cartes, modales, utilisés dans toute l’application.
Layout : En-tête, pied de page, et barre latérale pour une mise en page cohérente.
Feature : Composants spécifiques pour les fonctionnalités comme les témoignages ou les ressources éducatives.


Navigation : React Router gère les routes (ex. /, /resources, /profile) avec un chargement paresseux (lazy loading) pour optimiser les performances.
Gestion des données : Les appels API sont centralisés dans le dossier services avec Axios. Les données sont gérées via React Context ou useState/useEffect pour les états locaux.
Styles : Tailwind CSS est utilisé pour un design responsive. Les classes utilitaires sont appliquées directement dans les JSX, avec quelques styles globaux dans index.css.
Accessibilité : Les composants respectent les standards WCAG (ex. rôles ARIA, navigation au clavier).

Scripts disponibles
Dans le fichier package.json, les scripts suivants sont configurés :

npm run dev : Lance le serveur de développement.
npm run build : Construit l’application pour la production.
npm run lint : Vérifie la qualité du code avec ESLint.
npm run test : Exécute les tests unitaires avec Vitest.
npm run preview : Prévisualise la version buildée localement.

Dépendances principales
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.7",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "eslint": "^8.57.0",
    "vitest": "^1.3.0",
    "@vitejs/plugin-react": "^4.2.1"
  }
}

Tests
Les tests unitaires sont écrits avec Vitest et se trouvent dans le dossier __tests__. Pour exécuter les tests :
npm run test

Exemple de test pour un composant :
import { render, screen } from '@testing-library/react';
import Button from './components/common/Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

Contribution

Forkez le dépôt.
Créez une branche pour votre fonctionnalité (git checkout -b feature/nom-fonctionnalite).
Commitez vos changements (git commit -m "Ajout de la fonctionnalité X").
Poussez votre branche (git push origin feature/nom-fonctionnalite).
Ouvrez une Pull Request.

Problèmes connus

Les performances sur les appareils à faible puissance peuvent être améliorées en optimisant les images et en réduisant les re-rendus inutiles.
La compatibilité avec les navigateurs plus anciens (ex. IE) n’est pas garantie.

Contact
Pour toute question, contactez l’équipe à support@womengrowup.com.
