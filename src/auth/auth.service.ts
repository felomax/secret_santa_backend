import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);

    const { password, ...result } = user;
    const token = this.generateToken(user);

    return {
      success: true,
      data: {
        user: result,
        access_token: token,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.validatePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    const token = this.generateToken(user);

    return {
      success: true,
      data: {
        user: result,
        access_token: token,
      },
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email', 'role', 'isActive', 'notes', 'enable', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      success: true,
      data: user,
    };
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['gifts'],
      select: ['id', 'username', 'email', 'role', 'isActive', 'notes', 'enable', 'createdAt', 'updatedAt'],
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['gifts'],
      select: ['id', 'username', 'email', 'role', 'isActive', 'notes', 'enable', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async update(id: string, updateData: Partial<User>) {
    const user = await this.findOne(id);
    
    // Remove password from update if present (should use separate endpoint)
    const { password, ...safeUpdateData } = updateData as any;
    
    Object.assign(user, safeUpdateData);
    const updated = await this.userRepository.save(user);
    
    const { password: _, ...result } = updated;
    return {
      success: true,
      data: result,
    };
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
