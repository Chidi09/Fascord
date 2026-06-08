from PIL import Image

filepath = "/root/dev/Fascord/ChatGPT Image Jun 1, 2026, 12_34_54 PM.png"
img = Image.open(filepath)
width, height = img.size
print(f"New Logo Dimensions: {width}x{height}")
print(f"Format: {img.format}, Mode: {img.mode}")
