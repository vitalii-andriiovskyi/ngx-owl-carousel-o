import { Attribute, Directive, HostBinding, HostListener, Input, isDevMode } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
export class OwlRouterLinkDirective {
    router;
    route;
    // TODO(issue/24571): remove '!'.
    queryParams;
    // TODO(issue/24571): remove '!'.
    fragment;
    // TODO(issue/24571): remove '!'.
    queryParamsHandling;
    // TODO(issue/24571): remove '!'.
    preserveFragment;
    // TODO(issue/24571): remove '!'.
    skipLocationChange;
    // TODO(issue/24571): remove '!'.
    replaceUrl;
    stopLink = false;
    commands = [];
    // TODO(issue/24571): remove '!'.
    preserve;
    constructor(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    set owlRouterLink(commands) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        }
        else {
            this.commands = [];
        }
    }
    /**
     * @deprecated 4.0.0 use `queryParamsHandling` instead.
     */
    set preserveQueryParams(value) {
        if (isDevMode() && console && console.warn) {
            console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
        }
        this.preserve = value;
    }
    onClick() {
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
    get urlTree() {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment)
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: OwlRouterLinkDirective, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: 'tabindex', attribute: true }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: OwlRouterLinkDirective, selector: ":not(a)[owlRouterLink]", inputs: { queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", stopLink: "stopLink", owlRouterLink: "owlRouterLink", preserveQueryParams: "preserveQueryParams" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: OwlRouterLinkDirective, decorators: [{
            type: Directive,
            args: [{ selector: ':not(a)[owlRouterLink]' }]
        }], ctorParameters: () => [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }], propDecorators: { queryParams: [{
                type: Input
            }], fragment: [{
                type: Input
            }], queryParamsHandling: [{
                type: Input
            }], preserveFragment: [{
                type: Input
            }], skipLocationChange: [{
                type: Input
            }], replaceUrl: [{
                type: Input
            }], stopLink: [{
                type: Input
            }], owlRouterLink: [{
                type: Input
            }], preserveQueryParams: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
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
export class OwlRouterLinkWithHrefDirective {
    router;
    route;
    locationStrategy;
    // TODO(issue/24571): remove '!'.
    target;
    // TODO(issue/24571): remove '!'.
    queryParams;
    // TODO(issue/24571): remove '!'.
    fragment;
    // TODO(issue/24571): remove '!'.
    queryParamsHandling;
    // TODO(issue/24571): remove '!'.
    preserveFragment;
    // TODO(issue/24571): remove '!'.
    skipLocationChange;
    // TODO(issue/24571): remove '!'.
    replaceUrl;
    stopLink = false;
    commands = [];
    subscription;
    // TODO(issue/24571): remove '!'.
    preserve;
    // the url displayed on the anchor element.
    // TODO(issue/24571): remove '!'.
    href;
    constructor(router, route, locationStrategy) {
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.subscription = router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
                this.updateTargetUrlAndHref();
            }
        });
    }
    set owlRouterLink(commands) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        }
        else {
            this.commands = [];
        }
    }
    set preserveQueryParams(value) {
        if (isDevMode() && console && console.warn) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        this.preserve = value;
    }
    ngOnChanges(changes) { this.updateTargetUrlAndHref(); }
    ngOnDestroy() { this.subscription.unsubscribe(); }
    onClick(button, ctrlKey, metaKey, shiftKey) {
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
    updateTargetUrlAndHref() {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    }
    get urlTree() {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment)
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: OwlRouterLinkWithHrefDirective, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i2.LocationStrategy }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: OwlRouterLinkWithHrefDirective, selector: "a[owlRouterLink]", inputs: { target: "target", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", stopLink: "stopLink", owlRouterLink: "owlRouterLink", preserveQueryParams: "preserveQueryParams" }, host: { listeners: { "click": "onClick($event.button,$event.ctrlKey,$event.metaKey,$event.shiftKey)" }, properties: { "attr.target": "this.target", "href": "this.href" } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: OwlRouterLinkWithHrefDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'a[owlRouterLink]' }]
        }], ctorParameters: () => [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.LocationStrategy }], propDecorators: { target: [{
                type: HostBinding,
                args: ['attr.target']
            }, {
                type: Input
            }], queryParams: [{
                type: Input
            }], fragment: [{
                type: Input
            }], queryParamsHandling: [{
                type: Input
            }], preserveFragment: [{
                type: Input
            }], skipLocationChange: [{
                type: Input
            }], replaceUrl: [{
                type: Input
            }], stopLink: [{
                type: Input
            }], href: [{
                type: HostBinding
            }], owlRouterLink: [{
                type: Input
            }], preserveQueryParams: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey']]
            }] } });
function attrBoolValue(s) {
    return s === '' || !!s;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy9saWIvY2Fyb3VzZWwvb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBbUMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9JLE9BQU8sRUFBRSxhQUFhLEVBQWdELE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLOUYsTUFBTSxPQUFPLHNCQUFzQjtJQW9CdkI7SUFBd0I7SUFuQmxDLGlDQUFpQztJQUN4QixXQUFXLENBQXlCO0lBQzdDLGlDQUFpQztJQUN4QixRQUFRLENBQVc7SUFDNUIsaUNBQWlDO0lBQ3hCLG1CQUFtQixDQUF3QjtJQUNwRCxpQ0FBaUM7SUFDeEIsZ0JBQWdCLENBQVk7SUFDckMsaUNBQWlDO0lBQ3hCLGtCQUFrQixDQUFZO0lBQ3ZDLGlDQUFpQztJQUN4QixVQUFVLENBQVk7SUFFdEIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNsQixRQUFRLEdBQVUsRUFBRSxDQUFDO0lBQzdCLGlDQUFpQztJQUN6QixRQUFRLENBQVk7SUFFNUIsWUFDVSxNQUFjLEVBQVUsS0FBcUIsRUFDOUIsUUFBZ0IsRUFBRSxRQUFtQixFQUFFLEVBQWM7UUFEcEUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBRXJELElBQUksUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsQ0FBQztJQUNILENBQUM7SUFFRCxJQUNJLGFBQWEsQ0FBQyxRQUF3QjtRQUN4QyxJQUFJ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LENBQUM7U0FDdkQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0ExRlUsOEJBQThCOzJGQUE5Qiw4QkFBOEI7OzJGQUE5Qiw4QkFBOEI7a0JBRDFDLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7dUlBR0osTUFBTTtzQkFBMUMsV0FBVzt1QkFBQyxhQUFhOztzQkFBRyxLQUFLO2dCQUV6QixXQUFXO3NCQUFuQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFFRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQVNTLElBQUk7c0JBQWxCLFdBQVc7Z0JBYVIsYUFBYTtzQkFEaEIsS0FBSztnQkFVRixtQkFBbUI7c0JBRHRCLEtBQUs7Z0JBWU4sT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQzs7QUFxQ2pHLFNBQVMsYUFBYSxDQUFDLENBQU07SUFDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXR0cmlidXRlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXJFdmVudCwgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5UGFyYW1zSGFuZGxpbmcgPSAnbWVyZ2UnIHwgJ3ByZXNlcnZlJyB8ICcnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICc6bm90KGEpW293bFJvdXRlckxpbmtdJyB9KVxuZXhwb3J0IGNsYXNzIE93bFJvdXRlckxpbmtEaXJlY3RpdmUge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXMgITogeyBbazogc3RyaW5nXTogYW55IH07XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBxdWVyeVBhcmFtc0hhbmRsaW5nICE6IFF1ZXJ5UGFyYW1zSGFuZGxpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBwcmVzZXJ2ZUZyYWdtZW50ICE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHJlcGxhY2VVcmwgITogYm9vbGVhbjtcblxuICBASW5wdXQoKSBzdG9wTGluayA9IGZhbHNlO1xuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZSAhOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZywgcmVuZGVyZXI6IFJlbmRlcmVyMiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAodGFiSW5kZXggPT0gbnVsbCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG93bFJvdXRlckxpbmsoY29tbWFuZHM6IGFueVtdIHwgc3RyaW5nKSB7XG4gICAgaWYgKGNvbW1hbmRzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCA0LjAuMCB1c2UgYHF1ZXJ5UGFyYW1zSGFuZGxpbmdgIGluc3RlYWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgcHJlc2VydmVRdWVyeVBhcmFtcyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiA8YW55PmNvbnNvbGUgJiYgPGFueT5jb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkISwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGV4dHJhcyA9IHtcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYXR0ckJvb2xWYWx1ZSh0aGlzLnNraXBMb2NhdGlvbkNoYW5nZSksXG4gICAgICByZXBsYWNlVXJsOiBhdHRyQm9vbFZhbHVlKHRoaXMucmVwbGFjZVVybCksXG4gICAgfTtcbiAgICBpZiAodGhpcy5zdG9wTGluaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHRoaXMuY29tbWFuZHMsIHtcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcbiAgICAgIGZyYWdtZW50OiB0aGlzLmZyYWdtZW50LFxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBMZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHJvdXRlcyBpbiB5b3VyIGFwcC5cbiAqXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBuZ01vZHVsZSBSb3V0ZXJNb2R1bGVcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ2Fbb3dsUm91dGVyTGlua10nIH0pXG5leHBvcnQgY2xhc3MgT3dsUm91dGVyTGlua1dpdGhIcmVmRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhcmdldCcpIEBJbnB1dCgpIHRhcmdldCAhOiBzdHJpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBxdWVyeVBhcmFtcyAhOiB7IFtrOiBzdHJpbmddOiBhbnkgfTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIGZyYWdtZW50ICE6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgITogUXVlcnlQYXJhbXNIYW5kbGluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQgITogYm9vbGVhbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHNraXBMb2NhdGlvbkNoYW5nZSAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcmVwbGFjZVVybCAhOiBib29sZWFuO1xuICBASW5wdXQoKSBzdG9wTGluayA9IGZhbHNlO1xuXG4gIHByaXZhdGUgY29tbWFuZHM6IGFueVtdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIHByZXNlcnZlICE6IGJvb2xlYW47XG5cbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQEhvc3RCaW5kaW5nKCkgaHJlZiAhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoczogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG93bFJvdXRlckxpbmsoY29tbWFuZHM6IGFueVtdIHwgc3RyaW5nKSB7XG4gICAgaWYgKGNvbW1hbmRzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIDxhbnk+Y29uc29sZSAmJiA8YW55PmNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKCdwcmVzZXJ2ZVF1ZXJ5UGFyYW1zIGlzIGRlcHJlY2F0ZWQsIHVzZSBxdWVyeVBhcmFtc0hhbmRsaW5nIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHt9KTogYW55IHsgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7IH1cbiAgbmdPbkRlc3Ryb3koKTogYW55IHsgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQuYnV0dG9uJywgJyRldmVudC5jdHJsS2V5JywgJyRldmVudC5tZXRhS2V5JywgJyRldmVudC5zaGlmdEtleSddKVxuICBvbkNsaWNrKGJ1dHRvbjogbnVtYmVyLCBjdHJsS2V5OiBib29sZWFuLCBtZXRhS2V5OiBib29sZWFuLCBzaGlmdEtleTogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGlmIChidXR0b24gIT09IDAgfHwgY3RybEtleSB8fCBtZXRhS2V5IHx8IHNoaWZ0S2V5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0ID09PSAnc3RyaW5nJyAmJiB0aGlzLnRhcmdldCAhPT0gJ19zZWxmJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRyYXMgPSB7XG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxuICAgICAgcmVwbGFjZVVybDogYXR0ckJvb2xWYWx1ZSh0aGlzLnJlcGxhY2VVcmwpLFxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk6IHZvaWQge1xuICAgIHRoaXMuaHJlZiA9IHRoaXMubG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMudXJsVHJlZSkpO1xuICB9XG5cbiAgZ2V0IHVybFRyZWUoKTogVXJsVHJlZSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5jb21tYW5kcywge1xuICAgICAgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLFxuICAgICAgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnQsXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiB0aGlzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcsXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudClcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhdHRyQm9vbFZhbHVlKHM6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gcyA9PT0gJycgfHwgISFzO1xufVxuIl19