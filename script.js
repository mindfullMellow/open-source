async function fetchCryptoData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1"
  );
  const data = await response.json();

  // Format data for the chart
  return data.map((point) => ({
    x: new Date(point[0]), // Timestamp
    y: [point[1], point[2], point[3], point[4]], // [Open, High, Low, Close]
  }));
}

async function createChart() {
  const seriesData = await fetchCryptoData();

  const options = {
    series: [
      {
        data: seriesData, // Pass formatted data
      },
    ],
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const chart = new ApexCharts(document.querySelector("#cryptoChart"), options);
  chart.render();
}

createChart();
