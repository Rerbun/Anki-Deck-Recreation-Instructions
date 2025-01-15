# Flag Anki Deck

This script will retrieve the flag images and names from https://commons.wikimedia.org/wiki/Sovereign-state_flags. It will download the flag images to `./flags/*` and the flag names and flag image paths with a timestamp field to `./flags.csv`.

# How to create an up to date flag deck

1. Install Node, download this project, go to this directory and run `npm install` and `npm start`
2. Move the images inside ./flags to the Anki media folder; see more here: https://docs.ankiweb.net/media
3. Create a new deck in Anki
4. Go to File -> Import... to import the CSV in your new deck. Make sure the right deck is selected when importing
5. Feel free to pick whether you want to have the timestamp added as a tag, this will make updating easier if flags have different filenames by picking what field 3 will do.

# How to update the flag deck

1. Run step 1 from the creation steps above.
2. Move the images to the flags folder like step 2 in the creation steps above, you can overwrite them to have the latest version for all flags.
3. Do step 4 from the creation step above.
4. Browse through the deck after it is updated, you can add more columns to the browse window, you can suspend or delete notes that are duplicate, using the timestamp to see which ones got duplicated (ones that are duplicated and not updated will have a different timestamp tag). You can also toggle the "Created" column to make it easier to see. When cards are duplicated it might be a good idea to pick the newest one over the existing one, since they probably got updated.
