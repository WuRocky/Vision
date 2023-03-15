module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "\\.(jpg|jpeg|png|gif|webp|svg)$":
            "<rootDir>/node_modules/jest-transform-stub",
    },
};
