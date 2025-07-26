# 🏭 Cygger - Dashboard Industrial

Una aplicación web moderna y optimizada para monitoreo y análisis de datos industriales en tiempo real, construida con React 19, TypeScript y Vite.

## ✨ Características Principales

- 🔐 **Sistema de Autenticación** - Acceso seguro al dashboard
- 📊 **Monitoreo en Tiempo Real** - Visualización de datos de producción industrial
- 📈 **Analíticas Avanzadas** - Gráficas interactivas de rendimiento y eficiencia
- ⚠️ **Gestión de Fallos** - Detección y categorización de fallas del sistema
- 🎯 **KPIs Industriales** - Métricas clave de producción y consumo energético
- 📱 **Diseño Responsivo** - Adaptado para todos los dispositivos

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 con TypeScript
- **Build Tool**: Vite 7.0
- **Charts**: Recharts para visualizaciones
- **Icons**: Lucide React
- **Styling**: CSS3 con variables personalizadas
- **Linting**: ESLint con configuración TypeScript

## 🎨 Diseño & UX

- **Esquema de Colores**: Naranja (#ff6b35), Negro (#1a1a1a), Blanco (#ffffff)
- **Branding**: Cygger - Soluciones de monitoreo industrial
- **Tipografía**: Inter con fallbacks del sistema
- **Layout**: Grid responsivo optimizado para datos industriales

## 📊 Datos Soportados

La aplicación procesa y visualiza los siguientes tipos de datos industriales:

### Sensores y Máquinas
- `timestamp` - Marca temporal del registro
- `maquina_id` - Identificador único de máquina
- `temperatura`, `vibracion`, `humedad` - Sensores ambientales
- `tiempo_ciclo` - Duración del ciclo de producción

### Producción y Calidad
- `cantidad_producida` - Unidades fabricadas
- `unidades_defectuosas` - Control de calidad
- `eficiencia_porcentual` - Rendimiento de la máquina

### Operaciones y Personal
- `turno` - Mañana, Tarde, Noche
- `operador_id` - Identificador del operador
- `producto_id` - Tipo de producto fabricado

### Fallos y Mantenimiento
- `fallo_detectado` - Estado de la máquina
- `tipo_fallo` - Mecánico, Eléctrico, Software, Temperatura
- `paradas_programadas` / `paradas_imprevistas` - Gestión de downtime

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+ y npm
- Git

### Configuración Local
```bash
# Clonar repositorio
git clone https://github.com/Figger-los-panas/frontcito.git
cd frontcito

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Arquitectura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Login.tsx        # Autenticación
│   ├── MetricCard.tsx   # Tarjetas de KPIs
│   ├── DataTable.tsx    # Tabla de datos industriales
│   └── charts/          # Componentes de visualización
│       ├── BarChart.tsx
│       ├── LineChart.tsx
│       └── PieChart.tsx
├── pages/               # Páginas principales
│   └── Dashboard.tsx    # Dashboard principal
├── types/               # Definiciones TypeScript
│   └── dashboard.ts     # Interfaces de datos industriales
├── data/                # Mock data y utilidades
│   └── mockData.ts      # Datos de ejemplo
├── styles/              # Estilos CSS modulares
│   ├── Login.css
│   └── Dashboard.css
└── App.tsx              # Componente raíz
```

## 🎯 Funcionalidades del Dashboard

### Panel de Métricas
- **Producción Total**: Unidades fabricadas con tendencia
- **Eficiencia Promedio**: Rendimiento del sistema
- **Fallos Detectados**: Incidencias con evolución temporal
- **Consumo Energético**: Monitoreo de recursos

### Visualizaciones
- **Gráfica de Barras**: Producción y eficiencia mensual
- **Gráfica de Líneas**: Tendencias de consumo energético
- **Gráfica Circular**: Distribución de tipos de fallos
- **Insights Inteligentes**: Análisis automático de patrones

### Tabla de Datos
- Información detallada por máquina y turno
- Estados en tiempo real de operadores
- Indicadores visuales de rendimiento
- Filtrado y ordenamiento intuitivo

## ⚡ Optimizaciones Implementadas

- **Componentes Funcionales**: Eliminación de React.FC para mejor rendimiento
- **TypeScript Estricto**: Tipos readonly e interfaces inmutables
- **Imports Optimizados**: Tree-shaking mejorado
- **CSS Modular**: Reducción del bundle size
- **Lazy Loading**: Componentes bajo demanda (preparado para expansión)

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con HMR
- `npm run build` - Build optimizado para producción
- `npm run lint` - Análisis estático de código
- `npm run preview` - Preview del build de producción

## 🌐 Despliegue

El proyecto está optimizado para despliegue en:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Cualquier servidor estático

## 📈 Roadmap Futuro

- [ ] Integración con APIs reales
- [ ] Sistema de alertas en tiempo real
- [ ] Exportación de reportes PDF/Excel
- [ ] Dashboard personalizable por usuario
- [ ] Modo oscuro
- [ ] Notificaciones push
- [ ] Análisis predictivo con IA

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Desarrollado por

**Figger-los-panas** - Soluciones tecnológicas industriales

---

🔥 **Cygger** - Transformando datos industriales en insights accionables
