import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  // اطلاعات اصلی
  .setTitle('Choconan API')
  .setDescription('API برای مدیریت فروشگاه شکلات Choconan')
  .setVersion('1.0.0')

  // // اطلاعات تماس
  // .setContact(
  //   'تیم پشتیبانی',
  //   'https://choconan.com/support',
  //   'support@choconan.com',
  // )
  // .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  // .setTermsOfService('https://choconan.com/terms')

  // // مستندات خارجی
  // .setExternalDoc('external document', 'https://docs.choconan.com')

  // // سرورها
  // .addServer('https://api.choconan.com', 'سرور تولید')
  // .addServer('http://localhost:8080', 'محیط توسعه')

  // // تگ‌ها
  // .addTag('App', 'description . . .')

  // // احراز هویت‌ها
  // .addBearerAuth(
  //   {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //     name: 'JWT',
  //     description: 'توکن JWT را وارد کنید',
  //     in: 'header',
  //   },
  //   'JWT-auth', // نام این طرح امنیتی
  // )
  // .addApiKey(
  //   {
  //     type: 'apiKey',
  //     name: 'X-API-KEY',
  //     in: 'header',
  //     description: 'کلید API برای دسترسی به endpoints عمومی',
  //   },
  //   'apiKey',
  // )
  // .addCookieAuth('refreshToken', {
  //   type: 'apiKey',
  //   in: 'cookie',
  //   description: 'Cookie برای تازه‌سازی توکن',
  // })
  // .addBasicAuth({
  //   type: 'http',
  //   scheme: 'basic',
  //   description: 'احراز هویت پایه برای endpoints مدیریتی',
  // })

  // // پارامترهای سراسری
  // .addGlobalParameters({
  //   name: 'Accept-Language',
  //   in: 'header',
  //   required: false,
  //   schema: {
  //     type: 'string',
  //     enum: ['fa', 'en', 'ar'],
  //     default: 'fa',
  //   },
  //   description: 'زبان پاسخ',
  // })

  // // نیازمندی‌های امنیتی سراسری
  // .addSecurityRequirements('JWT-auth')

  // // Extension سفارشی
  // .addExtension('x-custom-field', 'مقدار سفارشی')

  // .addOAuth2({
  //   type: 'oauth2',
  //   flows: {
  //     authorizationCode: {
  //       authorizationUrl: 'https://example.com/oauth/authorize',
  //       tokenUrl: 'https://example.com/oauth/token',
  //       refreshUrl: 'https://example.com/oauth/refresh',
  //       scopes: {
  //         'read:users': 'دسترسی خواندن کاربران',
  //         'write:users': 'دسترسی نوشتن کاربران',
  //       },
  //     },
  //   },
  // })

  .build();
