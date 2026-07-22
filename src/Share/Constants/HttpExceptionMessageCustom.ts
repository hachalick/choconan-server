function MessageIsExist(key: string) {
  return `${key} مورد نظر تکراری هست`;
}

function MessageNotFound(key: string) {
  return `${key} مورد نظر یافت نشد`;
}

function MessageNotAccess(key: string) {
  return `دسترسی ${key} یافت نشد`;
}

function MessageFailed(key: string) {
  return `عملیات ${key} با خطا مواجه شد`;
}

export const HttpExceptionMessageCustom = {
  UserIsExist: MessageIsExist('کاربر'),
  UserNotFound: MessageNotFound('کاربر'),
  UserAccessDenied: MessageNotAccess('کاربر'),
  DashboardCapabilityIsExist: MessageIsExist('دسترسی'),
  DashboardCapabilityNotFound: MessageNotFound('دسترسی'),
  DashboardCapabilityUserIsExist: MessageIsExist('دسترسی'),
  DashboardCapabilityUserNotFound: MessageNotFound('دسترسی'),
  RoleIsExist: MessageIsExist('نقش'),
  RoleNotFound: MessageNotFound('نقش'),
  RoleUserIsExist: MessageIsExist('دسترسی کاربر'),
  RoleUserNotFound: MessageNotFound('دسترسی کاربر'),
  UnitPricingIsExist: MessageIsExist('واحد قیمت گذاری'),
  UnitPricingNotFound: MessageNotFound('واحد قیمت گذاری'),
  ProductPricingIsExist: MessageIsExist('قیمت محصول'),
  ProductPricingNotFound: MessageNotFound('قیمت محصول'),
  CostProductPricingIsExist: MessageIsExist('قیمت محصول'),
  CostProductPricingNotFound: MessageNotFound('قیمت محصول'),
  PresentTableIsExist: MessageIsExist('میز'),
  PresentTableNotFound: MessageNotFound('میز'),
  TokenNotFound: MessageNotFound('توکن '),
  TokenIsExpires: 'توکن منقضی شده',
  TokenIsNotExpires: 'توکن منقضی نشده',
  LoginFailed: MessageFailed('ورود مجدد'),
  OtpFailed: MessageFailed('کد یکبار'),
  AccessDenied: MessageNotAccess(''),
  PasswordIncorrect: MessageNotAccess('رمز ورود'),
  VideoCategoryNotFound: MessageNotFound('دسته بندی ویدئو'),
  ImageNotFound: MessageNotFound('عکس'),
  ImageUploadFailed: MessageFailed('آپلود عکس'),
} as const;
