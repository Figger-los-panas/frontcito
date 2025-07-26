# Cygger Dashboard

Dashboard web para análisis de temperatura y optimización industrial.

## 🚀 Instalación

```bash
npm install
npm run dev
```

## 📊 Funcionalidades

- **Monitoreo de temperatura** en tiempo real
- **Análisis histórico** con gráficos interactivos  
- **Combinaciones óptimas** máquina-operador
- **Dashboard responsivo** con manejo de errores

## 🔗 Endpoints API

- `GET /api/v1/combinations` - Combinaciones óptimas
- `GET /api/v1/temperature/historical` - Datos históricos
- `GET /api/v1/health` - Estado de la API

## 🛠️ Stack

- React 19 + TypeScript
- Vite 7.0  
- Lucide React (iconos)
- CSS3

## 📝 Uso

1. Ejecutar: `npm run dev`
2. Abrir: `http://localhost:5173`
3. Login con cualquier credencial
4. Explorar dashboard con datos en tiempo real

> **Nota**: Si la API backend no está disponible, se muestran datos de ejemplo automáticamente.

## ✨ Características Principales

- 🔐 **Sistema de Autenticación** - Acceso seguro al dashboard
- 🌡️ **Monitoreo de Temperatura** - Visualización en tiempo real de sensores Control INGE LEAN
- � **Sistema de Alertas** - Detección automática de temperaturas críticas
- 📊 **Estadísticas en Vivo** - Análisis de datos en tiempo real
- 🔗 **Integración API** - Conexión directa con backend de sensores
- 📱 **Diseño Responsivo** - Adaptado para todos los dispositivos

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 con TypeScript
- **Build Tool**: Vite 7.0
- **Icons**: Lucide React
- **Styling**: CSS3 modular
- **API**: Fetch nativo con manejo de errores
- **Linting**: ESLint con configuración TypeScript estricta

## 🎨 Diseño & UX

- **Esquema de Colores**: Naranja (#ff6b35), Negro (#1a1a1a), Blanco (#ffffff)
- **Branding**: Cygger - Soluciones de monitoreo Control INGE LEAN
- **Tipografía**: Inter con fallbacks del sistema
- **Layout**: Diseño centrado optimizado para datos de temperatura

## 📊 Datos Soportados

La aplicación procesa y visualiza los siguientes tipos de datos Control INGE LEAN:

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
- **Servidor API** ejecutándose en `http://localhost:8000` (para datos de temperatura en tiempo real)

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

### 🌡️ Integración con API de Temperatura

El dashboard ahora incluye monitoreo de temperatura en tiempo real mediante conexión con una API externa:

**Endpoint:** `POST http://localhost:8000/api/v1/temperature/`

**Formato de petición:**
```bash
curl -X POST "http://localhost:8000/api/v1/temperature/" \
  -H "Content-Type: application/json" \
  -d '{"limit": 100}'
```

**Características de la integración:**
- 🔄 Actualización automática de datos
- 🚨 Alertas de temperatura crítica (>80°C)
- ⚠️ Avisos de temperatura elevada (>70°C)
- 📊 Estadísticas en tiempo real (promedio, máxima, críticas)
- 🔗 Indicador de estado de conexión con la API
- 📱 Interfaz responsive para monitoreo móvil

**Estados de temperatura:**
- 🟢 **Normal**: < 70°C
- 🟡 **Alerta**: 70°C - 80°C  
- 🔴 **Crítico**: > 80°C

## 📁 Arquitectura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Login.tsx        # Autenticación
│   ├── OptimalCombinations.tsx # Visor de combinaciones óptimas
│   ├── TemperatureMonitor.tsx # Monitoreo de temperatura API
│   ├── HistoricalAnalysis.tsx # Análisis histórico
│   ├── PredictionAnalysis.tsx # Análisis de predicciones
│   └── ApiStatus.tsx    # Estado de conexión API
├── hooks/               # Custom React hooks
│   └── useTemperatureData.ts # Hook para datos de temperatura
├── services/            # Servicios de API
│   └── api.ts          # Cliente HTTP para comunicación con backend
├── pages/               # Páginas principales
│   └── Dashboard.tsx    # Dashboard principal
├── types/               # Definiciones TypeScript
│   └── dashboard.ts     # Interfaces de datos Control INGE LEAN y API
├── styles/              # Estilos CSS modulares
│   ├── Login.css
│   ├── Dashboard.css
│   ├── TemperatureMonitor.css
│   ├── HistoricalAnalysis.css
│   ├── PredictionAnalysis.css
│   └── OptimalCombinations.css
└── App.tsx              # Componente raíz
```

## 🎯 Funcionalidades del Dashboard

### Panel de Métricas
- **Producción Total**: Unidades fabricadas con tendencia
- **Eficiencia Promedio**: Rendimiento del sistema
- **Fallos Detectados**: Incidencias con evolución temporal
- **Consumo Energético**: Monitoreo de recursos

### 🌡️ Monitoreo de Temperatura en Tiempo Real
- **Conexión API**: Integración con endpoint de temperatura
- **Estados Visuales**: Normal, Alerta y Crítico
- **Estadísticas Live**: Promedio, máxima y conteo de críticas
- **Lista Detallada**: Últimas 10 lecturas con timestamps
- **Indicador de Conectividad**: Estado de la API en tiempo real

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

**Figger-los-panas** - Soluciones tecnológicas Control INGE LEAN

---

🔥 **Cygger** - Transformando datos Control INGE LEAN en insights accionables
