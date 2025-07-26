# Cygger - Dashboard Industrial

Una aplicación web moderna para monitoreo y análisis de datos industriales construida con React, TypeScript y Vite.

## 🚀 Características

- **Autenticación Segura**: Sistema de login para acceso al dashboard
- **Monitoreo Industrial**: Panel de control especializado para datos de producción
- **Visualizaciones Avanzadas**: Gráficas de producción, eficiencia y fallos
- **Datos en Tiempo Real**: Tabla con información detallada de máquinas y operadores
- **Análisis de Fallos**: Categorización y seguimiento de tipos de fallas
- **Métricas de Rendimiento**: KPIs de producción, eficiencia y consumo energético

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
  - Tabla con datos de producción en tiempo real
  - Estadísticas de máquinas y operadores
  - Información de turnos y productos
  
- **Panel Derecho (Visualizaciones)**:
  - Gráfica de barras: Producción y eficiencia por mes
  - Gráfica de líneas: Consumo energético y tendencias
  - Gráfica circular: Distribución de tipos de fallos
  - Panel de insights industriales

### Métricas Destacadas
- Producción total con indicadores de cambio
- Eficiencia promedio del sistema
- Fallos detectados y su evolución
- Consumo energético total

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
