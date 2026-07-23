import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { Repository } from 'typeorm';
import { type IServiceService } from './Interfaces/Service.Service.Interface';
import { SendSmsOtpModel } from '../../Domain/Models/Service.Service.Model';
import { ESmsTemplate } from 'src/Share/Enum/Kavenegar.Enum';
import {
  ReadMatchProductSnapFoodViewModel,
  ReadMatchProductTapsiFoodViewModel,
  ReadMenuSnapFoodViewModel,
  ReadMenuTapsiFoodViewModel,
  ReadNotMatchProductSnapFoodViewModel,
  ReadNotMatchProductTapsiFoodViewModel,
} from '../../Domain/ViewModels/Service.Service.ViewModel';
import {
  ApplicationConfigurationKeys,
  ApplicationConfigurationValues,
} from 'src/Share/Configuration/Parameter/Application.Configuration';

@Injectable()
export class ServiceService implements IServiceService {
  private TOKEN_SMS = '';
  private LOCAL_RUN = true;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(ProductMenuEntity, ConnectionNameMysql.global)
    private readonly productMenuEntityRepository: Repository<ProductMenuEntity>,
  ) {
    this.TOKEN_SMS = this.configService.get<string>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.TOKEN_SMS}`,
    );
    this.LOCAL_RUN = this.configService.get<boolean>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.LOCAL_RUN}`,
    );
  }

  async SendSmsOtp(Param: SendSmsOtpModel): Promise<void> {
    console.log(Param.Otp, Param.Phone);

    if (!this.LOCAL_RUN) {
      await fetch(
        `http://api.kavenegar.com/v1/${this.TOKEN_SMS}/verify/lookup.json?receptor=${Param.Phone}&token=${Param.Phone}&template=${ESmsTemplate.VERIFYCHOCONAN}`,
      );
    }
  }

  async ReadMenuSnapFood(): Promise<ReadMenuSnapFoodViewModel> {
    const res = await fetch(
      'https://snappfood.ir/mobile/v2/restaurant/details/dynamic?lat=35.72454&long=51.43551&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=deccb9c3-c868-4ef5-a179-437370c6e22b&vendorCode=12j1y4&locationCacheKey=lat%3D35.72454%26long%3D51.43551&show_party=1&fetch-static-data=1&locale=fa',
    );

    if (res.ok) {
      const data = await res.json();

      const products = data.data.menus
        .map((product: any) => product.products)
        .flat()
        .map((product: any) => ({
          Id: String(product.id),
          Title: product.title,
          Price: product.price,
        }))
        .sort((a, b) => a.Title.localeCompare(b.Title));

      const uniqueProducts = Array.from(
        new Map(products.map((product) => [product.Title, product])).values(),
      ) as { Id: string; Title: string; Price: number }[];

      const listFoundDb: ReadMatchProductSnapFoodViewModel[] = [];

      const listNotFoundDb: ReadNotMatchProductSnapFoodViewModel[] = [];

      for (const item of uniqueProducts) {
        const findProduct = await this.productMenuEntityRepository.findOne({
          where: { SnapId: item.Id },
        });
        if (findProduct) {
          listFoundDb.push({
            Id: parseInt(item.Id),
            Price: item.Price,
            Title: item.Title,
            SelfPrice: findProduct.Price,
            SelfTitle: findProduct.Name,
          });
        } else {
          listNotFoundDb.push({
            Id: parseInt(item.Id),
            Price: item.Price,
            Title: item.Title,
          });
        }
      }

      return {
        AllProduct: uniqueProducts.map((val) => ({
          ...val,
          Id: parseInt(val.Id),
        })),
        Match: listFoundDb,
        NotMatch: listNotFoundDb,
      };
    }
  }

  async ReadMenuTapsiFood(): Promise<ReadMenuTapsiFoodViewModel> {
    const res = await fetch(
      'https://api.tapsi.food/v1/api/Vendor/5668xz/vendor?latitude=35.722427678657034&longitude=51.43465161323548',
    );

    if (res.ok) {
      const data = await res.json();
      const products = data.data.categories
        .map((product: any) => product.products)
        .flat()
        .map((product: any) => product.productVariations)
        .flat()
        .map((product: any) => ({
          Id: String(product.productVariationId),
          Title: product.productVariationName,
          Price: product.price,
        }))
        .sort((a, b) => a.Title.localeCompare(b.Title));

      const uniqueProducts = Array.from(
        new Map(products.map((product) => [product.Title, product])).values(),
      ) as { Id: string; Title: string; Price: number }[];

      const listFoundDb: ReadMatchProductTapsiFoodViewModel[] = [];

      const listNotFoundDb: ReadNotMatchProductTapsiFoodViewModel[] = [];

      for (const item of uniqueProducts) {
        const findProduct = await this.productMenuEntityRepository.findOne({
          where: { TapsiId: item.Id },
        });
        if (findProduct) {
          listFoundDb.push({
            Id: parseInt(item.Id),
            Price: item.Price,
            Title: item.Title,
            SelfPrice: findProduct.Price,
            SelfTitle: findProduct.Name,
          });
        } else {
          listNotFoundDb.push({
            Id: parseInt(item.Id),
            Price: item.Price,
            Title: item.Title,
          });
        }
      }

      return {
        AllProduct: uniqueProducts.map((val) => ({
          ...val,
          Id: parseInt(val.Id),
        })),
        Match: listFoundDb,
        NotMatch: listNotFoundDb,
      };
    }
  }
}
