declare global {
    interface Window {
      Clerk: {
        openSignIn: () => void;
      };
    }
  }
  
  export {};
  