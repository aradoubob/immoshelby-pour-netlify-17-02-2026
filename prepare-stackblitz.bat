@echo off
REM Script pour préparer le projet ImmoShelby pour StackBlitz (Windows)
REM Ce script crée un fichier ZIP prêt à être importé dans StackBlitz

echo 🚀 Préparation du projet pour StackBlitz...

SET OUTPUT_FILE=immoshelby-stackblitz.zip

REM Supprimer l'ancien ZIP s'il existe
if exist "%OUTPUT_FILE%" (
    echo 🗑️  Suppression de l'ancien fichier ZIP...
    del "%OUTPUT_FILE%"
)

REM Vérifier si PowerShell est disponible pour créer le ZIP
echo 📦 Création du fichier ZIP...

powershell -Command "& { $exclude = @('node_modules', 'dist', '.git', '*.log', '.DS_Store', 'prepare-stackblitz.bat', 'prepare-stackblitz.sh', 'immoshelby-stackblitz.zip'); Get-ChildItem -Path . -Recurse | Where-Object { $excl = $false; foreach($e in $exclude) { if($_.FullName -like \"*$e*\") { $excl = $true; break } }; -not $excl } | Compress-Archive -DestinationPath '%OUTPUT_FILE%' -Force }"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Fichier créé avec succès : %OUTPUT_FILE%
    echo.
    echo 📋 Prochaines étapes :
    echo    1. Allez sur https://stackblitz.com/
    echo    2. Cliquez sur 'Import Project'
    echo    3. Sélectionnez 'Upload from your computer'
    echo    4. Uploadez le fichier %OUTPUT_FILE%
    echo.
    echo ℹ️  Le fichier .stackblitzrc contient déjà les variables d'environnement Supabase
) else (
    echo ❌ Erreur lors de la création du fichier ZIP
    echo.
    echo 💡 Alternative : Créez manuellement un fichier ZIP contenant :
    echo    - Tous les fichiers du projet
    echo    - SAUF les dossiers node_modules et dist
    pause
)

pause
