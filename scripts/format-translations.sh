#!/bin/bash

# Define base translations directory
NOC_TRANSLATIONS="./knock/translations"

# Define the base locale directory to ignore
BASE_LOCALE="en-US"

# Full path to the base locale directory
BASE_DIR="$NOC_TRANSLATIONS/$BASE_LOCALE"

echo "Base translations directory: $NOC_TRANSLATIONS"
echo "Ignoring base locale: $BASE_LOCALE"

# Loop through all directories inside NOC_TRANSLATIONS
for locale_dir in "$NOC_TRANSLATIONS"/*; do
  # Check if it's a directory and not the base locale
  if [[ -d "$locale_dir" && "$(basename "$locale_dir")" != "$BASE_LOCALE" ]]; then
    LOCALE=$(basename "$locale_dir")
    echo "Processing locale: $LOCALE"

    # Loop through all JSON files inside the locale directory
    for file in "$locale_dir"/*.json; do
      # Check if file exists
      if [[ ! -f "$file" ]]; then
        echo "No JSON files found in $locale_dir. Skipping..."
        continue
      fi

      # Extract filename
      FILENAME=$(basename "$file")

      # Check if the filename contains "en-US"
      if [[ "$FILENAME" == *"$BASE_LOCALE"* ]]; then
        # Replace "en-US" with the actual locale in the filename
        NEW_FILENAME="${FILENAME//$BASE_LOCALE/$LOCALE}"
        NEW_FILE_PATH="$locale_dir/$NEW_FILENAME"

        # Rename the file
        mv "$file" "$NEW_FILE_PATH"

        echo "Renamed: $FILENAME → $NEW_FILENAME"
      fi
    done
  fi
done

echo "Translation renaming completed."