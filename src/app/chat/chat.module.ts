import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatSidenavModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ChatService} from './chat.service';
import {HttpClientModule} from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    ChatContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    FontAwesomeModule,
    MatButtonModule,
    OverlayModule
  ],
  providers: [ChatService],
  exports: [
    ChatContainerComponent
  ],
  entryComponents: [ChatContainerComponent],
  bootstrap: [ChatContainerComponent]
})
export class ChatModule { }
