import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Gif } from '../../gif/entities/gif.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string; // 'user', 'admin'

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Secret Santa fields (from Person entity)
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  enable: boolean;

  @OneToMany(() => Gif, (gif) => gif.user)
  gifts: Gif[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
