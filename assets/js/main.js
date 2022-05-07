var error = document.getElementById('errorMessage');
var card = document.getElementById('card');
$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    let valueInput = $('#superheroInput').val();
    let solonumeros = /^[0-9]+$/;
    if (valueInput.match(solonumeros)) {
      $.ajax({
        url: 'https://superheroapi.com/api.php/1501982276808516/' + valueInput,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          let alianses = data.biography.aliases.map(function(item) {
            return item;
          });
          let alianse = alianses.join(', ');
        
          
          $('#superheroPerfil').html(`
          <div class="col-12 col-sm-6">
            <img src="${data.image.url}" alt="${data.name}" class="img-fluid">
          </div>
          <div class="col-12 col-sm-6 text-start" id="superheroInfo">
            <h5 class="pt-3">Nombre: ${data.name}</h5>
            <p>Conexiones: ${data.connections['group-affiliation']}</p>
            <ul class="list-group list-group-flush pb-3">
              <li class="list-group-item">Publicado por: ${data.biography.publisher} </li>
              <li class="list-group-item">Ocupación: ${data.work.occupation} </li>
              <li class="list-group-item">Primera Aparición: ${data.biography['first-appearance']} </li>
              <li class="list-group-item">Altura: ${data.appearance.height['0']} - ${data.appearance.height['1']} </li>
              <li class="list-group-item">Peso: ${data.appearance.weight['0']} - ${data.appearance.weight['1']} </li>
              <li class="list-group-item">Alianzas: ${alianse} </li>
          </ul>
          </div>
          `)

          // obtener datos de powerstats como label y 'y'
          let powerstats = data.powerstats;
          let labels = Object.keys(powerstats);
          let y = Object.values(powerstats);
          let estadisticas = [];
          estadisticas.push(labels, y);
          console.log(estadisticas);

          let config = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
              text: "Estadisticas de " + data.name
            },
            legend: {
              cursor: "pointer",
              itemclick: function(e) {
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
                } else {
                  e.dataSeries.visible = true;
                }
                chart.render();
              }
            },
            data: [{
              type: "pie",
              startAngle: 240,
              showInLegend: true,
              legendText: "{label}",
              toolTipContent: "{label} <br/> {y}",
              yValueFormatString: "\"(\"##0)",
              indexLabel: "{label} {y}",
              dataPoints: [
                { y: y[0], label: labels[0] },
                { y: y[1], label: labels[1] },
                { y: y[2], label: labels[2] },
                { y: y[3], label: labels[3] },
                { y: y[4], label: labels[4] },
                { y: y[5], label: labels[5] },
              ]
            }]
          }

          let chart = new CanvasJS.Chart("superheroStats", config);
          chart.render();
          
          
        }
      });
      error.style.display = 'none';
      card.style.display = 'block';
    } else {
      error.innerHTML = 'Ingrese un número';
      error.style.display = 'block';
      error.style.color = 'red';
      card.style.display = 'none';
    }
  });
});