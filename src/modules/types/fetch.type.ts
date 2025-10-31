type TProductMenu = {
  id: number;
  price: number;
  waiting: number;
  available: boolean;
  meta_title: string;
  meta_description: string;
  name: string;
  description: string;
  src: string;
  snap: string;
  tapsi: string;
};

type TProductsMenu = TProductMenu[];

type TIdProductMenu = TProductMenu & { product_id: string };

type TIdProductsMenu = TIdProductMenu[];

type TCategoryMenu = {
  category: string;
  icon: string;
  products: TProductsMenu;
};

type TCategoriesMenu = TCategoryMenu[];

type TIdCategoryMenu = {
  category_product_id: string;
  category: string;
  icon: string;
  products: TIdProductMenu[];
};

type TIdCategoriesMenu = TIdCategoryMenu[];

type TIdProductSearchMenu = TIdProductMenu & { rank: number; category: string };

type TIdProductsSearchMenu = TIdProductSearchMenu[];

type TIdFactorPresentOrder = {
  factor_present_order_id: string;
  count: number;
  products: TIdProductMenu;
};

type TIdPresentOrderTable = {
  present_order_table_id: string;
  table: number;
  busy: boolean;
  accept: boolean;
  factorPresentOrderTable: TIdFactorPresentOrder[];
};

type TIdPresentOrdersTable = TIdPresentOrderTable[];

type TEconomicPackage = {
  src: string;
  title: string;
  start_hours: string;
  end_hours: string;
  start_day: string;
  end_day: string;
  price: number;
  is_active: boolean;
};

type TContentEconomicPackage = {
  economic_package_id: string;
  product_id: string;
};
