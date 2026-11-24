type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

const userWithNotifications: UserProfile = {
  id: 1,
  username: "ian_migwi",
  settings: {
    notifications: true,
  }
};

const userWithoutSettings: UserProfile = {
  id: 2,
  username: "tasha_weke",
};

const userWithoutNotifications: UserProfile = {
  id: 3,
  username: "edward_wanjohi",
  settings: {},
};

function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

console.log("User 1 (notifications set):", isNotified(userWithNotifications));
console.log("User 2 (no settings):", isNotified(userWithoutSettings));
console.log("User 3 (settings, no notifications):", isNotified(userWithoutNotifications));
