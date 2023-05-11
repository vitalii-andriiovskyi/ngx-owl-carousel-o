import { Attribute, Directive, HostBinding, HostListener, Input, isDevMode } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
class OwlRouterLinkDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlRouterLinkDirective, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: 'tabindex', attribute: true }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0", type: OwlRouterLinkDirective, selector: ":not(a)[owlRouterLink]", inputs: { queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", stopLink: "stopLink", owlRouterLink: "owlRouterLink", preserveQueryParams: "preserveQueryParams" }, host: { listeners: { "click": "onClick()" } }, ngImport: i0 });
}
export { OwlRouterLinkDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlRouterLinkDirective, decorators: [{
            type: Directive,
            args: [{ selector: ':not(a)[owlRouterLink]' }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { queryParams: [{
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
class OwlRouterLinkWithHrefDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlRouterLinkWithHrefDirective, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i2.LocationStrategy }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0", type: OwlRouterLinkWithHrefDirective, selector: "a[owlRouterLink]", inputs: { target: "target", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", stopLink: "stopLink", owlRouterLink: "owlRouterLink", preserveQueryParams: "preserveQueryParams" }, host: { listeners: { "click": "onClick($event.button,$event.ctrlKey,$event.metaKey,$event.shiftKey)" }, properties: { "attr.target": "this.target", "href": "this.href" } }, usesOnChanges: true, ngImport: i0 });
}
export { OwlRouterLinkWithHrefDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: OwlRouterLinkWithHrefDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'a[owlRouterLink]' }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.LocationStrategy }]; }, propDecorators: { target: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvbmd4LW93bC1jYXJvdXNlbC1vL3NyYy9saWIvY2Fyb3VzZWwvb3dsLXJvdXRlci1saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBbUMsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRy9JLE9BQU8sRUFBRSxhQUFhLEVBQWdELE1BQU0saUJBQWlCLENBQUM7Ozs7QUFJOUYsTUFDYSxzQkFBc0I7SUFvQnZCO0lBQXdCO0lBbkJsQyxpQ0FBaUM7SUFDeEIsV0FBVyxDQUF5QjtJQUM3QyxpQ0FBaUM7SUFDeEIsUUFBUSxDQUFXO0lBQzVCLGlDQUFpQztJQUN4QixtQkFBbUIsQ0FBd0I7SUFDcEQsaUNBQWlDO0lBQ3hCLGdCQUFnQixDQUFZO0lBQ3JDLGlDQUFpQztJQUN4QixrQkFBa0IsQ0FBWTtJQUN2QyxpQ0FBaUM7SUFDeEIsVUFBVSxDQUFZO0lBRXRCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDbEIsUUFBUSxHQUFVLEVBQUUsQ0FBQztJQUM3QixpQ0FBaUM7SUFDekIsUUFBUSxDQUFZO0lBRTVCLFlBQ1UsTUFBYyxFQUFVLEtBQXFCLEVBQzlCLFFBQWdCLEVBQUUsUUFBbUIsRUFBRSxFQUFjO1FBRHBFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUVyRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFRCxJQUNJLGFBQWEsQ0FBQyxRQUF3QjtRQUN4QyxJQUFJLFFBQVEsSUFBSSxJQUFJ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QUFFLGtCQUFrQixFQUFFO3lKQUdKLE1BQU07c0JBQTFDLFdBQVc7dUJBQUMsYUFBYTs7c0JBQUcsS0FBSztnQkFFekIsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFFRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBRUcsa0JBQWtCO3NCQUExQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFTUyxJQUFJO3NCQUFsQixXQUFXO2dCQWFSLGFBQWE7c0JBRGhCLEtBQUs7Z0JBVUYsbUJBQW1CO3NCQUR0QixLQUFLO2dCQVlOLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUM7O0FBcUNqRyxTQUFTLGFBQWEsQ0FBQyxDQUFNO0lBQzNCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF0dHJpYnV0ZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyRXZlbnQsIFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgdHlwZSBRdWVyeVBhcmFtc0hhbmRsaW5nID0gJ21lcmdlJyB8ICdwcmVzZXJ2ZScgfCAnJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnOm5vdChhKVtvd2xSb3V0ZXJMaW5rXScgfSlcbmV4cG9ydCBjbGFzcyBPd2xSb3V0ZXJMaW5rRGlyZWN0aXZlIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zICE6IHsgW2s6IHN0cmluZ106IGFueSB9O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgZnJhZ21lbnQgITogc3RyaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyAhOiBRdWVyeVBhcmFtc0hhbmRsaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgc2tpcExvY2F0aW9uQ2hhbmdlICE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSByZXBsYWNlVXJsICE6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc3RvcExpbmsgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgcHJlc2VydmUgITogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgaWYgKHRhYkluZGV4ID09IG51bGwpIHtcbiAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbC5uYXRpdmVFbGVtZW50LCAndGFiaW5kZXgnLCAnMCcpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXSB8IHN0cmluZykge1xuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgNC4wLjAgdXNlIGBxdWVyeVBhcmFtc0hhbmRsaW5nYCBpbnN0ZWFkLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCEsIHVzZSBxdWVyeVBhcmFtc0hhbmRsaW5nIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIHRoaXMucHJlc2VydmUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiBib29sZWFuIHtcbiAgICBjb25zdCBleHRyYXMgPSB7XG4gICAgICBza2lwTG9jYXRpb25DaGFuZ2U6IGF0dHJCb29sVmFsdWUodGhpcy5za2lwTG9jYXRpb25DaGFuZ2UpLFxuICAgICAgcmVwbGFjZVVybDogYXR0ckJvb2xWYWx1ZSh0aGlzLnJlcGxhY2VVcmwpLFxuICAgIH07XG4gICAgaWYgKHRoaXMuc3RvcExpbmspIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgdXJsVHJlZSgpOiBVcmxUcmVlIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcbiAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IHRoaXMucXVlcnlQYXJhbXNIYW5kbGluZyxcbiAgICAgIHByZXNlcnZlRnJhZ21lbnQ6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZUZyYWdtZW50KVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogTGV0cyB5b3UgbGluayB0byBzcGVjaWZpYyByb3V0ZXMgaW4geW91ciBhcHAuXG4gKlxuICogU2VlIGBSb3V0ZXJMaW5rYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdhW293bFJvdXRlckxpbmtdJyB9KVxuZXhwb3J0IGNsYXNzIE93bFJvdXRlckxpbmtXaXRoSHJlZkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBIb3N0QmluZGluZygnYXR0ci50YXJnZXQnKSBASW5wdXQoKSB0YXJnZXQgITogc3RyaW5nO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXMgITogeyBbazogc3RyaW5nXTogYW55IH07XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBmcmFnbWVudCAhOiBzdHJpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBxdWVyeVBhcmFtc0hhbmRsaW5nICE6IFF1ZXJ5UGFyYW1zSGFuZGxpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBwcmVzZXJ2ZUZyYWdtZW50ICE6IGJvb2xlYW47XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UgITogYm9vbGVhbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHJlcGxhY2VVcmwgITogYm9vbGVhbjtcbiAgQElucHV0KCkgc3RvcExpbmsgPSBmYWxzZTtcblxuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBwcmVzZXJ2ZSAhOiBib29sZWFuO1xuXG4gIC8vIHRoZSB1cmwgZGlzcGxheWVkIG9uIHRoZSBhbmNob3IgZWxlbWVudC5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBIb3N0QmluZGluZygpIGhyZWYgITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKHM6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgIGlmIChzIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBvd2xSb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXSB8IHN0cmluZykge1xuICAgIGlmIChjb21tYW5kcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gQXJyYXkuaXNBcnJheShjb21tYW5kcykgPyBjb21tYW5kcyA6IFtjb21tYW5kc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcHJlc2VydmVRdWVyeVBhcmFtcyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiA8YW55PmNvbnNvbGUgJiYgPGFueT5jb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkLCB1c2UgcXVlcnlQYXJhbXNIYW5kbGluZyBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICB0aGlzLnByZXNlcnZlID0gdmFsdWU7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7fSk6IGFueSB7IHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOyB9XG4gIG5nT25EZXN0cm95KCk6IGFueSB7IHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LmJ1dHRvbicsICckZXZlbnQuY3RybEtleScsICckZXZlbnQubWV0YUtleScsICckZXZlbnQuc2hpZnRLZXknXSlcbiAgb25DbGljayhidXR0b246IG51bWJlciwgY3RybEtleTogYm9vbGVhbiwgbWV0YUtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoYnV0dG9uICE9PSAwIHx8IGN0cmxLZXkgfHwgbWV0YUtleSB8fCBzaGlmdEtleSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3N0cmluZycgJiYgdGhpcy50YXJnZXQgIT09ICdfc2VsZicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0b3BMaW5rKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0cmFzID0ge1xuICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiBhdHRyQm9vbFZhbHVlKHRoaXMuc2tpcExvY2F0aW9uQ2hhbmdlKSxcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcbiAgICB9O1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy51cmxUcmVlLCBleHRyYXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpOiB2b2lkIHtcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLnNlcmlhbGl6ZVVybCh0aGlzLnVybFRyZWUpKTtcbiAgfVxuXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHRoaXMuY29tbWFuZHMsIHtcbiAgICAgIHJlbGF0aXZlVG86IHRoaXMucm91dGUsXG4gICAgICBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcyxcbiAgICAgIGZyYWdtZW50OiB0aGlzLmZyYWdtZW50LFxuICAgICAgcXVlcnlQYXJhbXNIYW5kbGluZzogdGhpcy5xdWVyeVBhcmFtc0hhbmRsaW5nLFxuICAgICAgcHJlc2VydmVGcmFnbWVudDogYXR0ckJvb2xWYWx1ZSh0aGlzLnByZXNlcnZlRnJhZ21lbnQpXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXR0ckJvb2xWYWx1ZShzOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHMgPT09ICcnIHx8ICEhcztcbn1cbiJdfQ==