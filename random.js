function randomizeDashboardData(dashboard, interval = 5000) {
  function getRandomValue(base, variance = 0.2) {
    const factor = 1 + (Math.random() * 2 - 1) * variance;
    return Math.round(base * factor);
  }

  function randomizeLineChart(widget) {
    if (widget.type === "lineChart" && Array.isArray(widget.data)) {
      widget.data.forEach((point) => {
        if (point.revenue) {
          point.revenue = getRandomValue(point.revenue);
        }
      });
    }
  }

  function randomizePieChart(widget) {
    if (widget.type === "pieChart" && Array.isArray(widget.data)) {
      const total = widget.data.reduce((sum, item) => sum + item.value, 0);
      let remaining = total;

      widget.data.forEach((item, index) => {
        if (index === widget.data.length - 1) {
          item.value = remaining;
        } else {
          item.value = getRandomValue(total / widget.data.length, 0.5);
          remaining -= item.value;
        }
      });
    }
  }

  function randomizeBarChart(widget) {
    if (widget.type === "barChart" && Array.isArray(widget.data)) {
      widget.data.forEach((item) => {
        if (item.unitsSold) {
          item.unitsSold = getRandomValue(item.unitsSold);
        }
      });
    }
  }

  setInterval(() => {
    dashboard.widgets.forEach((widget) => {
      randomizeLineChart(widget);
      randomizePieChart(widget);
      randomizeBarChart(widget);
    });
  }, interval);
  return dashboard;
}

module.exports = { randomizeDashboardData };
