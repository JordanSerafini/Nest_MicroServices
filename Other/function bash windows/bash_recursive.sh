# Parcourir les dossiers du répertoire actuel (Backend)
for folder in */; do
    # Vérifier si package.json existe dans le dossier
    if [ -f "$folder/package.json" ]; then
        echo "Checking outdated packages for $folder"

        # Se déplacer dans le dossier
        pushd "$folder" > /dev/null

        # Tenter d'installer les packages avec npm
        echo "Working in $folder"
        if npm install; then
            echo "Successfully installed packages in $folder"
        else
            # Afficher un message d'erreur en cas d'échec
            echo "An error occurred while processing $folder" >&2
        fi

        # Revenir au répertoire précédent
        popd > /dev/null
    else
        echo "Skipping $folder as it does not contain a package.json file."
    fi
done
