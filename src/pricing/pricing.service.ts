import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostPricingEntity } from 'src/modules/entity/mysql/CostPricing.entity';
import { FactorEntity } from 'src/modules/entity/mysql/Factor.entity';
import { FactorItemEntity } from 'src/modules/entity/mysql/FactorItem.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { ProductPricingEntity } from 'src/modules/entity/mysql/ProductPricing.entity';
import { ProductUnitEntity } from 'src/modules/entity/mysql/ProductUnit.entity';
import { ProductUnitDetailEntity } from 'src/modules/entity/mysql/ProductUnitDetailEntity.entity';
import { ProductUnitRatioEntity } from 'src/modules/entity/mysql/ProductUnitRatio.entity';
import { UnitEntity } from 'src/modules/entity/mysql/Unit.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment-jalaali';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
    @InjectRepository(ProductPricingEntity)
    private readonly productPricingRepository: Repository<ProductPricingEntity>,
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(ProductUnitEntity)
    private readonly productUnitRepository: Repository<ProductUnitEntity>,
    @InjectRepository(ProductUnitRatioEntity)
    private readonly productUnitRatioRepository: Repository<ProductUnitRatioEntity>,
    @InjectRepository(ProductUnitDetailEntity)
    private readonly productUnitDetailRepository: Repository<ProductUnitDetailEntity>,
    @InjectRepository(CostPricingEntity)
    private readonly costPricingRepository: Repository<CostPricingEntity>,
    @InjectRepository(FactorEntity)
    private readonly factorRepository: Repository<FactorEntity>,
    @InjectRepository(FactorItemEntity)
    private readonly factorItemRepository: Repository<FactorItemEntity>,
  ) {}

  //#region unit

  async getAllUnit() {
    return await this.unitRepository.find();
  }

  async createUnit(name: string) {
    const newUnit = this.unitRepository.create({ unit_name: name });

    return this.unitRepository.save(newUnit);
  }

  async updateUnit({
    product_unit_id,
    name,
  }: {
    name: string;
    product_unit_id: string;
  }) {
    const newUnit = this.unitRepository.update(product_unit_id, {
      unit_name: name,
    });
  }

  async deleteUnit(unit_id: string) {
    await this.unitRepository.delete(unit_id);
    return { delete: true };
  }

  //#endregion

  //#region product

  async getAllProduct() {
    await this.checkHaveRatioProductUnit();

    const listProduct = await this.productMenuRepository.find({
      select: {
        product_id: true,
        price: true,
        name: true,
        src: true,
      },
    });

    const fistFactor = await this.factorRepository.findOne({
      where: {},
      order: { create_at: 'ASC' },
    });

    const fistDateFactor = fistFactor.create_at;
    const dateNow = new Date();

    const diffDays = moment(dateNow).diff(moment(fistDateFactor), 'days');

    const listFactor = await this.factorItemRepository.find({
      select: { product_menu_id: true },
    });

    //#region pricing product

    const res = await this.productPricingRepository.find({
      relations: {
        productUnit: {
          unit: true,
          productUnitDetailParent: {
            ChildProductUnitDetail: { product: true, unit: true },
          },
        },
      },
      order: { name: 'ASC', productUnit: { ratio: 'ASC' } },
    });

    const unitLookup = new Map();
    res.forEach((pro) => {
      pro.productUnit.forEach((unit) => {
        unitLookup.set(unit.product_unit_id, { product: pro, unit: unit });
      });
    });

    const getBaseUnitCost = (unitId: string): number => {
      const entry = unitLookup.get(unitId);
      if (!entry) return 0;

      const { product, unit } = entry;

      const directCostPerBase = (product.buy || 0) / unit.ratio;

      let componentsCostTotal = 0;
      if (unit.productUnitDetailParent?.length > 0) {
        componentsCostTotal = unit.productUnitDetailParent.reduce(
          (sum, detail) => {
            const childUnitId = detail.ChildProductUnitDetail.product_unit_id;
            return sum + getBaseUnitCost(childUnitId) * detail.amount;
          },
          0,
        );
      }

      return (
        (directCostPerBase * unit.ratio + componentsCostTotal) / unit.ratio
      );
    };

    const pricingProduct = res.map((pro) => ({
      product_id: pro.product_id,
      name: pro.name,
      buy: pro.buy,
      product_unit: pro.productUnit.map((item) => {
        const currentPricePerBase = getBaseUnitCost(item.product_unit_id);

        const details = item.productUnitDetailParent.map((detail) => {
          const childUnitId = detail.ChildProductUnitDetail.product_unit_id;
          const childRatio = detail.ChildProductUnitDetail.ratio || 1;

          const pricePerBaseUnit = getBaseUnitCost(childUnitId);
          const childUnitTotalCost = pricePerBaseUnit * childRatio;

          return {
            product_unit_detail_id: detail.product_unit_detail_id,
            name: detail.ChildProductUnitDetail.product.name,
            unit: detail.ChildProductUnitDetail.unit.unit_name,
            amount: detail.amount,
            buy: detail.ChildProductUnitDetail.product.buy,
            ratio: childRatio,
            price_by_unit: pricePerBaseUnit,
            total_price_by_unit: pricePerBaseUnit * detail.amount,
            // jomle: `مقدار ${detail.amount} ${detail.ChildProductUnitDetail.unit.unit_name} ${detail.ChildProductUnitDetail.product.name} مصرف شده`,
            // jomle2: `هر ${childRatio} ${detail.ChildProductUnitDetail.unit.unit_name} ${detail.ChildProductUnitDetail.product.name} ${childUnitTotalCost} تومان`,
            // jomle3: `هر یک ${detail.ChildProductUnitDetail.unit.unit_name} ${detail.ChildProductUnitDetail.product.name} ${pricePerBaseUnit} تومان`,
            // jomle4: `برای ${detail.amount} ${detail.ChildProductUnitDetail.unit.unit_name} ${detail.ChildProductUnitDetail.product.name} ${pricePerBaseUnit * detail.amount} تومان`,
          };
        });

        const sumDetail = details.reduce(
          (sum, d) => sum + d.total_price_by_unit,
          0,
        );

        return {
          price_in_menu: item.product_menu_id
            ? listProduct.find(
                (itemList) => itemList.product_id === item.product_menu_id,
              ) || null
            : null,
          product_unit_id: item.product_unit_id,
          unit_name: item.unit.unit_name,
          ratio: item.ratio,
          profit: item.profit,
          sum_detail: sumDetail,
          price_by_unit: currentPricePerBase,
          total_price_for_ratio: currentPricePerBase * item.ratio + item.profit,
          count_sell: item.count_sell,
          detail: details,
        };
      }),
    }));

    //#endregion

    //#region cost

    const cost = await this.costPricingRepository.find();

    const sum_cost = cost
      .map((item) => item.price)
      .reduce((a, b) => a + (b || 0), 0);

    const average_cost =
      cost.map((item) => item.price).reduce((a, b) => a + (b || 0), 0) /
      diffDays;

    //#endregion

    //#region menu product

    const list_product_in_menu = pricingProduct
      .map((item1) =>
        item1.product_unit.map((item2) => {
          if (item2.price_in_menu) {
            const count_sell = listFactor.filter(
              (item3) =>
                item3.product_menu_id === item2.price_in_menu.product_id,
            ).length;

            return {
              product_id_in_menu: item2.price_in_menu.product_id,
              name_in_menu: item2.price_in_menu.name,
              price_in_menu: item2.price_in_menu.price,
              product_id_in_pricing: item1.product_id,
              name_in_pricing: item1.name,
              sum_detail_pricing: item2.sum_detail,
              profit_pricing: item2.profit,
              price_in_pricing: item2.total_price_for_ratio,
              product_unit_id: item2.product_unit_id,
              unit_pricing: item2.unit_name,
              ratio_pricing: item2.ratio,
              count_sell,
              average_count_sell: count_sell / diffDays,
              balance: 0,
            };
          }
        }),
      )
      .flat()
      .filter((item) => item);

    const sum_count_sell = list_product_in_menu
      .map((item) => item.count_sell)
      .reduce((a, b) => a + (b || 0), 0);

    const average_count_sell =
      list_product_in_menu
        .map((item) => item.count_sell)
        .reduce((a, b) => a + (b || 0), 0) / diffDays;

    const base_balance =
      sum_cost / average_count_sell === Infinity
        ? 0
        : sum_cost / average_count_sell;

    list_product_in_menu.forEach((item) => {
      item.balance = (item.profit_pricing - base_balance) * item.count_sell;
    });

    //#endregion

    return {
      day_to_work: diffDays,
      cost: {
        sum_cost,
        average_cost,
        list: cost,
      },
      product_in_menu: {
        sum_count_sell,
        average_count_sell,
        sum_balance: list_product_in_menu
          .map((item) => item.balance)
          .reduce((a, b) => a + (b || 0), 0),
        list: list_product_in_menu,
      },
      product_in_pricing: { list: pricingProduct },
    };
  }

  async createProduct({ name, buy }: { name: string; buy: number }) {
    const product = await this.productPricingRepository.findOne({
      where: { name },
    });

    if (!product) {
      const newProduct = this.productPricingRepository.create({
        name,
        buy,
      });

      const res = await this.productPricingRepository.save(newProduct);
    }

    return { create: true };
  }

  async updateProduct({
    name,
    product_id,
    buy,
  }: {
    product_id: string;
    name: string;
    buy: number;
  }) {
    const product = await this.productPricingRepository.findOne({
      where: { product_id },
    });

    if (product) {
      await this.productPricingRepository.update(product_id, { name, buy });
    }

    return { update: true };
  }

  async deleteProduct(product_id: string) {
    const product = await this.productPricingRepository.findOne({
      where: { product_id },
    });
    if (product) {
      await this.productPricingRepository.delete(product.product_id);
    }

    return { delete: true };
  }

  //#endregion

  //#region Unit Product

  async createUnitToProduct({
    product_id,
    unit_id,
    ratio,
    product_menu_id,
  }: {
    unit_id: string;
    product_id: string;
    product_menu_id: string;
    ratio: number;
  }) {
    const product = await this.productPricingRepository.findOne({
      where: { product_id },
    });
    const unit = await this.unitRepository.findOne({
      where: { unit_id },
    });

    if (product && unit) {
      const productUnit = await this.productUnitRepository.findOne({
        where: { product, unit },
      });

      if (!productUnit) {
        const newProductUnit = this.productUnitRepository.create({
          product,
          unit,
          ratio,
          product_menu_id,
        });

        await this.productUnitRepository.save(newProductUnit);
      }
    }

    return {
      created: true,
    };
  }

  async updateUnitToProduct({
    product_unit_id,
    product_menu_id,
    ratio,
  }: {
    product_unit_id: string;
    product_menu_id: string;
    ratio: number;
  }) {
    const productUnit = await this.productUnitRepository.findOne({
      where: { product_unit_id },
    });

    if (productUnit) {
      await this.productUnitRepository.update(productUnit.product_unit_id, {
        ratio,
        product_menu_id,
      });
    }

    return { updated: true };
  }

  async deleteUnitToProduct(product_unit_id: string) {
    const productUnit = await this.productUnitRepository.findOne({
      where: { product_unit_id },
    });

    if (productUnit) {
      await this.productUnitRepository.delete(productUnit.product_unit_id);
    }

    return { delete: true };
  }

  async updateRatioToProductUnit({
    product_unit_id1,
    product_unit_id2,
    is_ratio,
  }: {
    product_unit_id1: string;
    product_unit_id2: string;
    is_ratio: boolean;
  }) {
    const findParentProductUnit1 = await this.productUnitRepository.findOne({
      where: { product_unit_id: product_unit_id1 },
    });
    const findParentProductUnit2 = await this.productUnitRepository.findOne({
      where: { product_unit_id: product_unit_id2 },
    });
    if (findParentProductUnit1 && findParentProductUnit2) {
      const findProductUnitRatio =
        await this.productUnitRatioRepository.findOne({
          where: {
            ParentProductUnit1: findParentProductUnit1,
            ParentProductUnit2: findParentProductUnit2,
          },
        });

      if (findProductUnitRatio) {
        await this.productUnitRatioRepository.update(
          findProductUnitRatio.product_unit_ratio_id,
          { is_ratio },
        );
      } else {
        const newProductUnitRatio = this.productUnitRatioRepository.create({
          ParentProductUnit1: findParentProductUnit1,
          ParentProductUnit2: findParentProductUnit2,
          is_ratio: true,
        });

        await this.productUnitRatioRepository.save(newProductUnitRatio);
      }
    }

    return { create: true };
  }

  //#endregion

  //#region Detail Pricing Product

  async createDetailPricingProduct({
    amount,
    child_product_unit_id,
    parent_product_unit_id,
  }: {
    parent_product_unit_id: string;
    child_product_unit_id: string;
    amount: number;
  }) {
    const parent = await this.productUnitRepository.findOne({
      where: { product_unit_id: parent_product_unit_id },
    });

    const child = await this.productUnitRepository.findOne({
      where: { product_unit_id: child_product_unit_id },
    });

    if (parent && child) {
      const exist = await this.productUnitDetailRepository.findOne({
        where: {
          ChildProductUnitDetail: child,
          ParentProductUnitDetail: parent,
        },
      });

      if (!exist) {
        const newProductUnitDetail = this.productUnitDetailRepository.create({
          amount,
          ChildProductUnitDetail: child,
          ParentProductUnitDetail: parent,
        });

        await this.productUnitDetailRepository.save(newProductUnitDetail);
      }
    }

    return { created: true };
  }

  async updateDetailPricingProduct({
    detail_product_unit_id,
    amount,
  }: {
    amount: number;
    detail_product_unit_id: string;
  }) {}

  async deleteDetailPricingProduct(detail_product_unit_id: string) {}

  //#endregion

  //#region clean up ratio product unit

  private async checkHaveRatioProductUnit() {
    const res = await this.productPricingRepository.find();

    for (const pro of res) {
      await this.resetHaveRatioProductUnit(pro.product_id);
    }
  }

  private async resetHaveRatioProductUnit(product_id: string) {
    const product = await this.productPricingRepository.findOne({
      relations: {
        productUnit: {
          unit: true,
          productUnitRatioEntity1: { ParentProductUnit2: { unit: true } },
          productUnitRatioEntity2: { ParentProductUnit1: { unit: true } },
        },
      },
      order: { productUnit: { ratio: 'ASC' } },
      where: { product_id },
    });

    const listF: { product_unit_id: string[]; is: boolean }[] = [];

    if (product) {
      for (const re of product.productUnit) {
        re.productUnitRatioEntity1.length > 0 &&
          re.productUnitRatioEntity1.forEach((item) => {
            listF.push({
              product_unit_id: [
                re.unit.unit_id,
                item.ParentProductUnit2.unit.unit_id,
              ],
              is: item.is_ratio,
            });
          });

        re.productUnitRatioEntity2.length > 0 &&
          re.productUnitRatioEntity2.forEach((item) => {
            listF.push({
              product_unit_id: [
                re.unit.unit_id,
                item.ParentProductUnit1.unit.unit_id,
              ],
              is: item.is_ratio,
            });
          });
      }
    }

    const findAllProductUnitRatio = await this.productUnitRatioRepository.find({
      where: [
        {
          ParentProductUnit1: { product: { product_id: product.product_id } },
        },
        {
          ParentProductUnit2: { product: { product_id: product.product_id } },
        },
      ],
      relations: {
        ParentProductUnit1: { product: true },
        ParentProductUnit2: { product: true },
      },
    });

    const cleanList = this.removeDuplicatePairs(listF) as {
      product_unit_id: string[];
      is: boolean;
    }[];

    for (const product2 of findAllProductUnitRatio) {
      await this.productUnitRatioRepository.delete(
        product2.product_unit_ratio_id,
      );
    }

    const allUnitIds = [];
    for (const prodduc of product.productUnit) {
      allUnitIds.push(prodduc.unit.unit_id);
    }

    const allPossiblePairs = [];
    for (let i = 0; i < allUnitIds.length; i++) {
      for (let j = i + 1; j < allUnitIds.length; j++) {
        const pair = [allUnitIds[i], allUnitIds[j]];
        allPossiblePairs.push(pair);
      }
    }

    const existingPairs = cleanList.map((item) =>
      JSON.stringify(item.product_unit_id.sort()),
    );

    for (const pair of allPossiblePairs) {
      const sortedPair = [...pair].sort();
      const pairString = JSON.stringify(sortedPair);

      if (!existingPairs.includes(pairString)) {
        cleanList.push({
          product_unit_id: pair,
          is: false,
        });
      }
    }

    const product2 = await this.productPricingRepository.findOne({
      where: { product_id },
    });

    for (const clean of cleanList) {
      const u1 = await this.unitRepository.findOne({
        where: { unit_id: clean.product_unit_id[0] },
      });
      const u2 = await this.unitRepository.findOne({
        where: { unit_id: clean.product_unit_id[1] },
      });
      const pu1 = await this.productUnitRepository.findOne({
        where: {
          product: product2,
          unit: u1,
        },
      });
      const pu2 = await this.productUnitRepository.findOne({
        where: {
          product: product2,
          unit: u2,
        },
      });

      if (pu1 && pu2) {
        const newpur = this.productUnitRatioRepository.create({
          is_ratio: clean.is,
          ParentProductUnit1: pu1,
          ParentProductUnit2: pu2,
        });

        await this.productUnitRatioRepository.save(newpur);
      }
    }
  }

  private removeDuplicatePairs(
    arr: { product_unit_id: string[]; is: boolean }[],
  ) {
    const seen = new Set();
    const result = [];

    for (const item of arr) {
      const sortedIds = [...item.product_unit_id].sort();
      const key = sortedIds.join('|');

      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }

    return result;
  }

  //#endregion

  //#region cost product pricing

  async createCostProductPricing({
    name,
    price,
  }: {
    name: string;
    price: number;
  }) {
    const newCost = this.costPricingRepository.create({ name, price });

    await this.costPricingRepository.save(newCost);

    return { create: true };
  }

  async updateCostProductPricing({
    cost_pricing_id,
    name,
    price,
  }: {
    cost_pricing_id: string;
    name: string;
    price: number;
  }) {
    await this.costPricingRepository.update(cost_pricing_id, { name, price });

    return { updated: true };
  }

  async deleteCostProductPricing(cost_pricing_id: string) {
    await this.costPricingRepository.delete(cost_pricing_id);

    return { update: true };
  }

  //#endregion
}
