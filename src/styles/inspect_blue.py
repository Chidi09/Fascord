from PIL import Image
from collections import Counter

img = Image.open("/root/dev/Fascord/public/images/fascord-logo.png").convert("RGBA")
pixels = list(img.getdata())

# Look for non-transparent pixels that are NOT orange/red (to find the blue text)
text_pixels = []
for p in pixels:
    if p[3] > 0: # Not fully transparent
        # If it's not predominantly red/orange (where Red > 150 and Green < 150)
        if not (p[0] > 150 and p[1] < 150):
            text_pixels.append((p[0], p[1], p[2]))

counter = Counter(text_pixels)
print("Top 15 text colors:")
for color, count in counter.most_common(15):
    print(f"RGB{color}: {count} pixels")
