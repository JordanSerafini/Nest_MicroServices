import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CustomLogger extends Logger {
  private logDirectory: string;
  private logFileName: string;

  constructor(private serviceName: string = 'CustomerService') {
    super();
    this.logDirectory = path.join('/var/log', `Logs_CustomerService`);
    this.ensureLogDirectoryExists();
    this.updateLogFileName();
  }

  private ensureLogDirectoryExists() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  private updateLogFileName() {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    this.logFileName = path.join(this.logDirectory, `${dateString}.log`);
  }

  private writeLog(message: string) {
    this.updateLogFileName();
    fs.appendFileSync(this.logFileName, message + '\n');
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
    super.error(logMessage, trace);
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
