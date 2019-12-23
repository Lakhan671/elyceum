import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
// import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';
import { AdduserComponent } from './main/body/dialog/adduser/adduser.component';
import {WebserModel} from './navigation/WebService';
import { QuillModule } from 'ngx-quill';
import {ScrollTrackerDirective} from './core/directives/scroll';
const appRoutes: Routes = [
    //  {
    //     path        : 'settings',
    //     loadChildren: './main/content/Setting/settingModule#SettingModule'
    // },
    {
        path : 'auth',
        loadChildren: './main/content/auth/authModule#AuthModule'
    }, {
        path : 'profile',
        loadChildren: './main/body/profile/profile.module#ProfileModule'
    }, {
        path : 'news',
        loadChildren: './main/body/news/news.module#NewModule'
    }, {
        path : 'home',
        loadChildren: './main/body/home/home.module#HomeModule'
    }, {
        path : 'dash',
        loadChildren: './main/body/dashboard/dash.module#DashModule'
    }, {
        path : 'student',
        loadChildren: './main/body/student/student.module#StudentModule'

    }, {
        path : 'dashboard',
        loadChildren: './main/body/dashboard/project/project.module#FuseProjectDashboardModule'
    }, {
        path : 'Academics',
        loadChildren: './main/body/academics/academic.module#AcademicsModule'
    }, {
        path : 'collabration',
        loadChildren: './main/body/collabration/collabration.module#CollabrationModule'
    }, {
        path : 'setting',
        loadChildren: './main/body/setting/setting.module#SettingModule'
    }, {
        path : 'calendar',
        loadChildren: './main/body/calendar/calendar.module#FuseCalendarModule'
    }, {
        path : 'group',
        loadChildren: './main/body/group/group.module#GroupModule'
    }, {
        path : 'subject',
        loadChildren: './main/body/subject/subject.module#SubjectModule'
    }, {
        path      : '**',
        redirectTo: 'auth/login'
    }
];


@NgModule({
    declarations: [
        AppComponent,
        AlertDialogComponent, AdduserComponent, ScrollTrackerDirective
     ],
     entryComponents: [AlertDialogComponent, AdduserComponent],
    imports     : [
        QuillModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
                

     ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService, WebserModel
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule { }
