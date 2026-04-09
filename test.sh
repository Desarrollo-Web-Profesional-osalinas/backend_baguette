#!/bin/bash
# PRUEBA DE FUEGO

echo "Iniciando Pruebas del Fortín de la API..."
echo "------------------------------------------------------"

# 1. Prueba de inyección XSS (Debe llegar sanitizado o fallar)
echo "[1/3] Prueba de Inyección XSS (esperando escapar HTML/JS):"
curl -k -s -X POST https://localhost/api/v1/comentarios \
  -H "Content-Type: application/json" \
  -d '{"puntuacion": 5, "texto": "<script>alert(\"hack\")</script> Bueno"}'
echo -e "\n------------------------------------------------------\n"

# 2. Prueba Rate Limiting (15 peticiones)
echo "[2/3] Prueba de Rate Limiting (esperando HTTP 429 Too Many Requests a partir de la 11va):"
for i in {1..15}; do
  echo -n "Petición $i: "
  curl -k -s -o /dev/null -w "%{http_code}" -X POST https://localhost/api/v1/comentarios \
    -H "Content-Type: application/json" \
    -d '{"puntuacion": 10, "texto": "Spam"}'
  echo ""
done
echo -e "\n------------------------------------------------------\n"

# 3. Prueba Redirección 301 de http a https
echo "[3/3] Prueba de Redirección (esperando 301 Moved Permanently):"
curl -s -I http://localhost | head -n 1
echo "Destino de la redirección:"
curl -s -I http://localhost | grep -i Location
echo -e "\n------------------------------------------------------\n"
echo "Pruebas finalizadas."
