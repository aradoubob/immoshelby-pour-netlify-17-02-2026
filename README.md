# ImmoShelby - Plateforme Immobilière Multilingue

Une plateforme immobilière moderne avec support multilingue (Français/Anglais), gestion administrative et traduction automatique des propriétés.

## Fonctionnalités

- 🏠 Catalogue de propriétés avec recherche et filtres
- 🌍 Support multilingue (FR/EN) avec traduction automatique
- 👨‍💼 Panneau d'administration pour gérer les propriétés
- 📅 Système de prise de rendez-vous
- 🔐 Authentification sécurisée pour les administrateurs
- 📱 Design responsive et moderne

## Technologies

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Base de données + Authentification)
- React Router v7
- Lucide React (Icônes)

## Installation

1. Clonez le dépôt
```bash
git clone https://github.com/immoshelby-pour-netlify-17-02-2026/main.git
cd immoshelby-pour-netlify-17-02-2026
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez les variables d'environnement

Copiez `.env.example` vers `.env` et ajoutez vos clés Supabase :
```bash
cp .env.example .env
```

Modifiez `.env` avec vos vraies clés :
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

4. Lancez le serveur de développement
```bash
npm run dev
```

## Déploiement

### Netlify
Le projet est configuré pour Netlify avec le fichier `dist/_redirects` pour le routing SPA.

### StackBlitz

⚠️ **Important** : Le fichier `.stackblitzrc` contient déjà les variables d'environnement Supabase configurées.

#### Option 1 : Importer depuis GitHub
1. Visitez : `https://stackblitz.com/github/VOTRE_USERNAME/VOTRE_REPO`
2. StackBlitz détectera automatiquement le fichier `.stackblitzrc`
3. Les dépendances seront installées automatiquement

#### Option 2 : Importer un dossier local
1. Allez sur https://stackblitz.com/
2. Cliquez sur "Import Project"
3. Sélectionnez l'option "Upload from your computer"
4. Créez un fichier ZIP du projet (excluant `node_modules` et `dist`)
5. Uploadez le ZIP
6. StackBlitz installera automatiquement les dépendances via le `.stackblitzrc`

#### Dépannage StackBlitz

Si vous obtenez l'erreur `npm error code ENOENT` :
1. Vérifiez que le fichier `package.json` est bien présent à la racine du projet
2. Assurez-vous que tous les fichiers ont été correctement importés
3. Vérifiez dans la sidebar de StackBlitz que vous voyez la structure complète du projet
4. Si nécessaire, réessayez l'import en vous assurant que le ZIP contient bien tous les fichiers

Le `.stackblitzrc` est configuré pour :
- Installer automatiquement les dépendances
- Lancer `npm run dev` au démarrage
- Injecter les variables d'environnement Supabase

## Structure du Projet

```
src/
├── components/       # Composants réutilisables
├── contexts/        # Contextes React (Auth, Language)
├── hooks/           # Hooks personnalisés
├── lib/             # Configuration Supabase et utilitaires
├── pages/           # Pages de l'application
│   └── admin/       # Pages d'administration
├── translations/    # Fichiers de traduction
└── types/           # Types TypeScript

supabase/
└── migrations/      # Migrations de base de données
```

## Scripts

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile le projet pour la production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run typecheck` - Vérifie les types TypeScript

## Base de données

Le projet utilise Supabase avec les tables suivantes :
- `properties` - Propriétés immobilières
- `schedules` - Rendez-vous de visite
- `admin_profiles` - Profils administrateurs

Les migrations se trouvent dans `supabase/migrations/`.

## Licence

MIT
