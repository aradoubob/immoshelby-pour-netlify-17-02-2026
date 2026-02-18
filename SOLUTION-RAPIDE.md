# 🚨 Solution Rapide - Erreur StackBlitz ENOENT

## Le Problème

Vous obtenez l'erreur : `npm error code ENOENT` quand vous ouvrez le projet sur StackBlitz.

**Cause** : Le fichier `package.json` n'est pas trouvé par StackBlitz.

## La Solution (3 étapes simples)

### 1️⃣ Préparer le Projet

**Option A - Automatique (Recommandé)**

Linux/Mac :
```bash
./prepare-stackblitz.sh
```

Windows :
```cmd
prepare-stackblitz.bat
```

**Option B - Manuel**

1. Téléchargez tous les fichiers du projet depuis Bolt
2. Créez un fichier ZIP contenant TOUS les fichiers
3. ⚠️ **Important** : N'incluez PAS les dossiers `node_modules` et `dist`

### 2️⃣ Importer dans StackBlitz

1. Allez sur **https://stackblitz.com/**
2. Cliquez sur **"Import Project"**
3. Sélectionnez **"Upload from your computer"**
4. Uploadez le fichier ZIP `immoshelby-stackblitz.zip`

### 3️⃣ Vérifier

Dans StackBlitz, vérifiez dans la sidebar gauche :
- ✅ `package.json` est visible à la racine
- ✅ Dossier `src/` est présent
- ✅ Fichier `.stackblitzrc` est présent

Si ces fichiers sont visibles :
- StackBlitz va installer automatiquement les dépendances
- L'app démarrera automatiquement avec `npm run dev`
- Les variables d'environnement Supabase seront injectées automatiquement

## 🔧 Si Ça Ne Marche Toujours Pas

### Dépannage Rapide

**Problème** : "Cannot find package.json"
→ **Solution** : Réimportez le projet, assurez-vous que le ZIP contient `package.json` à la racine

**Problème** : "Cannot find module"
→ **Solution** : Ouvrez le terminal et exécutez `npm install`

**Problème** : "Supabase connection error"
→ **Solution** : Vérifiez que `.stackblitzrc` est présent, redémarrez le serveur

## 📋 Checklist Rapide

Avant d'importer dans StackBlitz, votre ZIP doit contenir :

- [x] `package.json` à la racine ⭐ **CRITIQUE**
- [x] `.stackblitzrc` à la racine ⭐ **IMPORTANT**
- [x] Dossier `src/` avec tout le code
- [x] Dossier `public/` avec les images
- [x] Fichiers de config (vite.config.ts, tsconfig.json, etc.)
- [ ] ❌ **PAS** le dossier `node_modules`
- [ ] ❌ **PAS** le dossier `dist`

## 💡 Pourquoi Ça Marche

Le fichier `.stackblitzrc` est magique :

```json
{
  "installDependencies": true,     ← Installe automatiquement npm
  "startCommand": "npm run dev",   ← Lance le serveur auto
  "env": { ... }                    ← Injecte les variables Supabase
}
```

## 🎯 Alternative : Via GitHub

Si vous avez un repo GitHub :

1. Poussez le projet vers GitHub
2. Allez sur `https://stackblitz.com/github/USERNAME/REPO`
3. StackBlitz clone automatiquement tout

## 📚 Besoin de Plus de Détails ?

Consultez les guides complets :
- **STACKBLITZ_SETUP.md** : Guide détaillé étape par étape
- **VERIFICATIONS.md** : État du projet et diagnostics complets
- **README.md** : Documentation générale du projet

## ⚡ Raccourci Ultime

```bash
# 1. Préparer
./prepare-stackblitz.sh

# 2. Aller sur StackBlitz
https://stackblitz.com/

# 3. Import Project → Upload → immoshelby-stackblitz.zip

# 4. Attendre 1-2 minutes

# 5. ✅ C'est prêt !
```

---

**Note** : Si vous voyez l'erreur ENOENT, c'est toujours parce que `package.json` n'est pas au bon endroit ou n'a pas été importé. Vérifiez d'abord la sidebar de StackBlitz !
