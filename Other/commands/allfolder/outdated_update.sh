for dir in */ ; do
  if [ -f "$dir/package.json" ]; then
    echo "Checking outdated packages in $dir"
    cd "$dir" 
    npm outdated
    npm update
    cd ..
  fi
done
