import { NavigationEnd, Router } from '@angular/router';
import { mergeMap, debounceTime, take, filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { navlist } from './models/navbar';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent,ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  navlist = navlist;

  private url: string = '/games';

  $destroyer: ReplaySubject<void> = new ReplaySubject<void>(1);

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.$destroyer.next();
  }

  ngAfterViewInit(): void {
    this.listenTouches();
  }

  ngOnInit(): void {
    this.url = this.router.url;
    
    this.router.events.pipe(
      takeUntil(this.$destroyer),
      filter(event => {
        return event instanceof NavigationEnd;
      })
    ).subscribe((event: NavigationEnd) => {
      this.url = event.url;
    });
  }  

  private listenTouches(): void {
    let startX = 0;
    let endX = 0;
    fromEvent(document, 'touchstart').pipe(
      takeUntil(this.$destroyer),
      mergeMap((touchEvent: TouchEvent) => {
        startX = touchEvent.touches[0].clientX;
        return fromEvent(document, 'touchmove');
      }),
      debounceTime(50),
      take(1)
    ).subscribe((touchEvent: TouchEvent) => {
      endX = touchEvent.touches[0].clientX;
      if ((endX - startX) > Math.abs(50)) {
        this.swipePage(-1);        
      } else if ((startX - endX) > Math.abs(50)) {
        this.swipePage(1);
      }

      this.listenTouches();
    });
  }

  private swipePage(shift: number): void {
    let index = this.navlist.findIndex(value => this.url.startsWith(value.url));

    index = index + shift;

    if (index < 0 || index >= this.navlist.length) {
      index = index - shift;
    }

    this.router.navigateByUrl(this.navlist[index]?.url || '/games');
  }
}
