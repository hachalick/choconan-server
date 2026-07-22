import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateMenuCategoryDto,
  CreateProductMenuDto,
  CreateEconomicPackage,
  UpdateEconomicPackage,
  UpdateMenuCategoryDto,
  UpdateProductMenuDto,
  CreateContentEconomicPackage,
  DeleteContentEconomicPackage,
} from '../DTOs/Menu.Controller.DTO';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator';
import { EDashboardCapability } from 'src/Share/Enum/DashboardCapability.Enum';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from '../Guards/Auth.Guard';
import { MenuService } from 'src/Application/Services/Menu.Service';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly MenuService: MenuService) {}

  //#region search

  @Get('search')
  ReadSearchMenuDetail(@Query('Text') Text: string) {
    return this.MenuService.ReadSearchMenuDetail({ Text });
  }

  //#endregion

  //#region category menu

  @Get('')
  ReadMenuDetail() {
    return this.MenuService.ReadMenuDetail({});
  }

  @Get('category/:id')
  ReadMenuCategoryDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.MenuService.ReadMenuCategoryDetail({ Id: id });
  }

  @Post('category')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_MENU_CATEGORY,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateMenuCategory(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateMenuCategoryDto,
  ) {
    return this.MenuService.CreateMenuCategory({
      Description: body.Description,
      Icon: body.Icon,
      IsShowMenu: body.IsShowMenu,
      MetaDescription: body.MetaDescription,
      MetaTitle: body.MetaTitle,
      Name: body.Name,
    });
  }

  @Put('category/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_MENU_CATEGORY,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateMenuCategory(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMenuCategoryDto,
  ) {
    return this.MenuService.UpdateMenuCategory({
      Id: id,
      Icon: body.Icon,
      IsShowMenu: body.IsShowMenu,
      Name: body.Name,
      Description: body.Description,
      MetaTitle: body.MetaTitle,
      MetaDescription: body.MetaDescription,
    });
  }

  @Delete('category/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_MENU_CATEGORY,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteMenuCategory(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.MenuService.DeleteMenuCategory({ Id: id });
  }

  //#endregion

  //#region product menu

  @Get('product/:id')
  ReadMenuProductDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.MenuService.ReadMenuProductDetail({
      Id: id,
    });
  }

  @Post('product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_MENU_PRODUCT,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateMenuProduct(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateProductMenuDto,
  ) {
    return this.MenuService.CreateMenuProduct({
      CategoryId: body.CategoryId,
      IsShowMenu: body.IsShowMenu,
      Name: body.Name,
      Description: body.Description,
      MetaTitle: body.MetaTitle,
      MetaDescription: body.MetaDescription,
      Price: body.Price,
      SrcImage: body.SrcImage,
      Waiting: body.Waiting,
      SnapId: body.SnapId,
      TapsiId: body.TapsiId,
    });
  }

  @Put('product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_MENU_PRODUCT,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateMenuProduct(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductMenuDto,
  ) {
    return this.MenuService.UpdateMenuProduct({
      Id: id,
      CategoryId: body.CategoryId,
      IsShowMenu: body.IsShowMenu,
      Name: body.Name,
      Description: body.Description,
      MetaTitle: body.MetaTitle,
      MetaDescription: body.MetaDescription,
      SrcImage: body.SrcImage,
      Waiting: body.Waiting,
      Price: body.Price,
      SnapId: body.SnapId,
      TapsiId: body.TapsiId,
    });
  }

  @Delete('product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_MENU_PRODUCT,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteMenuProduct(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.MenuService.DeleteMenuProduct({ Id: id });
  }

  //#endregion

  //#region economic package

  @Get('economic-package')
  @ApiQuery({ name: 'IsActiveNow', required: false, type: String })
  ReadEconomicPackageList(
    @Query('IsActiveNow', new ParseBoolPipe({ optional: true }))
    IsActiveNow?: boolean,
  ) {
    return this.MenuService.ReadEconomicPackageList({ IsActiveNow });
  }

  @Get('economic-package/:id')
  ReadEconomicPackageDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.MenuService.ReadEconomicPackageDetail({ Id: id });
  }

  @Post('economic-package')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_ECONOMIC_PACKAGE,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateEconomicPackage(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateEconomicPackage,
  ) {
    return this.MenuService.CreateEconomicPackage({
      Title: body.Title,
      SrcImage: body.SrcImage,
      IsShowMenu: body.IsShowMenu,
      StartDate: body.StartDate,
      EndDate: body.EndDate,
      Price: body.Price,
    });
  }

  @Put('economic-package/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_ECONOMIC_PACKAGE,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateEconomicPackage(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateEconomicPackage,
  ) {
    return this.MenuService.UpdateEconomicPackage({
      Id: id,
      Title: body.Title,
      SrcImage: body.SrcImage,
      IsShowMenu: body.IsShowMenu,
      StartDate: body.StartDate,
      EndDate: body.EndDate,
      Price: body.Price,
    });
  }

  @Delete('economic-package/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_ECONOMIC_PACKAGE,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteEconomicPackage(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.MenuService.DeleteEconomicPackage({ Id: id });
  }

  //#endregion

  //#region content economic package

  @Post('content-economic-package')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_ECONOMIC_PACKAGE,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateContentEconomicPackage(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateContentEconomicPackage,
  ) {
    return this.MenuService.CreateContentEconomicPackage({
      Count: body.Count,
      EconomicPackageId: body.EconomicPackageId,
      ProductId: body.ProductId,
    });
  }

  @Delete('content-economic-package')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_ECONOMIC_PACKAGE,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteContentEconomicPackage(
    @Headers('access_token') AccessToken: string,
    @Body() body: DeleteContentEconomicPackage,
  ) {
    return this.MenuService.DeleteContentEconomicPackage({
      Count: body.Count,
      EconomicPackageId: body.EconomicPackageId,
      ProductId: body.ProductId,
    });
  }

  //#endregion
}
