import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnDestroy, Renderer2, isDevMode } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavigationEnd, RouterEvent, Router, ActivatedRoute, UrlTree } from '@angular/router';

export type QueryParamsHandling = 'merge' | 'preserve' | '';

@Directive({ selector: ':not(a)[owlRouterLink]' })
export class OwlRouterLinkDirective {
  // TODO(issue/24571): remove '!'.
  @Input() queryParams !: { [k: string]: any };
  // TODO(issue/24571): remove '!'.
  @Input() fragment !: string;
  // TODO(issue/24571): remove '!'.
  @Input() queryParamsHandling !: QueryParamsHandling;
  // TODO(issue/24571): remove '!'.
  @Input() preserveFragment !: boolean;
  // TODO(issue/24571): remove '!'.
  @Input() skipLocationChange !: boolean;
  // TODO(issue/24571): remove '!'.
  @Input() replaceUrl !: boolean;

  @Input() stopLink = false;
  private commands: any[] = [];
  // TODO(issue/24571): remove '!'.
  private preserve !: boolean;

  constructor(
    private router: Router, private route: ActivatedRoute,
    @Attribute('tabindex') tabIndex: string, renderer: Renderer2, el: ElementRef) {
    if (tabIndex == null) {
      renderer.setAttribute(el.nativeElement, 'tabindex', '0');
    }
  }

  @Input()
  set owlRouterLink(commands: any[] | string) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = [];
    }
  }

  /**
   * @deprecated 4.0.0 use `queryParamsHandling` instead.
   */
  @Input()
  set preserveQueryParams(value: boolean) {
    if (isDevMode() && <any>console && <any>console.warn) {
      console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
    }
    this.preserve = value;
  }

  @HostListener('click')
  onClick(): boolean {
    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl),
    };
    if (this.stopLink) {
      return false;
    }
    this.router.navigateByUrl(this.urlTree, extras);
    return true;
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment)
    });
  }
}

/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Directive({ selector: 'a[owlRouterLink]' })
export class OwlRouterLinkWithHrefDirective implements OnChanges, OnDestroy {
  // TODO(issue/24571): remove '!'.
  @HostBinding('attr.target') @Input() target !: string;
  // TODO(issue/24571): remove '!'.
  @Input() queryParams !: { [k: string]: any };
  // TODO(issue/24571): remove '!'.
  @Input() fragment !: string;
  // TODO(issue/24571): remove '!'.
  @Input() queryParamsHandling !: QueryParamsHandling;
  // TODO(issue/24571): remove '!'.
  @Input() preserveFragment !: boolean;
  // TODO(issue/24571): remove '!'.
  @Input() skipLocationChange !: boolean;
  // TODO(issue/24571): remove '!'.
  @Input() replaceUrl !: boolean;
  @Input() stopLink = false;

  private commands: any[] = [];
  private subscription: Subscription;
  // TODO(issue/24571): remove '!'.
  private preserve !: boolean;

  // the url displayed on the anchor element.
  // TODO(issue/24571): remove '!'.
  @HostBinding() href !: string;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private locationStrategy: LocationStrategy) {
    this.subscription = router.events.subscribe((s: NavigationEnd) => {
      if (s instanceof NavigationEnd) {
        this.updateTargetUrlAndHref();
      }
    });
  }

  @Input()
  set owlRouterLink(commands: any[] | string) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = [];
    }
  }

  @Input()
  set preserveQueryParams(value: boolean) {
    if (isDevMode() && <any>console && <any>console.warn) {
      console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
    }
    this.preserve = value;
  }

  ngOnChanges(changes: {}): any { this.updateTargetUrlAndHref(); }
  ngOnDestroy(): any { this.subscription.unsubscribe(); }

  @HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
  onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
    if (button !== 0 || ctrlKey || metaKey || shiftKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target !== '_self') {
      return true;
    }

    if (this.stopLink) {
      return false;
    }

    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl),
    };
    this.router.navigateByUrl(this.urlTree, extras);
    return false;
  }

  private updateTargetUrlAndHref(): void {
    this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment)
    });
  }
}

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}
