@echo off
REM Script de préparation pour export vers StackBlitz (Windows)
REM Ce script crée un ZIP propre avec tous les fichiers nécessaires

echo === Preparation du projet pour StackBlitz ===
echo.

SET OUTPUT_FILE=stackblitz-project.zip

REM Supprimer l'ancien ZIP s'il existe
if exist "%OUTPUT_FILE%" (
    echo Suppression de l'ancien fichier ZIP...
    del "%OUTPUT_FILE%"
)

echo Creation du fichier ZIP avec tous les fichiers essentiels...
echo.
echo Inclusion de:
echo   - Fichiers de configuration (package.json, vite.config.ts, etc.)
echo   - Dossier .bolt/ (config Bolt.new)
echo   - Dossier src/ complet
echo   - Dossier public/ (logo)
echo   - Dossier supabase/migrations/
echo   - Variables d'environnement (.stackblitzrc)
echo.

REM Créer le ZIP avec PowerShell
powershell -Command "& { $files = Get-ChildItem -Path . -Recurse -File | Where-Object { $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\.git\\|\\.log$|\\.DS_Store|prepare-stackblitz\\.(sh|bat)|stackblitz-project\\.zip' }; Compress-Archive -Path $files.FullName -DestinationPath '%OUTPUT_FILE%' -Force }"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Fichier cree avec succes!
    echo.

    REM Afficher la taille du fichier
    for %%A in ("%OUTPUT_FILE%") do echo Taille: %%~zA octets

    echo.
    echo Prochaines etapes:
    echo   1. Telechargez le fichier: %OUTPUT_FILE%
    echo   2. Allez sur https://stackblitz.com/
    echo   3. Cliquez sur 'Import Project'
    echo   4. Selectionnez 'Upload from your computer'
    echo   5. Uploadez le fichier %OUTPUT_FILE%
    echo   6. Attendez l'installation automatique des dependances
    echo   7. Le projet demarrera avec 'npm run dev'
    echo.
    echo Important:
    echo   - Le .stackblitzrc contient les variables Supabase
    echo   - Tous les fichiers src/, components/, pages/ sont inclus
    echo   - Les migrations Supabase sont incluses
    echo.
) else (
    echo Erreur lors de la creation du fichier ZIP
    echo.
    echo Alternative manuelle:
    echo   1. Selectionnez tous les fichiers du projet
    echo   2. EXCLUEZ: node_modules, dist, .git
    echo   3. Clic droit ^> Envoyer vers ^> Dossier compresse
    echo   4. Nommez le fichier: stackblitz-project.zip
    echo.
)

pause
