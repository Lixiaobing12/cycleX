export type UserInfoType = {
  avatar: string | null;
  created_at: string;
  email: string;
  email_verified_at: null | string;
  id: number;
  ip: null | string;
  last_online_at: string;
  mobile: null | string;
  mobile_prefix: null | string;
  name: string;
  referral_code: string;
  referrer_id: number;
  risk_type: number;
  security_password_flag: number;
  status: number;
  updated_at: string;
  user_level_id: number;
  user_pv: number;
  user_type: number;
};

export type WalletInfoType = {
  id: number;
  user_id: number;
  wallet_account_id: number;
  asset_id: number;
  balance: string;
  pledge: string;
  freeze: string;
  created_at: string;
  updated_at: string;
  wallet_account_address: string;
  current_amount: number;
  regular_amount: string;
  fund_amount: string;
  yesterday_output: number;
};
