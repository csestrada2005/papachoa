

# Plan: Pagina de Catalogo

## Resumen

Crear una pagina de catalogo (`/catalogo`) que muestre los productos organizados por colecciones, con fotos grandes, filtros simples y precios visibles. Diseno mobile-first que mantenga el estilo editorial y organico de la marca.

---

## Estructura de la Pagina

```text
+----------------------------------+
|           Header                 |
+----------------------------------+
|      Hero del Catalogo           |
|  "Nuestra Coleccion"             |
+----------------------------------+
|     Filtros por Coleccion        |
|  [Todos] [Bebe] [Familia] ...    |
+----------------------------------+
|                                  |
|     Grid de Productos            |
|  +--------+  +--------+          |
|  | Foto   |  | Foto   |          |
|  | Nombre |  | Nombre |          |
|  | $XXX   |  | $XXX   |          |
|  +--------+  +--------+          |
|                                  |
+----------------------------------+
|           Footer                 |
+----------------------------------+
```

---

## Archivos a Crear/Modificar

### 1. Nuevo archivo: `src/pages/Catalogo.tsx`
Pagina principal del catalogo que incluye:
- Hero compacto con titulo y subtitulo
- Filtros de coleccion (tabs/pills horizontales con scroll en mobile)
- Grid de productos responsivo (2 columnas mobile, 3 desktop)

### 2. Nuevo archivo: `src/data/products.ts`
Datos placeholder de productos con:
- id, nombre, precio, coleccion, imagen (placeholder.svg por ahora)
- Colecciones: recien-nacido, bebe-cobijo, pijamas-familiares, sacos-nidos, regalo

### 3. Nuevo archivo: `src/components/catalog/ProductCard.tsx`
Tarjeta de producto con:
- Foto grande con bordes organicos (rounded-3xl)
- Nombre del producto
- Precio visible
- Hover sutil con escala
- Link a pagina de producto (placeholder por ahora)

### 4. Nuevo archivo: `src/components/catalog/CollectionFilter.tsx`
Filtros simples como pills horizontales:
- Scroll horizontal en mobile
- Opcion "Todos" por defecto
- Cada coleccion con su color sutil de fondo

### 5. Modificar: `src/App.tsx`
Agregar ruta `/catalogo` para la nueva pagina

---

## Diseno Visual

### Mobile-First
- Grid de 2 columnas con gap reducido
- Filtros como pills con scroll horizontal
- Fotos grandes que dominan la tarjeta
- Precios claros pero no agresivos

### Desktop
- Grid de 3 columnas con mas espacio
- Filtros centrados
- Hover states mas pronunciados

### Paleta y Estilo
- Mantiene colores papachoa (cream, blush, sage, sky)
- Bordes organicos (rounded-3xl)
- Tipografia Fraunces para titulos, Nunito para precios
- Sin saturacion, sin look "tienda departamental"

---

## Datos de Productos (Placeholder)

```text
Recien Nacido:
- Set bienvenida recien nacido - $890
- Cobija primera siesta - $650
- Mameluco estrellitas - $450

Bebe & Cobijo:
- Cobija abrazo suave - $780
- Pijama dulces suenos - $520
- Set cobija + gorro - $890

Pijamas Familiares:
- Pijama mama + bebe - $1,290
- Set familia completa - $2,450
- Pijama papa oso - $680

Sacos & Nidos:
- Saco de dormir nube - $950
- Nido para bebe - $1,180
- Saco transicion - $720

Listo para Regalar:
- Caja regalo baby shower - $1,450
- Set primeros meses - $980
- Canasta apapacho - $1,650
```

---

## Detalles Tecnicos

### Estado y Filtrado
- useState para manejar la coleccion seleccionada
- Filtrado simple del array de productos
- useMemo para optimizar el filtrado

### Animaciones
- Transicion suave al cambiar filtros
- Hover scale en tarjetas de producto
- Fade-in al cargar productos

### Accesibilidad
- Links semanticos para cada producto
- Alt text descriptivo en imagenes
- Focus states visibles en filtros

---

## Resultado Esperado

Una pagina de catalogo que:
- Se siente premium y editorial, no como tienda generica
- Muestra precios de forma clara pero elegante
- Permite filtrar por coleccion facilmente
- Funciona perfectamente en mobile
- Mantiene la esencia calida y organica de Papachoa

