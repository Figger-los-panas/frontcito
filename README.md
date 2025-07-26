# Análisis de Datos - Dashboard Frontend

Una aplicación web moderna para análisis y visualización de datos construida con React, TypeScript y Vite.

## 🚀 Características

- **Autenticación Simulada**: Login falso para demostración
- **Dashboard Interactivo**: Panel de control con métricas y visualizaciones
- **Visualizaciones de Datos**: Gráficas de barras, líneas y circular
- **Datos Tabulares**: Tabla interactiva con información detallada
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Métricas en Tiempo Real**: Tarjetas de métricas con indicadores de cambio

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **Recharts** - Biblioteca de gráficas para React
- **Lucide React** - Iconos modernos
- **CSS3** - Estilos personalizados con diseño moderno

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Login.tsx        # Componente de autenticación
│   ├── MetricCard.tsx   # Tarjetas de métricas
│   ├── DataTable.tsx    # Tabla de datos
│   └── charts/          # Componentes de gráficas
│       ├── BarChart.tsx
│       ├── LineChart.tsx
│       └── PieChart.tsx
├── pages/               # Páginas principales
│   └── Dashboard.tsx    # Dashboard principal
├── types/               # Definiciones de tipos TypeScript
│   └── dashboard.ts
├── data/                # Datos de ejemplo
│   └── mockData.ts
├── styles/              # Archivos CSS
│   ├── Login.css
│   └── Dashboard.css
└── App.tsx              # Componente principal
```

## 🎯 Funcionalidades

### Página de Login
- Interfaz moderna con gradientes
- Validación básica de formulario
- Acceso con cualquier credencial (demo)

### Dashboard Principal
- **Panel Izquierdo (Datos)**:
  - Tabla con datos de productos
  - Estadísticas resumidas
  - Información de categorías
  
- **Panel Derecho (Visualizaciones)**:
  - Gráfica de barras: Ventas y usuarios por mes
  - Gráfica de líneas: Tendencia de ingresos
  - Gráfica circular: Distribución por categorías
  - Panel de insights clave

### Métricas Destacadas
- Usuarios totales con porcentaje de cambio
- Ventas del mes
- Tasa de conversión
- Ingresos totales

## 🚀 Instalación y Uso

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📊 Datos de Ejemplo

La aplicación incluye datos simulados para demostración:
- 8 productos con diferentes categorías
- Datos mensuales de ventas, usuarios e ingresos
- Métricas de rendimiento con indicadores de cambio
- Distribución por categorías (Tecnología, Marketing, Ventas, RRHH)

## 🎨 Diseño

- **Tema Principal**: Azul y morado con gradientes
- **Tipografía**: Inter y fuentes del sistema
- **Layout**: Grid responsivo con dos paneles
- **Componentes**: Diseño modular y reutilizable
- **Interactividad**: Hover effects y transiciones suaves

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run lint` - Análisis de código con ESLint
- `npm run preview` - Vista previa de la construcción

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Layout de dos columnas
- **Tablet**: Adaptación del grid
- **Mobile**: Stack vertical de componentes
