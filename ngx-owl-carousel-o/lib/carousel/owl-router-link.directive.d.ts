import { LocationStrategy } from '@angular/common';
import { ElementRef, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import * as i0 from "@angular/core";
export type QueryParamsHandling = 'merge' | 'preserve' | '';
export declare class OwlRouterLinkDirective {
    private router;
    private route;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    queryParamsHandling: QueryParamsHandling;
    preserveFragment: boolean;
    skipLocationChange: boolean;
    replaceUrl: boolean;
    stopLink: boolean;
    private commands;
    private preserve;
    constructor(router: Router, route: ActivatedRoute, tabIndex: string, renderer: Renderer2, el: ElementRef);
    set owlRouterLink(commands: any[] | string);
    /**
     * @deprecated 4.0.0 use `queryParamsHandling` instead.
     */
    set preserveQueryParams(value: boolean);
    onClick(): boolean;
    get urlTree(): UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlRouterLinkDirective, [null, null, { attribute: "tabindex"; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlRouterLinkDirective, ":not(a)[owlRouterLink]", never, { "queryParams": { "alias": "queryParams"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "queryParamsHandling": { "alias": "queryParamsHandling"; "required": false; }; "preserveFragment": { "alias": "preserveFragment"; "required": false; }; "skipLocationChange": { "alias": "skipLocationChange"; "required": false; }; "replaceUrl": { "alias": "replaceUrl"; "required": false; }; "stopLink": { "alias": "stopLink"; "required": false; }; "owlRouterLink": { "alias": "owlRouterLink"; "required": false; }; "preserveQueryParams": { "alias": "preserveQueryParams"; "required": false; }; }, {}, never, never, false, never>;
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
export declare class OwlRouterLinkWithHrefDirective implements OnChanges, OnDestroy {
    private router;
    private route;
    private locationStrategy;
    target: string;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    queryParamsHandling: QueryParamsHandling;
    preserveFragment: boolean;
    skipLocationChange: boolean;
    replaceUrl: boolean;
    stopLink: boolean;
    private commands;
    private subscription;
    private preserve;
    href: string;
    constructor(router: Router, route: ActivatedRoute, locationStrategy: LocationStrategy);
    set owlRouterLink(commands: any[] | string);
    set preserveQueryParams(value: boolean);
    ngOnChanges(changes: {}): any;
    ngOnDestroy(): any;
    onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean;
    private updateTargetUrlAndHref;
    get urlTree(): UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlRouterLinkWithHrefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlRouterLinkWithHrefDirective, "a[owlRouterLink]", never, { "target": { "alias": "target"; "required": false; }; "queryParams": { "alias": "queryParams"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "queryParamsHandling": { "alias": "queryParamsHandling"; "required": false; }; "preserveFragment": { "alias": "preserveFragment"; "required": false; }; "skipLocationChange": { "alias": "skipLocationChange"; "required": false; }; "replaceUrl": { "alias": "replaceUrl"; "required": false; }; "stopLink": { "alias": "stopLink"; "required": false; }; "owlRouterLink": { "alias": "owlRouterLink"; "required": false; }; "preserveQueryParams": { "alias": "preserveQueryParams"; "required": false; }; }, {}, never, never, false, never>;
}
