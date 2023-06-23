export type TSupplyResponse = {
  brand?: string;
  code?: string;
  codeBidding?: string;
  company?: { id: number; name: string };
  country?: string;
  dateExpired?: string;
  group?: { id: number; name: string };
  isLoss?: boolean;
  id?: number;
  ingredient?: string;
  name?: string;
  productCode?: string;
  quantity?: number;
  unit?: { id: number; name: string };
  yearBidding?: number;
  quantityExpect?:number;
  quantityImport?: number;
  quantityExport?: number;

};

