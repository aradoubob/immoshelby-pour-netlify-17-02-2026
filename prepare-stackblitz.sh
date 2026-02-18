#!/bin/bash

# Script de préparation pour export vers StackBlitz
# Ce script crée un ZIP propre avec tous les fichiers nécessaires

echo "=== Préparation du projet pour StackBlitz ==="

# Nom du fichier de sortie
OUTPUT_FILE="stackblitz-project.zip"

# Supprimer l'ancien ZIP s'il existe
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Suppression de l'ancien fichier ZIP..."
    rm "$OUTPUT_FILE"
fi

echo "📦 Création du fichier ZIP avec tous les fichiers essentiels..."
echo ""
echo "Inclusion de:"
echo "  ✅ Fichiers de configuration (package.json, vite.config.ts, etc.)"
echo "  ✅ Dossier .bolt/ (config Bolt.new)"
echo "  ✅ Dossier src/ complet"
echo "  ✅ Dossier public/ (logo)"
echo "  ✅ Dossier supabase/migrations/"
echo "  ✅ Variables d'environnement (.stackblitzrc)"
echo ""

# Créer le ZIP en excluant seulement ce qui n'est pas nécessaire
zip -r "$OUTPUT_FILE" . \
    -x "node_modules/*" \
    -x "dist/*" \
    -x ".git/*" \
    -x "*.log" \
    -x ".DS_Store" \
    -x "__MACOSX/*" \
    -x "prepare-stackblitz.sh" \
    -x "prepare-stackblitz.bat" \
    -x "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    file_count=$(unzip -l "$OUTPUT_FILE" | tail -1 | awk '{print $2}')
    file_size=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')

    echo ""
    echo "✅ Fichier créé avec succès!"
    echo ""
    echo "📊 Statistiques:"
    echo "   - Nom du fichier: $OUTPUT_FILE"
    echo "   - Taille: $file_size"
    echo "   - Nombre de fichiers: $file_count"
    echo ""
    echo "📤 Prochaines étapes:"
    echo "   1. Téléchargez le fichier: $OUTPUT_FILE"
    echo "   2. Allez sur https://stackblitz.com/"
    echo "   3. Cliquez sur 'Import Project'"
    echo "   4. Sélectionnez 'Upload from your computer'"
    echo "   5. Uploadez le fichier $OUTPUT_FILE"
    echo "   6. Attendez l'installation automatique des dépendances"
    echo "   7. Le projet démarrera avec 'npm run dev'"
    echo ""
    echo "⚠️  Important:"
    echo "   - Le .stackblitzrc contient les variables Supabase"
    echo "   - Tous les fichiers src/, components/, pages/ sont inclus"
    echo "   - Les migrations Supabase sont incluses"
    echo ""

    # Lister quelques fichiers importants pour vérification
    echo "🔍 Vérification rapide des fichiers critiques dans le ZIP:"
    unzip -l "$OUTPUT_FILE" | grep -E "(package.json|vite.config.ts|src/main.tsx|src/App.tsx|.stackblitzrc|src/components/)" | head -10

else
    echo "❌ Erreur lors de la création du fichier ZIP"
    exit 1
fi
