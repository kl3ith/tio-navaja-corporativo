"""
Prepara los assets de marca para el sitio, a partir de la carpeta
`Logos y Elementos` que entregó Tío Navaja.

Salen dos familias:

  · Máscaras (`src/assets/brand/*.png`, blanco sobre transparente). El color
    lo pone el CSS con mask-image, así que el mismo archivo sirve en crema,
    naranja o vino sin duplicarlo.
  · Piezas a color (`*.webp`), para lo que tiene más de una tinta: el Tío
    y la navaja.

Uso:  python3 assets-src/build-brand.py
      BRAND_SRC=/ruta/a/"Logos y Elementos" python3 assets-src/build-brand.py
"""
from PIL import Image, ImageFilter
import numpy as np
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CANDIDATES = [
    os.environ.get('BRAND_SRC'),
    os.path.join(HERE, '..', '..', 'Logos y Elementos'),
    os.path.expanduser(
        '~/Library/Mobile Documents/com~apple~CloudDocs/IA/Clientes/'
        'TIO NAVAJA/Logos y Elementos'
    ),
]
SRC = next((c for c in CANDIDATES if c and os.path.isdir(c)), None)
if SRC is None:
    sys.exit('No encuentro "Logos y Elementos". Pásala con BRAND_SRC=...')

OUT = os.path.join(HERE, '..', 'src', 'assets', 'brand')
os.makedirs(OUT, exist_ok=True)

CREAM = (243, 239, 228)
PETROL = (0, 76, 69)
NIGHT = (16, 16, 33)
ORANGE = (255, 128, 64)


def load(*parts):
    return Image.open(os.path.join(SRC, *parts)).convert('RGBA')


def trim(im):
    box = im.getchannel('A').getbbox()
    return im.crop(box) if box else im


def fit(im, w=None, h=None):
    """Escala manteniendo proporción, sin agrandar de más."""
    iw, ih = im.size
    if w:
        h = round(ih * w / iw)
    else:
        w = round(iw * h / ih)
    return im.resize((w, h), Image.LANCZOS)


def mask(im, name, width):
    """Guarda sólo la silueta: blanco + el alfa original."""
    im = fit(trim(im), w=width)
    a = im.getchannel('A')
    out = Image.merge('RGBA', (
        Image.new('L', im.size, 255),
        Image.new('L', im.size, 255),
        Image.new('L', im.size, 255),
        a,
    ))
    path = os.path.join(OUT, f'{name}.png')
    out.save(path, optimize=True)
    print(f'{name}.png  {out.size[0]}×{out.size[1]}  {os.path.getsize(path)//1024} kB')


def tint(im, name, width, rgb):
    """
    Misma silueta, tinta plana. Los logotipos van así y no como máscara
    CSS: si el navegador no soportara mask-image, el logotipo —que es lo
    último que puede fallar— desaparecería de la página.
    """
    im = fit(trim(im), w=width)
    a = im.getchannel('A')
    flat = Image.new('RGBA', im.size, rgb + (255,))
    flat.putalpha(a)
    path = os.path.join(OUT, f'{name}.png')
    flat.save(path, optimize=True)
    print(f'{name}.png  {flat.size[0]}×{flat.size[1]}  {os.path.getsize(path)//1024} kB')


def recolor(im, name, width, dark, light):
    """Dos tintas: lo oscuro pasa a `dark`, lo claro a `light`."""
    im = fit(trim(im), w=width)
    arr = np.array(im)
    lum = arr[..., :3].mean(axis=2)
    solid = arr[..., 3] > 8
    arr[..., :3] = np.where(
        (lum[..., None] < 128) & solid[..., None], dark, light
    )
    out = Image.fromarray(arr, 'RGBA')
    path = os.path.join(OUT, f'{name}.webp')
    out.save(path, 'WEBP', quality=90, method=6)
    print(f'{name}.webp  {out.size[0]}×{out.size[1]}  {os.path.getsize(path)//1024} kB')


def color(im, name, width):
    """Tal cual viene, sólo recortado y escalado."""
    im = fit(trim(im), w=width)
    path = os.path.join(OUT, f'{name}.webp')
    im.save(path, 'WEBP', quality=90, method=6)
    print(f'{name}.webp  {im.size[0]}×{im.size[1]}  {os.path.getsize(path)//1024} kB')


def crab_from_background(name, width):
    """
    El cangrejo no vino suelto: hay que recortarlo del fondo BG3.
    Las patas son finas y el antialias las separa del cuerpo, así que
    la búsqueda se hace sobre una versión dilatada de la máscara y luego
    se recorta la máscara real con ese contorno.
    """
    bg = Image.open(os.path.join(SRC, 'Backgrounds', 'BG3-100.jpg')).convert('RGB')
    arr = np.array(bg).astype(int)
    # naranja del patrón (#ff8040) contra el verde petróleo del fondo
    is_crab = (
        (arr[..., 0] > 120)
        & (arr[..., 0] > arr[..., 1] + 40)
        & (arr[..., 0] > arr[..., 2] + 40)
    )
    crab_img = Image.fromarray((is_crab * 255).astype('uint8'), 'L')
    fat = np.array(crab_img.filter(ImageFilter.MaxFilter(7))) > 127

    h, w = fat.shape
    seen = np.zeros_like(fat)
    best = None
    # Recorre semillas hacia el centro y se queda con el primer bicho
    # completo: ni tocando el borde ni partido por él.
    for sy in range(h // 4, 3 * h // 4, 3):
        for sx in range(w // 4, 3 * w // 4, 3):
            if not fat[sy, sx] or seen[sy, sx]:
                continue
            stack = [(sy, sx)]
            seen[sy, sx] = True
            pts = []
            while stack:
                y, x = stack.pop()
                pts.append((y, x))
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        ny, nx = y + dy, x + dx
                        if (0 <= ny < h and 0 <= nx < w
                                and fat[ny, nx] and not seen[ny, nx]):
                            seen[ny, nx] = True
                            stack.append((ny, nx))
            ys = [p[0] for p in pts]
            xs = [p[1] for p in pts]
            y0, y1, x0, x1 = min(ys), max(ys), min(xs), max(xs)
            touches_edge = y0 <= 1 or x0 <= 1 or y1 >= h - 2 or x1 >= w - 2
            if touches_edge or len(pts) < 900:
                continue
            best = (x0, y0, x1 + 1, y1 + 1)
            break
        if best:
            break
    if best is None:
        sys.exit('No pude aislar un cangrejo completo en BG3')

    alpha = crab_img.crop(best)
    piece = Image.merge('RGBA', (
        Image.new('L', alpha.size, 255),
        Image.new('L', alpha.size, 255),
        Image.new('L', alpha.size, 255),
        alpha,
    ))
    piece = fit(piece, w=width)
    path = os.path.join(OUT, f'{name}.png')
    piece.save(path, optimize=True)
    print(f'{name}.png  {piece.size[0]}×{piece.size[1]}  {os.path.getsize(path)//1024} kB')


# ── Logotipos: tinta plana, se usan como <img> ───────────────────────────
tint(load('Logos', 'Logo2.png'), 'logo-horizontal-cream', 760, CREAM)
tint(load('Logos', 'Logo2.png'), 'logo-horizontal-night', 760, NIGHT)
tint(load('Logos', 'Logo1.png'), 'logo-apilado-cream', 640, CREAM)
tint(load('Logos', 'Logo3.png'), 'firma-cream', 720, CREAM)
tint(load('Logos', 'Logo3.png'), 'firma-orange', 720, ORANGE)
tint(load('Elementos gráficos', 'emc.png'), 'emc-cream', 520, CREAM)

# ── Motivos para los patrones de fondo ───────────────────────────────────
mask(load('Elementos gráficos', 'Palemras.png'), 'motivo-palmera', 150)
mask(load('Elementos gráficos', 'Atomo.png'), 'motivo-atomo', 150)
mask(load('Elementos gráficos', 'Bombilla.png'), 'motivo-bombilla', 150)

# ── Piezas a color ───────────────────────────────────────────────────────
recolor(load('Elementos gráficos', 'Tio1.png'), 'tio', 520, CREAM, PETROL)
recolor(load('Elementos gráficos', 'Tio2.png'), 'tio-abrigo', 520, CREAM, PETROL)
# y en su tinta original, para cuando el fondo es claro
recolor(load('Elementos gráficos', 'Tio1.png'), 'tio-oscuro', 520, (16, 16, 33), CREAM)
color(load('Elementos gráficos', 'Navaja4.png'), 'navaja', 560)
mask(load('Elementos gráficos', 'Navaja1.png'), 'motivo-navaja', 150)


# ── Favicon: la navaja de la casa sobre el verde de la marca ─────────────
def favicon():
    navaja = trim(load('Elementos gráficos', 'Navaja1.png'))
    for size, name in ((256, 'favicon.png'), (180, 'apple-touch-icon.png')):
        canvas = Image.new('RGBA', (size, size), PETROL + (255,))
        art = navaja.copy()
        art.thumbnail((round(size * 0.78), round(size * 0.78)), Image.LANCZOS)
        # la silueta en crema, que es como se lee a 16 px
        flat = Image.new('RGBA', art.size, CREAM + (255,))
        flat.putalpha(art.getchannel('A'))
        canvas.paste(
            flat,
            ((size - art.size[0]) // 2, (size - art.size[1]) // 2),
            flat,
        )
        path = os.path.join(HERE, '..', 'public', name)
        canvas.save(path, optimize=True)
        print(f'{name}  {size}×{size}  {os.path.getsize(path)//1024} kB')


favicon()
