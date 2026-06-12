import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/CategoryProduct.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { ECommandTel } from 'src/modules/enum/command-tel.enum';
import { Telegraf } from 'telegraf';
import { Repository } from 'typeorm';
import { digitsEnToFa } from '@persian-tools/persian-tools';

@Injectable()
export class RobotService {
  private readonly bot: Telegraf;
  private readonly list_id_admin: string[];

  constructor(
    private configService: ConfigService,
    @InjectRepository(CategoryProductMenuEntity)
    private readonly categoryProductMenuRepository: Repository<CategoryProductMenuEntity>,
  ) {
    this.list_id_admin = this.configService.get<string[]>('Tel.list_id_admin');
    const token = this.configService.get<string>('Tel.token');
    this.bot = new Telegraf(token);
    this.start();
    this.see_menu();
    this.get_all_menu();
    this.get_bread_menu();
    this.get_break_fast_menu();
    this.get_cake_menu();
    this.get_chocolate_menu();
    this.get_coffee_menu();
    this.get_cold_drink_menu();
    this.get_cookie_menu();
    this.get_damnoosh_menu();
    this.get_energic_menu();
    this.get_sandwich_menu();
    this.get_frape_menu();
    this.get_hot_drink_menu();
    this.get_ice_menu();
    this.get_moktel_menu();
    this.get_nooshabe_menu();
    this.get_pasta_menu();
    this.get_salad_menu();
    this.get_shack_menu();
    this.get_shirini_menu();
    this.get_smooti_menu();
    this.get_tea_menu();
    this.help();
    this.launch();
  }

  public async sendMessageToAdminChat(text: string) {
    for (const item of this.list_id_admin) {
      try {
        await this.bot.telegram.sendMessage(item, text);
      } catch {
        //
      }
    }
  }

  private async launch() {
    try {
      await this.bot.launch();
    } catch {
      //
    }
  }

  private start() {
    try {
      this.bot.start(async (ctx) => {
        await ctx.reply('سلام من ربات شوکونان هستم');
        await this.replayHelp(ctx);
        for (const id_admin of this.list_id_admin) {
          const { id, first_name, username } = ctx.chat as {
            id: number;
            first_name?: string;
            username?: string;
          };
          try {
            await this.bot.telegram.sendMessage(
              id_admin,
              `آیدی\n ${id}\n\n نام کاربری\n "${first_name}"\n\n یوزر\n "${username}"\n\n شروع به کار با ربات کرد.`,
            );
          } catch (ex) {
            console.log(ex);
          }
        }
      });
    } catch {
      //
    }
  }

  private async replayHelp(ctx: any) {
    try {
      await ctx.reply('چه کمکی از دستم برمیاد براتون ؟', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'دیدن منو',
                callback_data: ECommandTel.SEE_MENU,
              },
            ],
          ],
        },
      });
    } catch {
      //
    }
  }

  private help() {
    this.bot.action(
      ECommandTel.HELP,
      async (ctx) => await this.replayHelp(ctx),
    );
  }

  private see_menu() {
    this.bot.action(ECommandTel.SEE_MENU, async (ctx) => {
      const userId = ctx.update.callback_query.from.id;
      this.bot.telegram.sendChatAction(userId, 'typing');
      ctx.reply('چه محصولاتی رو براتون نشان بدم ؟', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'کل محصولات منو',
                callback_data: ECommandTel.GET_ALL_MENU,
              },
            ],
            [
              {
                text: 'محصولات نان',
                callback_data: ECommandTel.GET_BREAD_MENU,
              },
            ],
            [
              {
                text: 'محصولات صبحانه',
                callback_data: ECommandTel.GET_BREAKFAST_MENU,
              },
            ],
            [
              {
                text: 'محصولات کیک',
                callback_data: ECommandTel.GET_CAKE_MENU,
              },
            ],
            [
              {
                text: 'محصولات شکلات',
                callback_data: ECommandTel.GET_CHOCOLATE_MENU,
              },
            ],
            [
              {
                text: 'محصولات قهوه',
                callback_data: ECommandTel.GET_COFFEE_MENU,
              },
            ],
            [
              {
                text: 'محصولات نوشیدنی سرد',
                callback_data: ECommandTel.GET_COLD_DRINK_MENU,
              },
            ],
            [
              {
                text: 'محصولات کوکی',
                callback_data: ECommandTel.GET_COOKIE_MENU,
              },
            ],
            [
              {
                text: 'محصولات دمنوش',
                callback_data: ECommandTel.GET_DAMNOOSH_MENU,
              },
            ],
            [
              {
                text: 'محصولات انرژی زا',
                callback_data: ECommandTel.GET_ENERGIC_MENU,
              },
            ],
            [
              {
                text: 'محصولات ساندویچ',
                callback_data: ECommandTel.GET_SANDWICH_MENU,
              },
            ],
            [
              {
                text: 'محصولات فراپه',
                callback_data: ECommandTel.GET_FRAPE_MENU,
              },
            ],
            [
              {
                text: 'محصولات نوشیدنی گرم',
                callback_data: ECommandTel.GET_HOT_DRINK_MENU,
              },
            ],
            [
              {
                text: 'محصولات آیس',
                callback_data: ECommandTel.GET_ICE_MENU,
              },
            ],
            [
              {
                text: 'محصولات موکتل',
                callback_data: ECommandTel.GET_MOKTEL_MENU,
              },
            ],
            [
              {
                text: 'محصولات نوشابه',
                callback_data: ECommandTel.GET_NOOSHABE_MENU,
              },
            ],
            [
              {
                text: 'محصولات پاستا',
                callback_data: ECommandTel.GET_PASTA_MENU,
              },
            ],
            [
              {
                text: 'محصولات سالاد',
                callback_data: ECommandTel.GET_SALAD_MENU,
              },
            ],
            [
              {
                text: 'محصولات ساندویچ',
                callback_data: ECommandTel.GET_SANDWICH_MENU,
              },
            ],
            [
              {
                text: 'محصولات شیک',
                callback_data: ECommandTel.GET_SHACK_MENU,
              },
            ],
            [
              {
                text: 'محصولات شیرینی',
                callback_data: ECommandTel.GET_SHIRINI_MENU,
              },
            ],
            [
              {
                text: 'محصولات اسموتی',
                callback_data: ECommandTel.GET_SMOOTI_MENU,
              },
            ],
            [
              {
                text: 'محصولات چای',
                callback_data: ECommandTel.GET_TEA_MENU,
              },
            ],
          ],
        },
      });
    });
  }

  private json_to_text_category_product(
    list_product: ProductMenuEntity[],
  ): string {
    let menu = '';
    // console.log(list_product)
    for (let item in list_product) {
      menu += `نام محصول:
${list_product[item].name}

توضیحات:
${list_product[item].description ?? 'ندارد'}

مدت زمان تقریبی انتظار:
${digitsEnToFa(list_product[item].waiting)} دقیقه ⏳

قیمت: 
${digitsEnToFa(list_product[item].price)} هزار تومان

موجوی: ${list_product[item].available ? '✅' : '❌'}

${list_product.length - 1 == Number(item) ? '' : '☕️🥤🍫🍪🍰🥐🥗🍹🍵'}

`;
    }
    return menu;
  }

  private get_all_menu() {
    this.bot.action(ECommandTel.GET_ALL_MENU, async (ctx) => {
      const allMenu = await this.categoryProductMenuRepository.find({
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      for (const menu of allMenu) {
        await ctx.reply(this.json_to_text_category_product(menu.products));
      }
      await this.replayHelp(ctx);
    });
  }

  private get_bread_menu() {
    this.bot.action(ECommandTel.GET_BREAD_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'نان' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_break_fast_menu() {
    this.bot.action(ECommandTel.GET_BREAKFAST_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'صبحانه' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_cake_menu() {
    this.bot.action(ECommandTel.GET_CAKE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'کیک' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_chocolate_menu() {
    this.bot.action(ECommandTel.GET_CHOCOLATE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'شکلات' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_coffee_menu() {
    this.bot.action(ECommandTel.GET_COFFEE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'قهوه' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_cold_drink_menu() {
    this.bot.action(ECommandTel.GET_COLD_DRINK_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'نوشیدنی سرد' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_cookie_menu() {
    this.bot.action(ECommandTel.GET_COOKIE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'کوکی' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_damnoosh_menu() {
    this.bot.action(ECommandTel.GET_DAMNOOSH_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'دمنوش' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_energic_menu() {
    this.bot.action(ECommandTel.GET_ENERGIC_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'انرژی زا' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_sandwich_menu() {
    this.bot.action(ECommandTel.GET_SANDWICH_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'ساندویچ' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_frape_menu() {
    this.bot.action(ECommandTel.GET_FRAPE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'فراپه' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_hot_drink_menu() {
    this.bot.action(ECommandTel.GET_HOT_DRINK_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'نوشیدنی گرم' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_ice_menu() {
    this.bot.action(ECommandTel.GET_ICE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'آیس' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_moktel_menu() {
    this.bot.action(ECommandTel.GET_MOKTEL_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'موکتل' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_nooshabe_menu() {
    this.bot.action(ECommandTel.GET_NOOSHABE_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'نوشابه' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_pasta_menu() {
    this.bot.action(ECommandTel.GET_PASTA_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'پاستا' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_salad_menu() {
    this.bot.action(ECommandTel.GET_SALAD_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'سالاد' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_shack_menu() {
    this.bot.action(ECommandTel.GET_SHACK_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'شیک' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_shirini_menu() {
    this.bot.action(ECommandTel.GET_SHIRINI_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'شیرینی' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_smooti_menu() {
    this.bot.action(ECommandTel.GET_SMOOTI_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'اسموتی' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }

  private get_tea_menu() {
    this.bot.action(ECommandTel.GET_TEA_MENU, async (ctx) => {
      const singleMenu = await this.categoryProductMenuRepository.findOne({
        where: { category: 'چای' },
        relations: { products: true },
        order: { products: { id: 'ASC' }, category: 'ASC' },
      });
      const userId = ctx.update.callback_query.from.id;
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(this.json_to_text_category_product(singleMenu.products));
      await this.replayHelp(ctx);
    });
  }
}
