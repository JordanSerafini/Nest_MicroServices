import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CustomLogger extends Logger {
  private logDirectory: string;
  private logFileName: string;

  constructor(private readonly serviceName: string = 'ApiGateway') {
    super(serviceName);
    this.logDirectory = path.join('/var/log', `Logs_ApiGateway`);
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
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    this.logFileName = path.join(this.logDirectory, `${dateString}.log`);
  }

  private getFormattedTimestamp(): string {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const timeString = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    return `${dateString} ${timeString}`;
  }

  private writeLog(message: string) {
    this.updateLogFileName();
    fs.appendFileSync(this.logFileName, message + '\n', { flag: 'a' });
  }

  private formatMessage(
    level: string,
    message: string,
    email?: string,
  ): string {
    const timestamp = this.getFormattedTimestamp();
    const serviceInfo = this.serviceName
      ? `[Service: ${this.serviceName}]`
      : '';
    const userInfo = email ? `[User: ${email}]` : '';
    return `${timestamp} [${level}] ${serviceInfo} ${userInfo} ${message}`;
  }

  log(message: string, email?: string) {
    const formattedMessage = this.formatMessage('LOG', message, email);
    super.log(formattedMessage);
    this.writeLog(formattedMessage);
  }

  error(message: string, trace: string, email?: string) {
    const formattedMessage = this.formatMessage(
      'ERROR',
      `${message} - ${trace}`,
      email,
    );
    super.error(formattedMessage, trace);
    this.writeLog(formattedMessage);
  }

  warn(message: string, email?: string) {
    const formattedMessage = this.formatMessage('WARN', message, email);
    super.warn(formattedMessage);
    this.writeLog(formattedMessage);
  }

  debug(message: string, email?: string) {
    const formattedMessage = this.formatMessage('DEBUG', message, email);
    super.debug(formattedMessage);
    this.writeLog(formattedMessage);
  }

  verbose(message: string, email?: string) {
    const formattedMessage = this.formatMessage('VERBOSE', message, email);
    super.verbose(formattedMessage);
    this.writeLog(formattedMessage);
  }
}
