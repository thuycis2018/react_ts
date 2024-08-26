import { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchStockData, selectStockData, selectLoading } from './stockSlice';
import { StockSymbol } from '../../api/types/stockSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

interface StockComparisonChartProps {
  symbols: StockSymbol[];
  chartType: 'scatter' | 'bar' | 'box' | 'histogram';
}

function StockComparisonChart({ symbols, chartType }: StockComparisonChartProps) {
  const dispatch = useAppDispatch();
  const stockData = useAppSelector(selectStockData);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    symbols.forEach(symbol => {
      dispatch(fetchStockData(symbol));
    });
  }, [dispatch, symbols]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const plotData: Data[] = symbols.map(symbol => ({
    x: stockData[symbol]?.x || [],
    y: stockData[symbol]?.y || [],
    type: chartType,
    mode: 'lines+markers',
    name: symbol,
    marker: { color: getRandomColor() },
  }));

  const chartStyle: React.CSSProperties = {
    width: '90vw', // Use viewport width to control size responsively
    height: 'auto',
    maxWidth: '600px', // Ensure it doesn’t get too wide on larger screens
    border: '1px solid #666',
    margin: 'auto',
    marginBottom: '20px',
    marginTop: '20px',
    padding: '10px',
  };

  const h2Style: React.CSSProperties = {
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={chartStyle}>
      <h2 style={h2Style}><FontAwesomeIcon icon={faLaptopCode} className="mr-2" /> Using react-plotly.js to create this chart</h2>
      <Plot
        data={plotData}
        layout={{
          title: 'Stock Prices Comparison',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Stock Price (USD)',
          },
          autosize: true,
          responsive: true,
          margin: { t: 40, l: 40, r: 20, b: 40 },
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default StockComparisonChart;
