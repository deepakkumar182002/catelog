import fitz
import os

doc = fitz.open('Experience Life furniture catalogue.pdf')

dest_dirs = [
    'public/images/products',
    'public/images/details',
    'public/images/materials',
    'public/images/finishes',
    'public/images/hardware',
    'public/images/technical',
    'public/images/lifestyle'
]
for d in dest_dirs:
    os.makedirs(d, exist_ok=True)

def save_xref(xref, target_path):
    base = doc.extract_image(xref)
    with open(target_path, 'wb') as f:
        f.write(base['image'])
    w = base['width']
    h = base['height']
    print(f"Saved {target_path} ({w}x{h})")

# Products
save_xref(364, 'public/images/products/executive-work-desk.png')
save_xref(557, 'public/images/products/el-d01-executive-desk.png')
save_xref(560, 'public/images/products/el-d02-minimal-desk.png')
save_xref(564, 'public/images/products/el-d03-z-frame-desk.png')
save_xref(567, 'public/images/products/el-d04-modern-coffee-table.png')

# Details
save_xref(403, 'public/images/details/tabletop-detail.png')
save_xref(406, 'public/images/details/drawer-detail.png')
save_xref(409, 'public/images/details/metalframe-detail.png')
save_xref(411, 'public/images/details/xsupport-detail.png')

# Dimensions & Technical
save_xref(430, 'public/images/technical/desk-dimensions.png')
save_xref(436, 'public/images/technical/desk-front-view.png')
save_xref(437, 'public/images/technical/desk-side-view.png')
save_xref(440, 'public/images/technical/desk-top-view.png')

# Materials
save_xref(462, 'public/images/materials/oak.png')
save_xref(465, 'public/images/materials/teak.png')
save_xref(469, 'public/images/materials/walnut.png')
save_xref(473, 'public/images/materials/sheesham.png')
save_xref(479, 'public/images/materials/thickness-18mm.png')
save_xref(480, 'public/images/materials/thickness-25mm.png')

# Finishes
save_xref(502, 'public/images/finishes/matte-black.png')
save_xref(503, 'public/images/finishes/graphite-grey.png')
save_xref(504, 'public/images/finishes/white.png')
save_xref(506, 'public/images/finishes/custom-colour.png')

# Hardware
save_xref(524, 'public/images/hardware/telescopic-channel.png')
save_xref(525, 'public/images/hardware/telescopic-detail.png')
save_xref(529, 'public/images/hardware/drawer-box.png')
save_xref(532, 'public/images/hardware/drawer-plywood.png')
save_xref(533, 'public/images/hardware/profile-handle.png')
save_xref(534, 'public/images/hardware/handle-detail.png')
save_xref(537, 'public/images/hardware/side-cabinet.png')
save_xref(541, 'public/images/hardware/cabinet-panel.png')

# Lifestyle & Editorial
save_xref(349, 'public/images/lifestyle/hero-editorial.png')
save_xref(381, 'public/images/lifestyle/workspace-space.png')
save_xref(594, 'public/images/lifestyle/craftsmanship.png')
save_xref(577, 'public/images/lifestyle/about-lifestyle.png')

print("All assets categorized and saved successfully!")
