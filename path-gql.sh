#!/bin/bash

# Define the paths of the files
file1="node_modules/@whatwg-node/fetch/dist/create-node-ponyfill.js"
file2="node_modules/@whatwg-node/server/node_modules/@whatwg-node/fetch/dist/create-node-ponyfill.js"

# Function to replace string in a file
replace_string_in_file() {
    local file=$1
    local search_string=$2
    local replace_string=$3

    # Check if the file exists
    if [ -f "$file" ]; then
        # Use sed to replace the string. Note the '' after -i for macOS compatibility
        sed -i '' "s/$search_string/$replace_string/g" "$file"
        echo "Replaced in $file"
    else
        echo "File not found: $file"
    fi
}

# Strings to be replaced
search_string="stream\/web"
replace_string="readable-stream"

# Replace in both files
replace_string_in_file "$file1" "$search_string" "$replace_string"
replace_string_in_file "$file2" "$search_string" "$replace_string"
