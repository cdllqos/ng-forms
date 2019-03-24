import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Input,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'lt-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @Input() position: 'top' | 'bottom' = 'bottom';
  @Input() showMask = true;
  @Output() close: EventEmitter<null> = new EventEmitter<null>();

  @HostBinding('style.align-items')
  get getAlignItems(): string {
    if (this.position === 'bottom') {
      return 'flex-end';
    }
    return 'flex-start';
  }

  get isSlideToTop(): boolean {
    return this.position === 'bottom';
  }

  constructor() {}

  ngOnInit() {}

  closePanel() {
    this.close.emit();
  }
}
