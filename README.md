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

## � Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Login.tsx        # Autenticación
│   ├── OptimalCombinations.tsx # Combinaciones óptimas
│   ├── TemperatureMonitor.tsx # Monitor de temperatura
│   ├── HistoricalAnalysis.tsx # Análisis histórico
│   ├── PredictionAnalysis.tsx # Análisis de combinaciones
│   └── ApiStatus.tsx    # Estado de conexión API
├── hooks/               # Custom React hooks
│   └── useTemperatureData.ts # Hook para datos de temperatura
├── services/            # Servicios de API
│   └── api.ts          # Cliente HTTP
├── pages/               # Páginas principales
│   └── Dashboard.tsx    # Dashboard principal
├── types/               # Definiciones TypeScript
│   └── dashboard.ts     # Interfaces de datos
└── styles/              # Estilos CSS modulares
```

## 🎯 Funcionalidades Actuales

### Panel Principal
- **Login**: Autenticación simple (cualquier credencial)
- **Dashboard**: 3 paneles principales con datos

### Componentes Activos
- **Monitor de Temperatura**: Datos en tiempo real con estadísticas
- **Análisis Histórico**: Tendencias temporales con gráficos
- **Combinaciones Óptimas**: Tabla de datos máquina-operador

### Manejo de Errores
- **Datos de ejemplo**: Cuando la API no está disponible
- **Indicadores visuales**: Estado de conexión
- **Fallbacks automáticos**: Sin interrupciones en la UX
