import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pagination]'
})
export class PaginationDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
