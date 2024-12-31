import { Component, output } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  messageInput = '';
  addMessage = output<string>();

  sendMessager(event: any) {
    this.addMessage.emit(this.messageInput); 
    this.messageInput = '';
  }
}
