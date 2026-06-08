import os
from PIL import Image

def is_red(r, g, b):
    # Detect red color (high red, low green and blue)
    return r > 150 and g < 100 and b < 100

def replace_color(path):
    try:
        img = Image.open(path)
        img = img.convert("RGBA")
        data = img.getdata()
        
        new_data = []
        changed = False
        for item in data:
            if is_red(item[0], item[1], item[2]):
                # Replace with orange: #F25C05 -> (242, 92, 5, item[3])
                new_data.append((242, 92, 5, item[3]))
                changed = True
            else:
                new_data.append(item)
                
        if changed:
            img.putdata(new_data)
            # save as original format or PNG if it has transparency
            if path.endswith('.jpeg') or path.endswith('.jpg'):
                img = img.convert("RGB")
                img.save(path)
            else:
                img.save(path)
            print(f"Changed red to orange in {path}")
        else:
            print(f"No red found in {path}")
    except Exception as e:
        print(f"Error processing {path}: {e}")

# Apply to logos and favicons
for file in os.listdir('public'):
    if file.endswith('.png') or file.endswith('.jpeg') or file.endswith('.jpg'):
        replace_color(os.path.join('public', file))
