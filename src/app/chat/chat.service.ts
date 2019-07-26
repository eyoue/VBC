import { Injectable } from '@angular/core';
import {GroupModel} from './chat-models/group.model';
import {MsgModel} from './chat-models/msg.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {ComponentPortal} from '@angular/cdk/portal';
import {ChatContainerComponent} from './chat-container/chat-container.component';
import {Overlay} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  PRODUCT_ITEMS: GroupModel[];
  MSG_ITEMS: MsgModel[];
  RECIVER = new BehaviorSubject(null);
  _INDEX = 5;
  overlayRef: any;

  constructor(private http: HttpClient, private overlay: Overlay) {
    this.MSG_ITEMS = [
      {msgId: 1, selfMsg: true, text: '',
        file: {name: 'ffff', size: '127 kB '},
        dateTimeCreate: '11.11.11',
        sender: {name: 'John', position: 'Boss', orgName: 'ABC' }},
      {msgId: 2,
        selfMsg: false,
        text: 'La la la', file: null,
        dateTimeCreate: '11.10.11',
        sender: {name: 'John', position: 'UI/UX', orgName: 'ABC' }},
      {msgId: 3,
        selfMsg: false,
        text: 'La la la',
        file: null,
        dateTimeCreate: '10.11.11',
        sender: {name: 'Ed', position: 'IT', orgName: 'ABC' }},
      {msgId: 4,
        selfMsg: false,
        text: 'La la la',
        file: null,
        dateTimeCreate: '12.11.11',
        sender: {name: 'Sarah', position: 'DevOps', orgName: 'ABC' }},
      {msgId: 5,
        selfMsg: false,
        text: 'La la la',
        file: null,
        dateTimeCreate: '1.01.11',
        sender: {name: 'Tom', position: 'Boss', orgName: 'ABC' }},
  ];
    this.PRODUCT_ITEMS = [
      {id: 1, name: 'Группа А', dateTime: '11:11:11', serialNumber: 'ABC-112', msgCount: 2, fileCount: 0, msgIds: [1, 2, 3]},
      {id: 2, name: 'Группа Б', dateTime: '14:11:11', serialNumber: 'AVC-182', msgCount: 10, fileCount: 1, msgIds: [4, 5]},
      {id: 3, name: 'Группа В', dateTime: '15:11:11', serialNumber: 'DFE-983', msgCount: 0, fileCount: 10, msgIds: [1, 4, 5]},
      {id: 4, name: 'Группа В', dateTime: '15:11:11', serialNumber: 'DFE-983', msgCount: 0, fileCount: 10, msgIds: [1, 4, 5]},
      {id: 5, name: 'Группа В', dateTime: '15:11:11', serialNumber: 'DFE-983', msgCount: 0, fileCount: 10, msgIds: [1, 4, 5]},
      {id: 6, name: 'Группа В', dateTime: '15:11:11', serialNumber: 'DFE-983', msgCount: 0, fileCount: 10, msgIds: [1, 4, 5]},
    ];
  }

  getGroup(ids) {
    // GET
    // this.http.get(` /api/chat/group/${id}`).subscribe(
    //   (response: MsgModel[]) => { this.MSG_ITEMS = response; this.reciver.next(this.MSG_ITEMS); },
    //     error => { console.log(`failed to retrieve group with id=${id} error=${error}`); }
    //     );
    const groupMessages = this.MSG_ITEMS.filter(msg => {
      if (ids.indexOf(msg.msgId) !== -1) { return msg; }
    });
    this.RECIVER.next(groupMessages);
  }
  sendMessage(msgText, activeGroupId) {
    // POST
    // this.http.post(` /api/chat/group/${id}/send`, body).subscribe(response => {}, error => {});
    const msg = {sender: {name: 'T', position: 'F', orgName: 'X'}, text: msgText};
    this._INDEX++;
    const dataTime = new Date().toISOString();
    this.MSG_ITEMS.push({
      msgId: this._INDEX,
      selfMsg: true,
      dateTimeCreate: dataTime,
      file: null,
      text: msg.text,
      sender: {name: msg.sender.name, position: msg.sender.position, orgName: msg.sender.orgName }
    });

    this.PRODUCT_ITEMS.forEach(product => {
      if (product.id === activeGroupId) { product.msgIds.push(this._INDEX);  this.getGroup(product.msgIds); }
    });
  }
  private createChat(w, h) {
    this.overlayRef = this.overlay.create({
      width: w,
      height: h,
      minWidth: '880px',
      minHeight: '570px'
    });
    const userProfilePortal = new ComponentPortal(ChatContainerComponent);
    this.overlayRef.attach(userProfilePortal);
  }
  closeChat() {
    if (this.overlayRef) { this.overlayRef.dispose(); }
  }
  showChat(w?, h?) {
     w = w ? w : '90vw';
     h = h ? h : '90vh';
     if (!this.overlayRef) { this.createChat(w, h); } else {
      this.closeChat(); this.overlayRef = null; }
  }
}
