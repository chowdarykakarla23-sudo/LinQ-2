// A simple mock service to simulate async auth calls
export const sendOTP = async (phone: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });
};

export const verifyOTP = async (code: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(code.length === 4), 1500); // Simple validation
  });
};