"""
Genera las fotografías del menú en WebP 4:5 dentro de src/assets/photos/.

Las fuentes son las fotos que el propio Tío Navaja entregó para el brochure
de boquitas. Sólo se usan platos que aparecen igual en el menú corporativo;
las fuentes no se versionan aquí para no inflar el repo, así que el script
las busca donde suelen estar. Si están en otro sitio:

    TN_BOQUITAS_SRC=/ruta/a/assets-src python3 assets-src/build-photos.py

Los originales sin recortar del cliente están en ~/Desktop/TN_Brochures/Boquitas,
pero con otros nombres: la fuente que usa este script es la carpeta `assets-src`
del proyecto tio-navaja-boquitas.

Uso:  python3 assets-src/build-photos.py
"""
from PIL import Image
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CLIENTES = os.path.expanduser(
    '~/Library/Mobile Documents/com~apple~CloudDocs/IA/Clientes'
)
CANDIDATES = [
    os.environ.get('TN_BOQUITAS_SRC'),
    os.path.join(HERE, '..', '..', 'tio-navaja-boquitas', 'assets-src'),
    os.path.join(CLIENTES, 'PARA PRUEBAS', 'tio-navaja-boquitas', 'assets-src'),
    os.path.join(CLIENTES, 'TIO NAVAJA', 'tio-navaja-boquitas', 'assets-src'),
]
SRC = next((c for c in CANDIDATES if c and os.path.isdir(c)), None)
if SRC is None:
    sys.exit(
        'No encuentro las fotos fuente. Pasa la carpeta con TN_BOQUITAS_SRC=...\n'
        'Buscadas:\n  ' + '\n  '.join(c for c in CANDIDATES if c)
    )

OUT = os.path.join(HERE, '..', 'src', 'assets', 'photos')
os.makedirs(OUT, exist_ok=True)

TARGET = (800, 1000)  # 4:5, suficiente para la tarjeta y el modal en retina


def crop_45(im, box=None, anchor=0.5):
    """Recorta a 4:5. `anchor` mueve el encuadre vertical (0 = arriba)."""
    if box:
        im = im.crop(box)
    w, h = im.size
    if w / h > 0.8:                      # sobra ancho
        nw = round(h * 0.8)
        left = round((w - nw) / 2)
        im = im.crop((left, 0, left + nw, h))
    else:                                # sobra alto
        nh = round(w / 0.8)
        top = max(0, min(h - nh, round((h - nh) * anchor)))
        im = im.crop((0, top, w, top + nh))
    return im.resize(TARGET, Image.LANCZOS)


def save(im, name):
    path = os.path.join(OUT, f'{name}.webp')
    im.save(path, 'WEBP', quality=82, method=6)
    print(f'{name}.webp  {os.path.getsize(path) // 1024} kB')


def load(n):
    return Image.open(os.path.join(SRC, n)).convert('RGB')


# ── Platos con foto propia ───────────────────────────────────────────────
save(crop_45(load('yakitori.png')), 'yakitori')
save(crop_45(load('carimanola.png')), 'carimanola')
save(crop_45(load('tostadas-jamon-serrano.png')), 'tostadas')

# ── Los seis postres salen de una misma foto cenital (941x1672) ──────────
postres = load('postres.png')
CROPS = {
    'cheesecake': (40, 110, 520, 560),
    'mousse': (480, 240, 941, 700),
    'tres-leches': (20, 560, 540, 1050),
    'brownie': (470, 640, 941, 1130),
    'tartaletas': (0, 1030, 480, 1560),
    'flan': (460, 1130, 941, 1640),
}
for name, box in CROPS.items():
    save(crop_45(postres, box), name)
