import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FuseNavigationService } from '../navigation/navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { MediaObserver } from '@angular/flex-layout';
import { FuseMatchMedia } from '../../services/match-media.service';
import { FuseConfigService } from '../../services/config.service';
import { CookieService } from 'ngx-cookie-service';
import {ShortcutService} from './shortcutwebservice'
@Component({
    selector   : 'fuse-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls  : ['./shortcuts.component.scss']
})
export class FuseShortcutsComponent implements OnInit, OnDestroy
{
    shortcutItems: any[] = [];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching = false;
    mobileShortcutsPanelActive = false;
    toolbarColor: string;
    matchMediaSubscription: Subscription;
    onSettingsChanged: Subscription;

    @ViewChild('searchInput',   {static: true}) searchInputField;
    @ViewChild('shortcuts',   {static: true}) shortcutsEl: ElementRef;

    constructor(
        private renderer: Renderer2,
        private MediaObserver: MediaObserver,
        private fuseMatchMedia: FuseMatchMedia,
        private fuseNavigationService: FuseNavigationService,
        private fuseConfig: FuseConfigService,
        private cookieService: CookieService,
        private webService:ShortcutService
    )
    {
        this.filteredNavigationItems = this.navigationItems = this.fuseNavigationService.getFlatNavigation();

        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.toolbarColor = newSettings.colorClasses.toolbar;
                    }
                );
    }

    ngOnInit()
    {
        const cookieExists = this.cookieService.check('FUSE2.shortcuts');

        if ( cookieExists )
        {
            this.shortcutItems = JSON.parse(this.cookieService.get('FUSE2.shortcuts'));
        }
        else
        {
            // User's shortcut items
            this.shortcutItems = [
                {
                    'title': 'Calendar',
                    'type' : 'nav-item',
                    'icon' : 'today',
                    'url'  : '/apps/calendar'
                },
                {
                    'title': 'Mail',
                    'type' : 'nav-item',
                    'icon' : 'email',
                    'url'  : '/apps/mail'
                },
                {
                    'title': 'Contacts',
                    'type' : 'nav-item',
                    'icon' : 'account_box',
                    'url'  : '/apps/contacts'
                },
                {
                    'title': 'To-Do',
                    'type' : 'nav-item',
                    'icon' : 'check_box',
                    'url'  : '/apps/todo'
                }
            ];
        }


        this.matchMediaSubscription =
            this.fuseMatchMedia.onMediaChange.subscribe(() => {
                if ( this.MediaObserver.isActive('gt-sm') )
                {
                    this.hideMobileShortcutsPanel();
                }
            });
            this.getUnapprovedList();
    }
uapprovedList:any;
    getUnapprovedList(){
        this.webService.UnapprovedFriendget().subscribe(res=>{
             
            this.uapprovedList = res.data;
        })
    }
    ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }

    search(event)
    {
        const value = event.target.value.toLowerCase();

        if ( value === '' )
        {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    toggleShortcut(event, itemToToggle)
    {
        event.stopPropagation();

        for ( let i = 0; i < this.shortcutItems.length; i++ )
        {
            if ( this.shortcutItems[i].url === itemToToggle.url )
            {
                this.shortcutItems.splice(i, 1);

                // Save to the cookies
                this.cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));

                return;
            }
        }

        this.shortcutItems.push(itemToToggle);

        // Save to the cookies
        this.cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
    }

    isInShortcuts(navigationItem)
    {
        return this.shortcutItems.find(item => {
            return item.url === navigationItem.url;
        });
    }

    onMenuOpen()
    {
        setTimeout(() => {
         });
    }

    showMobileShortcutsPanel()
    {
        this.mobileShortcutsPanelActive = true;
        this.renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    hideMobileShortcutsPanel()
    {
        this.mobileShortcutsPanelActive = false;
        this.renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }
    acceptfriend(type,data){
          if(type == '1'){
var data1 ={
    chatUserId:data.chatfriendId
}
this.webService.approvedfriend(data1).subscribe(res=>{
    alert(JSON.stringify(res));
})
        }
        if(type == '2'){

        }
    }
}
