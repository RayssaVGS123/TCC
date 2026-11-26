function MapaRota({ origem, destino }) {
  return (
    <div className="mapa-rota" role="img" aria-label={`Prévia ilustrativa da rota de ${origem} para ${destino}`}>
      <div className="mapa-controles" aria-hidden="true"><span>+</span><span>−</span></div>
      <span className="mapa-marca d1">API KEY REQUIRED<small>carto.com/basemap/tiles</small></span>
      <span className="mapa-marca d2">API KEY REQUIRED<small>carto.com/basemap/tiles</small></span>
      <span className="mapa-marca d3">API KEY REQUIRED<small>carto.com/basemap/tiles</small></span>
      <svg className="linha-rota" viewBox="0 0 320 360" preserveAspectRatio="none" aria-hidden="true">
        <line x1="108" y1="278" x2="214" y2="91" />
      </svg>
      <span className="marcador-rota marcador-origem" aria-hidden="true">●</span>
      <span className="marcador-rota marcador-destino" aria-hidden="true">●</span>
      <span className="credito-mapa">🗺️ Leaflet | © OpenStreetMap &amp; CartoDB</span>
    </div>
  )
}

export default MapaRota
