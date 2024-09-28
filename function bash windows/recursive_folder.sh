$folders = Get-ChildItem -Directory ./Backend
foreach ($folder in $folders) {
    Write-Host "Checking outdated packages for $($folder.FullName)"
    Push-Location $folder.FullName
    npm outdated
    Write-Host "Updating packages for $($folder.FullName)"
    npm update



    Pop-Location
}