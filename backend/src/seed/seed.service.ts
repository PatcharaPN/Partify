import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class SeedService {
  @Cron('0 * * * *') // ทุก 1 ชม.
  async reseedDatabase() {
    console.log('🔄 Reseeding in 5 mins...');
    try {
      await execAsync('cd /home/ubuntu/Partify/backend && npx prisma db seed');
      console.log('✅ Reseed success');
    } catch (error: any) {
      console.error('❌ Reseed failed:', error.message);
    }
  }
}
