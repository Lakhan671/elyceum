import { Component } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './core/services/translation-loader.service';

import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseNavigationModel } from './navigation/navigation.model';
import {LoginFuseNavigationModel} from './navigation/LoginNavigation';
import {DepartmentNavigationModel} from './navigation/department.model';
import {RoomNavigationModel} from './navigation/room.mode';
import { studentNavigationModel} from './navigation/student.model';
import { studentPermotionModel} from './navigation/studentPermotionModel';
import { CalendarNavigationModel} from './navigation/calendar.model';
import { GroupNavigationModel} from './navigation/group.model';

import { TeacherNavigationModel} from './navigation/teacher.model';
import { SubjectNavigationModel} from './navigation/subject.model';
import {SubjectDetailNavigationModel} from './navigation/subjectDetail.model';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';
import {lessionDetailNavigationModel} from './navigation/lessionDetail.modal';
import { NavigationStart, Router , NavigationEnd} from '@angular/router';
import {AtendanceNavigationModel} from './navigation/attendance.model';
import {feeNavigationModel} from './navigation/fee.moduel';
import {QuestionNavigationModel} from './navigation/question.model';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
        private router: Router    ) {
        // Add languages
        this.translate.addLangs(['en', 'tr']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Use a language
        this.translate.use('en');

        // Set the navigation model
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd ) {
                     if (window.location.pathname == '/auth/login'
                     || window.location.pathname == '/auth/register'
                      || window.location.pathname == '/auth/forgot') {
                        this.fuseNavigationService.setNavigationModel(new LoginFuseNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
                    } else if (window.location.pathname == '/collabration/department'
                    || window.location.pathname == '/collabration/department/course'
                    || window.location.pathname == '/collabration/department/branch'
                    || window.location.pathname == '/collabration/department/section'

                    || window.location.pathname == '/collabration/department/semister'
                    || window.location.pathname == '/collabration/department/session' ) {
                        this.fuseNavigationService.setNavigationModel(new DepartmentNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if ( window.location.pathname == '/collabration/department/room'
                    || window.location.pathname == '/collabration/department/room/roomName') {
                        this.fuseNavigationService.setNavigationModel(new RoomNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (window.location.pathname == '/student' || window.location.pathname == '/student/Permotion' || window.location.pathname == '/student/Attendance'  ) {
                        this.fuseNavigationService.setNavigationModel(new studentNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (  window.location.pathname == '/student/Permotion' || window.location.pathname == '/student/Permotion/type' || window.location.pathname == '/student/Permotion/name' ) {
                        this.fuseNavigationService.setNavigationModel(new studentPermotionModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (  window.location.pathname == '/calendar' || window.location.pathname == '/calendar/type' || window.location.pathname == '/calendar/event' ) {
                        this.fuseNavigationService.setNavigationModel(new CalendarNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (  window.location.pathname == '/Academics/teacher' ) {
                        this.fuseNavigationService.setNavigationModel(new TeacherNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (  window.location.pathname == '/subject' || window.location.pathname == '/subject/Create' ) {
                        this.fuseNavigationService.setNavigationModel(new SubjectNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (  window.location.pathname == '/subject/Detail' || window.location.pathname == '/subject/Detail/notes' || window.location.pathname == '/subject/Detail/lession/create'  || window.location.pathname == '/subject/Detail/Unit/assignment' || window.location.pathname == '/subject/Detail/Unit/lession' ) {
                        this.fuseNavigationService.setNavigationModel(new SubjectDetailNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    } else if (  window.location.pathname == '/group/member' || window.location.pathname == '/group/Post' ) {
                        this.fuseNavigationService.setNavigationModel(new GroupNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
                    } else if (  window.location.pathname == '/subject/Detail/lession/detail' ) {
                        this.fuseNavigationService.setNavigationModel(new lessionDetailNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
                    } else if (  window.location.pathname == '/Academics/attendance' || window.location.pathname == '/Academics/attendance/history' ) {
                        this.fuseNavigationService.setNavigationModel(new AtendanceNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
                    } else if (  window.location.pathname == '/Academics/fee/feeType' || window.location.pathname == '/Academics/fee' ) {
                        this.fuseNavigationService.setNavigationModel(new feeNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
                    } else if (  window.location.pathname == '/subject/Detail/Unit/assignment/question'  ) {
                        this.fuseNavigationService.setNavigationModel(new QuestionNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
                    } else {
                        this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());
                        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

                    }
                }
            }
        );
        this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());
        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

        // Set the navigation translations
    }
}
