import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class AddCategoryMenuDto {
  @ApiProperty({ type: String, default: '' })
  category: string;

  @ApiProperty({ type: String, default: '' })
  icon: string;
}

export class AddProductMenuDto {
  @ApiProperty({ type: Number, default: 1 })
  id: number;

  @ApiProperty({ type: Boolean, default: true })
  available: boolean;

  @ApiProperty({ type: Number, default: 0 })
  price: number;

  @ApiProperty({ type: Number, default: 0 })
  waiting: number;

  @ApiProperty({ type: String, default: '' })
  meta_title: string;

  @ApiProperty({ type: String, default: '' })
  meta_description: string;

  @ApiProperty({ type: String, default: '' })
  name: string;

  @ApiProperty({ type: String, default: '' })
  description: string;

  @ApiProperty({ type: String, default: '' })
  src: string;
}

export class AddEconomicPackage {
  @ApiProperty({ type: String, default: '/default.jpg' })
  src: string;

  @ApiProperty({ type: String, default: 'test' })
  title: string;

  @ApiProperty({ type: String, default: 'HH:MM:SS' })
  start_hours: string;

  @ApiProperty({ type: String, default: 'HH:MM:SS' })
  end_hours: string;

  @ApiProperty({ type: String, default: 'YYYY-MM-DD' })
  start_day: string;

  @ApiProperty({ type: String, default: 'YYYY-MM-DD' })
  end_day: string;

  @ApiProperty({ type: Number, default: 0 })
  price: number;

  @ApiProperty({ type: Boolean, default: true })
  is_active: boolean;
}

export class UpdateEconomicPackage {
  @ApiProperty({ type: String, default: '/default.jpg' })
  src: string;

  @ApiProperty({ type: String, default: 'test' })
  title: string;

  @ApiProperty({ type: String, default: 'HH:MM:SS' })
  start_hours: string;

  @ApiProperty({ type: String, default: 'HH:MM:SS' })
  end_hours: string;

  @ApiProperty({ type: String, default: 'YYYY-MM-DD' })
  start_day: string;

  @ApiProperty({ type: String, default: 'YYYY-MM-DD' })
  end_day: string;

  @ApiProperty({ type: Number, default: 0 })
  price: number;

  @ApiProperty({ type: Boolean, default: true })
  is_active: boolean;
}

export class AddUpdateContentEconomicPackage {
  @ApiProperty({ type: String, default: '' })
  economic_package_id: string;

  @ApiProperty({ type: String, default: '' })
  product_id: string;

  @ApiProperty({ type: Number, default: 1 })
  count: number;
}
