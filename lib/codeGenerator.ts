export function GetReferralCodeById(number: number): string {
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const length = 7;
  const maxUpper = 26 ** length; // 26^7

  let code = "";

  if (number <= 0) {
    throw new Error("Number must be positive.");
  }

  if (number <= maxUpper) {
    number -= 1; // Adjust for 1-based input
    for (let i = 0; i < length; i++) {
      code = upperLetters[number % 26] + code;
      number = Math.floor(number / 26);
    }
  } else if (number <= 2 * maxUpper) {
    number = number - maxUpper - 1;
    for (let i = 0; i < length; i++) {
      code = lowerLetters[number % 26] + code;
      number = Math.floor(number / 26);
    }
  } else {
    throw new Error("Number exceeds available codes.");
  }

  return code;
}

export function GetIdByReferralCode(code: string): number {
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const length = 7;
  const maxUpper = 26 ** length;

  if (code.length !== length) {
    throw new Error(`Referral code must be exactly ${length} characters.`);
  }

  const isUppercase = code[0] >= "A" && code[0] <= "Z";
  const isLowercase = code[0] >= "a" && code[0] <= "z";

  let number = 0;

  for (let i = 0; i < length; i++) {
    const letter = code[i];
    let index;

    if (isUppercase) {
      index = upperLetters.indexOf(letter);
      if (index === -1) throw new Error("Invalid uppercase letter in code.");
    } else if (isLowercase) {
      index = lowerLetters.indexOf(letter);
      if (index === -1) throw new Error("Invalid lowercase letter in code.");
    } else {
      throw new Error("Invalid code format.");
    }

    number = number * 26 + index;
  }

  if (isUppercase) {
    number += 1;
  } else if (isLowercase) {
    number += maxUpper + 1;
  }

  return number;
}

export function generateSecretCode(prefix = "TEAM") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const length = 7;
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}
