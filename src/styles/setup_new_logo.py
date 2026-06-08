import shutil
from PIL import Image

source_img_path = "/root/dev/Fascord/ChatGPT Image Jun 1, 2026, 12_40_00 PM.png"
main_logo_path = "/root/dev/Fascord/public/images/fascord-logo.png"

# 1. Copy it as the main logo
shutil.copy(source_img_path, main_logo_path)
print(f"Replaced {main_logo_path} with new clean logo")

# 2. Open image to generate tight favicons
img = Image.open(source_img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Crop to the actual non-transparent content
    img_cropped = img.crop(bbox)
else:
    img_cropped = img

# Make it a perfect square based on the cropped content
c_width, c_height = img_cropped.size
max_dim = max(c_width, c_height)

# Create a new square transparent image
square_img = Image.new("RGBA", (max_dim, max_dim), (0,0,0,0))
offset = ((max_dim - c_width) // 2, (max_dim - c_height) // 2)
square_img.paste(img_cropped, offset)

# Optional slight zoom (10%) to remove more empty space and make the icon massive
crop_margin = int(max_dim * 0.1)
square_img = square_img.crop((crop_margin, crop_margin, max_dim - crop_margin, max_dim - crop_margin))

# 3. Generate all favicons
favicon_paths_and_sizes = {
    "/root/dev/Fascord/public/favicon-16x16.png": 16,
    "/root/dev/Fascord/public/favicon-32x32.png": 32,
    "/root/dev/Fascord/public/apple-touch-icon.png": 180,
    "/root/dev/Fascord/public/android-chrome-192x192.png": 192,
    "/root/dev/Fascord/public/android-chrome-512x512.png": 512
}

for path, size in favicon_paths_and_sizes.items():
    resized = square_img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(path)
    print(f"Generated {path}")

# Generate favicon.ico
icon_sizes = [(16, 16), (32, 32), (48, 48)]
square_img.save("/root/dev/Fascord/public/favicon.ico", format="ICO", sizes=icon_sizes)
print("Generated new favicon.ico")
