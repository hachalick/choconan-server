export class Random {
  static Otp(length: number) {
    const num = '0123456789';
    const otp = [];

    for (let i = 0; i < length; i++) {
      otp.push(num[Math.floor(Math.random() * num.length)]);
    }

    return otp.join('');
  }

  static Password(length: number) {
    const num = '0123456789qwertyuiopasdfghjklzxcvbnm!@#$%^&*()_+=-/?|\\:;';
    const otp = [];

    for (let i = 0; i < length; i++) {
      otp.push(num[Math.floor(Math.random() * num.length)]);
    }

    return otp.join('');
  }
}
