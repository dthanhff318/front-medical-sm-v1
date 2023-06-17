export type TSupplyResponse = {
  brand?: string;
  code?: string;
  codeBidding?: string;
  company?: { id: number; name: string };
  country?: string;
  dateExpired?: string;
  group?: string;
  isLoss?: boolean;
  id?: number;
  ingredient?: string;
  name?: string;
  productCode?: string;
  quantity?: number;
  unit?: string;
  yearBidding?: number;
};
