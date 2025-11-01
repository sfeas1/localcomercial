document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("promoForm");
  const promoSelect = document.getElementById("promocion");
  const productosContainer = document.getElementById("productosContainer");
  const resultado = document.getElementById("resultado");

  const precios = {
    "Rack Minimalista": 260000,
    "Rack Industrial": 280000,
    "Rack Escandinavo": 310000,
    "Lámpara Clásica": 85000,
    "Lámpara Moderna": 95000,
    "Tiras LED exteriores": 120000
  };

  promoSelect.addEventListener("change", () => {
    productosContainer.innerHTML = "";
    const promo = promoSelect.value;

    if (promo === "2x50") {
      productosContainer.innerHTML = `
        <label for="rack1">Seleccioná el primer rack:</label>
        <select id="rack1" required>
          <option value="">-- Elegí un rack --</option>
          ${Object.keys(precios)
            .filter(p => p.includes("Rack"))
            .map(p => `<option value="${p}">${p} - $${precios[p].toLocaleString()}</option>`)
            .join("")}
        </select>

        <label for="rack2">Seleccioná el segundo rack:</label>
        <select id="rack2" required>
          <option value="">-- Elegí un rack --</option>
          ${Object.keys(precios)
            .filter(p => p.includes("Rack"))
            .map(p => `<option value="${p}">${p} - $${precios[p].toLocaleString()}</option>`)
            .join("")}
        </select>
      `;
    }

    if (promo === "3x2") {
      productosContainer.innerHTML = `
        <label for="lamp1">Seleccioná la primera lámpara:</label>
        <select id="lamp1" required>
          <option value="">-- Elegí una lámpara --</option>
          ${Object.keys(precios)
            .filter(p => p.includes("Lámpara") || p.includes("LED"))
            .map(p => `<option value="${p}">${p} - $${precios[p].toLocaleString()}</option>`)
            .join("")}
        </select>

        <label for="lamp2">Seleccioná la segunda lámpara:</label>
        <select id="lamp2" required>
          <option value="">-- Elegí una lámpara --</option>
          ${Object.keys(precios)
            .filter(p => p.includes("Lámpara") || p.includes("LED"))
            .map(p => `<option value="${p}">${p} - $${precios[p].toLocaleString()}</option>`)
            .join("")}
        </select>

        <label for="lamp3">Seleccioná la tercera lámpara:</label>
        <select id="lamp3" required>
          <option value="">-- Elegí una lámpara --</option>
          ${Object.keys(precios)
            .filter(p => p.includes("Lámpara") || p.includes("LED"))
            .map(p => `<option value="${p}">${p} - $${precios[p].toLocaleString()}</option>`)
            .join("")}
        </select>
      `;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const promo = promoSelect.value;
    let totalSinDescuento = 0;
    let descuento = 0;
    let totalFinal = 0;
    let mensaje = "";

    if (promo === "2x50") {
      const rack1 = document.getElementById("rack1").value;
      const rack2 = document.getElementById("rack2").value;

      if (!rack1 || !rack2) {
        resultado.innerHTML = "<p style='color: var(--accent-2);'>Seleccioná ambos racks.</p>";
        return;
      }

      const precio1 = precios[rack1];
      const precio2 = precios[rack2];
      totalSinDescuento = precio1 + precio2;
      descuento = Math.min(precio1, precio2) * 0.5;
      totalFinal = totalSinDescuento - descuento;
      mensaje = "Aplicaste la promo 2x50% en Racks!";
    }

    if (promo === "3x2") {
      const lamp1 = document.getElementById("lamp1").value;
      const lamp2 = document.getElementById("lamp2").value;
      const lamp3 = document.getElementById("lamp3").value;

      if (!lamp1 || !lamp2 || !lamp3) {
        resultado.innerHTML = "<p style='color: var(--accent-2);'>Seleccioná las tres lámparas.</p>";
        return;
      }

      const preciosLamps = [precios[lamp1], precios[lamp2], precios[lamp3]].sort((a, b) => b - a);
      totalSinDescuento = preciosLamps.reduce((a, b) => a + b, 0);
      descuento = preciosLamps[2]; // la más barata es gratis
      totalFinal = totalSinDescuento - descuento;
      mensaje = "Aplicaste la promo 3x2 en lámparas!";
    }

    if (totalFinal >= 300000) {
      const descuentoExtra = totalFinal * 0.1;
      totalFinal -= descuentoExtra;
      descuento += descuentoExtra;
      mensaje += " Además obtuviste un 10% adicional por transferencia bancaria!";
    }

    resultado.innerHTML = `
      <div class="card" style="margin-top: 16px;">
        <h4>Resultados</h4>
        <p><strong>Total sin descuento:</strong> $${totalSinDescuento.toLocaleString()}</p>
        <p><strong>Descuento aplicado:</strong> $${descuento.toLocaleString()}</p>
        <p><strong>Total final con ahorro:</strong> $${totalFinal.toLocaleString()}</strong></p>
        <p style="color: var(--accent-2); margin-top: 8px;">${mensaje}</p>
      </div>
    `;
  });
});
