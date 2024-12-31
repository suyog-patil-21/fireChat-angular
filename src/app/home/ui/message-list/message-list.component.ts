import { CommonModule, } from '@angular/common';
import { Component,  input } from '@angular/core';
import { Card } from 'primeng/card';
import { TMessage } from '../../../shared/data/types/message.type';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [Card,CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
 messages = input.required<TMessage[]>();
 currentUser = input.required<string>();
}
