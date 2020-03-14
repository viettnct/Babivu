import { Component, OnInit, TemplateRef, ContentChild, EventEmitter, Output, Input } from '@angular/core';
import { PaginationDirective } from './pagination.directive';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @ContentChild(PaginationDirective, { read: TemplateRef }) counterValueTpl: TemplateRef<any>;

  @Input() value = 0;
  @Output() changed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  get counterValueTplContext(): object {
    return { $implicit: this.value };
  }

  get counterIncBtnTplContext(): object {
    return { $implicit: () => this.increment() };
  }

  get counterDecBtnTplContext(): object {
    return { $implicit: () => this.decrement() };
  }

  increment() {
    this.updateValue('inc');
  }

  decrement() {
    this.updateValue('dec');
  }

  private updateValue(action: 'inc' | 'dec') {
    const delta = (action === 'inc') ? 1 : -1;
    this.value += delta;
    this.changed.emit(this.value);
  }

}
