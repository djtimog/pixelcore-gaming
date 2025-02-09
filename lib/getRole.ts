export const getRolePath = (role: string | null): string => {
    switch (role) {
      case "admin":
        return "/profile";
      case "team":
        return "/profile";
      case "player":
        return "/player-sign-up";
      default:
        return "/player-sign-up";
    }
  };