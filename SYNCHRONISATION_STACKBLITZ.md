# Guide de Synchronisation Complète Bolt → StackBlitz

## Problème
Bolt.new ne synchronise pas automatiquement tous les fichiers vers StackBlitz/GitHub. Certains fichiers et dossiers peuvent manquer.

## Solution Complète

### Étape 1 : Vérifier les fichiers essentiels manquants

Dans StackBlitz, vérifiez que ces fichiers/dossiers existent :

#### Fichiers de Configuration (Racine)
- ✅ `package.json`
- ✅ `vite.config.ts`
- ✅ `tsconfig.json`
- ✅ `tsconfig.app.json`
- ✅ `tsconfig.node.json`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`
- ✅ `.stackblitzrc`
- ✅ `.env` (ou `.env.example`)
- ✅ `index.html`

#### Dossier .bolt/
- ✅ `.bolt/config.json`
- ✅ `.bolt/ignore`
- ✅ `.bolt/prompt`

#### Dossier src/
- ✅ `src/App.tsx`
- ✅ `src/main.tsx`
- ✅ `src/index.css`
- ✅ `src/vite-env.d.ts`

#### Dossier src/components/
- ✅ `src/components/Button.tsx`
- ✅ `src/components/Layout.tsx`
- ✅ `src/components/LoadingSpinner.tsx`
- ✅ `src/components/PropertyCard.tsx`
- ✅ `src/components/ProtectedRoute.tsx`

#### Dossier src/contexts/
- ✅ `src/contexts/AuthContext.tsx`
- ✅ `src/contexts/LanguageContext.tsx`

#### Dossier src/hooks/
- ✅ `src/hooks/useTranslatedProperty.ts`

#### Dossier src/lib/
- ✅ `src/lib/supabase.ts`
- ✅ `src/lib/translation.ts`

#### Dossier src/pages/
- ✅ `src/pages/Contact.tsx`
- ✅ `src/pages/Home.tsx`
- ✅ `src/pages/PropertiesList.tsx`
- ✅ `src/pages/PropertyDetails.tsx`

#### Dossier src/pages/admin/
- ✅ `src/pages/admin/Dashboard.tsx`
- ✅ `src/pages/admin/Login.tsx`
- ✅ `src/pages/admin/PropertiesManagement.tsx`

#### Dossier src/translations/
- ✅ `src/translations/index.ts`

#### Dossier src/types/
- ✅ `src/types/index.ts`

#### Dossier supabase/migrations/
- ✅ `supabase/migrations/20260217083923_create_properties_table.sql`
- ✅ `supabase/migrations/20260217083937_create_schedule_table.sql`
- ✅ `supabase/migrations/20260217083950_create_admin_profiles_table.sql`
- ✅ `supabase/migrations/20260217122743_restructure_properties_for_auto_translation.sql`

#### Dossier public/
- ✅ `public/logo.jpg`

### Étape 2 : Créer les fichiers manquants manuellement dans StackBlitz

Si des fichiers manquent dans StackBlitz :

1. **Dans Bolt.new** : Cliquez sur chaque fichier manquant et copiez son contenu
2. **Dans StackBlitz** :
   - Créez le dossier si nécessaire (clic droit > New Folder)
   - Créez le fichier (clic droit > New File)
   - Collez le contenu

### Étape 3 : Méthode Alternative - Export/Import ZIP

Si trop de fichiers manquent :

#### Dans Bolt.new :
1. Téléchargez le projet complet en tant que ZIP
2. OU utilisez Git pour cloner le repo localement

#### Dans StackBlitz :
1. Allez sur https://stackblitz.com/
2. Cliquez sur "Import Project"
3. Uploadez le fichier ZIP complet
4. Attendez l'installation automatique des dépendances

### Étape 4 : Vérification Post-Synchronisation

Dans StackBlitz, ouvrez le Terminal et exécutez :

```bash
# Vérifier que package.json existe
ls -la package.json

# Vérifier la structure src/
ls -la src/

# Vérifier les composants
ls -la src/components/

# Vérifier les pages
ls -la src/pages/

# Installer les dépendances si nécessaire
npm install

# Tester le build
npm run build
```

### Étape 5 : Démarrer le projet

```bash
npm run dev
```

Le projet devrait maintenant démarrer sur `http://localhost:5173`

## Dépannage

### Erreur "npm ERR! code ENOENT"
→ Le fichier `package.json` est manquant. Créez-le manuellement depuis Bolt.

### Erreur "Cannot find module"
→ Des fichiers TypeScript manquent. Vérifiez la liste ci-dessus et créez les fichiers manquants.

### Erreur "VITE_SUPABASE_URL is not defined"
→ Le fichier `.stackblitzrc` ou `.env` est manquant. Créez-le avec les variables d'environnement.

### Le serveur ne démarre pas
→ Vérifiez que tous les fichiers de configuration (vite.config.ts, tsconfig.json) sont présents.

## Structure Minimale Requise

Au minimum, pour que le projet fonctionne, vous devez avoir :

```
project/
├── .stackblitzrc          # Config StackBlitz avec env vars
├── package.json           # Dépendances
├── vite.config.ts        # Config Vite
├── tsconfig.json         # Config TypeScript
├── index.html            # Point d'entrée HTML
├── src/
│   ├── main.tsx          # Point d'entrée React
│   ├── App.tsx           # Composant principal
│   ├── index.css         # Styles globaux
│   └── [tous les autres fichiers]
└── public/
    └── logo.jpg          # Logo
```

## Commande pour Lister Tous les Fichiers

Dans StackBlitz Terminal :

```bash
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" | sort
```

Comparez cette liste avec la liste des fichiers dans Bolt.new pour identifier les fichiers manquants.
