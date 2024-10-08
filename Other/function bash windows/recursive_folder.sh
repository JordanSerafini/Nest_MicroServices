# Récupérer uniquement les dossiers du premier niveau dans le répertoire Backend
$folders = Get-ChildItem -Directory

foreach ($folder in $folders) {
    # Vérifier si package.json existe à la racine du dossier
    if (Test-Path "$($folder.FullName)\package.json") {
        Write-Host "Checking outdated packages for $($folder.FullName)"
        
        # Se déplacer dans le dossier
        Push-Location $folder.FullName

        try {

            Write-Host "Running npm audit for $($folder.FullName)"
            npm audit fix --force
        }
        catch {
            # Si une erreur survient, afficher un message d'erreur
            Write-Host "An error occurred while processing $($folder.FullName): $_" -ForegroundColor Red
        }

        # Revenir au répertoire précédent
        Pop-Location
    } else {
        Write-Host "Skipping $($folder.FullName) as it does not contain a package.json file." -ForegroundColor Yellow
    }
}
