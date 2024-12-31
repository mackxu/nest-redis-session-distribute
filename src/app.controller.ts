import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sessionService: SessionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async count(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sid = req.cookies['sid'];
    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );
    const newCount = session.count ? +session.count + 1 : 1;
    const currSid = await this.sessionService.setSession(sid, {
      count: newCount,
    });
    res.cookie('sid', currSid, { maxAge: 60 * 1000 });
    console.log('count', newCount);
    return newCount;
  }
}
