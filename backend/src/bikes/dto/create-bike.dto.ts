import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBikeDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  typeEn: string;

  @IsString()
  @IsNotEmpty()
  typeAr: string;

  @IsString()
  @IsNotEmpty()
  engine: string;

  @IsString()
  @IsNotEmpty()
  power: string;

  @IsString()
  @IsNotEmpty()
  descEn: string;

  @IsString()
  @IsNotEmpty()
  descAr: string;

  @IsString()
  @IsNotEmpty()
  introEn: string;

  @IsString()
  @IsNotEmpty()
  introAr: string;

  @IsArray()
  @IsString({ each: true })
  featuresEn: string[];

  @IsArray()
  @IsString({ each: true })
  featuresAr: string[];

  /** Array of { label_en, label_ar, value, value_ar? } objects */
  specs: any[];

  @IsString()
  @IsNotEmpty()
  emoji: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
