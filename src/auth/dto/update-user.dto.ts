import { IsEmail, IsString, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
