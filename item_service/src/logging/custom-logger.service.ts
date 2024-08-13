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

  log(message: string) {
    super.log(message);
    this.writeLog(`[LOG] ${message}`);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
    this.writeLog(`[ERROR] ${message} - ${trace}`);
  }

  warn(message: string) {
    super.warn(message);
    this.writeLog(`[WARN] ${message}`);
  }

  debug(message: string) {
    super.debug(message);
    this.writeLog(`[DEBUG] ${message}`);
  }

  verbose(message: string) {
    super.verbose(message);
    this.writeLog(`[VERBOSE] ${message}`);
  }
}
