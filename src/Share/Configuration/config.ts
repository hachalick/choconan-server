import { ApplicationConfiguration } from './Parameter/Application.Configuration';
import { ChatRobotConfiguration } from './Parameter/ChatRobot.Configuration';
import { DatabaseConfiguration } from './Parameter/Database.Configuration';

export const configurations = [
  ...ApplicationConfiguration,
  ...DatabaseConfiguration,
  ...ChatRobotConfiguration,
];
