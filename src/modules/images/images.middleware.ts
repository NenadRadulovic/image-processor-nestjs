import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImagesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const filePath = join(
      process.cwd(),
      'storage',
      req.params['dir'],
      req.params['name'],
    );
    if (!existsSync(filePath)) {
      res.set({ 'Content-Type': 'application/json' });
      return res.status(400).json({ err: 'Image doesnt exists' });
    }
    next();
  }
}
