foreach ($dir in Get-ChildItem -Directory) {
  if (Test-Path "$($dir.FullName)\package.json") {
    Write-Host "Installing pool_package@latest in directory: $($dir.FullName)"
    Set-Location $dir.FullName
    npm install eslint@latest
    npm outdated
    npm update 
    Write-Host "Installation complete in directory: $($dir.FullName)"
    Set-Location ..
  } else {
    Write-Host "Skipping directory: $($dir.FullName) (no package.json found)"
  }
}
