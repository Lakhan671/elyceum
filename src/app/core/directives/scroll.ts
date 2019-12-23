import {
    Directive, HostListener
  }
  from '@angular/core';
  
  @Directive({
    selector: '[scrollTracker]'
  })
  export class ScrollTrackerDirective {
    @HostListener('scroll', ['$event']) 
  
    onScroll(event) {
      // do tracking
      // console.log('scrolled', event.target.scrollTop);
      // Listen to click events in the component
      let tracker = event.target;
  
      let limit = tracker.scrollHeight - tracker.clientHeight;
      console.log(event.target.scrollTop, limit);
      if (event.target.scrollTop === limit) {
       }
    }
  
    constructor() {}
  }