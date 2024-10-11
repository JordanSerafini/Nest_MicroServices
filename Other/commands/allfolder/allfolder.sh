foreach ($dir in Get-ChildItem -Directory) {
    Write-Host "Installing in directory: $($dir.FullName)"
    Set-Location $dir.FullName
    npm install
    Write-Host "Installation complete in directory: $($dir.FullName)"
    Set-Location ..
  
}
