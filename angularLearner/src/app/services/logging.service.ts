import { EventEmitter } from "@angular/core";

export class LoggingService {
  logInfo (str: String) {
    console.info('info: ', str);
  }

  logError (str: String) {
    console.error('error: ', str);
  }

  globalCounter: Number = 0;
  globalCounterEmitter = new EventEmitter<Number>();

}
