# Récupérer uniquement les dossiers du premier niveau dans le répertoire Backend
$folders = Get-ChildItem -Directory

foreach ($folder in $folders) {
    # Vérifier si package.json existe à la racine du dossier
    if (Test-Path "$($folder.FullName)\package.json") {
        Write-Host "Checking outdated packages for $($folder.FullName)"
        
        # Se déplacer dans le dossier
        Push-Location $folder.FullName

        try {
            Write-Host "Installing specific versions of NestJS packages in $($folder.FullName)"
            npm install reflect-metadata@^0.1.12
            # Installer les versions spécifiques des packages NestJS
            npm install @nestjs/core@^10.0.0 @nestjs/microservices@^10.0.0 @nestjs/platform-express@^10.0.0 --legacy-peer-deps
            
            # Exécuter npm audit pour vérifier les vulnérabilités
            Write-Host "Running npm audit for $($folder.FullName)"
            npm audit fix
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
