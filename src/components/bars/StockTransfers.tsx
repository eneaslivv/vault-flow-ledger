
import { StockTransfersList } from "@/components/stock/StockTransfersList";

export const StockTransfers = ({ selectedBar }: { selectedBar: string }) => {
  return <StockTransfersList selectedBar={selectedBar} />;
};
