import { Component, OnInit } from '@angular/core';

import {
  faTimes,
  faArrowRight,
  faPaperclip,
  faFolderPlus,
  faEdit,
  faCommentAlt,
  faFileUpload,
  faCircle
  } from '@fortawesome/free-solid-svg-icons';
import {GroupModel} from '../chat-models/group.model';
import {MsgModel} from '../chat-models/msg.model';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {

  PRODUCT_ITEMS: GroupModel[];
  GROUP_MSG_ITEMS: MsgModel[];
  activeGroupId = 0;

  // icons
  faTimes = faTimes;
  faArrowRight = faArrowRight;
  faPaperclip = faPaperclip;
  faFilePlus = faFolderPlus;
  faEdit = faEdit;
  faCommentAlt = faCommentAlt;
  faFileUpload = faFileUpload;
  faCircle = faCircle;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.PRODUCT_ITEMS = this.chatService.PRODUCT_ITEMS;
    this.chatService.RECIVER.subscribe(data => {
      if (!data) { return; }
      this.GROUP_MSG_ITEMS = data;
    });
  }

  showGroup(group) {
    this.chatService.getGroup(group.msgIds);
    this.activeGroupId = group.id;
  }

  sendMessage(msgText) {
    if (!msgText.trim()) { return; }
    this.chatService.sendMessage(msgText, this.activeGroupId);
  }
}
