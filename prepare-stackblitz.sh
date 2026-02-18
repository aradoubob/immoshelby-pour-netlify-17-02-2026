#!/bin/bash

# Script pour préparer le projet ImmoShelby pour StackBlitz
# Ce script crée un fichier ZIP prêt à être importé dans StackBlitz

echo "🚀 Préparation du projet pour StackBlitz..."

# Nom du fichier de sortie
OUTPUT_FILE="immoshelby-stackblitz.zip"

# Supprimer l'ancien ZIP s'il existe
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Suppression de l'ancien fichier ZIP..."
    rm "$OUTPUT_FILE"
fi

# Créer le ZIP en excluant les dossiers inutiles
echo "📦 Création du fichier ZIP..."
zip -r "$OUTPUT_FILE" . \
    -x "node_modules/*" \
    -x "dist/*" \
    -x ".git/*" \
    -x "*.log" \
    -x ".DS_Store" \
    -x "prepare-stackblitz.sh" \
    -x "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Fichier créé avec succès : $OUTPUT_FILE"
    echo ""
    echo "📋 Prochaines étapes :"
    echo "   1. Allez sur https://stackblitz.com/"
    echo "   2. Cliquez sur 'Import Project'"
    echo "   3. Sélectionnez 'Upload from your computer'"
    echo "   4. Uploadez le fichier $OUTPUT_FILE"
    echo ""
    echo "ℹ️  Le fichier .stackblitzrc contient déjà les variables d'environnement Supabase"
else
    echo "❌ Erreur lors de la création du fichier ZIP"
    exit 1
fi
