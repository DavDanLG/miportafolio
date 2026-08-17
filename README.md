# Portafolio — David Daniel Leon Garcia

Portafolio profesional de **Data Analyst | Business Intelligence | Data Scientist**.

## Estructura

```
Mi portafolio/
├── index.html
├── pages/
│   ├── trayectoria.html
│   ├── proyectos.html
│   ├── certificados.html
│   └── contacto.html
├── components/
│   ├── header.html
│   ├── footer.html
│   └── card.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── img/
│   │   ├── perfil.png
│   │   ├── certificados/   ← colocar aquí: cisco.png, inei.png, microsoft.png
│   │   └── proyectos/      ← colocar aquí: dashboard1.png, etl.png
│   └── fonts/
└── CV_David.pdf            ← opcional: coloca tu CV aquí
```

## Imágenes esperadas

**Certificados** (`assets/img/certificados/`):
- `cisco.png`
- `inei.png`
- `microsoft.png`

**Proyectos** (`assets/img/proyectos/`):
- `dashboard1.png`
- `etl.png`

**Perfil**: `assets/img/perfil.png` (ya incluido)

## Cómo verlo

Abre `index.html` con un servidor local (necesario por el `fetch` de header/footer):

```bash
# Con Python
python -m http.server 8000

# O con VS Code: extensión Live Server
```

Luego visita `http://localhost:8000`.

## Notas

- El menú se adapta automáticamente según estés en la raíz o en `/pages/`.
- El formulario de contacto valida campos y correo (solo frontend; no envía a un servidor).
- Coloca tu PDF del CV como `CV_David.pdf` en la raíz del proyecto.
