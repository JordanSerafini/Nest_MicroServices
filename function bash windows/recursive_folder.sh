$folders = Get-ChildItem -Directory ./Backend
foreach ($folder in $folders) {
    Write-Host "Checking outdated packages for $($folder.FullName)"
    Push-Location $folder.FullName
    npm outdated
    Write-Host "Updating packages for $($folder.FullName)"
    npm update
    npm uninstall inflight
    npm uninstall @humanwhocodes/config-array
    npm uninstall @humanwhocodes/object-schema
    npm uninstall rimraf
    npm uninstall glob
    npm install rimraf@latest
    npm install lru-cache@latest
    npm install @eslint/config-array@latest
    npm install @eslint/object-schema@latest


    Pop-Location
}