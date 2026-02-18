# Guide de Configuration StackBlitz

## 🔍 Diagnostic du Problème

L'erreur `npm error code ENOENT` signifie que StackBlitz ne trouve pas le fichier `package.json`. Cela arrive généralement quand :

1. Les fichiers n'ont pas été correctement importés
2. Le projet a été ouvert dans un sous-dossier au lieu de la racine
3. L'import a échoué partiellement

## ✅ Solution Recommandée

### Méthode 1 : Import Direct (Recommandé)

1. **Téléchargez tous les fichiers du projet depuis Bolt**
   - Cliquez sur le bouton de téléchargement dans Bolt
   - Ou utilisez le script `prepare-stackblitz.sh` si vous êtes sur Linux/Mac

2. **Allez sur StackBlitz**
   - Visitez https://stackblitz.com/
   - Cliquez sur "New Project" puis "Import Project"

3. **Uploadez le projet**
   - Sélectionnez "Upload from your computer"
   - Choisissez le fichier ZIP téléchargé
   - Attendez que StackBlitz décompresse et analyse le projet

4. **Vérification**
   - Dans la sidebar gauche, vous devriez voir :
     - `package.json` à la racine
     - Dossier `src/`
     - Dossier `public/`
     - Fichier `.stackblitzrc`
   - Si ces fichiers ne sont pas visibles, l'import a échoué

### Méthode 2 : Via GitHub

Si vous avez un dépôt GitHub :

1. Poussez tous les fichiers vers GitHub
2. Visitez `https://stackblitz.com/github/VOTRE_USERNAME/VOTRE_REPO`
3. StackBlitz clonera automatiquement le projet

## 🛠️ Configuration Automatique

Le fichier `.stackblitzrc` est déjà configuré avec :

```json
{
  "installDependencies": true,
  "startCommand": "npm run dev",
  "env": {
    "VITE_SUPABASE_URL": "https://epqqzwxilzpbhjybqfbd.supabase.co",
    "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Cela signifie que :
- ✅ Les dépendances seront installées automatiquement
- ✅ Le serveur de dev démarrera automatiquement
- ✅ Les variables d'environnement Supabase sont injectées

## 🚨 Dépannage

### Problème : "npm error code ENOENT"

**Cause** : Le fichier `package.json` n'est pas trouvé

**Solutions** :
1. Vérifiez que `package.json` est visible dans la sidebar de StackBlitz
2. Si non visible, réimportez le projet
3. Assurez-vous que le ZIP contient bien tous les fichiers à la racine

### Problème : "Cannot find module"

**Cause** : Les dépendances ne sont pas installées

**Solutions** :
1. Ouvrez le terminal dans StackBlitz (en bas)
2. Exécutez `npm install`
3. Attendez la fin de l'installation
4. Le serveur devrait démarrer automatiquement

### Problème : "Supabase connection error"

**Cause** : Les variables d'environnement ne sont pas chargées

**Solutions** :
1. Vérifiez que le fichier `.stackblitzrc` est présent
2. Redémarrez le serveur dans StackBlitz
3. Si nécessaire, ajoutez manuellement les variables dans les paramètres StackBlitz

## 📋 Checklist de Vérification

Avant d'ouvrir le projet dans StackBlitz, assurez-vous que votre archive contient :

- [ ] `package.json` à la racine
- [ ] `.stackblitzrc` à la racine
- [ ] Dossier `src/` avec tous les fichiers source
- [ ] Dossier `public/` avec les assets
- [ ] Fichiers de configuration (`vite.config.ts`, `tsconfig.json`, etc.)
- [ ] **PAS** le dossier `node_modules`
- [ ] **PAS** le dossier `dist`

## 🎯 Structure Attendue dans StackBlitz

```
immoshelby/
├── .stackblitzrc           ← Configuration StackBlitz
├── package.json            ← Dépendances npm
├── vite.config.ts          ← Configuration Vite
├── tsconfig.json           ← Configuration TypeScript
├── tailwind.config.js      ← Configuration Tailwind
├── index.html              ← Point d'entrée HTML
├── public/
│   └── logo.jpg
├── src/
│   ├── main.tsx            ← Point d'entrée React
│   ├── App.tsx             ← Composant principal
│   ├── index.css           ← Styles globaux
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── translations/
│   └── types/
└── supabase/
    └── migrations/
```

## 💡 Conseils

1. **Patience** : StackBlitz peut prendre 1-2 minutes pour installer toutes les dépendances
2. **Terminal** : Ouvrez le terminal dans StackBlitz pour voir les logs d'installation
3. **Rechargement** : Si quelque chose ne fonctionne pas, essayez de rafraîchir la page
4. **Cache** : Parfois, vider le cache du navigateur aide

## 📞 Besoin d'Aide ?

Si le problème persiste :
1. Vérifiez que tous les fichiers sont présents dans le ZIP
2. Testez d'abord localement avec `npm install && npm run dev`
3. Assurez-vous que le build fonctionne avec `npm run build`
4. Si tout fonctionne localement mais pas sur StackBlitz, le problème vient de l'import

## 🔗 Ressources

- [Documentation StackBlitz](https://developer.stackblitz.com/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Supabase](https://supabase.com/docs)
