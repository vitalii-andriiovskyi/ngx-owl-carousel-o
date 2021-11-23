import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ResizeService {
    private eventManager;
    /**
     * Width of window
     */
    windowWidth: any;
    /**
     * Makes resizeSubject become Observable
     * @returns Observable of resizeSubject
     */
    get onResize$(): Observable<Window>;
    /**
     * Subject of 'resize' event
     */
    private resizeSubject;
    constructor(eventManager: EventManager);
    /**
     * Handler of 'resize' event. Passes data throw resizeSubject
     * @param event Event Object of 'resize' event
     */
    private onResize;
    /**
     * Handler of 'onload' event. Defines the width of window
     * @param event Event Object of 'onload' event
     */
    private onLoaded;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResizeService>;
}
