
import StockComparisonChart from '../components/stock/StockComparisonChart';
import type { StockSymbol } from '../api/types/stockSymbol';

export default function HomePage() {
  const symbols: StockSymbol[] = ['AAPL', 'MSFT', 'GOOG']; 
  const chartType = 'bar';
  return (
    <div>
      <StockComparisonChart symbols={symbols} chartType={chartType} />
    </div>
  );
}
