import { IsEmail, IsString, MinLength } from 'class-validator'
export class RegisterDto {
  @IsString() @MinLength(2) displayName!: string
  @IsEmail() email!: string
  @IsString() @MinLength(6) password!: string
}
export class LoginDto {
  @IsEmail() email!: string
  @IsString() @MinLength(6) password!: string
}
