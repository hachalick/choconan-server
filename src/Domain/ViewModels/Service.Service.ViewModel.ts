export class ReadAllProductSnapFoodViewModel {
  Id: number;
  Title: string;
  Price: number;
}

export class ReadMatchProductSnapFoodViewModel {
  Id: number;
  Title: string;
  Price: number;
  SelfTitle: string;
  SelfPrice: number;
}

export class ReadNotMatchProductSnapFoodViewModel {
  Id: number;
  Title: string;
  Price: number;
}

export class ReadMenuSnapFoodViewModel {
  AllProduct: ReadAllProductSnapFoodViewModel[];
  Match: ReadMatchProductSnapFoodViewModel[];
  NotMatch: ReadNotMatchProductSnapFoodViewModel[];
}

export class ReadAllProductTapsiFoodViewModel {
  Id: number;
  Title: string;
  Price: number;
}

export class ReadMatchProductTapsiFoodViewModel {
  Id: number;
  Title: string;
  Price: number;
  SelfTitle: string;
  SelfPrice: number;
}

export class ReadNotMatchProductTapsiFoodViewModel {
  Id: number;
  Title: string;
  Price: number;
}

export class ReadMenuTapsiFoodViewModel {
  AllProduct: ReadAllProductTapsiFoodViewModel[];
  Match: ReadMatchProductTapsiFoodViewModel[];
  NotMatch: ReadNotMatchProductTapsiFoodViewModel[];
}
