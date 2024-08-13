import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CustomLogger extends Logger {
  private logDirectory: string;
  private logFileName: string;

  constructor(serviceName: string) {
    super();
    this.logDirectory = path.join('/var/log', `Logs_${serviceName}`);
    this.logFileName = path.join(this.logDirectory, this.getLogFileName());
    this.ensureLogDirectoryExists();
  }

  private getLogFileName(): string {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return `${dateString}.log`;
  }

  private ensureLogDirectoryExists() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  private writeLog(message: string) {
    if (!fs.existsSync(this.logDirectory)) {
      this.ensureLogDirectoryExists();
    }
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(this.logFileName, logMessage);
  }

  log(message: string, email?: string) {
    const logMessage = email
      ? `[LOG] [User: ${email}] ${message}`
      : `[LOG] ${message}`;
    super.log(logMessage);
    this.writeLog(logMessage);
  }

  error(message: string, trace: string, email?: string) {
    const logMessage = email
      ? `[ERROR] [User: ${email}] ${message} - ${trace}`
      : `[ERROR] ${message} - ${trace}`;
    super.error(logMessage);
    this.writeLog(logMessage);
  }

  warn(message: string, email?: string) {
    const logMessage = email
      ? `[WARN] [User: ${email}] ${message}`
      : `[WARN] ${message}`;
    super.warn(logMessage);
    this.writeLog(logMessage);
  }

  debug(message: string, email?: string) {
    const logMessage = email
      ? `[DEBUG] [User: ${email}] ${message}`
      : `[DEBUG] ${message}`;
    super.debug(logMessage);
    this.writeLog(logMessage);
  }

  verbose(message: string, email?: string) {
    const logMessage = email
      ? `[VERBOSE] [User: ${email}] ${message}`
      : `[VERBOSE] ${message}`;
    super.verbose(logMessage);
    this.writeLog(logMessage);
  }
}
