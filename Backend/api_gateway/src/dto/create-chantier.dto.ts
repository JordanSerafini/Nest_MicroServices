import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateChantierDto {
  @IsOptional()
  @IsNumber()
  readonly Id: number;

  @IsString()
  readonly Name: string;

  @IsString()
  readonly Address: string;

  @IsString()
  readonly City: string;

  @IsString()
  readonly PostalCode: string;

  @IsOptional()
  @IsDate()
  readonly StartDate: Date;

  @IsOptional()
  @IsDate()
  readonly EndDate: Date;

  @IsOptional()
  @IsString()
  readonly Status: string;

  @IsOptional()
  @IsString()
  readonly Description: string;

  @IsOptional()
  @IsNumber()
  readonly CustomerId: number;

  //   @IsOptional()
  //   @IsNumber()
  //   readonly QuoteId: number;
}
