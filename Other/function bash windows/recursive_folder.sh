$folders = Get-ChildItem -Directory ./Backend
foreach ($folder in $folders) {
    Write-Host "Checking outdated packages for $($folder.FullName)"
    Push-Location $folder.FullName
    npm audit fix
    Write-Host "Updating packages for $($folder.FullName)"

    Pop-Location
}