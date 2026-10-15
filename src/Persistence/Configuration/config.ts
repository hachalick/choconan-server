import { ApplicationConfiguration } from "./Parameter/Application.Configuration.js";
import { ChatRobotConfiguration } from "./Parameter/ChatRobot.Configuration.js";
import { DatabaseConfiguration } from "./Parameter/Database.Configuration.js";

export const configurations = [
  ...ApplicationConfiguration,
  ...DatabaseConfiguration,
  ...ChatRobotConfiguration,
];
