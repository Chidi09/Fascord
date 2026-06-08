import os
from PIL import Image

def recolor_blue_to_white(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} - not found")
        return
        
    img = Image.open(filepath).convert("RGBA")
    pixels = list(img.getdata())
    
    new_pixels = []
    count = 0
    for p in pixels:
        r, g, b, a = p
        
        # If the pixel is blue-dominant (this safely ignores the orange icon where Red is dominant)
        if a > 0 and b > r and b > g - 10:
            # It's part of the text! Convert it to pure white, but keep the original transparency (alpha)
            # to preserve the smooth anti-aliased edges of the letters.
            new_pixels.append((255, 255, 255, a))
            count += 1
        else:
            new_pixels.append(p)
            
    img.putdata(new_pixels)
    img.save(filepath)
    print(f"Recolored {count} text pixels to white in {filepath}")

# We only need to update the main logo that appears in the navbar/footer.
# The favicons are just the cropped orange icon, but we can run it on them just in case they have text.
files_to_update = [
    "/root/dev/Fascord/public/images/fascord-logo.png",
    # We will not update the favicons since the user specifically mentioned the navbar,
    # and the favicons are usually just the cropped logo icon anyway.
]

for f in files_to_update:
    recolor_blue_to_white(f)
