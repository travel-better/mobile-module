import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          travelCenter: {
            screens: {
              TravelCenterScreen: "routes",
            },
          },
          userHistory: {
            screens: {
              UserHistoryScreen: "footprint",
            },
          },
          rewardsCenter: {
            screens: {
              RewardsCenterScreen: "rewards",
            },
          },
          userProfile: {
            screens: {
              UserProfileScreen: "profile",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
