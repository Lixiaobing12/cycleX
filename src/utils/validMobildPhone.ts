function isChinaMobilePhone(phone: string) {
  const regex = /^1[3-9]\d{9}/;
  return regex.test(phone);
}

function isHongKongPhone(phone: string) {
  const regex = /^[569]\d{3}\-\d{4}$/;
  return regex.test(phone);
}

function isTaiwanPhone(phone: string) {
  const regex = /^[0-9]{2}\-?[0-9]{3}\-?[0-9]{3}$/;
  return regex.test(phone);
}

export const validPhoneNumber = (code: number, phone: string): boolean => {
  switch (code) {
    case 86:
      return isChinaMobilePhone(phone);
    case 852:
      return isHongKongPhone(phone);
    case 886:
      return isTaiwanPhone(phone);
    default:
      return true;
  }
};
