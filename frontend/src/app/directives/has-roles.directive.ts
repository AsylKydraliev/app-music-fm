import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit, OnDestroy{
  user: Observable<User | null>;
  userSub!: Subscription;

  @Input('appHasRoles') roles!: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      if(user && this.roles.includes(user.role)){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }else{
        this.viewContainer.clear();
      }
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
