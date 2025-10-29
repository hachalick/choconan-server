import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  AddCategoryMenuDto,
  AddProductMenuDto,
  AddUpdateContentEconomicPackage,
  AddEconomicPackage,
  UpdateEconomicPackage,
} from './menu.dto';
import {
  CheckDashboardCapabilityGuard,
  CheckNotExpiresTokenGuard,
} from 'src/auth/auth.guard';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //#region get menu

  @Get('get-menu')
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @Get('get-menu/:category')
  getCategoryMenu(@Param('category') category: string) {
    return this.menuService.getCategoryMenu({ category });
  }

  @Get('get-menu/:category/:id')
  getOneProductMenu(
    @Param('category') category: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.menuService.getOneProductMenu({
      category,
      id,
    });
  }

  //#endregion

  //#region search

  @Get('search/:query')
  searchMenu(@Param('query') query: string) {
    return this.menuService.searchProductMenu({ query });
  }

  //#endregion

  //#region category menu

  @Post('category-menu')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  addCategoryMenu(
    @Query('token') token: string,
    @Body() body: AddCategoryMenuDto,
  ) {
    const { category, icon } = body;
    return this.menuService.addCategoryMenu({ category, icon });
  }

  @Put('category-menu/:category_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateCategoryMenu(
    @Param('category_id') category_id: string,
    @Query('token') token: string,
    @Body() body: AddCategoryMenuDto,
  ) {
    const { category, icon } = body;
    return this.menuService.updateCategoryMenu({
      category,
      category_id,
      icon,
    });
  }

  @Delete('category-menu/:category_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteCategoryMenu(
    @Param('category_id') category_id: string,
    @Query('token') token: string,
  ) {
    return this.menuService.deleteCategoryMenu({ category_id });
  }

  //#endregion

  //#region product menu

  @Post('product-menu/:category_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  addProductMenu(
    @Param('category_id') category_id: string,
    @Query('token') token: string,
    @Body() body: AddProductMenuDto,
  ) {
    const {
      available,
      description,
      id,
      meta_description,
      meta_title,
      name,
      price,
      src,
      waiting,
      snap,
      tapsi,
    } = body;
    return this.menuService.addProductMenu({
      available,
      category_id,
      description,
      id,
      meta_description,
      meta_title,
      name,
      price,
      src,
      waiting,
      snap,
      tapsi,
    });
  }

  @Put('product-menu/:product_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateProductMenu(
    @Param('product_id') product_id: string,
    @Query('token') token: string,
    @Body() body: AddProductMenuDto,
  ) {
    const {
      available,
      description,
      id,
      meta_description,
      meta_title,
      name,
      price,
      src,
      waiting,
      snap,
      tapsi,
    } = body;
    return this.menuService.updateProductMenu({
      product_id,
      available,
      description,
      id,
      meta_description,
      meta_title,
      name,
      price,
      src,
      waiting,
      snap,
      tapsi,
    });
  }

  @Delete('product-menu/:product_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteProductMenu(
    @Param('product_id') product_id: string,
    @Query('token') token: string,
  ) {
    return this.menuService.deleteProductMenu({ product_id });
  }

  //#endregion

  //#region economic package

  @Get('economic-package')
  @ApiQuery({ name: 'all', required: false, type: String })
  getEconomicPackage(@Query('all') all: string) {
    return this.menuService.getEconomicPackage({ all });
  }

  @Get('economic-package/:economic_package_id')
  getOneEconomicPackage(
    @Param('economic_package_id') economic_package_id: string,
  ) {
    return this.menuService.getOneEconomicPackage({ economic_package_id });
  }

  @Post('economic-package')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  addEconomicPackage(
    @Query('token') token: string,
    @Body() body: AddEconomicPackage,
  ) {
    const {
      end_day,
      end_hours,
      is_active,
      price,
      start_day,
      start_hours,
      title,
      src,
    } = body;
    return this.menuService.addEconomicPackage({
      end_day,
      end_hours,
      is_active,
      price,
      start_day,
      start_hours,
      title,
      src,
    });
  }

  @Put('economic-package/:economic_package_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateEconomicPackage(
    @Query('token') token: string,
    @Param('economic_package_id') economic_package_id: string,
    @Body() body: UpdateEconomicPackage,
  ) {
    const {
      end_day,
      end_hours,
      is_active,
      price,
      start_day,
      start_hours,
      title,
      src,
    } = body;
    return this.menuService.updateEconomicPackage({
      src,
      economic_package_id,
      end_day,
      end_hours,
      is_active,
      price,
      start_day,
      start_hours,
      title,
    });
  }

  @Delete('economic-package/:economic_package_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteEconomicPackage(
    @Query('token') token: string,
    @Param('economic_package_id') economic_package_id: string,
  ) {
    return this.menuService.deleteEconomicPackage({ economic_package_id });
  }

  //#endregion

  //#region content economic package

  @Post('content-economic-package')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  addContentEconomicPackage(
    @Query('token') token: string,
    @Body() body: AddUpdateContentEconomicPackage,
  ) {
    const { economic_package_id, product_id, count } = body;
    return this.menuService.addContentEconomicPackage({
      economic_package_id,
      product_id,
      count,
    });
  }

  @Delete('content-economic-package/:content_economic_package_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteContentEconomicPackage(
    @Query('token') token: string,
    @Param('content_economic_package_id') content_economic_package_id: string,
  ) {
    return this.menuService.deleteContentEconomicPackage({
      content_economic_package_id,
    });
  }

  //#endregion
}
