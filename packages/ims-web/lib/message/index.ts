export abstract class ImsMessage {
  abstract display(): Promise<any>;
  abstract change_read_status(): Promise<any>;
  abstract event_notice(): Promise<any>;
  abstract all_read(): Promise<any>;
  abstract setting(): Promise<any>;
  abstract read(): Promise<any>;
}
