import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KavenegarApi } from 'kavenegar';
import { ESmsTemplate } from 'src/modules/enum/kavenegar.enum';

@Injectable()
export class ServiceService {
  private TOKEN_SMS = '';

  constructor(private readonly configService: ConfigService) {
    this.TOKEN_SMS = this.configService.get('App.TOKEN_SMS');
  }

  async sendSmsWelcomeUser({ fullname, phone }: TWelcomeUser) {
    const url = `http://api.kavenegar.com/v1/48616B676E304D67684D72533248362F374B4C554C6855796E55754879565371663937545964707A5344453D/verify/lookup.json?receptor=${phone}&token=${fullname}&template=${ESmsTemplate.WELCOMECHONONAN}`;
    await fetch(url);
  }

  async sendSmsOtp({ phone, otp }: { phone: string; otp: string }) {
    console.log(otp);
    const url = `http://api.kavenegar.com/v1/48616B676E304D67684D72533248362F374B4C554C6855796E55754879565371663937545964707A5344453D/verify/lookup.json?receptor=${phone}&token=${otp}&template=${ESmsTemplate.VERIFYCHOCONAN}`;
    await fetch(url);
  }

  async getCrawlerMenuSnapFood(): Promise<TCrawlerTapsiFood> {
    const res = await fetch(
      'https://snappfood.ir/mobile/v2/restaurant/details/dynamic?lat=35.72454&long=51.43551&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=deccb9c3-c868-4ef5-a179-437370c6e22b&vendorCode=12j1y4&locationCacheKey=lat%3D35.72454%26long%3D51.43551&show_party=1&fetch-static-data=1&locale=fa',
    );
    if (res.ok) {
      return await res.json();
    }
  }

  async getCrawlerMenuTapsiFood(): Promise<TCrawlerTapsiFood> {
    const res = await fetch(
      'https://api.tapsi.food/v1/api/Vendor/5668xz/vendor?latitude=35.722427678657034&longitude=51.43465161323548',
    );
    if (res.ok) {
      return await res.json();
    }
  }
}
