export interface MsgModel {
  msgId: number;
  selfMsg: boolean;
  sender: {
    name: string;
    position: string;
    orgName: string;
  };
  dateTimeCreate: string;
  text: string;
  file: any;
}
