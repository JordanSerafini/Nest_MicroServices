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
    console.log(`Log directory: ${this.logDirectory}`);
    console.log(`Service name: ${this.serviceName}`);
    this.ensureLogDirectoryExists();
    this.updateLogFileName();
  }

  private ensureLogDirectoryExists() {
    if (!fs.existsSync(this.logDirectory)) {
      console.log(`Creating log directory: ${this.logDirectory}`);
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  private updateLogFileName() {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    this.logFileName = path.join(this.logDirectory, `${dateString}.log`);
    console.log(`Log file name: ${this.logFileName}`);
  }

  private writeLog(message: string) {
    this.updateLogFileName();
    console.log(`Writing log: ${message}`);
    fs.appendFileSync(this.logFileName, message + '\n');
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
