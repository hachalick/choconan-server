import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { KavenegarApi } from 'kavenegar';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { ESmsTemplate } from 'src/modules/enum/kavenegar.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  private TOKEN_SMS = '';

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuEntityRepository: Repository<ProductMenuEntity>,
  ) {
    this.TOKEN_SMS = this.configService.get('App.TOKEN_SMS');
  }

  async sendSmsWelcomeUser({ fullname, phone }: TWelcomeUser) {
    const url = `http://api.kavenegar.com/v1/48616B676E304D67684D72533248362F374B4C554C6855796E55754879565371663937545964707A5344453D/verify/lookup.json?receptor=${phone}&token=${fullname}&template=${ESmsTemplate.WELCOMECHONONAN}`;
    await fetch(url);
  }

  async sendSmsOtp({ phone, otp }: { phone: string; otp: string }) {
    console.log(otp);
    const url = `http://api.kavenegar.com/v1/48616B676E304D67684D72533248362F374B4C554C6855796E55754879565371663937545964707A5344453D/verify/lookup.json?receptor=${phone}&token=${otp}&template=${ESmsTemplate.VERIFYCHOCONAN}`;
    await fetch(url);
  }

  async getCrawlerMenuSnapFood(): Promise<{
    allProduct: Array<{
      id: number;
      title: string;
      price: number;
    }>;
    match: Array<{
      id: number;
      title: string;
      selfTitle: string;
      price: number;
      selfPrice: number;
    }>;
    notMatch: Array<{
      id: number;
      title: string;
      price: number;
    }>;
  }> {
    const res = await fetch(
      'https://snappfood.ir/mobile/v2/restaurant/details/dynamic?lat=35.72454&long=51.43551&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=deccb9c3-c868-4ef5-a179-437370c6e22b&vendorCode=12j1y4&locationCacheKey=lat%3D35.72454%26long%3D51.43551&show_party=1&fetch-static-data=1&locale=fa',
    );
    if (res.ok) {
      const data = await res.json();
      const products: Array<{
        id: string;
        title: string;
        price: number;
      }> = data.data.menus
        .map((product) => ({ ...product }))
        .flat()
        .map((product) => product.products)
        .flat()
        .map((product) => ({
          id: String(product.id),
          title: product.title,
          price: product.price,
        }))
        .sort((a, b) => a.title.localeCompare(b.title));

      const uniqueProducts = Array.from(
        new Map(products.map((product) => [product.title, product])).values(),
      );

      const listFoundDb: Array<{
        id: number;
        title: string;
        selfTitle: string;
        price: number;
        selfPrice: number;
      }> = [];

      const listNotFoundDb: Array<{
        id: number;
        title: string;
        price: number;
      }> = [];

      for (const item in uniqueProducts) {
        const findProduct = await this.productMenuEntityRepository.findOne({
          where: { snap: products[item].id },
        });
        if (findProduct) {
          listFoundDb.push({
            id: parseInt(products[item].id),
            price: products[item].price,
            title: products[item].title,
            selfPrice: findProduct.price * 1000,
            selfTitle: findProduct.name,
          });
        } else {
          listNotFoundDb.push({
            id: parseInt(products[item].id),
            price: products[item].price,
            title: products[item].title,
          });
        }
      }

      return {
        allProduct: uniqueProducts.map((val) => ({
          ...val,
          id: parseInt(val.id),
        })),
        match: listFoundDb,
        notMatch: listNotFoundDb,
      };
    }
  }

  async getCrawlerMenuTapsiFood(): Promise<{
    allProduct: Array<{
      id: number;
      title: string;
      price: number;
    }>;
    match: Array<{
      id: number;
      title: string;
      selfTitle: string;
      price: number;
      selfPrice: number;
    }>;
    notMatch: Array<{
      id: number;
      title: string;
      price: number;
    }>;
  }> {
    const res = await fetch(
      'https://api.tapsi.food/v1/api/Vendor/5668xz/vendor?latitude=35.722427678657034&longitude=51.43465161323548',
    );
    if (res.ok) {
      const data = await res.json();
      const products: Array<{
        id: string;
        title: string;
        price: number;
      }> = data.data.categories
        .map((product) => product.products)
        .flat()
        .map((product) => product.productVariations)
        .flat()
        .map((product) => ({
          id: String(product.productVariationId),
          title: product.productVariationName,
          price: product.price,
        }))
        .sort((a, b) => a.title.localeCompare(b.title));

      const uniqueProducts = Array.from(
        new Map(products.map((product) => [product.title, product])).values(),
      );

      const listFoundDb: Array<{
        id: number;
        title: string;
        selfTitle: string;
        price: number;
        selfPrice: number;
      }> = [];

      const listNotFoundDb: Array<{
        id: number;
        title: string;
        price: number;
      }> = [];

      for (const item in uniqueProducts) {
        const findProduct = await this.productMenuEntityRepository.findOne({
          where: { tapsi: products[item].id },
        });
        if (findProduct) {
          listFoundDb.push({
            id: parseInt(products[item].id),
            price: products[item].price,
            title: products[item].title,
            selfPrice: findProduct.price * 1000,
            selfTitle: findProduct.name,
          });
        } else {
          listNotFoundDb.push({
            id: parseInt(products[item].id),
            price: products[item].price,
            title: products[item].title,
          });
        }
      }

      return {
        allProduct: uniqueProducts.map((val) => ({
          ...val,
          id: parseInt(val.id),
        })),
        match: listFoundDb,
        notMatch: listNotFoundDb,
      };
    }
  }
}
